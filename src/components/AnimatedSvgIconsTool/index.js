'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import ImageToolsTopNav from '@/components/ImageToolsTopNav';

/* ─────────────────────────────────────────────────────────────
   Icon definitions
   Each icon returns an <svg> string given { color, size, stroke, speed }
   speed: 1 = normal, 0.5 = slower, 2 = faster
───────────────────────────────────────────────────────────── */
function dur(base, speed) {
  return `${(base / speed).toFixed(2)}s`;
}

const ICONS = [
  /* ── Draw ── */
  {
    id: 'checkmark', name: 'Checkmark', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .chk { stroke-dasharray: 28; stroke-dashoffset: 28; animation: draw ${dur(0.5, speed)} ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="chk" d="M4 13l5 5L20 7" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'close', name: 'Close / X', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cl1 { stroke-dasharray: 24; stroke-dashoffset: 24; animation: draw ${dur(0.35, speed)} ease forwards; }
    .cl2 { stroke-dasharray: 24; stroke-dashoffset: 24; animation: draw ${dur(0.35, speed)} ease ${dur(0.2, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <line class="cl1" x1="5" y1="5" x2="19" y2="19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="cl2" x1="19" y1="5" x2="5" y2="19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'circle-check', name: 'Circle Check', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cc { stroke-dasharray: 75; stroke-dashoffset: 75; animation: draw ${dur(0.6, speed)} ease forwards; }
    .ck { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.4, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="cc" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="ck" d="M7.5 12l3 3 6-6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    id: 'arrow-right', name: 'Arrow Right', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ar { animation: slideRight ${dur(0.7, speed)} ease-out forwards; opacity: 0; }
    @keyframes slideRight { from { transform: translateX(-6px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  </style>
  <g class="ar">
    <line x1="4" y1="12" x2="20" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="13,5 20,12 13,19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
</svg>`,
  },
  {
    id: 'arrow-down', name: 'Arrow Down', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ad { animation: bounce ${dur(0.9, speed)} ease-in-out infinite; }
    @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
  </style>
  <g class="ad">
    <line x1="12" y1="4" x2="12" y2="20" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="5,13 12,20 19,13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
</svg>`,
  },
  /* ── Heart ── */
  {
    id: 'heart', name: 'Heart', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <style>
    .ht { animation: heartbeat ${dur(0.8, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes heartbeat { 0%,100% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.2); } 70% { transform: scale(1); } }
  </style>
  <path class="ht" d="M12 21C12 21 4 14 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5C20 14 12 21 12 21Z" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Star ── */
  {
    id: 'star', name: 'Star', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <style>
    .st { animation: starPop ${dur(0.5, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 50%; }
    @keyframes starPop { 0% { transform: scale(0) rotate(-30deg); opacity: 0; } 60% { transform: scale(1.2) rotate(5deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
  </style>
  <polygon class="st" points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Bell ── */
  {
    id: 'bell', name: 'Bell', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .bl { animation: swing ${dur(1.2, speed)} ease-in-out infinite; transform-origin: 50% 0%; }
    @keyframes swing { 0%,100% { transform: rotate(0deg); } 20% { transform: rotate(18deg); } 40% { transform: rotate(-14deg); } 60% { transform: rotate(10deg); } 80% { transform: rotate(-6deg); } }
  </style>
  <g class="bl">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Search ── */
  {
    id: 'search', name: 'Search', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sc { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.6, speed)} ease forwards; }
    .sh { opacity: 0; animation: fadeIn ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
  <circle class="sc" cx="10.5" cy="10.5" r="6.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="sh" x1="15.5" y1="15.5" x2="21" y2="21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Download ── */
  {
    id: 'download', name: 'Download', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .dw { animation: dlBounce ${dur(1, speed)} ease-in-out infinite; }
    @keyframes dlBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
  </style>
  <g class="dw">
    <path d="M12 3v12M7 11l5 5 5-5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 20h14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Upload ── */
  {
    id: 'upload', name: 'Upload', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .up { animation: upBounce ${dur(1, speed)} ease-in-out infinite; }
    @keyframes upBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  </style>
  <g class="up">
    <path d="M12 21V9M7 13l5-5 5 5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 4h14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Refresh ── */
  {
    id: 'refresh', name: 'Refresh', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rf { animation: spin ${dur(1, speed)} linear infinite; transform-origin: 50% 50%; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
  <g class="rf">
    <polyline points="23,4 23,10 17,10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Gear / Settings ── */
  {
    id: 'gear', name: 'Gear', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .gr { animation: spinSlow ${dur(3, speed)} linear infinite; transform-origin: 50% 50%; }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
  </style>
  <g class="gr">
    <circle cx="12" cy="12" r="3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Power ── */
  {
    id: 'power', name: 'Power', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pw1 { stroke-dasharray: 44; stroke-dashoffset: 44; animation: draw ${dur(0.6, speed)} ease forwards; }
    .pw2 { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="pw1" d="M18.36 6.64a9 9 0 1 1-12.73 0" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="pw2" x1="12" y1="2" x2="12" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Play ── */
  {
    id: 'play', name: 'Play', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <style>
    .pl { animation: playPulse ${dur(1.2, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes playPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.9); opacity: 0.7; } }
  </style>
  <polygon class="pl" points="5,3 19,12 5,21" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Wifi ── */
  {
    id: 'wifi', name: 'Wifi', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .w1 { animation: waveIn ${dur(0.9, speed)} ease forwards; opacity: 0; }
    .w2 { animation: waveIn ${dur(0.9, speed)} ease ${dur(0.2, speed)} forwards; opacity: 0; }
    .w3 { animation: waveIn ${dur(0.9, speed)} ease ${dur(0.4, speed)} forwards; opacity: 0; }
    .wd { opacity: 0; animation: waveIn ${dur(0.5, speed)} ease ${dur(0.7, speed)} forwards; }
    @keyframes waveIn { to { opacity: 1; } }
  </style>
  <path class="w1" d="M1.42 9a16 16 0 0 1 21.16 0" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="w2" d="M5 12.55a11 11 0 0 1 14.08 0" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="w3" d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <circle class="wd" cx="12" cy="20" r="1" fill="${color}"/>
</svg>`,
  },
  /* ── Alert ── */
  {
    id: 'alert', name: 'Alert', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .al { animation: shake ${dur(0.6, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-3px) rotate(-2deg); } 40% { transform: translateX(3px) rotate(2deg); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
  </style>
  <g class="al">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="12" y1="9" x2="12" y2="13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="12" y1="17" x2="12.01" y2="17" stroke="${color}" stroke-width="${stroke + 1}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Lock ── */
  {
    id: 'lock', name: 'Lock', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .lk1 { stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw ${dur(0.5, speed)} ease forwards; }
    .lk2 { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.5, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="lk1" d="M7 11V7a5 5 0 0 1 10 0v4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <rect class="lk2" x="3" y="11" width="18" height="11" rx="2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <circle cx="12" cy="16" r="1" fill="${color}"/>
</svg>`,
  },
  /* ── Send ── */
  {
    id: 'send', name: 'Send', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sn { animation: fly ${dur(0.7, speed)} ease-out forwards; opacity: 0; }
    @keyframes fly { from { transform: translate(-4px, 4px); opacity: 0; } to { transform: translate(0,0); opacity: 1; } }
  </style>
  <g class="sn">
    <line x1="22" y1="2" x2="11" y2="13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polygon points="22,2 15,22 11,13 2,9" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Code ── */
  {
    id: 'code', name: 'Code', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cl { stroke-dasharray: 22; stroke-dashoffset: 22; animation: draw ${dur(0.4, speed)} ease forwards; }
    .cr { stroke-dasharray: 22; stroke-dashoffset: 22; animation: draw ${dur(0.4, speed)} ease ${dur(0.25, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polyline class="cl" points="16,18 22,12 16,6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="cr" points="8,6 2,12 8,18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Loader spinner ── */
  {
    id: 'loader', name: 'Loader', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .lo { animation: spin ${dur(0.8, speed)} linear infinite; transform-origin: 50% 50%; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
  <line class="lo" x1="12" y1="2" x2="12" y2="6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="1"/>
  <line class="lo" x1="12" y1="18" x2="12" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.3"/>
  <line class="lo" x1="4.22" y1="4.22" x2="7.05" y2="7.05" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.85"/>
  <line class="lo" x1="16.95" y1="16.95" x2="19.78" y2="19.78" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.2"/>
  <line class="lo" x1="2" y1="12" x2="6" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.7"/>
  <line class="lo" x1="18" y1="12" x2="22" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.15"/>
  <line class="lo" x1="4.22" y1="19.78" x2="7.05" y2="16.95" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.55"/>
  <line class="lo" x1="16.95" y1="7.05" x2="19.78" y2="4.22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.1"/>
</svg>`,
  },
  /* ── Eye ── */
  {
    id: 'eye', name: 'Eye', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ey { animation: blink ${dur(2, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    .ep { animation: pupil ${dur(2, speed)} ease-in-out infinite; }
    @keyframes blink { 0%,90%,100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    @keyframes pupil { 0%,90%,100% { r: 3; } 95% { r: 0; } }
  </style>
  <g class="ey">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
  <circle class="ep" cx="12" cy="12" r="3" fill="${color}"/>
</svg>`,
  },
  /* ── Thumbs Up ── */
  {
    id: 'thumbup', name: 'Thumbs Up', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .tu { animation: popUp ${dur(0.5, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 80%; opacity: 0; }
    @keyframes popUp { 0% { transform: scale(0.5) translateY(8px); opacity: 0; } 70% { transform: scale(1.1) translateY(-2px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
  </style>
  <g class="tu">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Zap / Lightning ── */
  {
    id: 'zap', name: 'Zap', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .zp { animation: flash ${dur(0.8, speed)} ease-in-out infinite; }
    @keyframes flash { 0%,100% { opacity: 1; filter: drop-shadow(0 0 0px ${color}); } 50% { opacity: 0.7; filter: drop-shadow(0 0 6px ${color}); } }
  </style>
  <polygon class="zp" points="13,2 3,14 12,14 11,22 21,10 12,10" fill="${color}33" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Plus ── */
  {
    id: 'plus', name: 'Plus / Add', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ps { animation: rotateIn ${dur(0.5, speed)} ease-out forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes rotateIn { from { transform: rotate(-90deg) scale(0.5); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }
  </style>
  <g class="ps">
    <line x1="12" y1="5" x2="12" y2="19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Trash ── */
  {
    id: 'trash', name: 'Trash', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .tr { animation: tremble ${dur(0.5, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes tremble { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
  </style>
  <g class="tr">
    <polyline points="3,6 5,6 21,6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 11v6M14 11v6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Copy ── */
  {
    id: 'copy', name: 'Copy', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cp1 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease forwards; }
    .cp2 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <rect class="cp1" x="9" y="9" width="13" height="13" rx="2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="cp2" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Edit / Pencil ── */
  {
    id: 'edit', name: 'Edit', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pe { animation: writeIn ${dur(0.6, speed)} ease-out forwards; opacity: 0; transform-origin: 80% 20%; }
    @keyframes writeIn { from { transform: rotate(-20deg) scale(0.7); opacity: 0; } to { transform: rotate(0deg) scale(1); opacity: 1; } }
    .peline { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <g class="pe">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Save ── */
  {
    id: 'save', name: 'Save', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sv1 { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.6, speed)} ease forwards; }
    .sv2 { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="sv1" d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="sv2" points="17,21 17,13 7,13 7,21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="sv2" points="7,3 7,8 15,8" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Arrow Up ── */
  {
    id: 'arrow-up', name: 'Arrow Up', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .aup { animation: bounceUp ${dur(0.9, speed)} ease-in-out infinite; }
    @keyframes bounceUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
  </style>
  <g class="aup">
    <line x1="12" y1="20" x2="12" y2="4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="5,11 12,4 19,11" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
</svg>`,
  },
  /* ── Arrow Left ── */
  {
    id: 'arrow-left', name: 'Arrow Left', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .alt { animation: slideLeft ${dur(0.7, speed)} ease-out forwards; opacity: 0; }
    @keyframes slideLeft { from { transform: translateX(6px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  </style>
  <g class="alt">
    <line x1="20" y1="12" x2="4" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="11,5 4,12 11,19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </g>
</svg>`,
  },
  /* ── Home ── */
  {
    id: 'home', name: 'Home', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .hm { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.7, speed)} ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <g class="hm">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 21V12h6v9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Menu / Hamburger ── */
  {
    id: 'menu', name: 'Menu', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mn1 { animation: lineIn ${dur(0.3, speed)} ease forwards; stroke-dasharray: 18; stroke-dashoffset: 18; }
    .mn2 { animation: lineIn ${dur(0.3, speed)} ease ${dur(0.15, speed)} forwards; stroke-dasharray: 18; stroke-dashoffset: 18; }
    .mn3 { animation: lineIn ${dur(0.3, speed)} ease ${dur(0.3, speed)} forwards; stroke-dasharray: 18; stroke-dashoffset: 18; }
    @keyframes lineIn { to { stroke-dashoffset: 0; } }
  </style>
  <line class="mn1" x1="3" y1="6" x2="21" y2="6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mn2" x1="3" y1="12" x2="21" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mn3" x1="3" y1="18" x2="21" y2="18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Bookmark ── */
  {
    id: 'bookmark', name: 'Bookmark', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .bm { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.6, speed)} ease forwards; }
    .bmf { opacity: 0; animation: fadeIn ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
  <path class="bm" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="bmf" d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" fill="${color}22" stroke="none"/>
</svg>`,
  },
  /* ── Sun ── */
  {
    id: 'sun', name: 'Sun', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sunr { animation: spinSlow ${dur(8, speed)} linear infinite; transform-origin: 50% 50%; }
    .sunc { animation: pulse ${dur(2, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  </style>
  <g class="sunr">
    <line x1="12" y1="1" x2="12" y2="3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="12" y1="21" x2="12" y2="23" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="1" y1="12" x2="3" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="21" y1="12" x2="23" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
  <circle class="sunc" cx="12" cy="12" r="5" stroke="${color}" stroke-width="${stroke}" fill="${color}22"/>
</svg>`,
  },
  /* ── Moon ── */
  {
    id: 'moon', name: 'Moon', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mo { animation: moonRise ${dur(0.8, speed)} ease-out forwards; opacity: 0; transform-origin: 50% 50%; }
    @keyframes moonRise { from { transform: translateY(6px) rotate(-15deg); opacity: 0; } to { transform: translateY(0) rotate(0deg); opacity: 1; } }
  </style>
  <path class="mo" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
</svg>`,
  },
  /* ── Terminal ── */
  {
    id: 'terminal', name: 'Terminal', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .tm { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .tc { animation: blink ${dur(0.9, speed)} step-end infinite; }
    .tp { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
  </style>
  <rect class="tm" x="2" y="3" width="20" height="18" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <polyline class="tp" points="8,10 12,14 8,18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line class="tc" x1="14" y1="18" x2="18" y2="18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Database ── */
  {
    id: 'database', name: 'Database', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .db1 { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.4, speed)} ease forwards; }
    .db2 { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.4, speed)} ease ${dur(0.25, speed)} forwards; }
    .db3 { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.4, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <ellipse class="db1" cx="12" cy="5" rx="9" ry="3" stroke="${color}" stroke-width="${stroke}"/>
  <path class="db2" d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="db3" d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Bug ── */
  {
    id: 'bug', name: 'Bug', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .bg { animation: bugWiggle ${dur(0.6, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes bugWiggle { 0%,100% { transform: rotate(0deg) translateY(0); } 25% { transform: rotate(-4deg) translateY(-1px); } 75% { transform: rotate(4deg) translateY(1px); } }
  </style>
  <g class="bg">
    <path d="M8 2l1.88 1.88M16 2l-1.88 1.88" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M9 8.5h6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M3 10h2.5M18.5 10H21M3 16h2.5M18.5 16H21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M12 17v4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Pause ── */
  {
    id: 'pause', name: 'Pause', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pa { animation: pausePop ${dur(0.5, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes pausePop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
  </style>
  <g class="pa">
    <rect x="6" y="4" width="4" height="16" rx="1" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <rect x="14" y="4" width="4" height="16" rx="1" fill="${color}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Volume ── */
  {
    id: 'volume', name: 'Volume', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .vo1 { opacity: 0; animation: waveIn ${dur(0.4, speed)} ease ${dur(0.2, speed)} forwards; }
    .vo2 { opacity: 0; animation: waveIn ${dur(0.4, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes waveIn { to { opacity: 1; } }
  </style>
  <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" fill="${color}33" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="vo1" d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="vo2" d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Camera ── */
  {
    id: 'camera', name: 'Camera', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cam { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .cf { animation: flash ${dur(1.5, speed)} ease-in-out infinite; transform-origin: 50% 55%; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes flash { 0%,80%,100% { opacity: 1; transform: scale(1); } 90% { opacity: 0.3; transform: scale(0.92); } }
  </style>
  <path class="cam" d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <circle class="cf" cx="12" cy="13" r="4" stroke="${color}" stroke-width="${stroke}" fill="${color}22"/>
</svg>`,
  },
  /* ── Share ── */
  {
    id: 'share', name: 'Share', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .srn { stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw ${dur(0.5, speed)} ease forwards; }
    .src { opacity: 0; animation: popIn ${dur(0.3, speed)} ease forwards; }
    .src2 { opacity: 0; animation: popIn ${dur(0.3, speed)} ease ${dur(0.2, speed)} forwards; }
    .src3 { opacity: 0; animation: popIn ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes popIn { to { opacity: 1; } }
  </style>
  <circle class="src" cx="18" cy="5" r="3" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="src2" cx="6" cy="12" r="3" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="src3" cx="18" cy="19" r="3" stroke="${color}" stroke-width="${stroke}"/>
  <line class="srn" x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="srn" x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Map Pin / Location ── */
  {
    id: 'map-pin', name: 'Map Pin', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mp { animation: pinDrop ${dur(0.6, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 0%; opacity: 0; }
    @keyframes pinDrop { 0% { transform: translateY(-10px) scaleY(0.7); opacity: 0; } 60% { transform: translateY(3px) scaleY(1.05); opacity: 1; } 80% { transform: translateY(-2px) scaleY(0.97); } 100% { transform: translateY(0) scaleY(1); opacity: 1; } }
  </style>
  <g class="mp">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <circle cx="12" cy="10" r="3" stroke="${color}" stroke-width="${stroke}" fill="${color}44"/>
  </g>
</svg>`,
  },
  /* ── Link / Chain ── */
  {
    id: 'link', name: 'Link', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .lnk { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.6, speed)} ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="lnk" d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="lnk" d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Expand / Fullscreen ── */
  {
    id: 'expand', name: 'Expand', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ex { animation: expandPop ${dur(0.5, speed)} ease-out forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes expandPop { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  </style>
  <g class="ex">
    <polyline points="15,3 21,3 21,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="9,21 3,21 3,15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="21" y1="3" x2="14" y2="10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="3" y1="21" x2="10" y2="14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Filter ── */
  {
    id: 'filter', name: 'Filter', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .fi1 { stroke-dasharray: 22; stroke-dashoffset: 22; animation: draw ${dur(0.3, speed)} ease forwards; }
    .fi2 { stroke-dasharray: 16; stroke-dashoffset: 16; animation: draw ${dur(0.3, speed)} ease ${dur(0.2, speed)} forwards; }
    .fi3 { stroke-dasharray: 10; stroke-dashoffset: 10; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <line class="fi1" x1="4" y1="6" x2="20" y2="6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="fi2" x1="7" y1="12" x2="17" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="fi3" x1="10" y1="18" x2="14" y2="18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Notification / Inbox ── */
  {
    id: 'inbox', name: 'Inbox', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ib { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .ibarr { animation: slideDown ${dur(0.5, speed)} ease ${dur(0.4, speed)} both; opacity: 0; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes slideDown { from { transform: translateY(-4px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  </style>
  <path class="ib" d="M22 12H16l-2 3H10L8 12H2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="ib" d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Mail ── */
  {
    id: 'mail', name: 'Mail', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mx { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .mv { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <rect class="mx" x="2" y="4" width="20" height="16" rx="2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <polyline class="mv" points="2,4 12,13 22,4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Clock ── */
  {
    id: 'clock', name: 'Clock', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ck1 { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .ck2 { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    .ck3 { stroke-dasharray: 10; stroke-dashoffset: 10; animation: draw ${dur(0.2, speed)} ease ${dur(0.6, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="ck1" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}"/>
  <polyline class="ck2" points="12,6 12,12 16,14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Chat / Comment ── */
  {
    id: 'chat', name: 'Chat', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ct { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .ctd { opacity: 0; animation: popIn ${dur(0.2, speed)} ease ${dur(0.4, speed)} forwards; }
    .ctd2 { opacity: 0; animation: popIn ${dur(0.2, speed)} ease ${dur(0.55, speed)} forwards; }
    .ctd3 { opacity: 0; animation: popIn ${dur(0.2, speed)} ease ${dur(0.7, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes popIn { to { opacity: 1; } }
  </style>
  <path class="ct" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}11"/>
  <circle class="ctd" cx="8" cy="10" r="1" fill="${color}"/>
  <circle class="ctd2" cx="12" cy="10" r="1" fill="${color}"/>
  <circle class="ctd3" cx="16" cy="10" r="1" fill="${color}"/>
</svg>`,
  },
  /* ── Flag ── */
  {
    id: 'flag', name: 'Flag', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .fl { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.5, speed)} ease forwards; }
    .flw { animation: wave ${dur(1.5, speed)} ease-in-out infinite; transform-origin: 6px 3px; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes wave { 0%,100% { transform: skewX(0deg); } 40% { transform: skewX(-6deg); } 70% { transform: skewX(4deg); } }
  </style>
  <line class="fl" x1="6" y1="2" x2="6" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="flw" d="M6 3h12l-3 5 3 5H6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
</svg>`,
  },
  /* ── Scissors ── */
  {
    id: 'scissors', name: 'Scissors', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sc1 { animation: snip ${dur(0.6, speed)} ease-out forwards; transform-origin: 8px 8px; opacity: 0; }
    .sc2 { animation: snip2 ${dur(0.6, speed)} ease-out forwards; transform-origin: 8px 16px; opacity: 0; }
    .scl { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.4, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes snip { from { transform: rotate(-20deg); opacity: 0; } to { transform: rotate(0deg); opacity: 1; } }
    @keyframes snip2 { from { transform: rotate(20deg); opacity: 0; } to { transform: rotate(0deg); opacity: 1; } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="sc1" cx="6" cy="6" r="3" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="sc2" cx="6" cy="18" r="3" stroke="${color}" stroke-width="${stroke}"/>
  <line class="scl" x1="20" y1="4" x2="8.12" y2="15.88" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="scl" x1="14.47" y1="14.48" x2="20" y2="20" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="scl" x1="8.12" y1="8.12" x2="12" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── External Link ── */
  {
    id: 'external-link', name: 'External Link', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .el1 { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.5, speed)} ease forwards; }
    .el2 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.3, speed)} forwards; }
    .el3 { stroke-dasharray: 15; stroke-dashoffset: 15; animation: draw ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="el1" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="el2" points="15,3 21,3 21,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="el3" x1="10" y1="14" x2="21" y2="3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Grid / Apps ── */
  {
    id: 'grid', name: 'Grid', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .gr1 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease forwards; }
    .gr2 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.1, speed)} forwards; }
    .gr3 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.2, speed)} forwards; }
    .gr4 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.3, speed)} forwards; }
    .gr5 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.4, speed)} forwards; }
    .gr6 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.5, speed)} forwards; }
    .gr7 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.6, speed)} forwards; }
    .gr8 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.7, speed)} forwards; }
    .gr9 { opacity: 0; animation: cellIn ${dur(0.2, speed)} ease ${dur(0.8, speed)} forwards; }
    @keyframes cellIn { to { opacity: 1; } }
  </style>
  <rect class="gr1" x="3" y="3" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr2" x="9.5" y="3" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr3" x="16" y="3" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr4" x="3" y="9.5" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr5" x="9.5" y="9.5" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr6" x="16" y="9.5" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr7" x="3" y="16" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr8" x="9.5" y="16" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="gr9" x="16" y="16" width="5" height="5" rx="1" stroke="${color}" stroke-width="${stroke}"/>
</svg>`,
  },
  /* ── Git Branch ── */
  {
    id: 'git-branch', name: 'Git Branch', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .gb1 { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease forwards; }
    .gb2 { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.3, speed)} ease ${dur(0.3, speed)} forwards; }
    .gbc { opacity: 0; animation: popIn ${dur(0.25, speed)} ease forwards; }
    .gbc2 { opacity: 0; animation: popIn ${dur(0.25, speed)} ease ${dur(0.25, speed)} forwards; }
    .gbc3 { opacity: 0; animation: popIn ${dur(0.25, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes popIn { to { opacity: 1; } }
  </style>
  <circle class="gbc" cx="6" cy="6" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="gbc2" cx="18" cy="6" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="gbc3" cx="6" cy="18" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <path class="gb1" d="M6 8.5V15.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="gb2" d="M15.5 6C12 6 8.5 8.5 8.5 12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Cloud Upload ── */
  {
    id: 'cloud-upload', name: 'Cloud Upload', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cu { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .cua { animation: uploadBounce ${dur(0.9, speed)} ease-in-out ${dur(0.4, speed)} infinite; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes uploadBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  </style>
  <path class="cu" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="cua">
    <polyline points="16,16 12,12 8,16" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="12" y1="12" x2="12" y2="21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Server ── */
  {
    id: 'server', name: 'Server', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sv1 { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.4, speed)} ease forwards; }
    .sv2 { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.4, speed)} ease ${dur(0.3, speed)} forwards; }
    .svd { animation: blink ${dur(1.5, speed)} step-end infinite; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes blink { 0%,100% { opacity: 1; fill: ${color}; } 50% { opacity: 0.2; fill: transparent; } }
  </style>
  <rect class="sv1" x="2" y="2" width="20" height="8" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="sv2" x="2" y="14" width="20" height="8" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="svd" cx="18.5" cy="6" r="1.5" stroke="none"/>
  <circle class="svd" cx="18.5" cy="18" r="1.5" stroke="none"/>
</svg>`,
  },
  /* ── Package ── */
  {
    id: 'package', name: 'Package', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pk { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw ${dur(0.7, speed)} ease forwards; }
    .pkl { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="pk" d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="pk" points="3.27,6.96 12,12.01 20.73,6.96" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="pkl" x1="12" y1="22.08" x2="12" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Mic ── */
  {
    id: 'mic', name: 'Mic', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mc { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease forwards; }
    .mcp { animation: pulse ${dur(1.2, speed)} ease-in-out infinite; transform-origin: 50% 35%; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
  </style>
  <g class="mcp">
    <rect class="mc" x="9" y="2" width="6" height="11" rx="3" stroke="${color}" stroke-width="${stroke}"/>
  </g>
  <path class="mc" d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mc" x1="12" y1="19" x2="12" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mc" x1="8" y1="22" x2="16" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Headphones ── */
  {
    id: 'headphones', name: 'Headphones', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .hp { stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw ${dur(0.7, speed)} ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="hp" d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="hp" d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="hp" d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Shuffle ── */
  {
    id: 'shuffle', name: 'Shuffle', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sh { animation: shuffleIn ${dur(0.6, speed)} ease-out forwards; opacity: 0; }
    @keyframes shuffleIn { from { transform: scale(0.8) rotate(-10deg); opacity: 0; } to { transform: scale(1) rotate(0); opacity: 1; } }
  </style>
  <g class="sh">
    <polyline points="16,3 21,3 21,8" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="4" y1="20" x2="21" y2="3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="21,16 21,21 16,21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="15" y1="15" x2="21" y2="21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="4" y1="4" x2="9" y2="9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Repeat ── */
  {
    id: 'repeat', name: 'Repeat', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rp { animation: spin ${dur(1.5, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  </style>
  <g class="rp">
    <polyline points="17,1 21,5 17,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="7,23 3,19 7,15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Toggle / Switch ── */
  {
    id: 'toggle', name: 'Toggle On', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .tg { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.4, speed)} ease forwards; }
    .tgc { animation: slideOn ${dur(0.5, speed)} cubic-bezier(0.34,1.56,0.64,1) ${dur(0.2, speed)} both; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes slideOn { from { transform: translateX(-10px); } to { transform: translateX(0); } }
  </style>
  <rect class="tg" x="1" y="7" width="22" height="10" rx="5" stroke="${color}" stroke-width="${stroke}" fill="${color}22"/>
  <circle class="tgc" cx="16" cy="12" r="4" fill="${color}" stroke="${color}" stroke-width="0.5"/>
</svg>`,
  },
  /* ── Award / Badge ── */
  {
    id: 'award', name: 'Award', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .aw { animation: awardPop ${dur(0.6, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 40%; opacity: 0; }
    .awl { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes awardPop { 0% { transform: scale(0.3) rotate(-10deg); opacity: 0; } 70% { transform: scale(1.1) rotate(2deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <g class="aw">
    <circle cx="12" cy="9" r="7" stroke="${color}" stroke-width="${stroke}" fill="${color}22"/>
    <path d="M9 12l2 2 4-4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <path class="awl" d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Palette ── */
  {
    id: 'palette', name: 'Palette', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pal { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.6, speed)} ease forwards; }
    .pd1 { opacity: 0; animation: dotPop ${dur(0.2, speed)} ease ${dur(0.5, speed)} forwards; }
    .pd2 { opacity: 0; animation: dotPop ${dur(0.2, speed)} ease ${dur(0.65, speed)} forwards; }
    .pd3 { opacity: 0; animation: dotPop ${dur(0.2, speed)} ease ${dur(0.8, speed)} forwards; }
    .pd4 { opacity: 0; animation: dotPop ${dur(0.2, speed)} ease ${dur(0.95, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes dotPop { to { opacity: 1; } }
  </style>
  <path class="pal" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01a1.49 1.49 0 0 1 1.11-2.49H16c3.31 0 6-2.69 6-6 0-4.96-4.48-9-10-9Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <circle class="pd1" cx="6.5" cy="11.5" r="1.5" fill="${color}"/>
  <circle class="pd2" cx="9.5" cy="7.5" r="1.5" fill="${color}"/>
  <circle class="pd3" cx="14.5" cy="7.5" r="1.5" fill="${color}"/>
  <circle class="pd4" cx="17.5" cy="11.5" r="1.5" fill="${color}"/>
</svg>`,
  },
  /* ── Map / Directions ── */
  {
    id: 'map', name: 'Map', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mp1 { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.6, speed)} ease forwards; }
    .mp2 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    .mp3 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.6, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polygon class="mp1" points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="mp2" x1="8" y1="2" x2="8" y2="18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mp3" x1="16" y1="6" x2="16" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Unlock ── */
  {
    id: 'unlock', name: 'Unlock', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ul1 { stroke-dasharray: 35; stroke-dashoffset: 35; animation: draw ${dur(0.4, speed)} ease forwards; }
    .ul2 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease ${dur(0.25, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="ul1" d="M7 11V7a5 5 0 0 1 9.9-1" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <rect class="ul2" x="3" y="11" width="18" height="11" rx="2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <circle cx="12" cy="16" r="1" fill="${color}"/>
</svg>`,
  },
  /* ── Layers ── */
  {
    id: 'layers', name: 'Layers', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ly1 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.4, speed)} ease forwards; }
    .ly2 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.4, speed)} ease ${dur(0.25, speed)} forwards; }
    .ly3 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.4, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polygon class="ly1" points="12,2 2,7 12,12 22,7" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="ly2" points="2,12 12,17 22,12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="ly3" points="2,17 12,22 22,17" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Tag ── */
  {
    id: 'tag', name: 'Tag', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .tg1 { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.6, speed)} ease forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="tg1" d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}11"/>
  <circle cx="7" cy="7" r="1.5" fill="${color}" stroke="none"/>
</svg>`,
  },
  /* ── User ── */
  {
    id: 'user', name: 'User', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .us1 { stroke-dasharray: 44; stroke-dashoffset: 44; animation: draw ${dur(0.4, speed)} ease forwards; }
    .us2 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="us1" cx="12" cy="8" r="4" stroke="${color}" stroke-width="${stroke}"/>
  <path class="us2" d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },

  /* ── Undo ── */
  {
    id: 'undo', name: 'Undo', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .und { stroke-dasharray: 42; stroke-dashoffset: 42; animation: draw ${dur(0.5, speed)} cubic-bezier(0.4,0,0.2,1) forwards; }
    .undarr { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.25, speed)} ease ${dur(0.35, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="und" d="M21 17a9 9 0 0 0-9-9H4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="undarr" points="9,3 3,8 9,13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Redo ── */
  {
    id: 'redo', name: 'Redo', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rdo { stroke-dasharray: 42; stroke-dashoffset: 42; animation: draw ${dur(0.5, speed)} cubic-bezier(0.4,0,0.2,1) forwards; }
    .rdoarr { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.25, speed)} ease ${dur(0.35, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="rdo" d="M3 17a9 9 0 0 1 9-9h8" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="rdoarr" points="15,3 21,8 15,13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Crop ── */
  {
    id: 'crop', name: 'Crop', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .crp1 { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease forwards; }
    .crp2 { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polyline class="crp1" points="6,2 6,18 22,18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="crp2" points="2,6 18,6 18,22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Drag Handle ── */
  {
    id: 'drag-handle', name: 'Drag Handle', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .dh1 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.0, speed)} forwards; }
    .dh2 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.1, speed)} forwards; }
    .dh3 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.2, speed)} forwards; }
    .dh4 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.3, speed)} forwards; }
    .dh5 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.4, speed)} forwards; }
    .dh6 { opacity: 0; animation: dotFade ${dur(0.2, speed)} ease ${dur(0.5, speed)} forwards; }
    .dhg { animation: nudge ${dur(1.2, speed)} ease-in-out ${dur(0.8, speed)} infinite; }
    @keyframes dotFade { to { opacity: 1; } }
    @keyframes nudge { 0%,100% { transform: translateX(0); } 30% { transform: translateX(3px); } 60% { transform: translateX(-3px); } }
  </style>
  <g class="dhg">
    <circle class="dh1" cx="9" cy="7"  r="1.5" fill="${color}"/>
    <circle class="dh2" cx="15" cy="7"  r="1.5" fill="${color}"/>
    <circle class="dh3" cx="9" cy="12" r="1.5" fill="${color}"/>
    <circle class="dh4" cx="15" cy="12" r="1.5" fill="${color}"/>
    <circle class="dh5" cx="9" cy="17" r="1.5" fill="${color}"/>
    <circle class="dh6" cx="15" cy="17" r="1.5" fill="${color}"/>
  </g>
</svg>`,
  },
  /* ── Dots Spinner (typing / loading) ── */
  {
    id: 'dots-spinner', name: 'Dots Spinner', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .dot1 { animation: dotBounce ${dur(0.9, speed)} ease-in-out infinite; }
    .dot2 { animation: dotBounce ${dur(0.9, speed)} ease-in-out ${dur(0.18, speed)} infinite; }
    .dot3 { animation: dotBounce ${dur(0.9, speed)} ease-in-out ${dur(0.36, speed)} infinite; }
    @keyframes dotBounce { 0%,80%,100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-6px); opacity: 1; } }
  </style>
  <circle class="dot1" cx="6"  cy="13" r="2.5" fill="${color}"/>
  <circle class="dot2" cx="12" cy="13" r="2.5" fill="${color}"/>
  <circle class="dot3" cx="18" cy="13" r="2.5" fill="${color}"/>
</svg>`,
  },
  /* ── Progress Bar ── */
  {
    id: 'progress-bar', name: 'Progress Bar', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pgb { stroke-dasharray: 16; stroke-dashoffset: 16; animation: draw ${dur(0.4, speed)} ease forwards; }
    .pgf { animation: fillBar ${dur(1.2, speed)} cubic-bezier(0.4,0,0.2,1) ${dur(0.3, speed)} forwards; transform-origin: left center; transform: scaleX(0); }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fillBar { to { transform: scaleX(1); } }
  </style>
  <rect class="pgb" x="2" y="10" width="20" height="4" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <rect class="pgf" x="2" y="10" width="14" height="4" rx="2" fill="${color}"/>
</svg>`,
  },
  /* ── Verified Badge ── */
  {
    id: 'verified', name: 'Verified', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .vb { animation: badgePop ${dur(0.5, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 50%; opacity: 0; }
    .vchk { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.35, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes badgePop { 0% { transform: scale(0.4) rotate(-15deg); opacity: 0; } 65% { transform: scale(1.15) rotate(3deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="vb" d="M12 2l2.4 3.2 3.9-.9-.9 3.9L20.6 12l-3.2 2.4.9 3.9-3.9-.9L12 22l-2.4-3.2-3.9.9.9-3.9L3.4 12l3.2-2.4-.9-3.9 3.9.9Z" fill="${color}22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="vchk" points="8.5,12.5 11,15 15.5,10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Users / Team ── */
  {
    id: 'users', name: 'Users', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .uu1 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease forwards; }
    .uu2 { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease ${dur(0.3, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="uu1" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <circle class="uu1" cx="9" cy="7" r="4" stroke="${color}" stroke-width="${stroke}"/>
  <path class="uu2" d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="uu2" d="M16 3.13a4 4 0 0 1 0 7.75" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Rocket / Deploy ── */
  {
    id: 'rocket', name: 'Rocket', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rkt { animation: launch ${dur(0.8, speed)} cubic-bezier(0.22,1,0.36,1) forwards; transform-origin: 50% 60%; opacity: 0; }
    .rktf { animation: flicker ${dur(0.3, speed)} ease-in-out ${dur(0.5, speed)} infinite; opacity: 0; }
    @keyframes launch { from { transform: translateY(10px) scale(0.8); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
    @keyframes flicker { 0%,100% { opacity: 0.9; transform: scaleY(1); } 50% { opacity: 0.5; transform: scaleY(0.7); } }
  </style>
  <g class="rkt">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <circle class="rkt" cx="16" cy="8" r="1.5" fill="${color}" stroke="none"/>
  <path class="rktf" d="M6.5 18.5c-.5.8-1 2.5-1 2.5s1.7-.5 2.5-1" stroke="${color}" stroke-width="${stroke + 0.5}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Pull Request ── */
  {
    id: 'pull-request', name: 'Pull Request', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .prc { opacity: 0; animation: prPop ${dur(0.25, speed)} ease forwards; }
    .prc2 { opacity: 0; animation: prPop ${dur(0.25, speed)} ease ${dur(0.2, speed)} forwards; }
    .prc3 { opacity: 0; animation: prPop ${dur(0.25, speed)} ease ${dur(0.45, speed)} forwards; }
    .prl { stroke-dasharray: 25; stroke-dashoffset: 25; animation: draw ${dur(0.35, speed)} ease ${dur(0.3, speed)} forwards; }
    .pra { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.25, speed)} ease ${dur(0.55, speed)} forwards; }
    @keyframes prPop { to { opacity: 1; } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="prc" cx="6" cy="6" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="prc2" cx="18" cy="6" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="prc3" cx="6" cy="18" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <path class="prl" d="M6 8.5v7" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="prl" d="M15.5 6C13 6 9 7.5 9 12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <polyline class="pra" points="12,9 9,12 12,15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── API / Brackets ── */
  {
    id: 'api', name: 'API', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .apil { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease forwards; }
    .apir { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.2, speed)} forwards; }
    .apit { opacity: 0; animation: fadeIn ${dur(0.3, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
  <polyline class="apil" points="7,4 3,12 7,20" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline class="apir" points="17,4 21,12 17,20" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="apit" x1="11" y1="8" x2="13" y2="16" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.7"/>
</svg>`,
  },
  /* ── Record ── */
  {
    id: 'record', name: 'Record', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rco { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.4, speed)} ease forwards; }
    .rci { animation: recPulse ${dur(1.0, speed)} ease-in-out infinite; transform-origin: 50% 50%; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes recPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.7); opacity: 0.5; } }
  </style>
  <circle class="rco" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}" opacity="0.4"/>
  <circle class="rci" cx="12" cy="12" r="5" fill="${color}"/>
</svg>`,
  },
  /* ── Video ── */
  {
    id: 'video', name: 'Video', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .vid { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .vidt { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.35, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <rect class="vid" x="2" y="6" width="14" height="12" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <polyline class="vidt" points="16,10 22,7 22,17 16,14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Image / Photo ── */
  {
    id: 'image', name: 'Image', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .img { stroke-dasharray: 90; stroke-dashoffset: 90; animation: draw ${dur(0.5, speed)} ease forwards; }
    .imgsun { opacity: 0; animation: popIn ${dur(0.2, speed)} ease ${dur(0.4, speed)} forwards; }
    .imgmtn { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes popIn { to { opacity: 1; } }
  </style>
  <rect class="img" x="3" y="3" width="18" height="18" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="imgsun" cx="8.5" cy="8.5" r="1.5" fill="${color}"/>
  <polyline class="imgmtn" points="21,15 16,10 11,15 8,12 3,17" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Skip Forward ── */
  {
    id: 'skip-forward', name: 'Skip Forward', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .skf { animation: skipIn ${dur(0.5, speed)} ease-out forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes skipIn { from { transform: translateX(-6px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  </style>
  <g class="skf">
    <polygon points="5,4 15,12 5,20" fill="${color}33" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="19" y1="5" x2="19" y2="19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Error / Circle X ── */
  {
    id: 'error', name: 'Error', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .err { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .errx { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.3, speed)} ease ${dur(0.35, speed)} forwards; }
    .errg { animation: errShake ${dur(0.5, speed)} ease ${dur(0.7, speed)} both; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes errShake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-4px); } 40% { transform: translateX(4px); } 60% { transform: translateX(-3px); } 80% { transform: translateX(2px); } }
  </style>
  <g class="errg">
    <circle class="err" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}"/>
    <line class="errx" x1="15" y1="9" x2="9" y2="15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line class="errx" x1="9" y1="9" x2="15" y2="15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Info ── */
  {
    id: 'info', name: 'Info', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .inf { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .infi { opacity: 0; animation: fadeIn ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
  <circle class="inf" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}"/>
  <g class="infi">
    <line x1="12" y1="16" x2="12" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <circle cx="12" cy="8.5" r="0.8" fill="${color}"/>
  </g>
</svg>`,
  },
  /* ── Compass ── */
  {
    id: 'compass', name: 'Compass', category: 'Navigation',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cmp { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .cmpn { animation: needleSpin ${dur(2, speed)} cubic-bezier(0.4,0,0.2,1) ${dur(0.4, speed)} forwards; transform-origin: 12px 12px; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes needleSpin { from { transform: rotate(-120deg); } to { transform: rotate(0deg); } }
  </style>
  <circle class="cmp" cx="12" cy="12" r="10" stroke="${color}" stroke-width="${stroke}"/>
  <g class="cmpn">
    <polygon points="12,6 10,12 12,14 14,12" fill="${color}" stroke="${color}" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <polygon points="12,18 14,12 12,14 10,12" fill="${color}" stroke="${color}" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>
  </g>
  <circle cx="12" cy="12" r="1.2" fill="${color}" opacity="0.8"/>
</svg>`,
  },
  /* ── Sort ── */
  {
    id: 'sort', name: 'Sort', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .srt1 { stroke-dasharray: 10; stroke-dashoffset: 10; animation: draw ${dur(0.25, speed)} ease forwards; }
    .srt2 { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.3, speed)} ease ${dur(0.2, speed)} forwards; }
    .srt3 { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.35, speed)} ease ${dur(0.4, speed)} forwards; }
    .srta { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.25, speed)} ease ${dur(0.6, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <line class="srt1" x1="4" y1="6" x2="11" y2="6" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="srt2" x1="4" y1="12" x2="15" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="srt3" x1="4" y1="18" x2="20" y2="18" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <polyline class="srta" points="17,3 20,6 17,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  /* ── Resize ── */
  {
    id: 'resize', name: 'Resize', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .rsz { animation: resizePulse ${dur(0.7, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes resizePulse { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  </style>
  <g class="rsz">
    <polyline points="15,3 21,3 21,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="9,21 3,21 3,15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="21" y1="3" x2="14" y2="10" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <line x1="3" y1="21" x2="10" y2="14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <polyline points="3,9 3,3 9,3" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="21,15 21,21 15,21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },

  /* ── Spinner Ring ── */
  {
    id: 'spinner-ring', name: 'Spinner Ring', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .srng { animation: ringSpinCC ${dur(0.8, speed)} linear infinite; transform-origin: 50% 50%; }
    @keyframes ringSpinCC { to { transform: rotate(360deg); } }
  </style>
  <circle cx="12" cy="12" r="9" stroke="${color}" stroke-width="${stroke}" opacity="0.15"/>
  <path class="srng" d="M12 3a9 9 0 0 1 9 9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Skeleton Loader ── */
  {
    id: 'skeleton', name: 'Skeleton', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <style>
    .skl { animation: shimmer ${dur(1.4, speed)} ease-in-out infinite; }
    @keyframes shimmer {
      0%   { opacity: 0.15; }
      50%  { opacity: 0.55; }
      100% { opacity: 0.15; }
    }
  </style>
  <rect class="skl" x="3" y="4"  width="18" height="3" rx="1.5" fill="${color}"/>
  <rect class="skl" x="3" y="10" width="14" height="3" rx="1.5" fill="${color}" style="animation-delay:${dur(0.15, speed)}"/>
  <rect class="skl" x="3" y="16" width="10" height="3" rx="1.5" fill="${color}" style="animation-delay:${dur(0.3, speed)}"/>
</svg>`,
  },
  /* ── Battery ── */
  {
    id: 'battery', name: 'Battery', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .batb { stroke-dasharray: 50; stroke-dashoffset: 50; animation: draw ${dur(0.4, speed)} ease forwards; }
    .batf1 { transform: scaleX(0); transform-origin: left; animation: fillC ${dur(0.3, speed)} ease ${dur(0.35, speed)} forwards; }
    .batf2 { transform: scaleX(0); transform-origin: left; animation: fillC ${dur(0.3, speed)} ease ${dur(0.55, speed)} forwards; }
    .batf3 { transform: scaleX(0); transform-origin: left; animation: fillC ${dur(0.3, speed)} ease ${dur(0.75, speed)} forwards; }
    @keyframes draw  { to { stroke-dashoffset: 0; } }
    @keyframes fillC { to { transform: scaleX(1); } }
  </style>
  <rect class="batb" x="1" y="7" width="18" height="10" rx="2" stroke="${color}" stroke-width="${stroke}"/>
  <path d="M23 11v2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <rect class="batf1" x="3"  y="9.5" width="4" height="5" rx="1" fill="${color}"/>
  <rect class="batf2" x="8"  y="9.5" width="4" height="5" rx="1" fill="${color}"/>
  <rect class="batf3" x="13" y="9.5" width="4" height="5" rx="1" fill="${color}"/>
</svg>`,
  },
  /* ── Signal Bars ── */
  {
    id: 'signal', name: 'Signal', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sig1 { transform: scaleY(0); transform-origin: bottom; animation: barUp ${dur(0.25, speed)} ease ${dur(0.0, speed)} forwards; }
    .sig2 { transform: scaleY(0); transform-origin: bottom; animation: barUp ${dur(0.25, speed)} ease ${dur(0.15, speed)} forwards; }
    .sig3 { transform: scaleY(0); transform-origin: bottom; animation: barUp ${dur(0.25, speed)} ease ${dur(0.3, speed)} forwards; }
    .sig4 { transform: scaleY(0); transform-origin: bottom; animation: barUp ${dur(0.25, speed)} ease ${dur(0.45, speed)} forwards; }
    @keyframes barUp { to { transform: scaleY(1); } }
  </style>
  <rect class="sig1" x="2"  y="18" width="4" height="4"  rx="1" fill="${color}"/>
  <rect class="sig2" x="7"  y="14" width="4" height="8"  rx="1" fill="${color}"/>
  <rect class="sig3" x="12" y="10" width="4" height="12" rx="1" fill="${color}"/>
  <rect class="sig4" x="17" y="5"  width="4" height="17" rx="1" fill="${color}"/>
</svg>`,
  },
  /* ── Notification Dot ── */
  {
    id: 'notif-dot', name: 'Notif Dot', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ndot { animation: dotPop ${dur(0.4, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 50% 50%; opacity: 0; }
    .nring { animation: ripple ${dur(1.2, speed)} ease-out ${dur(0.3, speed)} infinite; transform-origin: 50% 50%; }
    @keyframes dotPop { to { opacity: 1; transform: scale(1); } from { opacity: 0; transform: scale(0.2); } }
    @keyframes ripple { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(2.2); opacity: 0; } }
  </style>
  <circle class="nring" cx="12" cy="12" r="5" stroke="${color}" stroke-width="${stroke}" fill="none"/>
  <circle class="ndot"  cx="12" cy="12" r="4" fill="${color}"/>
</svg>`,
  },
  /* ── Pin / Thumbtack ── */
  {
    id: 'pin', name: 'Pin', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pn { animation: pinSwing ${dur(0.6, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 12px 3px; opacity: 0; }
    @keyframes pinSwing { 0% { transform: rotate(-60deg); opacity: 0; } 60% { transform: rotate(8deg); opacity: 1; } 80% { transform: rotate(-4deg); } 100% { transform: rotate(0deg); opacity: 1; } }
  </style>
  <g class="pn">
    <path d="M12 2a4 4 0 0 1 4 4c0 3-2 5-4 7-2-2-4-4-4-7a4 4 0 0 1 4-4Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <circle cx="12" cy="6" r="1.5" fill="${color}"/>
    <line x1="12" y1="13" x2="12" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="2 2"/>
  </g>
</svg>`,
  },
  /* ── Move / Pan ── */
  {
    id: 'move', name: 'Move', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mv { animation: moveGrow ${dur(0.5, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 50% 50%; opacity: 0; }
    .mvan { animation: nudge4 ${dur(1.4, speed)} ease-in-out ${dur(0.5, speed)} infinite; }
    @keyframes moveGrow { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes nudge4 { 0%,100% { transform: translate(0,0); } 20% { transform: translate(2px,0); } 40% { transform: translate(0,2px); } 60% { transform: translate(-2px,0); } 80% { transform: translate(0,-2px); } }
  </style>
  <g class="mv">
    <g class="mvan">
      <polyline points="5,9 2,12 5,15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <polyline points="9,5 12,2 15,5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <polyline points="15,19 12,22 9,19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <polyline points="19,15 22,12 19,9" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.3"/>
      <line x1="12" y1="2" x2="12" y2="22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.3"/>
    </g>
  </g>
</svg>`,
  },
  /* ── Checklist ── */
  {
    id: 'checklist', name: 'Checklist', category: 'Actions',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cli { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.25, speed)} ease forwards; }
    .cl2 { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.25, speed)} ease ${dur(0.35, speed)} forwards; }
    .cl3 { stroke-dasharray: 12; stroke-dashoffset: 12; animation: draw ${dur(0.25, speed)} ease ${dur(0.7, speed)} forwards; }
    .clt1 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.2, speed)} ease ${dur(0.2, speed)} forwards; }
    .clt2 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.2, speed)} ease ${dur(0.55, speed)} forwards; }
    .clt3 { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.2, speed)} ease ${dur(0.9, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polyline class="cli" points="4,6 6,8 9,5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="clt1" x1="12" y1="6.5" x2="20" y2="6.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.5"/>
  <polyline class="cl2" points="4,12 6,14 9,11" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="clt2" x1="12" y1="12.5" x2="20" y2="12.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.5"/>
  <polyline class="cl3" points="4,18 6,20 9,17" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="clt3" x1="12" y1="18.5" x2="20" y2="18.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.5"/>
</svg>`,
  },
  /* ── Eye Off / Hide ── */
  {
    id: 'eye-off', name: 'Eye Off', category: 'UI',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .eyo { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.5, speed)} ease forwards; }
    .eysl { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw ${dur(0.4, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <path class="eyo" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="eyo" d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="eyo" d="M10.73 10.73a3 3 0 0 0 3.54 3.54" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="eysl" x1="1" y1="1" x2="23" y2="23" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Thumbs Down ── */
  {
    id: 'thumbdown', name: 'Thumbs Down', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .td { animation: dropDown ${dur(0.5, speed)} cubic-bezier(0.36,0.07,0.19,0.97) forwards; transform-origin: 50% 20%; opacity: 0; }
    @keyframes dropDown { 0% { transform: scale(0.5) translateY(-8px); opacity: 0; } 70% { transform: scale(1.1) translateY(2px); opacity: 1; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
  </style>
  <g class="td">
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}22"/>
    <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`,
  },
  /* ── Wave / Greeting ── */
  {
    id: 'wave', name: 'Wave', category: 'Social',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .wv { animation: waveHand ${dur(1.1, speed)} ease-in-out infinite; transform-origin: 12px 20px; transform-box: view-box; }
    @keyframes waveHand { 0%,100% { transform: rotate(0deg); } 15% { transform: rotate(-16deg); } 30% { transform: rotate(12deg); } 45% { transform: rotate(-10deg); } 60% { transform: rotate(7deg); } 75% { transform: rotate(-4deg); } }
  </style>
  <g class="wv">
    <path d="M18 8.5c0-1.1-.9-2-2-2s-2 .9-2 2v4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M14 10.5c0-1.1-.9-2-2-2s-2 .9-2 2v2" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M10 11c0-1.1-.9-2-2-2s-2 .9-2 2v3c0 3.31 2.69 6 6 6h2c2.5 0 4-1.5 4-4v-5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M18 8.5V7c0-1.1.9-2 2-2s2 .9 2 2v4.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Stop ── */
  {
    id: 'stop', name: 'Stop', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .stp { animation: stopScale ${dur(0.4, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 50% 50%; opacity: 0; }
    @keyframes stopScale { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  </style>
  <rect class="stp" x="4" y="4" width="16" height="16" rx="2" fill="${color}" stroke="${color}" stroke-width="${stroke}"/>
</svg>`,
  },
  /* ── Mute ── */
  {
    id: 'mute', name: 'Mute', category: 'Media',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mt { stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw ${dur(0.4, speed)} ease forwards; }
    .mtx { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.35, speed)} ease ${dur(0.35, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <polygon class="mt" points="11,5 6,9 2,9 2,15 6,15 11,19" fill="${color}22" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <line class="mtx" x1="23" y1="9" x2="17" y2="15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <line class="mtx" x1="17" y1="9" x2="23" y2="15" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Git Merge ── */
  {
    id: 'git-merge', name: 'Git Merge', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .gmc { opacity: 0; animation: popIn ${dur(0.2, speed)} ease forwards; }
    .gmc2 { opacity: 0; animation: popIn ${dur(0.2, speed)} ease ${dur(0.2, speed)} forwards; }
    .gml { stroke-dasharray: 25; stroke-dashoffset: 25; animation: draw ${dur(0.35, speed)} ease ${dur(0.15, speed)} forwards; }
    .gmb { stroke-dasharray: 20; stroke-dashoffset: 20; animation: draw ${dur(0.3, speed)} ease ${dur(0.4, speed)} forwards; }
    @keyframes popIn { to { opacity: 1; } }
    @keyframes draw  { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="gmc"  cx="6"  cy="6"  r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="gmc"  cx="6"  cy="18" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <circle class="gmc2" cx="18" cy="12" r="2.5" stroke="${color}" stroke-width="${stroke}"/>
  <line   class="gml"  x1="6" y1="8.5" x2="6" y2="15.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path   class="gmb"  d="M8.5 6C12 6 15.5 8.5 15.5 12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path   class="gmb"  d="M8.5 18C12 18 15.5 15.5 15.5 12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Diff ── */
  {
    id: 'diff', name: 'Diff', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .dfp { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.3, speed)} ease forwards; }
    .dfm { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.25, speed)} ease ${dur(0.35, speed)} forwards; }
    .dft { opacity: 0; animation: fadeIn ${dur(0.2, speed)} ease forwards; }
    .dft2 { opacity: 0; animation: fadeIn ${dur(0.2, speed)} ease ${dur(0.35, speed)} forwards; }
    @keyframes draw  { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn { to { opacity: 1; } }
  </style>
  <rect class="dft"  x="2" y="4"  width="9" height="7" rx="1" fill="${color}" opacity="0.15"/>
  <rect class="dft2" x="2" y="14" width="9" height="6" rx="1" fill="${color}" opacity="0.12"/>
  <line class="dfp" x1="6.5" y1="6" x2="6.5" y2="10" stroke="${color}" stroke-width="${stroke + 0.5}" stroke-linecap="round"/>
  <line class="dfp" x1="4.5" y1="8"  x2="8.5" y2="8"  stroke="${color}" stroke-width="${stroke + 0.5}" stroke-linecap="round"/>
  <line class="dfm" x1="4.5" y1="17" x2="8.5" y2="17" stroke="${color}" stroke-width="${stroke + 0.5}" stroke-linecap="round"/>
  <line class="dfm" x1="14" y1="8"  x2="22" y2="8"  stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.4"/>
  <line class="dfm" x1="14" y1="12" x2="20" y2="12" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.4"/>
  <line class="dfm" x1="14" y1="16" x2="22" y2="16" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" opacity="0.4"/>
</svg>`,
  },
  /* ── Webhook / Broadcast ── */
  {
    id: 'webhook', name: 'Webhook', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .wh0 { opacity: 0; animation: popIn ${dur(0.2, speed)} ease forwards; }
    .wh1 { opacity: 0; animation: waveIn ${dur(0.3, speed)} ease ${dur(0.2, speed)} forwards; }
    .wh2 { opacity: 0; animation: waveIn ${dur(0.3, speed)} ease ${dur(0.45, speed)} forwards; }
    .wh3 { opacity: 0; animation: waveIn ${dur(0.3, speed)} ease ${dur(0.7, speed)} forwards; }
    @keyframes popIn  { to { opacity: 1; } }
    @keyframes waveIn { to { opacity: 1; } }
  </style>
  <circle class="wh0" cx="12" cy="12" r="2" fill="${color}"/>
  <path class="wh1" d="M8.93 6.93a6 6 0 0 0 0 10.14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="wh1" d="M15.07 6.93a6 6 0 0 1 0 10.14" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="wh2" d="M5.64 4.22a10 10 0 0 0 0 15.56" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="wh2" d="M18.36 4.22a10 10 0 0 1 0 15.56" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  /* ── Cloud Download ── */
  {
    id: 'cloud-download', name: 'Cloud Download', category: 'Dev',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cdo { stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw ${dur(0.5, speed)} ease forwards; }
    .cda { animation: dlBounce ${dur(0.9, speed)} ease-in-out ${dur(0.4, speed)} infinite; }
    @keyframes draw     { to { stroke-dashoffset: 0; } }
    @keyframes dlBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
  </style>
  <path class="cdo" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <g class="cda">
    <polyline points="8,16 12,20 16,16" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <line x1="12" y1="12" x2="12" y2="20" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  </g>
</svg>`,
  },
  /* ── Warning / Triangle ── */
  {
    id: 'warning', name: 'Warning', category: 'Notification',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .wrn { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.5, speed)} ease forwards; }
    .wrni { opacity: 0; animation: fadeIn ${dur(0.25, speed)} ease ${dur(0.4, speed)} forwards; }
    .wrnp { animation: warnPulse ${dur(1.4, speed)} ease-in-out ${dur(0.8, speed)} infinite; transform-origin: 50% 50%; }
    @keyframes draw      { to { stroke-dashoffset: 0; } }
    @keyframes fadeIn    { to { opacity: 1; } }
    @keyframes warnPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  </style>
  <g class="wrnp">
    <path class="wrn" d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}15"/>
    <g class="wrni">
      <line x1="12" y1="9" x2="12" y2="13" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
      <circle cx="12" cy="17" r="0.8" fill="${color}"/>
    </g>
  </g>
</svg>`,
  },
  /* ── Creative Icons ── */
  {
    id: 'sparkles', name: 'Sparkles', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .sp1 { animation: sparklePop ${dur(0.55, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 8px 9px; opacity: 0; }
    .sp2 { animation: sparklePop ${dur(0.55, speed)} cubic-bezier(0.34,1.56,0.64,1) ${dur(0.18, speed)} forwards; transform-origin: 17px 5px; opacity: 0; }
    .sp3 { animation: sparklePop ${dur(0.55, speed)} cubic-bezier(0.34,1.56,0.64,1) ${dur(0.34, speed)} forwards; transform-origin: 16px 17px; opacity: 0; }
    @keyframes sparklePop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 65% { transform: scale(1.15) rotate(8deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
  </style>
  <path class="sp1" d="M8 3l1.4 4.1L13 9l-3.6 1.9L8 15l-1.4-4.1L3 9l3.6-1.9L8 3Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}22"/>
  <path class="sp2" d="M17 2l.8 2.2L20 5l-2.2.8L17 8l-.8-2.2L14 5l2.2-.8L17 2Z" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linejoin="round" fill="${color}22"/>
  <path class="sp3" d="M16 13l1.1 3L20 17l-2.9 1L16 21l-1.1-3L12 17l2.9-1L16 13Z" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linejoin="round" fill="${color}22"/>
</svg>`,
  },
  {
    id: 'magic-wand', name: 'Magic Wand', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .mw { stroke-dasharray: 48; stroke-dashoffset: 48; animation: draw ${dur(0.5, speed)} ease forwards; }
    .mwh { opacity: 0; animation: wandTap ${dur(0.5, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 12px 12px; }
    .mws { opacity: 0; animation: twinkle ${dur(1.05, speed)} ease-in-out ${dur(0.3, speed)} infinite; transform-origin: 6px 5px; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes wandTap { from { transform: translate(3px,-3px) rotate(8deg); opacity: 0; } to { transform: translate(0,0) rotate(0); opacity: 1; } }
    @keyframes twinkle { 0%,100% { transform: scale(0.65); opacity: 0.35; } 50% { transform: scale(1.15) rotate(12deg); opacity: 1; } }
  </style>
  <g class="mwh">
    <path class="mw" d="M5 19 19 5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
    <path d="M16.5 3.5 20.5 7.5 18.5 9.5 14.5 5.5 16.5 3.5Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}18"/>
  </g>
  <g class="mws" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linecap="round">
    <path d="M6 2v3M6 8v2M2 6h3M8 6h3"/>
    <path d="M15 14v2M15 20v1M12 18h1.5M17 18h1.5"/>
  </g>
</svg>`,
  },
  {
    id: 'paint-brush', name: 'Paint Brush', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .brh { stroke-dasharray: 40; stroke-dashoffset: 40; animation: draw ${dur(0.45, speed)} ease forwards; }
    .brb { opacity: 0; animation: brushDip ${dur(0.5, speed)} cubic-bezier(0.34,1.56,0.64,1) ${dur(0.25, speed)} forwards; transform-origin: 8px 17px; }
    .brs { stroke-dasharray: 24; stroke-dashoffset: 24; animation: draw ${dur(0.35, speed)} ease ${dur(0.55, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes brushDip { from { transform: translateY(-3px) rotate(-8deg); opacity: 0; } to { transform: translateY(0) rotate(0); opacity: 1; } }
  </style>
  <path class="brh" d="M13.5 13.5 19 8l-3-3-5.5 5.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
  <path class="brh" d="M15.5 3.5 20.5 8.5" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
  <path class="brb" d="M10.8 11.2c1.2 1.2 1.2 3.1 0 4.3L7 19.3c-.9.9-2.1 1.3-3.3 1.1.2-1.2.6-2.4 1.5-3.3L9.5 12c.4-.4.9-.6 1.3-.8Z" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" fill="${color}20"/>
  <path class="brs" d="M4 20.5c1.7-.2 3.1-.8 4.1-1.8" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'pen-nib', name: 'Pen Nib', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .pnib { stroke-dasharray: 72; stroke-dashoffset: 72; animation: draw ${dur(0.55, speed)} ease forwards; }
    .pnd { opacity: 0; animation: dotIn ${dur(0.25, speed)} ease ${dur(0.45, speed)} forwards; transform-origin: 12px 13px; }
    .pnt { stroke-dasharray: 14; stroke-dashoffset: 14; animation: draw ${dur(0.35, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes dotIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  </style>
  <path class="pnib" d="M12 2.8 19 9.8 15 21H9L5 9.8 12 2.8Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}14"/>
  <path class="pnib" d="M12 2.8v7M5 9.8h14" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linecap="round" stroke-linejoin="round"/>
  <circle class="pnd" cx="12" cy="13.2" r="1.7" stroke="${color}" stroke-width="${stroke}" fill="${color}12"/>
  <path class="pnt" d="M12 14.9V21" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'lightbulb', name: 'Lightbulb', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .lb { stroke-dasharray: 70; stroke-dashoffset: 70; animation: draw ${dur(0.55, speed)} ease forwards; }
    .lbr { opacity: 0; animation: glow ${dur(1.2, speed)} ease-in-out ${dur(0.5, speed)} infinite; transform-origin: 12px 8px; }
    .lbb { stroke-dasharray: 18; stroke-dashoffset: 18; animation: draw ${dur(0.25, speed)} ease ${dur(0.5, speed)} forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes glow { 0%,100% { opacity: 0.2; transform: scale(0.9); } 50% { opacity: 0.65; transform: scale(1.08); } }
  </style>
  <circle class="lbr" cx="12" cy="8.5" r="6.5" fill="${color}22"/>
  <path class="lb" d="M9 15c-1.8-1.1-3-3.1-3-5.4A6 6 0 0 1 12 3.5a6 6 0 0 1 6 6.1c0 2.3-1.2 4.3-3 5.4v1.5H9V15Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}10"/>
  <path class="lbb" d="M9 19h6M10 22h4" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>
</svg>`,
  },
  {
    id: 'idea-burst', name: 'Idea Burst', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .ibc { animation: burstPop ${dur(0.45, speed)} cubic-bezier(0.34,1.56,0.64,1) forwards; transform-origin: 12px 12px; opacity: 0; }
    .ibr { stroke-dasharray: 4; stroke-dashoffset: 4; animation: draw ${dur(0.25, speed)} ease ${dur(0.35, speed)} forwards; }
    @keyframes burstPop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes draw { to { stroke-dashoffset: 0; } }
  </style>
  <circle class="ibc" cx="12" cy="12" r="4" fill="${color}22" stroke="${color}" stroke-width="${stroke}"/>
  <g class="ibr" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round">
    <line x1="12" y1="2.5" x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="21.5"/>
    <line x1="2.5" y1="12" x2="5" y2="12"/>
    <line x1="19" y1="12" x2="21.5" y2="12"/>
    <line x1="5.3" y1="5.3" x2="7" y2="7"/>
    <line x1="17" y1="17" x2="18.7" y2="18.7"/>
    <line x1="18.7" y1="5.3" x2="17" y2="7"/>
    <line x1="7" y1="17" x2="5.3" y2="18.7"/>
  </g>
</svg>`,
  },
  {
    id: 'gem', name: 'Gem', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .gem { stroke-dasharray: 78; stroke-dashoffset: 78; animation: draw ${dur(0.55, speed)} ease forwards; }
    .gemf { opacity: 0; animation: gemShine ${dur(1.2, speed)} ease-in-out ${dur(0.45, speed)} infinite; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes gemShine { 0%,100% { opacity: 0.15; } 50% { opacity: 0.55; } }
  </style>
  <path class="gem" d="M6 3h12l4 6-10 12L2 9l4-6Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}12"/>
  <path class="gem" d="M2 9h20M8 3l-2 6 6 12 6-12-2-6" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linejoin="round"/>
  <path class="gemf" d="M8 5h4l-2 4H6l2-4Z" fill="${color}"/>
</svg>`,
  },
  {
    id: 'confetti', name: 'Confetti', category: 'Creative',
    svg: ({ color, size, stroke, speed }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none">
  <style>
    .cf0 { stroke-dasharray: 28; stroke-dashoffset: 28; animation: draw ${dur(0.35, speed)} ease forwards; }
    .cf1 { opacity: 0; animation: confettiPop ${dur(0.5, speed)} ease ${dur(0.25, speed)} forwards; transform-origin: 12px 16px; }
    .cf2 { opacity: 0; animation: confettiPop ${dur(0.5, speed)} ease ${dur(0.4, speed)} forwards; transform-origin: 12px 16px; }
    .cf3 { opacity: 0; animation: confettiPop ${dur(0.5, speed)} ease ${dur(0.55, speed)} forwards; transform-origin: 12px 16px; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    @keyframes confettiPop { from { transform: translateY(5px) scale(0.5); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
  </style>
  <path class="cf0" d="M5 21l5-13 6 6-11 7Z" stroke="${color}" stroke-width="${stroke}" stroke-linejoin="round" fill="${color}18"/>
  <circle class="cf1" cx="16.5" cy="4.5" r="1.2" fill="${color}"/>
  <rect class="cf2" x="19" y="9" width="2.4" height="2.4" rx=".4" fill="${color}" transform="rotate(18 20.2 10.2)"/>
  <path class="cf3" d="M8 4l1.5 1.5L8 7 6.5 5.5 8 4Z" fill="${color}"/>
  <path class="cf1" d="M14 8c1.5-1.8 2.8-2.6 4-2.5" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linecap="round"/>
  <path class="cf2" d="M11 5c.4-1.6 1.2-2.7 2.5-3.2" stroke="${color}" stroke-width="${Math.max(1, stroke - 0.5)}" stroke-linecap="round"/>
</svg>`,
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(ICONS.map(i => i.category)))];

// For HTML rendering: just add overflow="visible" — browsers don't clip SVG
// elements embedded in HTML when this is set.
function withOverflowDisplay(svgStr) {
  return svgStr.replace('<svg ', '<svg overflow="visible" ');
}

// For standalone SVG export: expand width, height, AND viewBox by `pad` on
// each side so the icon keeps its visual size but the canvas is large enough
// to show animations (scale, rotate, translate) without clipping.
function withOverflowExport(svgStr, pad = 6) {
  return svgStr
    .replace(/width="(\d+)"/, (_, w) => `width="${+w + pad * 2}"`)
    .replace(/height="(\d+)"/, (_, h) => `height="${+h + pad * 2}"`)
    .replace(/viewBox="0 0 (\d+) (\d+)"/, (_, w, h) =>
      `viewBox="${-pad} ${-pad} ${+w + pad * 2} ${+h + pad * 2}"`
    )
    .replace('<svg ', '<svg overflow="visible" ');
}

const EXPORT_TABS = ['SVG', 'React JSX', 'HTML', 'CSS-only'];

function buildReactJSX(svgStr, iconName) {
  const inner = svgStr
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()
    .replace(/class=/g, 'className=');
  const comp = iconName.replace(/[^a-zA-Z0-9]/g, '');
  return `export function ${comp}Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" /* ...props */ >
${inner.split('\n').map(l => '      ' + l).join('\n')}
    </svg>
  );
}`;
}

function buildHTML(svgStr, iconName) {
  return `<!-- ${iconName} animated SVG icon -->\n${svgStr}`;
}

function buildCSSOnly(svgStr) {
  // Extract just the <style> block content
  const match = svgStr.match(/<style>([\s\S]*?)<\/style>/);
  if (!match) return '/* No CSS animations found */';
  return `/* Embed this CSS in your stylesheet */\n${match[1].trim()}`;
}

export default function AnimatedSvgIconsTool() {
  const [selectedId, setSelectedId] = useState('checkmark');
  const [color, setColor] = useState('#10b981');
  const [size, setSize] = useState(64);
  const [stroke, setStroke] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportTab, setExportTab] = useState('SVG');
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const selectedIcon = ICONS.find(i => i.id === selectedId) || ICONS[0];

  const filteredIcons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return ICONS.filter(icon => {
      const matchesCategory = category === 'All' || icon.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      return [icon.name, icon.id, icon.category].some(value =>
        value.toLowerCase().includes(query)
      );
    });
  }, [category, searchQuery]);

  const params = { color, size, stroke, speed };

  // Preview always at fixed size — overflow visible so animations don't clip
  const previewSvg = withOverflowDisplay(selectedIcon.svg({ ...params, size: 96 }));

  // Export: expand canvas so standalone SVG files don't clip animations
  const exportSvg = withOverflowExport(selectedIcon.svg(params));

  const exportCode = useMemo(() => {
    switch (exportTab) {
      case 'SVG': return exportSvg;
      case 'React JSX': return buildReactJSX(exportSvg, selectedIcon.name);
      case 'HTML': return buildHTML(exportSvg, selectedIcon.name);
      case 'CSS-only': return buildCSSOnly(exportSvg);
      default: return exportSvg;
    }
  }, [exportTab, exportSvg, selectedIcon]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleDownload = () => {
    const blob = new Blob([exportSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedIcon.id}-icon.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const replay = () => setPreviewKey(k => k + 1);

  return (
    <div className={styles.wrap}>
      <ImageToolsTopNav active="animated-svg-icons" />
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>Animated <span className={styles.logoAccent}>SVG Icons</span></span>
        <div className={styles.headerSep}/>
        <span className={styles.headerSub}>{ICONS.length} icons · pure SVG · no dependencies</span>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>
        {/* ── Top row: icon picker + preview/controls ── */}
        <div className={styles.topRow}>
        {/* ── Left: icon picker ── */}
        <aside className={styles.sidebar}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7"/>
              <path d="m20 20-3.5-3.5"/>
            </svg>
            <input
              className={styles.searchInput}
              type="search"
              value={searchQuery}
              placeholder="Search icons"
              aria-label="Search icons"
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className={styles.searchClear} onClick={() => setSearchQuery('')} title="Clear search">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            )}
          </div>
          <div className={styles.catRow}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`${styles.catBtn} ${category === c ? styles.catBtnActive : ''}`}
                onClick={() => setCategory(c)}
              >{c}</button>
            ))}
          </div>
          <div className={styles.iconGrid}>
            {filteredIcons.map(icon => (
              <button
                key={icon.id}
                title={icon.name}
                className={`${styles.iconTile} ${selectedId === icon.id ? styles.iconTileActive : ''}`}
                onClick={() => { setSelectedId(icon.id); setPreviewKey(k => k + 1); }}
              >
                <span
                  className={styles.iconTilePreview}
                  dangerouslySetInnerHTML={{
                    __html: withOverflowDisplay(icon.svg({ color, size: 28, stroke, speed }))
                  }}
                />
                <span className={styles.iconTileName}>{icon.name}</span>
              </button>
            ))}
            {!filteredIcons.length && (
              <div className={styles.emptyState}>No matching icons</div>
            )}
          </div>
        </aside>

        {/* ── Right column: preview/controls + export ── */}
        <div className={styles.rightCol}>
        {/* ── Center: preview + controls ── */}
        <div className={styles.center}>
          {/* Preview card */}
          <div className={styles.previewCard}>
            <div className={styles.previewBg}>
              <div
                key={previewKey}
                className={styles.previewSvg}
                dangerouslySetInnerHTML={{ __html: previewSvg }}
              />
            </div>
            <div className={styles.previewMeta}>
              <span className={styles.previewName}>{selectedIcon.name}</span>
              <span className={styles.previewCat}>{selectedIcon.category}</span>
            </div>
            <button className={styles.replayBtn} onClick={replay} title="Replay animation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="23,4 23,10 17,10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Replay
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.controlRow}>
              <label className={styles.controlLabel}>Color</label>
              <div className={styles.colorWrap}>
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className={styles.colorPicker}
                />
                <input
                  type="text"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className={styles.colorText}
                  spellCheck={false}
                />
              </div>
            </div>

            <div className={styles.controlRow}>
              <label className={styles.controlLabel}>Size <span className={styles.controlVal}>{size}px</span></label>
              <input
                type="range" min="16" max="128" value={size}
                onChange={e => setSize(+e.target.value)}
                className={styles.slider}
              />
            </div>

            <div className={styles.controlRow}>
              <label className={styles.controlLabel}>Stroke <span className={styles.controlVal}>{stroke}px</span></label>
              <input
                type="range" min="0.5" max="4" step="0.5" value={stroke}
                onChange={e => setStroke(+e.target.value)}
                className={styles.slider}
              />
            </div>

            <div className={styles.controlRow}>
              <label className={styles.controlLabel}>Speed <span className={styles.controlVal}>{speed}×</span></label>
              <input
                type="range" min="0.25" max="3" step="0.25" value={speed}
                onChange={e => { setSpeed(+e.target.value); setPreviewKey(k => k + 1); }}
                className={styles.slider}
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className={styles.presets}>
            {[
              { label: 'Accent', c: '#10b981' },
              { label: 'Blue', c: '#3b82f6' },
              { label: 'Purple', c: '#a78bfa' },
              { label: 'Red', c: '#f87171' },
              { label: 'Orange', c: '#fb923c' },
              { label: 'White', c: '#f8fafc' },
            ].map(p => (
              <button
                key={p.c}
                className={`${styles.presetChip} ${color === p.c ? styles.presetChipActive : ''}`}
                style={{ '--chip-color': p.c }}
                onClick={() => setColor(p.c)}
              >
                <span className={styles.presetDot} style={{ background: p.c }}/>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Export panel (bottom of right col) ── */}
        <div className={styles.export}>
          <div className={styles.exportHeader}>
            <div className={styles.exportTabs}>
              {EXPORT_TABS.map(t => (
                <button
                  key={t}
                  className={`${styles.exportTab} ${exportTab === t ? styles.exportTabActive : ''}`}
                  onClick={() => setExportTab(t)}
                >{t}</button>
              ))}
            </div>
            <div className={styles.exportActions}>
              <button className={styles.copyBtn} onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
              <button className={styles.dlBtn} onClick={handleDownload} title="Download SVG">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 3v12M7 11l5 5 5-5"/>
                  <path d="M5 20h14"/>
                </svg>
              </button>
            </div>
          </div>
          <pre className={styles.code}><code>{exportCode}</code></pre>
        </div>
        </div>{/* end rightCol */}
        </div>{/* end topRow */}
      </div>
    </div>
  );
}
