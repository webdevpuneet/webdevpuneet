'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';

import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import ForkToMyCodeButton from '@/components/ForkToMyCodeButton';
import { CENTER_PAGE_CSS } from '@/lib/fork-to-mycode';
const ANIMATIONS = [
  { id: 'fade-in',     name: 'Fade In',      kf: 'fade-in' },
  { id: 'fade-out',    name: 'Fade Out',     kf: 'fade-out' },
  { id: 'slide-up',    name: 'Slide Up',     kf: 'slide-up' },
  { id: 'slide-down',  name: 'Slide Down',   kf: 'slide-down' },
  { id: 'slide-left',  name: 'Slide Left',   kf: 'slide-left' },
  { id: 'slide-right', name: 'Slide Right',  kf: 'slide-right' },
  { id: 'bounce',      name: 'Bounce',       kf: 'bounce' },
  { id: 'scale-up',    name: 'Scale Up',     kf: 'scale-up' },
  { id: 'scale-down',  name: 'Scale Down',   kf: 'scale-down' },
  { id: 'rotate',      name: 'Rotate',       kf: 'rotate' },
  { id: 'spin-in',     name: 'Spin In',      kf: 'spin-in' },
  { id: 'shake',       name: 'Shake',        kf: 'shake' },
  { id: 'pulse',       name: 'Pulse',        kf: 'pulse' },
  { id: 'flip-x',      name: 'Flip X',       kf: 'flip-x' },
  { id: 'flip-y',      name: 'Flip Y',       kf: 'flip-y' },
  { id: 'rubber-band', name: 'Rubber Band',  kf: 'rubber-band' },
  { id: 'jello',       name: 'Jello',        kf: 'jello' },
  { id: 'tada',        name: 'Tada',         kf: 'tada' },
  { id: 'heartbeat',   name: 'Heartbeat',    kf: 'heartbeat' },
  { id: 'wobble',      name: 'Wobble',       kf: 'wobble' },
  { id: 'swing',       name: 'Swing',        kf: 'swing' },
  { id: 'flash',       name: 'Flash',        kf: 'flash' },
  { id: 'float',       name: 'Float',        kf: 'float' },
  { id: 'blur-in',     name: 'Blur In',      kf: 'blur-in' },
  { id: 'glitch',      name: 'Glitch',       kf: 'glitch' },
  { id: 'roll-in',     name: 'Roll In',      kf: 'roll-in' },
  { id: 'light-speed', name: 'Light Speed',  kf: 'light-speed' },
  { id: 'pop',         name: 'Pop',          kf: 'pop' },
  { id: 'drop-bounce', name: 'Drop Bounce',  kf: 'drop-bounce' },
  { id: 'skew-in',     name: 'Skew In',      kf: 'skew-in' },
  { id: 'neon-pulse',  name: 'Neon Pulse',   kf: 'neon-pulse' },
  { id: 'zoom-in',     name: 'Zoom In',      kf: 'zoom-in' },
  { id: 'stretch',     name: 'Stretch',      kf: 'stretch' },
  { id: 'hinge',       name: 'Hinge',        kf: 'hinge' },
  { id: 'bounce-in',   name: 'Bounce In',    kf: 'bounce-in' },
  { id: 'elastic',     name: 'Elastic',      kf: 'elastic' },
  { id: 'jack-in-box', name: 'Jack In Box',  kf: 'jack-in-box' },
  { id: 'back-in-up',  name: 'Back In Up',   kf: 'back-in-up' },
  { id: 'wipe-right',  name: 'Wipe Right',   kf: 'wipe-right' },
  { id: 'glow-in',     name: 'Glow In',      kf: 'glow-in' },
  { id: 'tremble',     name: 'Tremble',      kf: 'tremble' },
  { id: 'spiral',      name: 'Spiral',       kf: 'spiral' },
  { id: 'flip-in',     name: 'Flip In',      kf: 'flip-in' },
  { id: 'gravity',     name: 'Gravity',      kf: 'gravity' },
  { id: 'vortex',      name: 'Vortex',       kf: 'vortex' },
  { id: 'tilt-3d',     name: 'Tilt 3D',      kf: 'tilt-3d' },
  { id: 'compress',    name: 'Compress',     kf: 'compress' },
  { id: 'door-open',   name: 'Door Open',    kf: 'door-open' },
  { id: 'sway',        name: 'Sway',         kf: 'sway' },
  { id: 'materialize', name: 'Materialize',  kf: 'materialize' },
  { id: 'shockwave',   name: 'Shockwave',    kf: 'shockwave' },
  { id: 'splat',       name: 'Splat',        kf: 'splat' },
  { id: 'wiggle',      name: 'Wiggle',       kf: 'wiggle' },
  { id: 'whip',        name: 'Whip',         kf: 'whip' },
  { id: 'peel',        name: 'Peel',         kf: 'peel' },
  { id: 'twirl',       name: 'Twirl',        kf: 'twirl' },
  { id: 'cinematic',   name: 'Cinematic',    kf: 'cinematic' },
  { id: 'neon-flicker',name: 'Neon Flicker', kf: 'neon-flicker' },
  { id: 'zoom-in-down',name: 'Zoom In Down', kf: 'zoom-in-down' },
  { id: 'fade-up-big', name: 'Fade Up Big',  kf: 'fade-up-big' },
  { id: 'shake-y',     name: 'Shake Y',      kf: 'shake-y' },
  { id: 'roll-out',    name: 'Roll Out',     kf: 'roll-out' },
  { id: 'rotate-out',  name: 'Rotate Out',   kf: 'rotate-out' },
  { id: 'bounce-out',      name: 'Bounce Out',     kf: 'bounce-out' },
  { id: 'skid',            name: 'Skid',           kf: 'skid' },
  { id: 'crash-in',        name: 'Crash In',       kf: 'crash-in' },
  { id: 'ricochet',        name: 'Ricochet',       kf: 'ricochet' },
  { id: 'ping',            name: 'Ping',           kf: 'ping' },
  { id: 'levitate',        name: 'Levitate',       kf: 'levitate' },
  { id: 'spotlight',       name: 'Spotlight',      kf: 'spotlight' },
  { id: 'orbit',           name: 'Orbit',          kf: 'orbit' },
  { id: 'blur-out',        name: 'Blur Out',       kf: 'blur-out' },
  { id: 'flip-out-x',      name: 'Flip Out X',     kf: 'flip-out-x' },
  { id: 'flip-out-y',      name: 'Flip Out Y',     kf: 'flip-out-y' },
  { id: 'slide-out-left',  name: 'Slide Out ←',    kf: 'slide-out-left' },
  { id: 'slide-out-right', name: 'Slide Out →',    kf: 'slide-out-right' },
  { id: 'zoom-in-left',    name: 'Zoom In Left',   kf: 'zoom-in-left' },
  { id: 'zoom-in-right',   name: 'Zoom In Right',  kf: 'zoom-in-right' },
  { id: 'back-out-down',   name: 'Back Out Down',  kf: 'back-out-down' },
];

const KEYFRAMES = {
  'fade-in': `@keyframes fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`,
  'fade-out': `@keyframes fade-out {\n  from { opacity: 1; }\n  to { opacity: 0; }\n}`,
  'slide-up': `@keyframes slide-up {\n  from { transform: translateY(40px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}`,
  'slide-down': `@keyframes slide-down {\n  from { transform: translateY(-40px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}`,
  'slide-left': `@keyframes slide-left {\n  from { transform: translateX(40px); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}`,
  'slide-right': `@keyframes slide-right {\n  from { transform: translateX(-40px); opacity: 0; }\n  to { transform: translateX(0); opacity: 1; }\n}`,
  'bounce': `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-32px); }\n  60% { transform: translateY(-16px); }\n  80% { transform: translateY(-6px); }\n}`,
  'scale-up': `@keyframes scale-up {\n  from { transform: scale(0.4); opacity: 0; }\n  to { transform: scale(1); opacity: 1; }\n}`,
  'scale-down': `@keyframes scale-down {\n  from { transform: scale(1.5); opacity: 0; }\n  to { transform: scale(1); opacity: 1; }\n}`,
  'rotate': `@keyframes rotate {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
  'spin-in': `@keyframes spin-in {\n  from { transform: rotate(-180deg) scale(0.3); opacity: 0; }\n  to { transform: rotate(0deg) scale(1); opacity: 1; }\n}`,
  'shake': `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20% { transform: translateX(-12px); }\n  40% { transform: translateX(12px); }\n  60% { transform: translateX(-6px); }\n  80% { transform: translateX(6px); }\n}`,
  'pulse': `@keyframes pulse {\n  0%, 100% { transform: scale(1); opacity: 1; }\n  50% { transform: scale(1.15); opacity: 0.7; }\n}`,
  'flip-x': `@keyframes flip-x {\n  from { transform: rotateX(90deg); opacity: 0; }\n  to { transform: rotateX(0deg); opacity: 1; }\n}`,
  'flip-y': `@keyframes flip-y {\n  from { transform: rotateY(90deg); opacity: 0; }\n  to { transform: rotateY(0deg); opacity: 1; }\n}`,
  'rubber-band': `@keyframes rubber-band {\n  0% { transform: scale(1); }\n  30% { transform: scaleX(1.25) scaleY(0.75); }\n  40% { transform: scaleX(0.75) scaleY(1.25); }\n  60% { transform: scaleX(1.15) scaleY(0.85); }\n  80% { transform: scaleX(0.95) scaleY(1.05); }\n  100% { transform: scale(1); }\n}`,
  'jello': `@keyframes jello {\n  0%, 100% { transform: skewX(0deg) skewY(0deg); }\n  30% { transform: skewX(-20deg) skewY(-20deg); }\n  50% { transform: skewX(10deg) skewY(10deg); }\n  70% { transform: skewX(-5deg) skewY(-5deg); }\n}`,
  'tada': `@keyframes tada {\n  0% { transform: scale(1) rotate(0); }\n  10% { transform: scale(0.9) rotate(-3deg); }\n  20% { transform: scale(0.9) rotate(3deg); }\n  30% { transform: scale(1.1) rotate(-3deg); }\n  40%, 60%, 80% { transform: scale(1.1) rotate(3deg); }\n  50%, 70% { transform: scale(1.1) rotate(-3deg); }\n  100% { transform: scale(1) rotate(0); }\n}`,
  'heartbeat':   `@keyframes heartbeat {\n  0%, 100% { transform: scale(1); }\n  14% { transform: scale(1.3); }\n  28% { transform: scale(1); }\n  42% { transform: scale(1.3); }\n  70% { transform: scale(1); }\n}`,
  'wobble':      `@keyframes wobble {\n  0%, 100% { transform: translateX(0) rotate(0); }\n  15% { transform: translateX(-20px) rotate(-5deg); }\n  30% { transform: translateX(15px) rotate(4deg); }\n  45% { transform: translateX(-10px) rotate(-3deg); }\n  60% { transform: translateX(7px) rotate(2deg); }\n  75% { transform: translateX(-4px) rotate(-1deg); }\n}`,
  'swing':       `@keyframes swing {\n  0%, 100% { transform: rotate(0deg); transform-origin: top center; }\n  20% { transform: rotate(18deg); transform-origin: top center; }\n  40% { transform: rotate(-12deg); transform-origin: top center; }\n  60% { transform: rotate(7deg); transform-origin: top center; }\n  80% { transform: rotate(-4deg); transform-origin: top center; }\n}`,
  'flash':       `@keyframes flash {\n  0%, 50%, 100% { opacity: 1; }\n  25%, 75% { opacity: 0; }\n}`,
  'float':       `@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-18px); }\n}`,
  'blur-in':     `@keyframes blur-in {\n  from { filter: blur(14px); opacity: 0; transform: scale(1.04); }\n  to { filter: blur(0); opacity: 1; transform: scale(1); }\n}`,
  'glitch':      `@keyframes glitch {\n  0%, 100% { transform: none; filter: none; }\n  20% { transform: translateX(-4px); filter: drop-shadow(4px 0 0 #ff003c); }\n  40% { transform: translateX(4px); filter: drop-shadow(-4px 0 0 #00e5ff); }\n  60% { transform: translateX(-3px) skewX(6deg); filter: drop-shadow(3px 0 0 #ff003c); }\n  80% { transform: translateX(2px) skewX(-3deg); filter: drop-shadow(-2px 0 0 #00e5ff); }\n}`,
  'roll-in':     `@keyframes roll-in {\n  from { transform: translateX(-80px) rotate(-360deg); opacity: 0; }\n  to { transform: translateX(0) rotate(0deg); opacity: 1; }\n}`,
  'light-speed': `@keyframes light-speed {\n  from { transform: translateX(80px) skewX(-30deg); opacity: 0; }\n  60% { transform: translateX(-12px) skewX(10deg); opacity: 1; }\n  80% { transform: translateX(4px) skewX(-5deg); }\n  100% { transform: none; opacity: 1; }\n}`,
  'pop':         `@keyframes pop {\n  0% { transform: scale(0.85); opacity: 0.5; }\n  50% { transform: scale(1.12); opacity: 1; }\n  70% { transform: scale(0.96); }\n  100% { transform: scale(1); }\n}`,
  'drop-bounce': `@keyframes drop-bounce {\n  0% { transform: translateY(-60px); opacity: 0; }\n  55% { transform: translateY(10px); opacity: 1; }\n  70% { transform: translateY(-10px); }\n  85% { transform: translateY(5px); }\n  100% { transform: translateY(0); }\n}`,
  'skew-in':     `@keyframes skew-in {\n  from { transform: skewX(28deg) translateX(50px); opacity: 0; }\n  to { transform: skewX(0deg) translateX(0); opacity: 1; }\n}`,
  'neon-pulse':  `@keyframes neon-pulse {\n  0%, 100% { opacity: 1; filter: drop-shadow(0 0 6px currentColor) drop-shadow(0 0 14px currentColor); }\n  50% { opacity: 0.55; filter: drop-shadow(0 0 1px currentColor); }\n}`,
  'zoom-in':     `@keyframes zoom-in {\n  from { transform: scale(0.2); opacity: 0; }\n  60% { transform: scale(1.06); opacity: 1; }\n  100% { transform: scale(1); }\n}`,
  'stretch':     `@keyframes stretch {\n  0% { transform: scaleY(0.2) scaleX(1.3); opacity: 0; transform-origin: bottom; }\n  50% { transform: scaleY(1.1) scaleX(0.95); transform-origin: bottom; }\n  100% { transform: scaleY(1) scaleX(1); opacity: 1; transform-origin: bottom; }\n}`,
  'hinge':       `@keyframes hinge {\n  0% { transform: rotate(0); transform-origin: top left; }\n  20%, 60% { transform: rotate(78deg); transform-origin: top left; }\n  40%, 80% { transform: rotate(58deg); transform-origin: top left; }\n  100% { transform: translateY(120px) rotate(58deg); opacity: 0; transform-origin: top left; }\n}`,
  'bounce-in':   `@keyframes bounce-in {\n  0% { transform: scale(0); opacity: 0; }\n  50% { transform: scale(1.2); opacity: 1; }\n  70% { transform: scale(0.9); }\n  85% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}`,
  'elastic':     `@keyframes elastic {\n  0% { transform: scale(0); }\n  55% { transform: scale(1.3); opacity: 1; }\n  70% { transform: scale(0.85); }\n  82% { transform: scale(1.12); }\n  92% { transform: scale(0.96); }\n  100% { transform: scale(1); }\n}`,
  'jack-in-box': `@keyframes jack-in-box {\n  0% { transform: scale(0) rotate(-30deg); transform-origin: bottom center; opacity: 0; }\n  50% { transform: scale(1.15) rotate(10deg); transform-origin: bottom center; opacity: 1; }\n  70% { transform: scale(0.95) rotate(-5deg); transform-origin: bottom center; }\n  85% { transform: scale(1.05) rotate(3deg); transform-origin: bottom center; }\n  100% { transform: scale(1) rotate(0); transform-origin: bottom center; }\n}`,
  'back-in-up':  `@keyframes back-in-up {\n  0% { transform: translateY(70px) scale(0.7); opacity: 0.3; }\n  80% { transform: translateY(0) scale(0.7); opacity: 0.5; }\n  100% { transform: scale(1); opacity: 1; }\n}`,
  'wipe-right':  `@keyframes wipe-right {\n  from { clip-path: inset(0 100% 0 0); }\n  to { clip-path: inset(0 0% 0 0); }\n}`,
  'glow-in':     `@keyframes glow-in {\n  from { opacity: 0; filter: brightness(4) blur(8px); transform: scale(0.9); }\n  60% { filter: brightness(1.5) blur(2px); }\n  to { opacity: 1; filter: brightness(1) blur(0); transform: scale(1); }\n}`,
  'tremble':     `@keyframes tremble {\n  0%, 100% { transform: translate(0, 0) rotate(0deg); }\n  10% { transform: translate(-2px, -1px) rotate(-0.5deg); }\n  20% { transform: translate(2px, 1px) rotate(0.5deg); }\n  30% { transform: translate(-2px, 2px) rotate(-0.4deg); }\n  40% { transform: translate(1px, -2px) rotate(0.4deg); }\n  50% { transform: translate(-2px, 1px) rotate(-0.5deg); }\n  60% { transform: translate(2px, -1px) rotate(0.5deg); }\n  70% { transform: translate(-1px, -2px) rotate(-0.3deg); }\n  80% { transform: translate(1px, 2px) rotate(0.3deg); }\n  90% { transform: translate(-1px, 1px) rotate(-0.2deg); }\n}`,
  'spiral':      `@keyframes spiral {\n  from { transform: rotate(-540deg) scale(0); opacity: 0; }\n  70% { transform: rotate(20deg) scale(1.05); opacity: 1; }\n  100% { transform: rotate(0deg) scale(1); opacity: 1; }\n}`,
  'flip-in':     `@keyframes flip-in {\n  from { transform: perspective(500px) rotateY(-90deg); opacity: 0; }\n  40% { transform: perspective(500px) rotateY(18deg); }\n  70% { transform: perspective(500px) rotateY(-8deg); }\n  100% { transform: perspective(500px) rotateY(0); opacity: 1; }\n}`,
  'gravity':     `@keyframes gravity {\n  0% { transform: translateY(-70px) scaleX(0.95); opacity: 0; }\n  65% { transform: translateY(0) scaleX(1.12) scaleY(0.82); opacity: 1; }\n  80% { transform: translateY(-14px) scaleX(0.96) scaleY(1.06); }\n  92% { transform: translateY(0) scaleX(1.04) scaleY(0.96); }\n  100% { transform: translateY(0) scaleX(1) scaleY(1); }\n}`,
  'vortex':      `@keyframes vortex {\n  from { transform: rotate(0deg) scale(1); opacity: 1; }\n  to { transform: rotate(720deg) scale(0); opacity: 0; }\n}`,
  'tilt-3d':     `@keyframes tilt-3d {\n  from { transform: perspective(500px) rotateX(35deg) rotateY(-25deg) scale(0.75); opacity: 0; }\n  60% { transform: perspective(500px) rotateX(-5deg) rotateY(5deg) scale(1.02); opacity: 1; }\n  100% { transform: perspective(500px) rotateX(0) rotateY(0) scale(1); opacity: 1; }\n}`,
  'compress':    `@keyframes compress {\n  0%, 100% { transform: scaleX(1) scaleY(1); }\n  20% { transform: scaleX(1.45) scaleY(0.6); }\n  45% { transform: scaleX(0.72) scaleY(1.35); }\n  65% { transform: scaleX(1.2) scaleY(0.88); }\n  80% { transform: scaleX(0.95) scaleY(1.05); }\n}`,
  'door-open':   `@keyframes door-open {\n  from { transform: perspective(700px) rotateY(-90deg); transform-origin: left center; opacity: 0; }\n  60% { transform: perspective(700px) rotateY(8deg); transform-origin: left center; opacity: 1; }\n  80% { transform: perspective(700px) rotateY(-4deg); transform-origin: left center; }\n  100% { transform: perspective(700px) rotateY(0deg); transform-origin: left center; opacity: 1; }\n}`,
  'sway':        `@keyframes sway {\n  0%, 100% { transform: rotate(-10deg); transform-origin: top center; }\n  50% { transform: rotate(10deg); transform-origin: top center; }\n}`,
  'materialize': `@keyframes materialize {\n  from { clip-path: circle(0% at 50% 50%); opacity: 0; }\n  to   { clip-path: circle(100% at 50% 50%); opacity: 1; }\n}`,
  'shockwave':   `@keyframes shockwave {\n  0%   { transform: scale(1);   opacity: 1; }\n  100% { transform: scale(2.8); opacity: 0; }\n}`,
  'splat':       `@keyframes splat {\n  0%   { transform: scale(0) rotate(-15deg); opacity: 0; }\n  60%  { transform: scale(1.3) rotate(5deg);  opacity: 1; }\n  75%  { transform: scale(0.9) rotate(-3deg); }\n  88%  { transform: scale(1.08) rotate(1deg); }\n  100% { transform: scale(1) rotate(0); }\n}`,
  'wiggle':      `@keyframes wiggle {\n  0%, 100% { transform: rotate(0deg); }\n  15%  { transform: rotate(-12deg); }\n  30%  { transform: rotate(10deg); }\n  45%  { transform: rotate(-8deg); }\n  60%  { transform: rotate(6deg); }\n  75%  { transform: rotate(-3deg); }\n  90%  { transform: rotate(2deg); }\n}`,
  'whip':        `@keyframes whip {\n  0%   { transform: translateX(-100px) rotate(-8deg); opacity: 0; }\n  30%  { transform: translateX(12px) rotate(3deg);   opacity: 1; }\n  55%  { transform: translateX(-6px) rotate(-1deg); }\n  75%  { transform: translateX(3px); }\n  100% { transform: translateX(0) rotate(0); }\n}`,
  'peel':        `@keyframes peel {\n  from { transform: perspective(500px) rotateX(90deg); transform-origin: bottom center; opacity: 0; }\n  60%  { transform: perspective(500px) rotateX(-10deg); transform-origin: bottom center; opacity: 1; }\n  80%  { transform: perspective(500px) rotateX(5deg);  transform-origin: bottom center; }\n  100% { transform: perspective(500px) rotateX(0);    transform-origin: bottom center; }\n}`,
  'twirl':       `@keyframes twirl {\n  0%   { transform: rotateY(0deg) scale(1); }\n  50%  { transform: rotateY(180deg) scale(0.65); }\n  100% { transform: rotateY(360deg) scale(1); }\n}`,
  'cinematic':   `@keyframes cinematic {\n  from { letter-spacing: 0.6em; opacity: 0; filter: blur(5px); }\n  to   { letter-spacing: normal; opacity: 1; filter: blur(0); }\n}`,
  'neon-flicker':`@keyframes neon-flicker {\n  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1;   filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor); }\n  20%, 24%, 55%                           { opacity: 0.3; filter: none; }\n}`,
  'zoom-in-down':`@keyframes zoom-in-down {\n  from { transform: scale(0.4) translateY(-60px); opacity: 0; }\n  60%  { transform: scale(1.06) translateY(8px);  opacity: 1; }\n  100% { transform: scale(1) translateY(0); }\n}`,
  'fade-up-big': `@keyframes fade-up-big {\n  from { transform: translateY(90px); opacity: 0; }\n  to   { transform: translateY(0);    opacity: 1; }\n}`,
  'shake-y':     `@keyframes shake-y {\n  0%, 100% { transform: translateY(0); }\n  20%  { transform: translateY(-14px); }\n  40%  { transform: translateY(11px); }\n  60%  { transform: translateY(-7px); }\n  80%  { transform: translateY(5px); }\n}`,
  'roll-out':    `@keyframes roll-out {\n  from { transform: translateX(0) rotate(0deg);    opacity: 1; }\n  to   { transform: translateX(100%) rotate(360deg); opacity: 0; }\n}`,
  'rotate-out':  `@keyframes rotate-out {\n  from { transform: rotate(0deg) scale(1);    opacity: 1; }\n  to   { transform: rotate(210deg) scale(0.3); opacity: 0; }\n}`,
  'bounce-out':     `@keyframes bounce-out {\n  0%   { transform: scale(1);    opacity: 1; }\n  20%  { transform: scale(0.95); }\n  45%  { transform: scale(1.12); }\n  100% { transform: scale(0);    opacity: 0; }\n}`,
  'skid':           `@keyframes skid {\n  0%   { transform: translateX(-110px) rotate(-6deg) scaleX(1.3); opacity: 0; }\n  50%  { transform: translateX(10px) rotate(1deg) scaleX(0.88);  opacity: 1; }\n  70%  { transform: translateX(-5px) scaleX(1.05); }\n  85%  { transform: translateX(3px); }\n  100% { transform: translateX(0) rotate(0) scaleX(1); }\n}`,
  'crash-in':       `@keyframes crash-in {\n  0%   { transform: translateY(-90px) rotate(-5deg) scale(1.1); opacity: 0; }\n  40%  { transform: translateY(10px) rotate(2deg) scale(1.02);  opacity: 1; }\n  60%  { transform: translateY(-6px) rotate(-1deg); }\n  78%  { transform: translateY(4px); }\n  100% { transform: translateY(0) rotate(0) scale(1); }\n}`,
  'ricochet':       `@keyframes ricochet {\n  0%   { transform: translate(-70px, -50px); opacity: 0; }\n  30%  { transform: translate(18px, 0);    opacity: 1; }\n  50%  { transform: translate(-10px, -22px); }\n  68%  { transform: translate(7px, 0); }\n  82%  { transform: translate(-4px, -8px); }\n  100% { transform: translate(0, 0); }\n}`,
  'ping':           `@keyframes ping {\n  0%       { transform: scale(1); opacity: 1; }\n  70%, 100%{ transform: scale(2.2); opacity: 0; }\n}`,
  'levitate':       `@keyframes levitate {\n  0%, 100% { transform: translateY(0px);   filter: drop-shadow(0 6px 12px rgba(0,0,0,0.35)); }\n  50%      { transform: translateY(-18px); filter: drop-shadow(0 22px 30px rgba(0,0,0,0.12)); }\n}`,
  'spotlight':      `@keyframes spotlight {\n  from { opacity: 0; transform: scale(0.85); filter: brightness(0) blur(4px); }\n  50%  { filter: brightness(2.5) blur(1px); }\n  to   { opacity: 1; transform: scale(1);    filter: brightness(1) blur(0); }\n}`,
  'orbit':          `@keyframes orbit {\n  from { transform: rotate(0deg) translateX(28px) rotate(0deg); }\n  to   { transform: rotate(360deg) translateX(28px) rotate(-360deg); }\n}`,
  'blur-out':       `@keyframes blur-out {\n  from { filter: blur(0); opacity: 1; transform: scale(1); }\n  to   { filter: blur(16px); opacity: 0; transform: scale(1.06); }\n}`,
  'flip-out-x':     `@keyframes flip-out-x {\n  from { transform: perspective(500px) rotateX(0deg);  opacity: 1; }\n  to   { transform: perspective(500px) rotateX(90deg); opacity: 0; }\n}`,
  'flip-out-y':     `@keyframes flip-out-y {\n  from { transform: perspective(500px) rotateY(0deg);  opacity: 1; }\n  to   { transform: perspective(500px) rotateY(90deg); opacity: 0; }\n}`,
  'slide-out-left': `@keyframes slide-out-left {\n  from { transform: translateX(0);     opacity: 1; }\n  to   { transform: translateX(-100%); opacity: 0; }\n}`,
  'slide-out-right':`@keyframes slide-out-right {\n  from { transform: translateX(0);    opacity: 1; }\n  to   { transform: translateX(100%); opacity: 0; }\n}`,
  'zoom-in-left':   `@keyframes zoom-in-left {\n  from { transform: scale(0.4) translateX(-80px); opacity: 0; }\n  60%  { transform: scale(1.05) translateX(8px);  opacity: 1; }\n  100% { transform: scale(1) translateX(0); }\n}`,
  'zoom-in-right':  `@keyframes zoom-in-right {\n  from { transform: scale(0.4) translateX(80px);  opacity: 0; }\n  60%  { transform: scale(1.05) translateX(-8px); opacity: 1; }\n  100% { transform: scale(1) translateX(0); }\n}`,
  'back-out-down':  `@keyframes back-out-down {\n  0%   { transform: scale(1);   opacity: 1; }\n  20%  { transform: translateY(0) scale(0.7);  opacity: 0.5; }\n  100% { transform: translateY(80px) scale(0.7); opacity: 0; }\n}`,
};

const FILL_MODES = ['none', 'forwards', 'backwards', 'both'];

const BEZIER_PRESETS = [
  { label: 'ease',        v: [0.25, 0.10, 0.25, 1.00] },
  { label: 'ease-in',     v: [0.42, 0.00, 1.00, 1.00] },
  { label: 'ease-out',    v: [0.00, 0.00, 0.58, 1.00] },
  { label: 'ease-in-out', v: [0.42, 0.00, 0.58, 1.00] },
  { label: 'linear',      v: [0.00, 0.00, 1.00, 1.00] },
  { label: 'sharp',       v: [0.40, 0.00, 0.60, 1.00] },
  { label: 'back',        v: [0.34, 1.56, 0.64, 1.00] },
  { label: 'bounce',      v: [0.22, 1.50, 0.36, 1.00] },
  { label: 'elastic',     v: [0.68,-0.55, 0.27, 1.55] },
  { label: 'swift',       v: [0.55, 0.00, 0.10, 1.00] },
];

const S = 150;
const PAD = 22;

function cpToEasing({ x1, y1, x2, y2 }) {
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

function BezierEditor({ cp, onChange }) {
  const svgRef = useRef(null);
  const dragging = useRef(null);

  const a1 = { x: PAD,     y: PAD + S };
  const a2 = { x: PAD + S, y: PAD };
  const p1 = { x: PAD + cp.x1 * S, y: PAD + (1 - cp.y1) * S };
  const p2 = { x: PAD + cp.x2 * S, y: PAD + (1 - cp.y2) * S };

  const getPos = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: cx - rect.left, y: cy - rect.top };
  };

  const onMove = (e) => {
    if (!dragging.current) return;
    const { x, y } = getPos(e);
    const bx = +Math.max(0, Math.min(1, (x - PAD) / S)).toFixed(3);
    const by = +((PAD + S - y) / S).toFixed(3);
    if (dragging.current === 'p1') onChange({ ...cp, x1: bx, y1: by });
    else                           onChange({ ...cp, x2: bx, y2: by });
  };

  const stopDrag = () => { dragging.current = null; };
  const startDrag = (which) => (e) => { e.preventDefault(); dragging.current = which; };

  const totalSize = S + PAD * 2;
  const path = `M ${a1.x} ${a1.y} C ${p1.x} ${p1.y} ${p2.x} ${p2.y} ${a2.x} ${a2.y}`;

  return (
    <div className={styles.bezierPanel}>
      <div className={styles.bezierPresets}>
        {BEZIER_PRESETS.map(p => (
          <button key={p.label} className={styles.bezierPreset}
            onClick={() => onChange({ x1: p.v[0], y1: p.v[1], x2: p.v[2], y2: p.v[3] })}>
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.bezierMain}>
        <svg ref={svgRef} width={totalSize} height={totalSize}
          className={styles.bezierSvg}
          overflow="visible"
          onMouseMove={onMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}
          onTouchMove={onMove} onTouchEnd={stopDrag}>

          <line x1={PAD} y1={PAD} x2={PAD} y2={PAD+S} stroke="var(--border2)" strokeWidth="1"/>
          <line x1={PAD} y1={PAD+S} x2={PAD+S} y2={PAD+S} stroke="var(--border2)" strokeWidth="1"/>
          <line x1={PAD} y1={PAD} x2={PAD+S} y2={PAD} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3"/>
          <line x1={PAD+S} y1={PAD} x2={PAD+S} y2={PAD+S} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3,3"/>
          <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="var(--border2)" strokeWidth="1" strokeDasharray="4,3" opacity="0.5"/>
          <line x1={a1.x} y1={a1.y} x2={p1.x} y2={p1.y} stroke="#7c6aff" strokeWidth="1" opacity="0.45"/>
          <line x1={a2.x} y1={a2.y} x2={p2.x} y2={p2.y} stroke="#ff6a9b" strokeWidth="1" opacity="0.45"/>
          <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx={a1.x} cy={a1.y} r="4" fill="var(--text3)"/>
          <circle cx={a2.x} cy={a2.y} r="4" fill="var(--text3)"/>
          <circle cx={p1.x} cy={p1.y} r="7" fill="#7c6aff" stroke="white" strokeWidth="2"
            style={{ cursor: 'grab' }}
            onMouseDown={startDrag('p1')} onTouchStart={startDrag('p1')}/>
          <circle cx={p2.x} cy={p2.y} r="7" fill="#ff6a9b" stroke="white" strokeWidth="2"
            style={{ cursor: 'grab' }}
            onMouseDown={startDrag('p2')} onTouchStart={startDrag('p2')}/>
        </svg>

        <div className={styles.bezierInfo}>
          <div className={styles.bezierPointLabel} style={{ color: '#7c6aff' }}>
            P1 <span>{cp.x1}, {cp.y1}</span>
          </div>
          <div className={styles.bezierValue}>{cpToEasing(cp)}</div>
          <div className={styles.bezierPointLabel} style={{ color: '#ff6a9b' }}>
            P2 <span>{cp.x2}, {cp.y2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const LS_FAVS = 'fwd-anim-favs';

export default function CssAnimationGeneratorTool() {
  const [selectedId, setSelectedId] = useState('fade-in');
  const [duration, setDuration]     = useState(0.6);
  const [delay, setDelay]           = useState(0);
  const [iterations, setIterations] = useState('1');
  const [easing, setEasing]         = useState('ease');
  const [fill, setFill]             = useState('forwards');
  const [direction, setDirection]   = useState('normal');
  const [tab, setTab]               = useState('css');
  const [copied, setCopied]         = useState(false);
  const [animKey, setAnimKey]       = useState(0);
  const [showBezier, setShowBezier] = useState(false);
  const [cp, setCp]                 = useState({ x1: 0.25, y1: 0.10, x2: 0.25, y2: 1.00 });

  // New features
  const [search, setSearch]         = useState('');
  const [favorites, setFavorites]   = useState([]);
  const [previewEl, setPreviewEl]   = useState('box');
  const [speed, setSpeed]           = useState(1);
  const [darkBg, setDarkBg]         = useState(false);
  const [stagger, setStagger]       = useState(false);
  const [showKfEditor, setShowKfEditor] = useState(false);
  const [customKf, setCustomKf]     = useState('');

  useEffect(() => {
    try { setFavorites(JSON.parse(localStorage.getItem(LS_FAVS) || '[]')); } catch {}
  }, []);

  const handleCpChange = (newCp) => { setCp(newCp); setEasing(cpToEasing(newCp)); };

  const selected  = ANIMATIONS.find(a => a.id === selectedId);
  const kf        = selected ? KEYFRAMES[selected.kf] : '';
  const animName  = selected?.kf || 'fade-in';

  // Use edited keyframes when editor is open, otherwise use preset
  const activeKf  = showKfEditor ? customKf : kf;

  // Reset custom kf when switching animation
  useEffect(() => { setCustomKf(kf); }, [selectedId]);

  const toggleFav = useCallback((id, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem(LS_FAVS, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const filteredAnims = search
    ? ANIMATIONS.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
    : ANIMATIONS;

  const favAnims = !search && favorites.length > 0
    ? ANIMATIONS.filter(a => favorites.includes(a.id))
    : [];

  const makePreviewStyle = (extraDelay = 0) => ({
    animationName:           animName,
    animationDuration:       `${(duration / speed).toFixed(2)}s`,
    animationTimingFunction: easing,
    animationDelay:          `${(delay + extraDelay).toFixed(2)}s`,
    animationIterationCount: iterations,
    animationDirection:      direction,
    animationFillMode:       fill,
  });

  // Code output
  const animVal     = `${animName} ${duration}s ${easing} ${delay}s ${iterations} ${direction} ${fill}`;
  const cssRule     = `.element {\n  animation: ${animVal};\n}`;
  const fullCSS     = `${cssRule}\n\n${activeKf}`;

  const tailwindCode = `/* tailwind.config.js */\nmodule.exports = {\n  theme: {\n    extend: {\n      keyframes: {\n        '${animName}': ${kf.replace(/@keyframes [a-z-]+ /,'').replace(/^\{/,'{\n  ')}\n      },\n      animation: {\n        '${animName}': '${animName} ${duration}s ${easing} ${delay}s ${iterations}',\n      },\n    },\n  },\n};\n\n/* Usage */\n<div className="animate-${animName}">...</div>`;

  const reactCode = `// React component\nconst style = {\n  animation: '${animVal}',\n};\n\n/* Add to global CSS or a <style> tag: */\n${activeKf}`;

  // Fork to My Code: a box running the animation you picked, with its keyframes
  const forkSnippet = () => ({
    name: `CSS Animation — ${animName}`,
    html: '<div class="element">Animate</div>',
    css: `${CENTER_PAGE_CSS}

.element {
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #6366f1;
  color: #fff;
  font-weight: 700;
}

/* The animation you built */
${fullCSS}`,
  });

  const outputCode = tab === 'css' ? fullCSS : tab === 'tailwind' ? tailwindCode : reactCode;

  const copy = () => {
    navigator.clipboard.writeText(outputCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const download = () => {
    const ext = tab === 'react' ? 'jsx' : tab === 'tailwind' ? 'js' : 'css';
    const blob = new Blob([outputCode], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `${animName}.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const replay    = () => setAnimKey(k => k + 1);
  const selectAnim = (id) => { setSelectedId(id); setAnimKey(k => k + 1); };

  const renderAnimBtn = (a) => (
    <button
      key={a.id}
      className={`${styles.animBtn} ${selectedId === a.id ? styles.animBtnActive : ''}`}
      onClick={() => selectAnim(a.id)}
    >
      <span className={styles.animBtnName}>{a.name}</span>
      <span
        className={`${styles.starBtn} ${favorites.includes(a.id) ? styles.starActive : ''}`}
        onClick={(e) => toggleFav(a.id, e)}
        title={favorites.includes(a.id) ? 'Remove favorite' : 'Add to favorites'}
      >
        {favorites.includes(a.id) ? '★' : '☆'}
      </span>
    </button>
  );

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="css-animation-generator" />
      <style>{activeKf}</style>


      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>

          <div className={styles.toolHead}>
            <div className={styles.toolHeadTitle}>
              <div className={styles.headerIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.4"/>
                  <rect x="9" y="2" width="5" height="5" rx="1.5" fill="currentColor"/>
                  <rect x="2" y="9" width="5" height="5" rx="1.5" fill="currentColor"/>
                  <rect x="9" y="9" width="5" height="5" rx="1.5" fill="currentColor" opacity="0.4"/>
                </svg>
              </div>
              <span>CSS <span className={styles.headerAccent}>Animation</span> Generator</span>
            </div>
            <ForkToMyCodeButton getSnippet={forkSnippet} />
          </div>
          <div className={styles.sidebarTitle}>Animations</div>

          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {favAnims.length > 0 && (
            <>
              <div className={styles.favLabel}>★ Favorites</div>
              <div className={styles.animGrid}>{favAnims.map(renderAnimBtn)}</div>
              <div className={styles.favDivider} />
              <div className={styles.favLabel} style={{ color: 'var(--text3)', fontSize: 9 }}>All</div>
            </>
          )}

          <div className={styles.animGrid}>{filteredAnims.map(renderAnimBtn)}</div>
          {filteredAnims.length === 0 && (
            <div className={styles.noResults}>No results</div>
          )}
        </aside>

        {/* Main */}
        <main className={styles.main}>
          {/* Ad space: top of the preview column */}
          <PlaygroundTopAd />


          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Duration</label>
              <input type="range" min={0.1} max={3} step={0.1} value={duration}
                onChange={e => setDuration(+e.target.value)} />
              <span className={styles.ctrlVal}>{duration}s</span>
            </div>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Delay</label>
              <input type="range" min={0} max={2} step={0.1} value={delay}
                onChange={e => setDelay(+e.target.value)} />
              <span className={styles.ctrlVal}>{delay}s</span>
            </div>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Iterations</label>
              <select className={styles.select} value={iterations} onChange={e => setIterations(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="infinite">∞</option>
              </select>
            </div>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Easing</label>
              <button
                className={`${styles.bezierBtn} ${showBezier ? styles.bezierBtnActive : ''}`}
                onClick={() => setShowBezier(v => !v)}
                title="Open cubic-bezier editor"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="1.5" cy="10.5" r="1.5" fill="currentColor" opacity="0.5"/>
                  <circle cx="10.5" cy="1.5" r="1.5" fill="currentColor" opacity="0.5"/>
                  <circle cx={1.5 + cp.x1 * 9} cy={10.5 - cp.y1 * 9} r="2" fill="#7c6aff"/>
                  <circle cx={1.5 + cp.x2 * 9} cy={10.5 - cp.y2 * 9} r="2" fill="#ff6a9b"/>
                  <path d={`M 1.5 10.5 C ${1.5+cp.x1*9} ${10.5-cp.y1*9} ${1.5+cp.x2*9} ${10.5-cp.y2*9} 10.5 1.5`}
                    fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
                </svg>
                <span className={styles.bezierBtnLabel}>{easing.startsWith('cubic') ? 'custom' : easing}</span>
                <span style={{ opacity: 0.5, fontSize: 9 }}>▾</span>
              </button>
            </div>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Fill</label>
              <select className={styles.select} value={fill} onChange={e => setFill(e.target.value)}>
                {FILL_MODES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className={styles.ctrlGroup}>
              <label className={styles.ctrlLabel}>Direction</label>
              <select className={styles.select} value={direction} onChange={e => setDirection(e.target.value)}>
                <option value="normal">normal</option>
                <option value="reverse">reverse</option>
                <option value="alternate">alternate</option>
                <option value="alternate-reverse">alt-reverse</option>
              </select>
            </div>
          </div>

          {/* Bezier Editor */}
          {showBezier && <BezierEditor cp={cp} onChange={handleCpChange} />}

          {/* Preview Options */}
          <div className={styles.previewOpts}>
            <div className={styles.previewOptGroup}>
              <span className={styles.optLabel}>Element</span>
              {['box','button','text','card'].map(el => (
                <button key={el}
                  className={`${styles.optBtn} ${previewEl === el ? styles.optBtnActive : ''}`}
                  onClick={() => setPreviewEl(el)}>
                  {el}
                </button>
              ))}
            </div>
            <div className={styles.previewOptGroup}>
              <span className={styles.optLabel}>Speed</span>
              {[[0.25,'¼×'],[0.5,'½×'],[1,'1×']].map(([s, lbl]) => (
                <button key={s}
                  className={`${styles.optBtn} ${speed === s ? styles.optBtnActive : ''}`}
                  onClick={() => setSpeed(s)}>
                  {lbl}
                </button>
              ))}
            </div>
            <div className={styles.previewOptGroup}>
              <button
                className={`${styles.optBtn} ${darkBg ? styles.optBtnActive : ''}`}
                onClick={() => setDarkBg(v => !v)}>
                Dark BG
              </button>
            </div>
            <div className={styles.previewOptGroup}>
              <button
                className={`${styles.optBtn} ${stagger ? styles.optBtnActive : ''}`}
                onClick={() => setStagger(v => !v)}>
                Stagger×3
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className={`${styles.preview} ${darkBg ? styles.previewDark : ''}`}>
            {stagger ? (
              <div className={styles.staggerRow}>
                {[0, 1, 2].map(i => (
                  <div key={`${animKey}-${i}`}
                    style={makePreviewStyle(i * 0.18)}
                    className={styles.previewBox}>
                    {i + 1}
                  </div>
                ))}
              </div>
            ) : previewEl === 'button' ? (
              <button key={animKey} style={makePreviewStyle()} className={styles.prevBtn}>
                Click Me
              </button>
            ) : previewEl === 'text' ? (
              <p key={animKey} style={makePreviewStyle()} className={styles.prevText}>
                Hello World!
              </p>
            ) : previewEl === 'card' ? (
              <div key={animKey} style={makePreviewStyle()} className={styles.prevCard}>
                <strong>Card Title</strong>
                <span>Preview content goes here.</span>
              </div>
            ) : (
              <div key={animKey} style={makePreviewStyle()} className={styles.previewBox}>
                Preview
              </div>
            )}
            <button className={styles.replayBtn} onClick={replay}>↺ Replay</button>
          </div>

          {/* Keyframe Editor */}
          {showKfEditor && (
            <div className={styles.kfPanel}>
              <div className={styles.kfHeader}>
                <span>Edit @keyframes</span>
                <button className={styles.kfResetBtn} onClick={() => setCustomKf(kf)}>Reset</button>
              </div>
              <textarea
                className={styles.kfTextarea}
                value={customKf}
                onChange={e => setCustomKf(e.target.value)}
                spellCheck={false}
              />
            </div>
          )}

          {/* Code output */}
          <div className={styles.codeArea}>
            <div className={styles.codeTabs}>
              {['css', 'tailwind', 'react'].map(t => (
                <button key={t}
                  className={`${styles.codeTab} ${tab === t ? styles.codeTabActive : ''}`}
                  onClick={() => setTab(t)}>
                  {t === 'react' ? 'React' : t.toUpperCase()}
                </button>
              ))}
              <button
                className={`${styles.codeTab} ${showKfEditor ? styles.codeTabActive : ''}`}
                onClick={() => { if (!showKfEditor) setCustomKf(kf); setShowKfEditor(v => !v); }}>
                Edit KF
              </button>
            </div>
            <div className={styles.codeWrap}>
              <pre className={styles.codeBlock}>{outputCode}</pre>
              <div className={styles.codeActions}>
                <button className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`} onClick={copy}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className={styles.dlBtn} onClick={download}>↓ DL</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
