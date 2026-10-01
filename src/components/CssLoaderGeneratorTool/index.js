'use client';

import { useState, useMemo } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

const LOADERS = [
  { id: 'spinner', name: 'Spinner' },
  { id: 'dots',    name: 'Dots' },
  { id: 'bars',    name: 'Bars' },
  { id: 'ring',    name: 'Dual Ring' },
  { id: 'pulse',   name: 'Pulse' },
  { id: 'ripple',  name: 'Ripple' },
  { id: 'orbit',   name: 'Orbit' },
  { id: 'grid',    name: 'Grid' },
  { id: 'flip',    name: 'Flip' },
  { id: 'chase',   name: 'Chase' },
  { id: 'wave',      name: 'Wave' },
  { id: 'bounce',    name: 'Bounce' },
  { id: 'morph',     name: 'Morph' },
  { id: 'arc',       name: 'Arc' },
  { id: 'typing',    name: 'Typing' },
  { id: 'neon',      name: 'Neon' },
  { id: 'clock',     name: 'Clock' },
  { id: 'spiral',    name: 'Spiral' },
  { id: 'comet',     name: 'Comet' },
  { id: 'equalizer', name: 'Equalizer' },
  { id: 'hourglass', name: 'Hourglass' },
  { id: 'dotRing',   name: 'Dot Ring' },
  { id: 'atom',      name: 'Atom' },
  { id: 'glitch',    name: 'Glitch' },
  { id: 'pendulum',  name: 'Pendulum' },
  { id: 'dna',       name: 'DNA' },
  { id: 'windmill',  name: 'Windmill' },
  { id: 'jellyfish',    name: 'Jellyfish' },
  { id: 'sonar',        name: 'Sonar' },
  { id: 'propeller',    name: 'Propeller' },
  { id: 'diamond',      name: 'Diamond' },
  { id: 'wifi',         name: 'Wifi' },
  { id: 'target',       name: 'Target' },
  { id: 'squareChase',  name: 'Sq. Chase' },
  { id: 'shimmerBar',   name: 'Shimmer' },
  { id: 'heartbeat',    name: 'Heartbeat' },
];

function getLoaderDef(id, { primary, secondary, size, speed }) {
  const t = (s) => `${(s / speed).toFixed(2)}s`;
  const thick = Math.max(2, Math.round(size / 14));
  const dot = Math.max(4, Math.round(size / 8));
  const gap = Math.max(2, Math.round(size / 20));
  const radius = Math.max(2, Math.round(size / 15));

  const defs = {
    spinner: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  border: ${thick}px solid ${primary}33;\n  border-top-color: ${primary};\n  border-radius: 50%;\n  animation: spin ${t(0.8)} linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    dots: {
      html: `<div class="loader"><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  gap: ${gap * 2}px;\n  align-items: center;\n}\n.loader span {\n  display: block;\n  width: ${dot * 1.5}px;\n  height: ${dot * 1.5}px;\n  background: ${primary};\n  border-radius: 50%;\n  animation: dotBounce ${t(1.2)} ease-in-out infinite;\n}\n.loader span:nth-child(2) { animation-delay: ${(0.2/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.4/speed).toFixed(2)}s; }\n\n@keyframes dotBounce {\n  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }\n  40%           { transform: scale(1);   opacity: 1; }\n}`,
    },
    bars: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  gap: ${gap * 1.5}px;\n  align-items: flex-end;\n  height: ${size}px;\n}\n.loader span {\n  display: block;\n  width: ${Math.max(4, Math.round(size/8))}px;\n  background: ${primary};\n  border-radius: ${radius}px;\n  animation: barPulse ${t(1)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { animation-delay: 0s; }\n.loader span:nth-child(2) { animation-delay: ${(0.15/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.3/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { animation-delay: ${(0.45/speed).toFixed(2)}s; }\n\n@keyframes barPulse {\n  0%, 100% { height: ${Math.round(size*0.2)}px; }\n  50%       { height: ${size}px; }\n}`,
    },
    ring: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  border: ${thick}px solid transparent;\n  border-top-color: ${primary};\n  border-bottom-color: ${secondary};\n  border-radius: 50%;\n  animation: spin ${t(0.9)} linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    pulse: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  background: ${primary};\n  border-radius: 50%;\n  animation: pulsate ${t(1.2)} ease-in-out infinite;\n}\n\n@keyframes pulsate {\n  0%, 100% { transform: scale(1);   opacity: 1; }\n  50%       { transform: scale(1.6); opacity: 0.2; }\n}`,
    },
    ripple: {
      html: `<div class="loader"><div></div><div></div></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n}\n.loader div {\n  position: absolute;\n  inset: 0;\n  border: ${thick}px solid ${primary};\n  border-radius: 50%;\n  animation: ripple ${t(1.5)} ease-out infinite;\n}\n.loader div:nth-child(2) {\n  animation-delay: ${(0.75/speed).toFixed(2)}s;\n}\n\n@keyframes ripple {\n  0%   { transform: scale(0); opacity: 1; }\n  100% { transform: scale(1); opacity: 0; }\n}`,
    },
    orbit: {
      html: `<div class="loader"><div class="orbit-center"></div><div class="orbit-ball"></div></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(1)} linear infinite;\n}\n.orbit-center {\n  position: absolute;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n  width: ${Math.round(size*0.25)}px;\n  height: ${Math.round(size*0.25)}px;\n  background: ${secondary}66;\n  border-radius: 50%;\n}\n.orbit-ball {\n  position: absolute;\n  top: 0; left: 50%;\n  transform: translateX(-50%);\n  width: ${Math.round(size*0.22)}px;\n  height: ${Math.round(size*0.22)}px;\n  background: ${primary};\n  border-radius: 50%;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    grid: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: ${gap * 2}px;\n  width: ${size}px;\n}\n.loader span {\n  display: block;\n  aspect-ratio: 1;\n  background: ${primary};\n  border-radius: ${radius}px;\n  animation: gridFade ${t(1.5)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { animation-delay: 0s; }\n.loader span:nth-child(2) { animation-delay: ${(0.1/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.2/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { animation-delay: ${(0.3/speed).toFixed(2)}s; }\n.loader span:nth-child(5) { animation-delay: ${(0.4/speed).toFixed(2)}s; }\n.loader span:nth-child(6) { animation-delay: ${(0.5/speed).toFixed(2)}s; }\n.loader span:nth-child(7) { animation-delay: ${(0.6/speed).toFixed(2)}s; }\n.loader span:nth-child(8) { animation-delay: ${(0.7/speed).toFixed(2)}s; }\n.loader span:nth-child(9) { animation-delay: ${(0.8/speed).toFixed(2)}s; }\n\n@keyframes gridFade {\n  0%, 100% { opacity: 0.15; }\n  50%       { opacity: 1; }\n}`,
    },
    flip: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  background: ${primary};\n  border-radius: ${radius * 2}px;\n  animation: flipAnim ${t(1.2)} ease-in-out infinite;\n}\n\n@keyframes flipAnim {\n  0%, 100% { transform: perspective(${size*2}px) rotateX(0deg); }\n  50%       { transform: perspective(${size*2}px) rotateX(180deg); background: ${secondary}; }\n}`,
    },
    chase: {
      html: `<div class="loader"><div class="ball-a"></div><div class="ball-b"></div></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(2)} linear infinite;\n}\n.ball-a, .ball-b {\n  position: absolute;\n  width: ${Math.round(size*0.28)}px;\n  height: ${Math.round(size*0.28)}px;\n  border-radius: 50%;\n}\n.ball-a {\n  background: ${primary};\n  top: 0; left: 50%;\n  transform: translateX(-50%);\n}\n.ball-b {\n  background: ${secondary};\n  bottom: 0; left: 50%;\n  transform: translateX(-50%);\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    wave: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  gap: ${gap * 2}px;\n  align-items: center;\n  height: ${size}px;\n}\n.loader span {\n  display: block;\n  width: ${Math.max(4, Math.round(size / 10))}px;\n  height: 60%;\n  background: ${primary};\n  border-radius: ${radius}px;\n  animation: wave ${t(1.2)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { animation-delay: 0s; }\n.loader span:nth-child(2) { animation-delay: ${(0.1/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.2/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { animation-delay: ${(0.3/speed).toFixed(2)}s; }\n.loader span:nth-child(5) { animation-delay: ${(0.4/speed).toFixed(2)}s; }\n\n@keyframes wave {\n  0%, 100% { transform: scaleY(0.3); }\n  50%       { transform: scaleY(1); }\n}`,
    },
    bounce: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  position: relative;\n  width: ${Math.round(size * 0.45)}px;\n  height: ${size}px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n}\n.loader::before {\n  content: '';\n  display: block;\n  width: ${Math.round(size * 0.45)}px;\n  height: ${Math.round(size * 0.45)}px;\n  background: ${primary};\n  border-radius: 50%;\n  animation: bounceUp ${t(0.65)} cubic-bezier(0.33, 0, 0.66, 0) infinite alternate;\n}\n.loader::after {\n  content: '';\n  position: absolute;\n  bottom: -${Math.round(size * 0.06)}px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: ${Math.round(size * 0.45)}px;\n  height: ${Math.max(4, Math.round(size * 0.06))}px;\n  background: ${primary};\n  opacity: 0.2;\n  border-radius: 50%;\n  filter: blur(${Math.max(2, Math.round(size * 0.04))}px);\n  animation: bounceShadow ${t(0.65)} ease-in-out infinite alternate;\n}\n\n@keyframes bounceUp {\n  from { transform: translateY(0) scaleX(1.15) scaleY(0.85); }\n  to   { transform: translateY(-${Math.round(size * 0.6)}px) scaleX(0.9) scaleY(1.1); }\n}\n@keyframes bounceShadow {\n  from { transform: translateX(-50%) scaleX(1.1);  opacity: 0.25; }\n  to   { transform: translateX(-50%) scaleX(0.45); opacity: 0.06; }\n}`,
    },
    morph: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  background: ${primary};\n  animation: morph ${t(2)} ease-in-out infinite;\n}\n\n@keyframes morph {\n  0%, 100% { border-radius: 50%;          transform: rotate(0deg);   background: ${primary}; }\n  25%       { border-radius: 0;            transform: rotate(90deg); }\n  50%       { border-radius: 50% 0 50% 0; transform: rotate(180deg); background: ${secondary}; }\n  75%       { border-radius: 0 50% 0 50%; transform: rotate(270deg); }\n}`,
    },
    arc: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  border-radius: 50%;\n  background: conic-gradient(${primary} 270deg, ${primary}22 0);\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - ${thick + 2}px), #fff calc(100% - ${thick + 1}px));\n  mask: radial-gradient(farthest-side, transparent calc(100% - ${thick + 2}px), #fff calc(100% - ${thick + 1}px));\n  animation: spin ${t(0.9)} linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    typing: {
      html: `<div class="loader"><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: inline-flex;\n  align-items: center;\n  gap: ${gap * 2}px;\n  padding: ${Math.round(size * 0.18)}px ${Math.round(size * 0.3)}px;\n  background: ${primary}18;\n  border-radius: ${size}px;\n  border: 1px solid ${primary}44;\n}\n.loader span {\n  display: block;\n  width: ${dot}px;\n  height: ${dot}px;\n  background: ${primary};\n  border-radius: 50%;\n  animation: typingDot ${t(1.4)} ease-in-out infinite;\n}\n.loader span:nth-child(2) { animation-delay: ${(0.2/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.4/speed).toFixed(2)}s; }\n\n@keyframes typingDot {\n  0%, 60%, 100% { transform: translateY(0);                   opacity: 0.35; }\n  30%            { transform: translateY(-${Math.round(dot * 0.9)}px); opacity: 1; }\n}`,
    },
    neon: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  border-radius: 50%;\n  border: ${thick}px solid transparent;\n  border-top-color: ${primary};\n  border-right-color: ${primary};\n  box-shadow:\n    0 0 ${thick * 4}px ${primary},\n    0 0 ${thick * 10}px ${primary}55,\n    inset 0 0 ${thick * 3}px ${primary}33;\n  animation: spin ${t(0.9)} linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    clock: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  border: ${thick}px solid ${primary}55;\n  border-radius: 50%;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: ${thick + 1}px;\n  height: ${Math.round(size * 0.32)}px;\n  background: ${primary};\n  border-radius: ${thick}px;\n  transform-origin: 50% 0%;\n  transform: translateX(-50%);\n  animation: clockMin ${t(1)} linear infinite;\n}\n.loader::after {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: ${thick + 2}px;\n  height: ${Math.round(size * 0.22)}px;\n  background: ${secondary};\n  border-radius: ${thick}px;\n  transform-origin: 50% 0%;\n  transform: translateX(-50%);\n  animation: clockHr ${t(12)} linear infinite;\n}\n\n@keyframes clockMin {\n  to { transform: translateX(-50%) rotate(360deg); }\n}\n@keyframes clockHr {\n  to { transform: translateX(-50%) rotate(360deg); }\n}`,
    },
    spiral: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(2)} linear infinite;\n}\n.loader span {\n  position: absolute;\n  display: block;\n  width: ${Math.round(size * 0.38)}px;\n  height: ${Math.round(size * 0.38)}px;\n  border-radius: ${radius * 2}px;\n  animation: spiralFade ${t(2)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { top: 0;    left: 0;    background: ${primary};   animation-delay: 0s; }\n.loader span:nth-child(2) { top: 0;    right: 0;   background: ${secondary}; animation-delay: ${(0.5/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { bottom: 0; right: 0;   background: ${primary};   animation-delay: ${(1.0/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { bottom: 0; left: 0;    background: ${secondary}; animation-delay: ${(1.5/speed).toFixed(2)}s; }\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes spiralFade {\n  0%, 100% { opacity: 1;    transform: scale(1); }\n  50%       { opacity: 0.2; transform: scale(0.55); }\n}`,
    },
    comet: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  border-radius: 50%;\n  background: conic-gradient(from 0deg, ${primary} 0deg, ${primary}cc 25deg, ${primary}55 55deg, transparent 85deg);\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - ${thick + 2}px), #fff calc(100% - ${thick + 1}px));\n  mask: radial-gradient(farthest-side, transparent calc(100% - ${thick + 2}px), #fff calc(100% - ${thick + 1}px));\n  animation: spin ${t(1)} linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    },
    equalizer: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  gap: ${gap * 1.5}px;\n  align-items: flex-end;\n  height: ${size}px;\n}\n.loader span {\n  display: block;\n  width: ${Math.max(4, Math.round(size / 10))}px;\n  background: linear-gradient(to top, ${primary}, ${secondary});\n  border-radius: ${radius}px ${radius}px 0 0;\n  animation: eq ${t(1)} ease-in-out infinite alternate;\n}\n.loader span:nth-child(1) { animation-duration: ${t(0.85)}; animation-delay: 0s; }\n.loader span:nth-child(2) { animation-duration: ${t(1.1)};  animation-delay: ${(0.10/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-duration: ${t(0.70)}; animation-delay: ${(0.20/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { animation-duration: ${t(0.95)}; animation-delay: ${(0.15/speed).toFixed(2)}s; }\n.loader span:nth-child(5) { animation-duration: ${t(1.20)}; animation-delay: ${(0.30/speed).toFixed(2)}s; }\n.loader span:nth-child(6) { animation-duration: ${t(0.80)}; animation-delay: ${(0.05/speed).toFixed(2)}s; }\n\n@keyframes eq {\n  from { height: 12%; }\n  to   { height: 100%; }\n}`,
    },
    hourglass: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${Math.round(size * 0.6)}px;\n  height: ${size}px;\n  background: ${primary};\n  clip-path: polygon(0 0, 100% 0, 50% 50%, 100% 100%, 0 100%, 50% 50%);\n  animation: hourglass ${t(2)} ease-in-out infinite;\n}\n\n@keyframes hourglass {\n  0%, 15%   { transform: rotate(0deg); }\n  85%, 100% { transform: rotate(180deg); }\n}`,
    },
    dotRing: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n}\n.loader span {\n  position: absolute;\n  width: ${dot}px;\n  height: ${dot}px;\n  border-radius: 50%;\n  background: ${primary};\n  top: 50%; left: 50%;\n  margin: -${Math.round(dot / 2)}px 0 0 -${Math.round(dot / 2)}px;\n  animation: dotRingFade ${t(1.2)} ease-in-out infinite;\n}\n${Array.from({length: 8}, (_, i) => `.loader span:nth-child(${i + 1}) { transform: rotate(${i * 45}deg) translateY(-${Math.round(size * 0.4)}px); animation-delay: ${((i / 8) / speed).toFixed(2)}s; }`).join('\n')}\n\n@keyframes dotRingFade {\n  0%, 100% { opacity: 0.1; }\n  50%       { opacity: 1; }\n}`,
    },
    atom: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  width: ${Math.round(size * 0.22)}px;\n  height: ${Math.round(size * 0.22)}px;\n  background: ${primary};\n  border-radius: 50%;\n  box-shadow: 0 0 ${thick * 5}px ${primary};\n  z-index: 1;\n}\n.loader::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border: ${thick}px solid transparent;\n  border-top-color: ${primary};\n  border-bottom-color: ${secondary};\n  border-radius: 50%;\n  animation: atomSpin ${t(1.5)} linear infinite;\n}\n\n@keyframes atomSpin {\n  to { transform: rotate(360deg); }\n}`,
    },
    glitch: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${Math.round(size * 0.5)}px;\n  background: ${primary};\n  border-radius: ${radius}px;\n  position: relative;\n  animation: glitch ${t(0.9)} steps(1) infinite;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: ${secondary};\n  border-radius: ${radius}px;\n  opacity: 0;\n  animation: glitchSlice ${t(0.9)} steps(1) infinite;\n}\n\n@keyframes glitch {\n  0%, 100% { transform: none; }\n  20%       { transform: translateX(4px) skewX(2deg);  clip-path: polygon(0 25%, 100% 25%, 100% 45%, 0 45%); }\n  40%       { transform: translateX(-3px); }\n  60%       { transform: translateX(5px);              clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }\n  80%       { transform: translateX(-4px) skewX(-2deg); }\n}\n@keyframes glitchSlice {\n  0%, 100% { opacity: 0; }\n  20%       { opacity: 1; transform: translateX(-5px); clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%); }\n  50%       { opacity: 1; transform: translateX(4px);  clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%); }\n  75%       { opacity: 0; }\n}`,
    },
    pendulum: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  display: flex;\n  justify-content: center;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  width: ${thick + 1}px;\n  height: ${Math.round(size * 0.72)}px;\n  background: ${primary}55;\n  border-radius: ${thick}px;\n  transform-origin: top center;\n  animation: pendulumSwing ${t(1.4)} ease-in-out infinite alternate;\n}\n.loader::after {\n  content: '';\n  position: absolute;\n  top: ${Math.round(size * 0.66)}px;\n  width: ${Math.round(dot * 2)}px;\n  height: ${Math.round(dot * 2)}px;\n  background: ${primary};\n  border-radius: 50%;\n  transform-origin: 50% -${Math.round(size * 0.66)}px;\n  box-shadow: 0 0 ${thick * 4}px ${primary}88;\n  animation: pendulumSwing ${t(1.4)} ease-in-out infinite alternate;\n}\n\n@keyframes pendulumSwing {\n  from { transform: rotate(-38deg); }\n  to   { transform: rotate(38deg); }\n}`,
    },
    dna: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  flex-direction: column;\n  gap: ${Math.max(3, Math.round(size / 12))}px;\n  align-items: center;\n}\n.loader span {\n  display: block;\n  width: ${dot * 1.5}px;\n  height: ${dot * 1.5}px;\n  border-radius: 50%;\n  animation: dnaWave ${t(1.5)} ease-in-out infinite alternate;\n}\n.loader span:nth-child(odd)  { background: ${primary}; }\n.loader span:nth-child(even) { background: ${secondary}; animation-direction: alternate-reverse; }\n.loader span:nth-child(1) { animation-delay: 0s; }\n.loader span:nth-child(2) { animation-delay: ${(0.15/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(0.30/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { animation-delay: ${(0.45/speed).toFixed(2)}s; }\n.loader span:nth-child(5) { animation-delay: ${(0.60/speed).toFixed(2)}s; }\n.loader span:nth-child(6) { animation-delay: ${(0.75/speed).toFixed(2)}s; }\n\n@keyframes dnaWave {\n  from { transform: translateX(-${Math.round(size * 0.28)}px); opacity: 0.3; }\n  to   { transform: translateX(${Math.round(size * 0.28)}px);  opacity: 1; }\n}`,
    },
    windmill: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span></div>`,
      css: (() => {
        const bw = Math.round(size * 0.22);
        const bh = Math.round(size * 0.45);
        return `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(1.5)} linear infinite;\n}\n.loader span {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: ${bw}px;\n  height: ${bh}px;\n  margin-left: -${Math.round(bw / 2)}px;\n  margin-top: -${bh}px;\n  border-radius: ${size}px;\n  transform-origin: 50% 100%;\n}\n.loader span:nth-child(1) { transform: rotate(0deg);   background: ${primary};   opacity: 1; }\n.loader span:nth-child(2) { transform: rotate(90deg);  background: ${secondary}; opacity: 0.75; }\n.loader span:nth-child(3) { transform: rotate(180deg); background: ${primary};   opacity: 0.5; }\n.loader span:nth-child(4) { transform: rotate(270deg); background: ${secondary}; opacity: 0.25; }\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`;
      })(),
    },
    jellyfish: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${Math.round(size * 0.85)}px;\n  background: ${primary};\n  border-radius: 50% 50% 45% 45%;\n  position: relative;\n  animation: jelly ${t(1.5)} ease-in-out infinite;\n  box-shadow: 0 0 ${thick * 6}px ${primary}55;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  bottom: -${Math.round(size * 0.22)}px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: ${Math.round(size * 0.55)}px;\n  height: ${Math.round(size * 0.25)}px;\n  border-radius: 0 0 50% 50%;\n  background: ${primary}44;\n  animation: jellyTail ${t(1.5)} ease-in-out infinite;\n}\n\n@keyframes jelly {\n  0%, 100% { border-radius: 50% 50% 45% 45%; transform: scaleX(1)    scaleY(1); }\n  25%       { border-radius: 55% 45% 52% 48%; transform: scaleX(1.07)  scaleY(0.93); }\n  50%       { border-radius: 45% 55% 48% 52%; transform: scaleX(0.93)  scaleY(1.07); }\n  75%       { border-radius: 52% 48% 55% 45%; transform: scaleX(1.04)  scaleY(0.96); }\n}\n@keyframes jellyTail {\n  0%, 100% { transform: translateX(-50%) scaleX(1);   }\n  25%       { transform: translateX(-50%) scaleX(1.2); }\n  50%       { transform: translateX(-50%) scaleX(0.8); }\n  75%       { transform: translateX(-50%) scaleX(1.1); }\n}`,
    },
    sonar: {
      html: `<div class="loader"><span></span><span></span><span></span></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.loader span {\n  position: absolute;\n  width: ${size}px;\n  height: ${size}px;\n  border: ${thick}px solid ${primary};\n  border-radius: 50%;\n  animation: sonarPing ${t(1.8)} ease-out infinite;\n}\n.loader span:nth-child(2) { animation-delay: ${(0.6/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { animation-delay: ${(1.2/speed).toFixed(2)}s; }\n\n@keyframes sonarPing {\n  0%   { transform: scale(0.1); opacity: 1; }\n  100% { transform: scale(1);   opacity: 0; }\n}`,
    },
    propeller: {
      html: `<div class="loader"><span></span><span></span><span></span></div>`,
      css: (() => {
        const bw = Math.round(size * 0.18);
        const bh = Math.round(size * 0.48);
        return `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(0.7)} linear infinite;\n}\n.loader span {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: ${bw}px;\n  height: ${bh}px;\n  margin-left: -${Math.round(bw / 2)}px;\n  margin-top: -${bh}px;\n  border-radius: ${size}px ${size}px 0 0;\n  transform-origin: 50% 100%;\n}\n.loader span:nth-child(1) { transform: rotate(0deg);   background: ${primary};   opacity: 1; }\n.loader span:nth-child(2) { transform: rotate(120deg); background: ${secondary}; opacity: 0.7; }\n.loader span:nth-child(3) { transform: rotate(240deg); background: ${primary};   opacity: 0.4; }\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}`;
      })(),
    },
    diamond: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${size}px;\n  background: ${primary};\n  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);\n  animation: diamondSpin ${t(1.6)} ease-in-out infinite;\n}\n\n@keyframes diamondSpin {\n  0%, 100% { transform: rotate(0deg)   scale(1);    background: ${primary}; }\n  25%       { transform: rotate(90deg)  scale(0.82); }\n  50%       { transform: rotate(180deg) scale(1);    background: ${secondary}; }\n  75%       { transform: rotate(270deg) scale(0.82); }\n}`,
    },
    wifi: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  display: flex;\n  align-items: flex-end;\n  gap: ${Math.max(3, gap)}px;\n  height: ${size}px;\n}\n.loader span {\n  display: block;\n  width: ${Math.max(5, Math.round(size / 7))}px;\n  background: ${primary};\n  border-radius: ${radius}px ${radius}px 0 0;\n  animation: wifiBar ${t(1.2)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { height: 22%;  animation-delay: 0s; }\n.loader span:nth-child(2) { height: 46%;  animation-delay: ${(0.15/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { height: 72%;  animation-delay: ${(0.3/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { height: 100%; animation-delay: ${(0.45/speed).toFixed(2)}s; }\n\n@keyframes wifiBar {\n  0%, 100% { opacity: 0.15; }\n  50%       { opacity: 1; }\n}`,
    },
    target: {
      html: `<div class="loader"><span></span><span></span><span></span></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.loader span {\n  position: absolute;\n  border-radius: 50%;\n  border: ${thick}px solid ${primary};\n  animation: targetPulse ${t(2)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { width: ${size}px;                  height: ${size}px;                  animation-delay: 0s; }\n.loader span:nth-child(2) { width: ${Math.round(size*0.64)}px;  height: ${Math.round(size*0.64)}px;  animation-delay: ${(0.5/speed).toFixed(2)}s; border-color: ${secondary}; }\n.loader span:nth-child(3) { width: ${Math.round(size*0.3)}px;   height: ${Math.round(size*0.3)}px;   animation-delay: ${(1.0/speed).toFixed(2)}s; }\n\n@keyframes targetPulse {\n  0%, 100% { opacity: 1;    transform: scale(1); }\n  50%       { opacity: 0.25; transform: scale(0.88); }\n}`,
    },
    squareChase: {
      html: `<div class="loader"><span></span><span></span><span></span><span></span></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${size}px;\n  animation: spin ${t(2.5)} linear infinite;\n}\n.loader span {\n  position: absolute;\n  width: ${Math.round(size * 0.3)}px;\n  height: ${Math.round(size * 0.3)}px;\n  border-radius: ${radius}px;\n  animation: squarePulse ${t(2.5)} ease-in-out infinite;\n}\n.loader span:nth-child(1) { top: 0;    left: 0;    background: ${primary};   animation-delay: 0s; }\n.loader span:nth-child(2) { top: 0;    right: 0;   background: ${secondary}; animation-delay: ${(0.2/speed).toFixed(2)}s; }\n.loader span:nth-child(3) { bottom: 0; right: 0;   background: ${primary};   animation-delay: ${(0.4/speed).toFixed(2)}s; }\n.loader span:nth-child(4) { bottom: 0; left: 0;    background: ${secondary}; animation-delay: ${(0.6/speed).toFixed(2)}s; }\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n@keyframes squarePulse {\n  0%, 100% { transform: scale(1);    opacity: 1; }\n  50%       { transform: scale(0.45); opacity: 0.4; }\n}`,
    },
    shimmerBar: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  width: ${size}px;\n  height: ${thick * 3}px;\n  background: ${primary}22;\n  border-radius: ${thick * 2}px;\n  overflow: hidden;\n  position: relative;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  width: 45%;\n  background: linear-gradient(90deg, transparent, ${primary}, transparent);\n  border-radius: ${thick * 2}px;\n  animation: shimmer ${t(1.2)} ease-in-out infinite;\n}\n\n@keyframes shimmer {\n  0%   { left: -45%; }\n  100% { left: 105%; }\n}`,
    },
    heartbeat: {
      html: `<div class="loader"></div>`,
      css: `.loader {\n  position: relative;\n  width: ${size}px;\n  height: ${Math.round(size * 0.55)}px;\n  display: flex;\n  align-items: center;\n}\n.loader::before {\n  content: '';\n  position: absolute;\n  left: 0; right: 0;\n  height: ${thick}px;\n  background: ${primary}30;\n  border-radius: ${thick}px;\n}\n.loader::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  width: ${thick * 2.5}px;\n  height: ${Math.round(size * 0.48)}px;\n  background: ${primary};\n  clip-path: polygon(50% 0%, 100% 55%, 50% 42%, 0% 55%);\n  box-shadow: 0 0 ${thick * 4}px ${primary}88;\n  animation: heartbeatSpike ${t(1.2)} ease-in-out infinite;\n}\n\n@keyframes heartbeatSpike {\n  0%        { left: -5%;  opacity: 0; }\n  8%        { opacity: 1; }\n  92%       { opacity: 1; }\n  100%      { left: 105%; opacity: 0; }\n}`,
    },
  };
  return defs[id] || defs['spinner'];
}

function remapHtml(html, prefix = 'live') {
  return html
    .replace(/class="loader"/g, `class="${prefix}-loader"`)
    .replace(/class="pac"/g, `class="${prefix}-pac"`)
    .replace(/class="orbit-center"/g, `class="${prefix}-orbit-center"`)
    .replace(/class="orbit-ball"/g, `class="${prefix}-orbit-ball"`)
    .replace(/class="ball-a"/g, `class="${prefix}-ball-a"`)
    .replace(/class="ball-b"/g, `class="${prefix}-ball-b"`);
}

function remapCss(css, prefix = 'live') {
  return css
    .replace(/\.loader\b/g, `.${prefix}-loader`)
    .replace(/\.pac\b/g, `.${prefix}-pac`)
    .replace(/\.orbit-center\b/g, `.${prefix}-orbit-center`)
    .replace(/\.orbit-ball\b/g, `.${prefix}-orbit-ball`)
    .replace(/\.ball-a\b/g, `.${prefix}-ball-a`)
    .replace(/\.ball-b\b/g, `.${prefix}-ball-b`);
}

export default function CssLoaderGeneratorTool() {
  const [loaderId, setLoaderId] = useState('spinner');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [primary, setPrimary] = useState('#7c6aff');
  const [secondary, setSecondary] = useState('#ff6a9b');
  const [size, setSize] = useState(60);
  const [speed, setSpeed] = useState(1);
  const [tab, setTab] = useState('css');
  const [copied, setCopied] = useState(false);

  const loaderDef = useMemo(() => getLoaderDef(loaderId, { primary, secondary, size, speed }), [loaderId, primary, secondary, size, speed]);

  // Mini animated previews for sidebar chips
  const miniData = useMemo(() => {
    return LOADERS.map(l => {
      const def = getLoaderDef(l.id, { primary, secondary, size: 30, speed: 1 });
      const p = `ml-${l.id}`;
      return { id: l.id, name: l.name, html: remapHtml(def.html, p), css: remapCss(def.css, p) };
    });
  }, [primary, secondary]);

  const miniStyles = useMemo(() => miniData.map(m => m.css).join('\n'), [miniData]);

  const outputCode = useMemo(() => {
    if (tab === 'css') return loaderDef.css;
    if (tab === 'html') return loaderDef.html;
    if (tab === 'both') return `<style>\n${loaderDef.css}\n</style>\n\n${loaderDef.html}`;
    if (tab === 'react') {
      const escapedCss = loaderDef.css.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      return `export default function Loader() {\n  return (\n    <>\n      <style>{\`\n${escapedCss.split('\n').map(l => '        ' + l).join('\n')}\n      \`}</style>\n      ${loaderDef.html.replace(/class="/g, 'className="')}\n    </>\n  );\n}`;
    }
    return '';
  }, [tab, loaderDef]);

  const copy = () => {
    navigator.clipboard.writeText(outputCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-loader-generator" />
      <style>{remapCss(loaderDef.css)}</style>
      <style>{miniStyles}</style>

      {/* Full-width header */}
      <div className={styles.header}>
        <div className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
            <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.headerTitle}>CSS <span className={styles.logoAccent}>Loader</span> Generator</span>
      </div>

      {/* Body: sidebar + content */}
      <div className={styles.body}>

      {/* Left sidebar */}
      <aside className={styles.sidebar}>
        <p className={styles.sidebarLabel}>Loader Type</p>
        <div className={styles.chipGrid}>
          {miniData.map(m => (
            <button
              key={m.id}
              className={`${styles.chip} ${loaderId === m.id ? styles.chipActive : ''}`}
              onClick={() => setLoaderId(m.id)}
              title={m.name}
            >
              <span className={styles.chipPreview} dangerouslySetInnerHTML={{ __html: m.html }} />
              <span className={styles.chipName}>{m.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Right content */}
      <div className={styles.content}>
        {/* Controls bar */}
        <div className={styles.controlsBar}>
          <div className={styles.colorControl}>
            <span className={styles.ctrlLabel}>Background</span>
            <button
              className={`${styles.bgPreset} ${bgColor === '#1a1a2e' ? styles.bgPresetActive : ''}`}
              onClick={() => setBgColor('#1a1a2e')}
              title="Dark"
            >Dark</button>
            <button
              className={`${styles.bgPreset} ${bgColor === '#ffffff' ? styles.bgPresetActive : ''}`}
              onClick={() => setBgColor('#ffffff')}
              title="White"
            >White</button>
            <input type="color" className={styles.colorPicker} value={bgColor} onChange={e => setBgColor(e.target.value)} suppressHydrationWarning />
          </div>

          <div className={styles.sep} />

          <div className={styles.colorControl}>
            <span className={styles.ctrlLabel}>Primary</span>
            <input type="color" className={styles.colorPicker} value={primary} onChange={e => setPrimary(e.target.value)} suppressHydrationWarning />
            <input type="text" className={styles.hexInput} value={primary} maxLength={7}
              onChange={e => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) setPrimary(e.target.value); }} />
          </div>

          <div className={styles.colorControl}>
            <span className={styles.ctrlLabel}>Secondary</span>
            <input type="color" className={styles.colorPicker} value={secondary} onChange={e => setSecondary(e.target.value)} suppressHydrationWarning />
            <input type="text" className={styles.hexInput} value={secondary} maxLength={7}
              onChange={e => { if (/^#[0-9a-f]{6}$/i.test(e.target.value)) setSecondary(e.target.value); }} />
          </div>

          <div className={styles.sep} />

          <div className={styles.sliderControl}>
            <span className={styles.ctrlLabel}>Size</span>
            <input type="range" min={20} max={120} value={size} onChange={e => setSize(+e.target.value)} className={styles.rangeInput} />
            <span className={styles.ctrlVal}>{size}px</span>
          </div>

          <div className={styles.sliderControl}>
            <span className={styles.ctrlLabel}>Speed</span>
            <input type="range" min={0.5} max={3} step={0.1} value={speed} onChange={e => setSpeed(+e.target.value)} className={styles.rangeInput} />
            <span className={styles.ctrlVal}>{speed}x</span>
          </div>
        </div>

        {/* Preview */}
        <div className={styles.previewArea} style={{ background: bgColor }}>
          <div className={styles.previewBox}
            dangerouslySetInnerHTML={{ __html: remapHtml(loaderDef.html) }}
          />
        </div>

        {/* Code output */}
        <div className={styles.codeArea}>
          <div className={styles.codeHeader}>
            <div className={styles.codeTabs}>
              <button className={`${styles.codeTab} ${tab === 'css'   ? styles.codeTabActive : ''}`} onClick={() => setTab('css')}>CSS</button>
              <button className={`${styles.codeTab} ${tab === 'html'  ? styles.codeTabActive : ''}`} onClick={() => setTab('html')}>HTML</button>
              <button className={`${styles.codeTab} ${tab === 'both'  ? styles.codeTabActive : ''}`} onClick={() => setTab('both')}>Both</button>
              <button className={`${styles.codeTab} ${tab === 'react' ? styles.codeTabActive : ''}`} onClick={() => setTab('react')}>React</button>
            </div>
            <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre className={styles.codeBlock}>{outputCode}</pre>
        </div>
      </div>

      </div>
    </div>
  );
}
