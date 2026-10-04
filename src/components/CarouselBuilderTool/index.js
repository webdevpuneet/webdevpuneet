'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';
import CssToolsTopNav from '@/components/CssToolsTopNav';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';

/* ══════════════════════════════════════════════════════════
   Constants & defaults
══════════════════════════════════════════════════════════ */

const BG_PALETTE = [
  '#1e3a5f','#1a3a2a','#3a1a2e','#2d1a3a',
  '#1a2a3a','#3a2a1a','#0f172a','#1e1b4b',
  '#083344','#14532d','#7c2d12','#1c1917',
];

let _uid = 4;
const uid = () => _uid++;

const SLIDE_DEFAULTS = {
  bgType: 'solid', bgTo: '#1e1b4b', bgAngle: 135,
  align: 'center', ctaLabel: '', ctaUrl: '', ctaBg: '',
  titleSize: 28, descSize: 14,
  img: '', imgFit: 'cover',
};

function mkSlide(patch) { return { ...SLIDE_DEFAULTS, ...patch }; }

const DEF_SLIDES = [
  mkSlide({ id: 1, bg: '#1e3a5f', bgTo: '#083344', emoji: '🚀', title: 'First Slide',  desc: 'Add your first slide content here.' }),
  mkSlide({ id: 2, bg: '#1a3a2a', bgTo: '#14532d', emoji: '✨', title: 'Second Slide', desc: 'Customize each slide independently.' }),
  mkSlide({ id: 3, bg: '#3a1a2e', bgTo: '#2d1a3a', emoji: '🎨', title: 'Third Slide',  desc: 'Change colors, text, and more.' }),
];

const TEMPLATES = [
  {
    label: 'Hero', icon: '▦',
    cfg: { direction: 'horizontal', transition: 'slide', perView: 1 },
    slides: [
      mkSlide({ bg: '#0f172a', bgTo: '#1e1b4b', emoji: '🚀', title: 'Launch Something Great',   desc: 'The fastest way to build and ship your next big idea.',    ctaLabel: 'Get Started', ctaUrl: '#' }),
      mkSlide({ bg: '#1e1b4b', bgTo: '#083344', emoji: '⚡', title: 'Blazing Fast Performance', desc: 'Optimised for speed at every layer of the stack.',           ctaLabel: 'Learn More',  ctaUrl: '#' }),
      mkSlide({ bg: '#083344', bgTo: '#0f172a', emoji: '🛡️', title: 'Secure by Default',        desc: 'Enterprise-grade security built in from day one.',           ctaLabel: 'See Docs',    ctaUrl: '#' }),
    ],
  },
  {
    label: 'Testimonials', icon: '💬',
    cfg: { direction: 'horizontal', transition: 'fade', perView: 1 },
    slides: [
      mkSlide({ bg: '#1a2a3a', bgTo: '#0f172a', emoji: '⭐', title: '"Absolutely fantastic tool!"',     desc: '— Sarah K., Frontend Developer' }),
      mkSlide({ bg: '#1a3a2a', bgTo: '#083344', emoji: '⭐', title: '"Saved us weeks of work."',        desc: '— James R., Product Manager' }),
      mkSlide({ bg: '#2d1a3a', bgTo: '#1e1b4b', emoji: '⭐', title: '"Best carousel builder out there."', desc: '— Priya M., UI Designer' }),
    ],
  },
  {
    label: 'Products', icon: '🛍️',
    cfg: { direction: 'horizontal', transition: 'slide', perView: 3 },
    slides: [
      mkSlide({ bg: '#1e3a5f', bgTo: '#083344', emoji: '👟', title: 'Running Shoes', desc: 'From $89.99',  ctaLabel: 'Shop Now', ctaUrl: '#' }),
      mkSlide({ bg: '#3a1a2e', bgTo: '#2d1a3a', emoji: '👜', title: 'Leather Bag',   desc: 'From $129.99', ctaLabel: 'Shop Now', ctaUrl: '#' }),
      mkSlide({ bg: '#1a3a2a', bgTo: '#14532d', emoji: '⌚', title: 'Smart Watch',   desc: 'From $199.99', ctaLabel: 'Shop Now', ctaUrl: '#' }),
      mkSlide({ bg: '#2d1a3a', bgTo: '#1e1b4b', emoji: '🕶️', title: 'Sunglasses',   desc: 'From $59.99',  ctaLabel: 'Shop Now', ctaUrl: '#' }),
    ],
  },
  {
    label: 'Steps', icon: '⇅',
    cfg: { direction: 'vertical', transition: 'slide', perView: 1 },
    slides: [
      mkSlide({ bg: '#0f172a', bgTo: '#1e1b4b', emoji: '1️⃣', title: 'Sign Up Free',         desc: 'Create your account in under 60 seconds.' }),
      mkSlide({ bg: '#1e1b4b', bgTo: '#083344', emoji: '2️⃣', title: 'Configure Your Setup', desc: 'Choose from templates and customise every detail.' }),
      mkSlide({ bg: '#083344', bgTo: '#0f172a', emoji: '3️⃣', title: 'Go Live',              desc: 'Publish with one click and reach your audience.' }),
    ],
  },
];

const LS_KEY = 'carousel-builder-v1';

const DEF_CFG = {
  showArrows:    true,
  showDots:      true,
  arrowStyle:    'circle',
  dotStyle:      'circle',
  transition:    'slide',
  direction:     'horizontal',
  perView:       1,
  gap:           0,
  duration:      400,
  autoplay:      false,
  autoplaySpeed: 3000,
  loop:          true,
  pauseOnHover:  true,
  accent:        '#34d399',
  radius:        12,
  height:        320,
  overlay:       0,
};

/* ══════════════════════════════════════════════════════════
   Background helper
══════════════════════════════════════════════════════════ */

function slideBg(s) {
  if (s.bgType === 'gradient') {
    return `linear-gradient(${s.bgAngle ?? 135}deg, ${s.bg}, ${s.bgTo ?? '#1e1b4b'})`;
  }
  return s.bg;
}

/* ══════════════════════════════════════════════════════════
   Code generators
══════════════════════════════════════════════════════════ */

const SVG_PREV = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
const SVG_NEXT = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
const SVG_UP   = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
const SVG_DOWN = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

function genHtml(slides, cfg) {
  const T = '  ';
  const slideHtml = slides.map((s, i) => {
    const bg = s.bgType === 'gradient'
      ? `linear-gradient(${s.bgAngle ?? 135}deg, ${s.bg}, ${s.bgTo ?? '#1e1b4b'})`
      : s.bg;
    const bgStyle = s.img
      ? `background-color: ${s.bg}; background-image: url('${s.img}'); background-size: ${s.imgFit}; background-position: center; background-repeat: no-repeat;`
      : `background: ${bg};`;
    const align = s.align || 'center';
    const titleSize = s.titleSize || 28;
    const descSize  = s.descSize  || 14;
    return [
      `${T}${T}<li class="carousel__slide${i === 0 ? ' is-selected' : ''}" style="${bgStyle}">`,
      `${T}${T}${T}<div class="carousel__overlay"></div>`,
      `${T}${T}${T}<div class="carousel__content" style="text-align:${align}">`,
      s.emoji ? `${T}${T}${T}${T}<div class="carousel__badge">${s.emoji}</div>` : null,
      `${T}${T}${T}${T}<h2 class="carousel__title" style="font-size:${titleSize}px">${s.title}</h2>`,
      `${T}${T}${T}${T}<p class="carousel__desc" style="font-size:${descSize}px">${s.desc}</p>`,
      s.ctaLabel ? `${T}${T}${T}${T}<a class="carousel__cta"${s.ctaBg ? ` style="background:${s.ctaBg}"` : ''} href="${s.ctaUrl || '#'}">${s.ctaLabel}</a>` : null,
      `${T}${T}${T}</div>`,
      `${T}${T}</li>`,
    ].filter(Boolean).join('\n');
  }).join('\n');

  const isVert    = cfg.direction === 'vertical';
  const useVert   = cfg.transition === 'slide' && isVert;
  const svgPrev = useVert ? SVG_UP   : SVG_PREV;
  const svgNext = useVert ? SVG_DOWN : SVG_NEXT;

  const arrowHtml = cfg.showArrows
    ? `\n${T}<button class="carousel__btn carousel__btn--prev" aria-label="Previous slide">\n${T}${T}${svgPrev}\n${T}</button>\n${T}<button class="carousel__btn carousel__btn--next" aria-label="Next slide">\n${T}${T}${svgNext}\n${T}</button>`
    : '';

  const dotsHtml = cfg.showDots
    ? `\n${T}<div class="carousel__dots" role="tablist" aria-label="Slide navigation">\n${slides.map((_, i) => `${T}${T}<button class="carousel__dot${i === 0 ? ' is-selected' : ''}" role="tab" aria-label="Slide ${i + 1}" aria-selected="${i === 0}"></button>`).join('\n')}\n${T}</div>`
    : '';

  const dataAttrs = [
    cfg.autoplay ? `data-autoplay="true" data-speed="${cfg.autoplaySpeed}"` : null,
    !cfg.loop    ? `data-loop="false"` : null,
    cfg.loop && cfg.infinite && cfg.transition === 'slide' ? `data-infinite="true"` : null,
    useVert      ? `data-direction="vertical"` : null,
    cfg.transition !== 'slide' ? `data-transition="${cfg.transition}"` : null,
  ].filter(Boolean).join(' ');

  return `<div class="carousel"${dataAttrs ? ' ' + dataAttrs : ''} data-carousel>
${T}<div class="carousel__viewport">
${T}${T}<ul class="carousel__track">
${slideHtml}
${T}${T}</ul>
${T}</div>${arrowHtml}${dotsHtml}
</div>`;
}

function genCss(cfg) {
  const isSlide   = cfg.transition === 'slide';
  const isFade    = cfg.transition === 'fade';
  const isZoom    = cfg.transition === 'zoom';
  const isFlip    = cfg.transition === 'flip';
  const isBlur    = cfg.transition === 'blur';
  const isOverlay = !isSlide;
  const isVert    = cfg.direction === 'vertical';
  const useVert   = isSlide && isVert; // only slide uses vertical track layout

  const arrowR  = cfg.arrowStyle === 'circle' ? '50%' : cfg.arrowStyle === 'square' ? '6px' : '0';
  const arrowBg = cfg.arrowStyle === 'minimal' ? 'transparent' : 'rgba(0,0,0,0.45)';
  const arrowBgH= cfg.arrowStyle === 'minimal' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.75)';

  const dotW  = useVert ? (cfg.dotStyle === 'dash' ? '3px'  : '8px') : (cfg.dotStyle === 'dash' ? '20px' : '8px');
  const dotH  = useVert ? (cfg.dotStyle === 'dash' ? '20px' : '8px') : (cfg.dotStyle === 'dash' ? '3px'  : '8px');
  const dotR  = cfg.dotStyle === 'square' ? '2px' : '50%';
  const dotAH = useVert && cfg.dotStyle === 'dash' ? '32px' : dotH;
  const dotAW = !useVert && cfg.dotStyle === 'dash' ? '32px' : dotW;
  const dotScl= cfg.dotStyle === 'circle' ? 'scale(1.3)' : 'none';

  const viewportCss = isOverlay
    ? 'overflow: hidden;\n  position: relative;\n  height: var(--c-height);'
    : useVert
      ? 'overflow: hidden;\n  height: var(--c-height);'
      : 'overflow: hidden;';

  const trackCss = isOverlay
    ? 'display: block;\n  list-style: none;\n  margin: 0;\n  padding: 0;'
    : useVert
      ? 'display: flex;\n  flex-direction: column;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: var(--c-gap);\n  transition: transform var(--c-duration) ease-in-out;'
      : 'display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: var(--c-gap);\n  transition: transform var(--c-duration) ease-in-out;';

  const perView = isOverlay ? 1 : (cfg.perView || 1);
  const slideBaseCss = isOverlay
    ? 'position: absolute;\n  inset: 0;'
    : useVert
      ? `flex-shrink: 0;\n  width: 100%;\n  height: calc((var(--c-height) - (var(--c-per-view) - 1) * var(--c-gap)) / var(--c-per-view)) !important;`
      : `min-width: calc((100% - (var(--c-per-view) - 1) * var(--c-gap)) / var(--c-per-view));`;

  // Per-transition overlay animation
  const overlayCss = isFade ? `
.carousel__slide {
  opacity: 0;
  transition: opacity var(--c-duration) ease-in-out;
}
.carousel__slide.is-selected { opacity: 1; z-index: 1; }
` : isZoom ? `
.carousel__slide {
  opacity: 0;
  transform: scale(1.1);
  transition: opacity var(--c-duration) ease-in-out, transform var(--c-duration) ease-in-out;
}
.carousel__slide.is-selected { opacity: 1; z-index: 1; transform: scale(1); }
` : isFlip ? `
.carousel { perspective: 1200px; }
.carousel__slide {
  opacity: 0;
  transform: rotateY(-90deg);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: opacity var(--c-duration) ease-in-out, transform var(--c-duration) ease-in-out;
}
.carousel__slide.is-selected { opacity: 1; z-index: 1; transform: rotateY(0deg); }
` : isBlur ? `
.carousel__slide {
  opacity: 0;
  filter: blur(10px);
  transition: opacity var(--c-duration) ease-in-out, filter var(--c-duration) ease-in-out;
}
.carousel__slide.is-selected { opacity: 1; z-index: 1; filter: blur(0px); }
` : '';

  const arrowsCss = useVert ? `
/* Arrows */
.carousel__btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${arrowR};
  background: ${arrowBg};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #fff;
  cursor: pointer;
  transition: background var(--c-duration), transform .15s;
}

.carousel__btn:hover {
  background: ${arrowBgH};
  transform: translateX(-50%) scale(1.08);
}

.carousel__btn--prev { top: 12px; }
.carousel__btn--next { bottom: 12px; }
` : `
/* Arrows */
.carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${arrowR};
  background: ${arrowBg};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  color: #fff;
  cursor: pointer;
  transition: background var(--c-duration), transform .15s;
}

.carousel__btn:hover {
  background: ${arrowBgH};
  transform: translateY(-50%) scale(1.08);
}

.carousel__btn--prev { left: 12px; }
.carousel__btn--next { right: 12px; }
`;

  const dotsCss = useVert ? `
/* Dots */
.carousel__dots {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 10;
}

.carousel__dot {
  width: ${dotW};
  height: ${dotH};
  padding: 0;
  border: none;
  border-radius: ${dotR};
  background: rgba(255,255,255,.4);
  cursor: pointer;
  transition: background .2s, height .2s, transform .2s;
}

.carousel__dot.is-selected {
  height: ${dotAH};
  background: var(--c-accent);
  transform: ${dotScl};
}
` : `
/* Dots */
.carousel__dots {
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
}

.carousel__dot {
  width: ${dotW};
  height: ${dotH};
  padding: 0;
  border: none;
  border-radius: ${dotR};
  background: rgba(255,255,255,.4);
  cursor: pointer;
  transition: background .2s, width .2s, transform .2s;
}

.carousel__dot.is-selected {
  width: ${dotAW};
  background: var(--c-accent);
  transform: ${dotScl};
}
`;

  return `/* ─────────────────────────────────────────────────────
   Carousel — DevTools Carousel Builder
   https://webdevpuneet.com/carousel-builder
──────────────────────────────────────────────────── */

.carousel {
  --c-accent:    ${cfg.accent};
  --c-duration:  ${cfg.duration}ms;
  --c-radius:    ${cfg.radius}px;
  --c-height:    ${cfg.height}px;
  --c-per-view:  ${perView};
  --c-gap:       ${cfg.gap || 0}px;
  --c-overlay:   ${((cfg.overlay || 0) / 100).toFixed(2)};

  position: relative;
  width: 100%;
  border-radius: var(--c-radius);
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
}

/* Viewport */
.carousel__viewport {
  ${viewportCss}
}

/* Track */
.carousel__track {
  ${trackCss}
}

/* Slides */
.carousel__slide {
  ${slideBaseCss}
  ${useVert ? '' : 'height: var(--c-height);'}
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
${overlayCss}
/* Overlay (image tint) */
.carousel__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,var(--c-overlay));
  pointer-events: none;
  z-index: 1;
}

/* Content */
.carousel__content {
  position: relative;
  z-index: 2;
  color: #ffffff;
  padding: 2rem;
  max-width: 540px;
}

.carousel__badge { font-size: 2.5rem; line-height: 1; margin-bottom: .75rem; }
.carousel__title { font-weight: 700; margin: 0 0 .5rem; line-height: 1.2; }
.carousel__desc  { margin: 0; opacity: .8; line-height: 1.6; }

/* CTA button */
.carousel__cta {
  display: inline-block;
  margin-top: 1rem;
  padding: .5rem 1.5rem;
  border-radius: 6px;
  background: var(--c-accent);
  color: #fff;
  text-decoration: none;
  font-size: .875rem;
  font-weight: 600;
  transition: opacity .15s;
}
.carousel__cta:hover { opacity: .85; }
${cfg.showArrows ? arrowsCss : ''}${cfg.showDots ? dotsCss : ''}`;
}

function genJs(cfg) {
  const isSlide = cfg.transition === 'slide';
  const isVert  = cfg.direction === 'vertical';
  const gap     = cfg.gap || 0;
  const dur     = cfg.duration || 400;
  const useInf  = cfg.loop && cfg.infinite && isSlide;

  const moveTrackFn = isVert
    ? `const h = (this.slides[0]?.offsetHeight || 0) + ${gap};\n      this.track.style.transform = \`translateY(-\${idx * h}px)\`;`
    : `const w = (this.slides[0]?.offsetWidth || 0) + ${gap};\n      this.track.style.transform = \`translateX(-\${idx * w}px)\`;`;

  const renderSlide = isSlide
    ? (isVert
        ? `if (this.track) {\n      const h = (this.slides[0]?.offsetHeight || 0) + ${gap};\n      this.track.style.transform = \`translateY(-\${this.current * h}px)\`;\n    }`
        : `if (this.track) {\n      const w = (this.slides[0]?.offsetWidth || 0) + ${gap};\n      this.track.style.transform = \`translateX(-\${this.current * w}px)\`;\n    }`)
    : '';

  return `/* ─────────────────────────────────────────────────────
   Carousel — DevTools Carousel Builder
   https://webdevpuneet.com/carousel-builder
──────────────────────────────────────────────────── */

class Carousel {
  constructor(root, options = {}) {
    this.opt = {
      loop: true, autoplay: false, infinite: false,
      speed: 3000, pauseOnHover: true,
      ...options,
    };
    this.root    = root;
    this.track   = root.querySelector('.carousel__track');
    this.slides  = [...root.querySelectorAll('.carousel__slide')];
    this.dots    = [...root.querySelectorAll('.carousel__dot')];
    this.current = 0;
    this._timer  = null;
    this._busy   = false;
    this._inf    = this.opt.loop && this.opt.infinite;
    this._dir    = root.dataset.direction || 'horizontal';

    root.querySelector('.carousel__btn--prev')
      ?.addEventListener('click', () => this.prev());
    root.querySelector('.carousel__btn--next')
      ?.addEventListener('click', () => this.next());
    this.dots.forEach((d, i) =>
      d.addEventListener('click', () => this.goTo(i)));

    if (this.opt.pauseOnHover) {
      root.addEventListener('mouseenter', () => this._stop());
      root.addEventListener('mouseleave', () => {
        if (this.opt.autoplay) this._play();
      });
    }

    /* Touch / swipe */
    let _sx = 0, _sy = 0;
    root.addEventListener('touchstart', e => {
      _sx = e.touches[0].clientX;
      _sy = e.touches[0].clientY;
    }, { passive: true });
    root.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - _sx;
      const dy = e.changedTouches[0].clientY - _sy;
      const delta = this._dir === 'vertical' ? dy : dx;
      if (Math.abs(delta) > 50) delta < 0 ? this.next() : this.prev();
    }, { passive: true });

    if (this._inf) this._initInfinite();
    if (this.opt.autoplay) this._play();
    this._render();
  }

${useInf ? `  _initInfinite() {
    const pv  = ${cfg.perView || 1};
    const len = this.slides.length;
    const copies = Math.max(3, Math.ceil(pv * 3 / len));
    const offset = copies * len;
    // Clone enough copies on each side so viewport is always filled
    const firstChild = this.track.firstChild;
    for (let c = copies - 1; c >= 0; c--) {
      for (let j = len - 1; j >= 0; j--) {
        const cl = this.slides[j].cloneNode(true);
        cl.setAttribute('aria-hidden', 'true');
        this.track.insertBefore(cl, firstChild);
      }
    }
    for (let c = 0; c < copies; c++) {
      for (let j = 0; j < len; j++) {
        const cl = this.slides[j].cloneNode(true);
        cl.setAttribute('aria-hidden', 'true');
        this.track.appendChild(cl);
      }
    }
    this._pv     = pv;
    this._len    = len;
    this._copies = copies;
    this._vIdx   = offset; // real slide[0] is at this index
    this._offset = offset;
    this._moveTrack(offset, false);
  }

  _moveTrack(idx, animate) {
    if (!animate) this.track.style.transition = 'none';
    ${moveTrackFn}
    if (!animate) { this.track.offsetHeight; this.track.style.transition = ''; }
  }

  _syncDots() {
    this.dots.forEach((d, i) => {
      d.classList.toggle('is-selected', i === this.current);
      d.setAttribute('aria-selected', i === this.current);
    });
    this.slides.forEach((s, i) => s.classList.toggle('is-selected', i === this.current));
  }

` : ''}  goTo(n) {
    const len = this.slides.length;
    if (!this.opt.loop && (n < 0 || n >= len)) return;
    this.current = (n + len) % len;
    this._render();
  }

  next() {
${useInf ? `    if (this._inf) {
      if (this._busy) return;
      this._busy = true;
      this._vIdx++;
      this._moveTrack(this._vIdx, true);
      this.current = (this.current + 1) % this.slides.length;
      this._syncDots();
      setTimeout(() => {
        // Snap back to centre copy so we never run out of buffer
        if (this.current === 0) { this._moveTrack(this._offset, false); this._vIdx = this._offset; }
        this._busy = false;
      }, ${dur} + 30);
      return;
    }
` : ''}    this.goTo(this.current + 1);
  }

  prev() {
${useInf ? `    if (this._inf) {
      if (this._busy) return;
      this._busy = true;
      this._vIdx--;
      this._moveTrack(this._vIdx, true);
      this.current = (this.current - 1 + this.slides.length) % this.slides.length;
      this._syncDots();
      setTimeout(() => {
        if (this.current === this.slides.length - 1) { this._moveTrack(this._offset + this.slides.length - 1, false); this._vIdx = this._offset + this.slides.length - 1; }
        this._busy = false;
      }, ${dur} + 30);
      return;
    }
` : ''}    this.goTo(this.current - 1);
  }

  _render() {
    this.slides.forEach((s, i) =>
      s.classList.toggle('is-selected', i === this.current));
    this.dots.forEach((d, i) => {
      d.classList.toggle('is-selected', i === this.current);
      d.setAttribute('aria-selected', i === this.current);
    });
    ${renderSlide}
  }

  _play() {
    clearInterval(this._timer);
    this._timer = setInterval(() => this.next(), this.opt.speed);
  }

  _stop()    { clearInterval(this._timer); }
  destroy()  { this._stop(); }
}

/* Init — runs after DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach(el =>
    new Carousel(el, {
      loop:     el.dataset.loop !== 'false',
      infinite: el.dataset.infinite === 'true',
      autoplay: el.dataset.autoplay === 'true',
      speed:    Number(el.dataset.speed) || 3000,
    })
  );
});`;
}

function genReact(slides, cfg) {
  const data = slides.map(s => {
    const bg = s.bgType === 'gradient'
      ? `linear-gradient(${s.bgAngle ?? 135}deg, ${s.bg}, ${s.bgTo ?? '#1e1b4b'})`
      : s.bg;
    const parts = [
      `bg: '${bg}'`,
      `emoji: '${s.emoji}'`,
      `title: '${s.title}'`,
      `desc: '${s.desc}'`,
      `align: '${s.align || 'center'}'`,
      `titleSize: ${s.titleSize || 28}`,
      `descSize: ${s.descSize || 14}`,
      s.ctaLabel ? `ctaLabel: '${s.ctaLabel}'` : null,
      s.ctaUrl   ? `ctaUrl: '${s.ctaUrl}'`     : null,
      s.ctaBg    ? `ctaBg: '${s.ctaBg}'`       : null,
      s.img      ? `img: '${s.img}', imgFit: '${s.imgFit || 'cover'}'` : null,
    ].filter(Boolean).join(', ');
    return `  { ${parts} },`;
  }).join('\n');

  const isSlide   = cfg.transition === 'slide';
  const isVert    = cfg.direction === 'vertical';
  const isOverlay = !isSlide;
  const useVert   = isSlide && isVert;
  const perView   = isOverlay ? 1 : (cfg.perView || 1);
  const gap       = cfg.gap || 0;
  const overlay   = ((cfg.overlay || 0) / 100).toFixed(2);
  const slideHeight = (cfg.height - (perView - 1) * gap) / perView;

  const prevPoints = useVert ? '18 15 12 9 6 15' : '15 18 9 12 15 6';
  const nextPoints = useVert ? '6 9 12 15 18 9'  : '9 18 15 12 9 6';

  const useInfinite = cfg.loop && isSlide;
  const dur = cfg.duration || 400;

  return `import { useState, useEffect, useRef, useCallback } from 'react';
import './carousel.css';

const SLIDES = [
${data}
];
${useInfinite ? `const _INF_COPIES = Math.max(3, Math.ceil(${perView} * 3 / SLIDES.length));
const _INF_OFFSET = _INF_COPIES * SLIDES.length;
const EXT_SLIDES  = Array.from({ length: _INF_COPIES * 2 + 1 }, () => SLIDES).flat();` : ''}

export default function Carousel({
  autoplay     = ${cfg.autoplay},
  speed        = ${cfg.autoplaySpeed},
  loop         = ${cfg.loop},
  infinite     = ${cfg.infinite},
  pauseOnHover = ${cfg.pauseOnHover},
}) {
  const [current, setCurrent] = useState(0);
  const [stepPx, setStepPx]   = useState(0);
${useInfinite ? `  const [visualIdx, setVisualIdx] = useState(_INF_OFFSET);
  const [noTrans, setNoTrans]     = useState(true);
  const prevCurrent = useRef(0);
` : ''}  const timer        = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const measure = () => {
      const vp = containerRef.current?.querySelector('.carousel__viewport');
      if (!vp) return;
      setStepPx((vp.clientWidth - (${perView} - 1) * ${gap}) / ${perView} + ${gap});
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

${useInfinite ? `  useEffect(() => {
    setNoTrans(false);
    setTimeout(() => setNoTrans(false), 50); // enable transitions after mount
  }, []);

  useEffect(() => {
    const prev = prevCurrent.current;
    prevCurrent.current = current;
    const len = SLIDES.length;
    if (prev === len - 1 && current === 0) {
      setNoTrans(false);
      setVisualIdx(v => v + 1);
      setTimeout(() => {
        setNoTrans(true); setVisualIdx(_INF_OFFSET);
        requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
      }, ${dur} + 30);
    } else if (prev === 0 && current === len - 1) {
      setNoTrans(false);
      setVisualIdx(v => v - 1);
      setTimeout(() => {
        setNoTrans(true); setVisualIdx(_INF_OFFSET + len - 1);
        requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
      }, ${dur} + 30);
    } else {
      setNoTrans(false); setVisualIdx(_INF_OFFSET + current);
    }
  }, [current]);

` : ''}  const goTo = useCallback((n) => {
    const len = SLIDES.length;
    if (!loop && (n < 0 || n >= len)) return;
    setCurrent((n + len) % len);
  }, [loop]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (!autoplay) return;
    timer.current = setInterval(next, speed);
    return () => clearInterval(timer.current);
  }, [autoplay, speed, next]);

  const pause  = () => { if (pauseOnHover) clearInterval(timer.current); };
  const resume = () => {
    if (pauseOnHover && autoplay)
      timer.current = setInterval(next, speed);
  };

  const touch = useRef({});
  const onTouchStart = e => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd   = e => {
    const dx = e.changedTouches[0].clientX - (touch.current.x || 0);
    const dy = e.changedTouches[0].clientY - (touch.current.y || 0);
    const delta = ${useVert} ? dy : dx;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
  };

${useInfinite ? `  const tIdx = visualIdx;
  const transProp = noTrans ? 'none' : 'transform ${dur}ms ease-in-out';
` : ''}  return (
    <div ref={containerRef} className="carousel"
      onMouseEnter={pause} onMouseLeave={resume}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
    >
      <div className="carousel__viewport">
        <ul
          className="carousel__track"${isSlide ? `
          style={{ transform: ${useInfinite
            ? (useVert
                ? `\`translateY(-\${tIdx * ${slideHeight + gap}}px)\`, transition: transProp`
                : `\`translateX(-\${tIdx * stepPx}px)\`, transition: transProp`)
            : (useVert
                ? `\`translateY(-\${current * ${slideHeight + gap}}px)\``
                : `stepPx > 0 ? \`translateX(-\${current * stepPx}px)\` : \`translateX(-\${current * ${100 / perView}}%)\``)
          }, gap: '${gap}px' }}` : ''}
        >
          {${useInfinite ? 'EXT_SLIDES' : 'SLIDES'}.map((s, i) => (
            <li
              key={i}
              className={\`carousel__slide\${${useInfinite ? 'i === visualIdx' : 'i === current'} ? ' is-selected' : ''}\`}
              style={{
                background: s.bg,
                ...(s.img ? { backgroundImage: \`url(\${s.img})\`, backgroundSize: s.imgFit || 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' } : {}),
              }}
              aria-hidden={i !== current}
            >
              <div className="carousel__overlay" />
              <div className="carousel__content" style={{ textAlign: s.align || 'center' }}>
                {s.emoji && <div className="carousel__badge">{s.emoji}</div>}
                <h2 className="carousel__title" style={{ fontSize: s.titleSize || 28 }}>{s.title}</h2>
                <p className="carousel__desc" style={{ fontSize: s.descSize || 14 }}>{s.desc}</p>
                {s.ctaLabel && (
                  <a className="carousel__cta" href={s.ctaUrl || '#'} style={s.ctaBg ? { background: s.ctaBg } : undefined}>{s.ctaLabel}</a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
${cfg.showArrows ? `
      <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="${prevPoints}"/>
        </svg>
      </button>
      <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="${nextPoints}"/>
        </svg>
      </button>` : ''}
${cfg.showDots ? `
      <div className="carousel__dots" role="tablist">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={\`carousel__dot\${i === current ? ' is-selected' : ''}\`}
            onClick={() => goTo(i)}
            role="tab"
            aria-label={\`Slide \${i + 1}\`}
            aria-selected={i === current}
          />
        ))}
      </div>` : ''}
    </div>
  );
}`;
}

function genAll(slides, cfg) {
  const htmlBody = genHtml(slides, cfg).split('\n').map(l => '    ' + l).join('\n');
  const css = genCss(cfg).split('\n').map(l => '    ' + l).join('\n');
  const js  = genJs(cfg).split('\n').map(l => '    ' + l).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carousel</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #0f172a;
      padding: 2rem;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .carousel-wrapper { width: 100%; max-width: 720px; }

${css}
  </style>
</head>
<body>
  <div class="carousel-wrapper">
${htmlBody}
  </div>
  <script>
${js}
  </script>
</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   Syntax highlight helpers
══════════════════════════════════════════════════════════ */

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function hlCss(code) {
  const C = { sel:'#4ec9b0', prop:'#9cdcfe', val:'#ce9178', punct:'#569cd6', at:'#c586c0', cmt:'#6a9955', num:'#b5cea8' };
  let out = '', i = 0, depth = 0, inProp = true;
  while (i < code.length) {
    const rem = code.slice(i);
    if (rem.startsWith('/*')) {
      const e = code.indexOf('*/', i + 2); const e2 = e < 0 ? code.length : e + 2;
      out += `<span style="color:${C.cmt}">${esc(code.slice(i, e2))}</span>`; i = e2; continue;
    }
    if (rem.startsWith('//')) {
      const e = code.indexOf('\n', i); const e2 = e < 0 ? code.length : e;
      out += `<span style="color:${C.cmt}">${esc(code.slice(i, e2))}</span>`; i = e2; continue;
    }
    if (code[i] === '@') { const m = rem.match(/^@[\w-]+/); if (m) { out += `<span style="color:${C.at}">${esc(m[0])}</span>`; i += m[0].length; continue; } }
    if (code[i] === '{') { out += `<span style="color:${C.punct}">{</span>`; depth++; inProp = true; i++; continue; }
    if (code[i] === '}') { out += `<span style="color:${C.punct}">}</span>`; depth = Math.max(0, depth-1); inProp = false; i++; continue; }
    if (code[i] === ';') { out += `<span style="color:${C.punct}">;</span>`; inProp = true; i++; continue; }
    if (code[i] === ':' && depth > 0 && inProp) { out += `<span style="color:${C.punct}">:</span>`; inProp = false; i++; continue; }
    if (/[a-zA-Z_-]/.test(code[i])) {
      const m = rem.match(/^[-a-zA-Z_][-\w]*/);
      if (m) {
        const after = code.slice(i + m[0].length).trimStart();
        const col = depth > 0 && inProp && after.startsWith(':') && !after.startsWith('::') ? C.prop : depth > 0 && !inProp ? C.val : C.sel;
        out += `<span style="color:${col}">${esc(m[0])}</span>`; i += m[0].length; continue;
      }
    }
    if (code[i] === '#' && depth > 0) { const m = rem.match(/^#[0-9a-fA-F]{3,8}\b/); if (m) { out += `<span style="color:${C.num}">${esc(m[0])}</span>`; i += m[0].length; continue; } }
    if (/\d/.test(code[i])) { const m = rem.match(/^\d*\.?\d+(%|px|em|rem|vh|vw|s|ms|deg|fr)?/); if (m) { out += `<span style="color:${C.num}">${esc(m[0])}</span>`; i += m[0].length; continue; } }
    out += esc(code[i]); i++;
  }
  return out;
}

function hlJs(code) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const J = dark
    ? { comment: '#6a9955', kw: '#c586c0', str: '#ce9178', num: '#b5cea8', cls: '#4ec9b0' }
    : { comment: '#6b7280', kw: '#7c3aed', str: '#b45309', num: '#1d4ed8', cls: '#0f766e' };
  return code.split('\n').map(line => {
    if (/^\s*\/\//.test(line)) return `<span style="color:${J.comment}">${esc(line)}</span>`;
    return esc(line)
      .replace(/\b(const|let|var|class|new|return|if|else|for|of|function|this|true|false|null|undefined|import|from|export|default|extends|async|await)\b/g,
        w => `<span style="color:${J.kw}">${w}</span>`)
      .replace(/'([^']*)'/g, (_, v) => `<span style="color:${J.str}">'${v}'</span>`)
      .replace(/`([^`]*)`/g, (_, v) => `<span style="color:${J.str}">\`${v}\`</span>`)
      .replace(/\b(\d+)\b/g, n => `<span style="color:${J.num}">${n}</span>`)
      .replace(/\b([A-Z][A-Za-z]+)\b/g, w => `<span style="color:${J.cls}">${w}</span>`);
  }).join('\n');
}

function hlHtml(code) {
  const dark = typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark';
  const H = dark
    ? { comment: '#6a9955', attrN: '#9cdcfe', attrV: '#ce9178', punct: '#808080', tag: '#4ec9b0' }
    : { comment: '#6b7280', attrN: '#0f766e', attrV: '#b45309', punct: '#374151', tag: '#1d4ed8' };
  let out = '', i = 0;
  while (i < code.length) {
    const rem = code.slice(i);
    if (rem.startsWith('<!--')) {
      const e = code.indexOf('-->', i + 4); const e2 = e < 0 ? code.length : e + 3;
      out += `<span style="color:${H.comment}">${esc(code.slice(i, e2))}</span>`; i = e2; continue;
    }
    if (rem.startsWith('<!')) {
      const e = code.indexOf('>', i); out += `<span style="color:${H.comment}">${esc(code.slice(i, e + 1))}</span>`; i = e + 1; continue;
    }
    if (code[i] === '<') {
      const e = code.indexOf('>', i + 1);
      if (e < 0) { out += esc(code[i]); i++; continue; }
      const tag = code.slice(i + 1, e);
      const m = tag.match(/^(\/?)([\w-]+)([\s\S]*)$/);
      if (m) {
        const [, sl, name, attrs] = m;
        const attrsHl = attrs
          .replace(/([\w:-]+)="([^"]*)"/g, (_, k, v) => `<span style="color:${H.attrN}">${esc(k)}</span>=<span style="color:${H.attrV}">"${esc(v)}"</span>`)
          .replace(/\b(data-[\w-]+)\b(?!=)/g, `<span style="color:${H.attrN}">$1</span>`);
        out += `<span style="color:${H.punct}">&lt;</span>${esc(sl)}<span style="color:${H.tag}">${esc(name)}</span>${attrsHl}<span style="color:${H.punct}">&gt;</span>`;
      } else {
        out += esc(code.slice(i, e + 1));
      }
      i = e + 1; continue;
    }
    out += esc(code[i]); i++;
  }
  return out;
}

function highlightCode(code, fmt) {
  if (fmt === 'css') return hlCss(code);
  if (fmt === 'js' || fmt === 'react') return hlJs(code);
  return hlHtml(code);
}

/* ══════════════════════════════════════════════════════════
   Small UI helpers
══════════════════════════════════════════════════════════ */

function Toggle({ value, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
      onClick={() => onChange(!value)}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldControl}>{children}</div>
    </div>
  );
}

function Slider({ value, min, max, step, fmt, onChange }) {
  return (
    <div className={styles.sliderRow}>
      <input type="range" className={styles.slider} min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} />
      <span className={styles.sliderVal}>{fmt(value)}</span>
    </div>
  );
}

function Radio({ value, options, onChange }) {
  return (
    <div className={styles.radioGroup}>
      {options.map(([v, l]) => (
        <button key={v}
          className={`${styles.radioBtn} ${value === v ? styles.radioBtnActive : ''}`}
          onClick={() => onChange(v)}
        >{l}</button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Live preview carousel
══════════════════════════════════════════════════════════ */

function PreviewCarousel({ slides, cfg, current, onPrev, onNext, onDot, onMouseEnter, onMouseLeave }) {
  const isSlide   = cfg.transition === 'slide';
  const isFade    = cfg.transition === 'fade';
  const isZoom    = cfg.transition === 'zoom';
  const isFlip    = cfg.transition === 'flip';
  const isBlur    = cfg.transition === 'blur';
  const isOverlay = !isSlide;
  const isVert    = cfg.direction === 'vertical';
  const useVert   = isSlide && isVert;
  const perView   = isOverlay ? 1 : (cfg.perView || 1);
  const gap       = cfg.gap || 0;
  const overlay   = (cfg.overlay || 0) / 100;
  const slideW    = `${100 / perView}%`;
  const slideH    = (cfg.height - (perView - 1) * gap) / perView;
  const isInfinite = cfg.loop && isSlide;

  // Tiled infinite: enough copies of slides to fill perView from any position
  // copies = buffers on each side; real slides sit in the centre copy
  const copies    = isInfinite ? Math.max(3, Math.ceil(perView * 3 / slides.length)) : 0;
  const infOffset = copies * slides.length; // index of real slide[0] in tiled array
  const tiledSlides = isInfinite
    ? Array.from({ length: copies * 2 + 1 }, () => slides).flat()
    : slides;

  const vpRef    = useRef(null);
  const [stepPx, setStepPx] = useState(0);
  // noTrans=true initially so first positioning is instant (no slide-in on mount)
  const [noTrans, setNoTrans] = useState(true);

  useLayoutEffect(() => {
    const el = vpRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth || 0;
      if (w > 0) setStepPx((w - (perView - 1) * gap) / perView + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Enable transitions after first paint
    requestAnimationFrame(() => setNoTrans(false));
    return () => ro.disconnect();
  }, [perView, gap]);

  // visualIdx = position in tiledSlides; starts at infOffset + current
  const [visualIdx, setVisualIdx] = useState(infOffset + current);
  const prevCurrentRef = useRef(current);

  useEffect(() => {
    if (!isInfinite) return;
    const prev = prevCurrentRef.current;
    prevCurrentRef.current = current;
    const len = slides.length;
    if (prev === len - 1 && current === 0) {
      // Forward wrap: animate one step forward, then snap back by one cycle
      setNoTrans(false);
      setVisualIdx(v => v + 1);
      setTimeout(() => {
        setNoTrans(true);
        setVisualIdx(infOffset + 0);
        requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
      }, cfg.duration + 30);
    } else if (prev === 0 && current === len - 1) {
      // Backward wrap: animate one step back, then snap forward by one cycle
      setNoTrans(false);
      setVisualIdx(v => v - 1);
      setTimeout(() => {
        setNoTrans(true);
        setVisualIdx(infOffset + len - 1);
        requestAnimationFrame(() => requestAnimationFrame(() => setNoTrans(false)));
      }, cfg.duration + 30);
    } else {
      // Normal step: keep position in the tiled centre
      setNoTrans(false);
      setVisualIdx(infOffset + current);
    }
  }, [current, isInfinite, slides.length, cfg.duration, infOffset]);

  const arrowR  = cfg.arrowStyle === 'circle' ? '50%' : cfg.arrowStyle === 'square' ? '6px' : '2px';
  const arrowBg = cfg.arrowStyle === 'minimal' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.45)';

  const dotW = i => {
    if (useVert) return 8;
    if (i !== current) return cfg.dotStyle === 'dash' ? 14 : 8;
    return cfg.dotStyle === 'dash' ? 28 : 8;
  };
  const dotH = i => {
    if (!useVert) return cfg.dotStyle === 'dash' ? 3 : 8;
    if (i !== current) return cfg.dotStyle === 'dash' ? 14 : 8;
    return cfg.dotStyle === 'dash' ? 28 : 8;
  };
  const dotR = cfg.dotStyle === 'square' ? 2 : 100;

  const prevPts = useVert ? '18 15 12 9 6 15' : '15 18 9 12 15 6';
  const nextPts = useVert ? '6 9 12 15 18 9'  : '9 18 15 12 9 6';

  const arrowStyle = (dir) => useVert
    ? { position:'absolute', left:'50%', [dir==='prev'?'top':'bottom']:12, transform:'translateX(-50%)', zIndex:10, width:40, height:40, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:arrowR, background:arrowBg, backdropFilter:'blur(4px)', color:'#fff', transition:'background 0.15s' }
    : { position:'absolute', top:'50%', [dir==='prev'?'left':'right']:12, transform:'translateY(-50%)', zIndex:10, width:40, height:40, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:arrowR, background:arrowBg, backdropFilter:'blur(4px)', color:'#fff', transition:'background 0.15s' };

  const trackIdx = isInfinite ? visualIdx : current;
  const transProp = noTrans ? 'none' : `transform ${cfg.duration}ms ease-in-out`;
  const trackStyle = isOverlay
    ? { display:'block', listStyle:'none', margin:0, padding:0 }
    : useVert
      ? { display:'flex', flexDirection:'column', listStyle:'none', margin:0, padding:0, gap, transform:`translateY(-${trackIdx * (slideH + gap)}px)`, transition: transProp }
      : { display:'flex', listStyle:'none', margin:0, padding:0, gap, transform:`translateX(-${trackIdx * stepPx}px)`, transition: transProp };

  const dur = `${cfg.duration}ms`;
  const slideStyle = (s, i) => {
    const base = {
      background: slideBg(s),
      ...(s.img ? { backgroundImage:`url(${s.img})`, backgroundSize: s.imgFit || 'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat' } : {}),
      position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
    };
    if (isSlide) return { ...base, ...(useVert ? { height: slideH, width:'100%', flexShrink:0 } : { minWidth: isInfinite ? (stepPx > 0 ? stepPx - gap : 0) : (stepPx > 0 ? stepPx - gap : slideW), height: cfg.height }) };
    const active = i === current;
    const absBase = { ...base, height: cfg.height, position: i === 0 ? 'relative' : 'absolute', inset: 0 };
    if (isFade) return { ...absBase, opacity: active ? 1 : 0, transition:`opacity ${dur} ease-in-out` };
    if (isZoom) return { ...absBase, opacity: active ? 1 : 0, transform: active ? 'scale(1)' : 'scale(1.1)', transition:`opacity ${dur} ease-in-out, transform ${dur} ease-in-out` };
    if (isFlip) return { ...absBase, opacity: active ? 1 : 0, transform: active ? 'rotateY(0deg)' : 'rotateY(-90deg)', backfaceVisibility:'hidden', transition:`opacity ${dur} ease-in-out, transform ${dur} ease-in-out` };
    if (isBlur) return { ...absBase, opacity: active ? 1 : 0, filter: active ? 'blur(0px)' : 'blur(10px)', transition:`opacity ${dur} ease-in-out, filter ${dur} ease-in-out` };
    return absBase;
  };

  const drag = useRef({});
  const onPointerDown = e => { drag.current = { x: e.clientX, y: e.clientY, active: true }; };
  const onPointerUp   = e => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    const delta = useVert ? dy : dx;
    if (Math.abs(delta) > 50) delta < 0 ? onNext() : onPrev();
  };

  return (
    <div style={{ position:'relative', width:'100%', borderRadius:cfg.radius, overflow:'hidden', userSelect:'none', cursor:'grab', ...(isFlip ? { perspective:'1200px' } : {}) }}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <div ref={vpRef} style={{ overflow:'hidden', ...(isOverlay || useVert ? { position:'relative', height:cfg.height } : {}) }}>
        <ul style={trackStyle}>
          {tiledSlides.map((s, i) => (
            <li key={isInfinite ? `inf-${i}` : s.id} style={slideStyle(s, i)}>
              {overlay > 0 && (
                <div style={{ position:'absolute', inset:0, background:`rgba(0,0,0,${overlay})`, pointerEvents:'none', zIndex:1 }}/>
              )}
              <div style={{ position:'relative', zIndex:2, textAlign: s.align || 'center', color:'#fff', padding:'2rem', maxWidth:480 }}>
                {s.emoji && <div style={{ fontSize:38, lineHeight:1, marginBottom:10 }}>{s.emoji}</div>}
                <div style={{ fontSize: s.titleSize || 28, fontWeight:700, marginBottom:6, lineHeight:1.2 }}>{s.title}</div>
                <div style={{ fontSize: s.descSize || 14, opacity:0.8, lineHeight:1.5 }}>{s.desc}</div>
                {s.ctaLabel && (
                  <a href={s.ctaUrl || '#'}
                    style={{ display:'inline-block', marginTop:12, padding:'8px 20px', borderRadius:6, background: s.ctaBg || cfg.accent, color:'#fff', textDecoration:'none', fontSize:13, fontWeight:600 }}
                    onClick={e => e.preventDefault()}
                  >{s.ctaLabel}</a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {cfg.showArrows && ['prev','next'].map(dir => (
        <button key={dir} onClick={dir === 'prev' ? onPrev : onNext}
          aria-label={dir === 'prev' ? 'Previous' : 'Next'}
          style={arrowStyle(dir)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points={dir === 'prev' ? prevPts : nextPts}/>
          </svg>
        </button>
      ))}

      {cfg.showDots && (
        <div style={isVert
          ? { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:5, alignItems:'center', zIndex:10 }
          : { position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:5, alignItems:'center', zIndex:10 }
        }>
          {slides.map((_, i) => (
            <button key={i} onClick={() => onDot(i)} aria-label={`Slide ${i+1}`}
              style={{ width: dotW(i), height: dotH(i), padding:0, border:'none', cursor:'pointer', borderRadius: dotR, background: i === current ? cfg.accent : 'rgba(255,255,255,0.4)', transform: i === current && cfg.dotStyle === 'circle' ? 'scale(1.3)' : 'none', transition:'all 0.2s' }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════════════ */

export default function CarouselBuilderTool() {
  const [slides,      setSlides]      = useState(DEF_SLIDES);
  const [cfg,         setCfg]         = useState(DEF_CFG);
  const [current,     setCurrent]     = useState(0);
  const [codeFmt,     setCodeFmt]     = useState('html');
  const [copyDone,    setCopyDone]    = useState(false);
  const [previewSize, setPreviewSize] = useState('full');
  const [previewH,    setPreviewH]    = useState(320);
  const resizingRef   = useRef(false);
  const resizeStartRef = useRef({ y: 0, h: 0 });
  const [canUndo,     setCanUndo]     = useState(false);
  const [canRedo,     setCanRedo]     = useState(false);

  const timerRef       = useRef(null);
  const historyRef     = useRef([]);
  const historyIdxRef  = useRef(0);
  const skipHistoryRef = useRef(false);
  const skipSaveRef    = useRef(false);
  const histTimerRef   = useRef(null);
  const importRef      = useRef(null);
  const undoFnRef      = useRef(null);
  const redoFnRef      = useRef(null);

  // ── Restore from localStorage after mount (avoids SSR hydration mismatch) ──
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(LS_KEY));
      if (p?.slides?.length) { skipHistoryRef.current = true; setSlides(p.slides); }
      if (p?.cfg) { skipHistoryRef.current = true; setCfg(prev => ({ ...prev, ...p.cfg })); }
    } catch {}
  }, []);

  useEffect(() => {
    setCurrent(c => Math.min(c, slides.length - 1));
  }, [slides.length]);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (cfg.autoplay) {
      timerRef.current = setInterval(() => {
        setCurrent(c => cfg.loop ? (c + 1) % slides.length : Math.min(c + 1, slides.length - 1));
      }, cfg.autoplaySpeed);
    }
    return () => clearInterval(timerRef.current);
  }, [cfg.autoplay, cfg.autoplaySpeed, cfg.loop, slides.length]);

  // ── History: debounced push on every slides/cfg change ──
  useEffect(() => {
    if (skipHistoryRef.current) { skipHistoryRef.current = false; return; }
    clearTimeout(histTimerRef.current);
    histTimerRef.current = setTimeout(() => {
      const h = historyRef.current.slice(0, historyIdxRef.current + 1);
      const snapshot = { slides, cfg };
      if (h.length && JSON.stringify(h[h.length - 1]) === JSON.stringify(snapshot)) return;
      h.push(snapshot);
      if (h.length > 50) h.shift();
      historyRef.current = h;
      historyIdxRef.current = h.length - 1;
      setCanUndo(historyIdxRef.current > 0);
      setCanRedo(false);
      if (!skipSaveRef.current) {
        try { localStorage.setItem(LS_KEY, JSON.stringify(snapshot)); } catch {}
      }
      skipSaveRef.current = false;
    }, 300);
    return () => clearTimeout(histTimerRef.current);
  }, [slides, cfg]);

  // ── Keyboard shortcuts (Ctrl+Z / Ctrl+Y) ──
  useEffect(() => {
    function onKey(e) {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') { e.preventDefault(); undoFnRef.current?.(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) { e.preventDefault(); redoFnRef.current?.(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onMove(e) {
      if (!resizingRef.current) return;
      const dy = e.clientY - resizeStartRef.current.y;
      setPreviewH(Math.max(120, Math.min(700, resizeStartRef.current.h + dy)));
    }
    function onUp() {
      if (resizingRef.current) {
        resizingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  function startResize(e) {
    e.preventDefault();
    resizingRef.current = true;
    resizeStartRef.current = { y: e.clientY, h: previewH };
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  }

  function pauseAutoplay() {
    if (cfg.autoplay && cfg.pauseOnHover) clearInterval(timerRef.current);
  }
  function resumeAutoplay() {
    if (cfg.autoplay && cfg.pauseOnHover) {
      timerRef.current = setInterval(() => {
        setCurrent(c => cfg.loop ? (c + 1) % slides.length : Math.min(c + 1, slides.length - 1));
      }, cfg.autoplaySpeed);
    }
  }

  const goTo = useCallback((n) => {
    const len = slides.length;
    if (!cfg.loop && (n < 0 || n >= len)) return;
    setCurrent((n + len) % len);
  }, [slides.length, cfg.loop]);

  function updateSlide(id, patch) {
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s));
  }
  function addSlide() {
    const n = slides.length;
    setSlides(prev => [...prev, mkSlide({
      id: uid(), bg: BG_PALETTE[n % BG_PALETTE.length],
      bgTo: BG_PALETTE[(n + 4) % BG_PALETTE.length],
      emoji: '💡', title: `Slide ${n + 1}`, desc: 'Your content here.',
    })]);
  }
  function duplicateSlide(id) {
    setSlides(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx < 0) return prev;
      const copy = { ...prev[idx], id: uid() };
      const arr = [...prev];
      arr.splice(idx + 1, 0, copy);
      return arr;
    });
  }
  function removeSlide(id) {
    if (slides.length <= 1) return;
    setSlides(prev => prev.filter(s => s.id !== id));
  }
  function moveSlide(id, dir) {
    setSlides(prev => {
      const idx  = prev.findIndex(s => s.id === id);
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }
  function applyTemplate(tpl) {
    setSlides(tpl.slides.map(s => ({ ...s, id: uid() })));
    setCfg(prev => ({ ...prev, ...tpl.cfg }));
    setCurrent(0);
  }

  function set(key, val) { setCfg(prev => ({ ...prev, [key]: val })); }

  // ── Undo / Redo ──
  function undo() {
    if (historyIdxRef.current <= 0) return;
    historyIdxRef.current--;
    const { slides: s, cfg: c } = historyRef.current[historyIdxRef.current];
    skipHistoryRef.current = true;
    setSlides(s); setCfg(c);
    setCanUndo(historyIdxRef.current > 0);
    setCanRedo(true);
  }
  function redo() {
    if (historyIdxRef.current >= historyRef.current.length - 1) return;
    historyIdxRef.current++;
    const { slides: s, cfg: c } = historyRef.current[historyIdxRef.current];
    skipHistoryRef.current = true;
    setSlides(s); setCfg(c);
    setCanUndo(true);
    setCanRedo(historyIdxRef.current < historyRef.current.length - 1);
  }
  // Keep refs fresh so keyboard handler always calls the latest version
  undoFnRef.current = undo;
  redoFnRef.current = redo;

  // ── Import / Export / Clear ──
  function exportJson() {
    const blob = new Blob([JSON.stringify({ slides, cfg }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'carousel-config.json';
    a.click();
  }
  function importJson(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const { slides: s, cfg: c } = JSON.parse(ev.target.result);
        if (Array.isArray(s) && s.length) setSlides(s);
        if (c && typeof c === 'object') setCfg(prev => ({ ...prev, ...c }));
        setCurrent(0);
      } catch { /* invalid JSON — ignore */ }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
  function clearAll() {
    if (!confirm('Clear all slides and reset settings? This will also clear saved data.')) return;
    skipHistoryRef.current = true;
    skipSaveRef.current = true;
    try { localStorage.removeItem(LS_KEY); } catch {}
    setSlides(DEF_SLIDES); setCfg(DEF_CFG); setCurrent(0);
    historyRef.current = [];
    historyIdxRef.current = 0;
    setCanUndo(false); setCanRedo(false);
  }

  const code = (() => {
    try {
      switch (codeFmt) {
        case 'css':   return genCss(cfg);
        case 'js':    return genJs(cfg);
        case 'react': return genReact(slides, cfg);
        case 'all':   return genAll(slides, cfg);
        default:      return genHtml(slides, cfg);
      }
    } catch { return '/* error generating code */'; }
  })();

  function copyCode() {
    navigator.clipboard.writeText(code).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 1800);
    });
  }

  const extMap = { html:'html', css:'css', js:'js', react:'jsx', all:'html' };
  function downloadCode() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    a.download = `carousel.${extMap[codeFmt]}`;
    a.click();
  }

  const codeLabel = { html:'HTML', css:'CSS', js:'JS', react:'React', all:'All-in-one' }[codeFmt];
  const copyLabel = copyDone ? '✓ Copied' : `Copy ${codeLabel}`;

  return (
    <div className={styles.wrap}>
      <CssToolsTopNav active="carousel-builder" />

      {/* ── Main layout ── */}
      <div className={styles.main}>

        {/* Left: Settings */}
        <div className={styles.settings}>
          <div className={styles.settingsHead}>
            <div className={styles.settingsTitle}>
              <div className={styles.logoBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="13" rx="2"/>
                  <path d="M8 8V5a2 2 0 0 1 4 0v3"/>
                  <circle cx="12" cy="14" r="1" fill="currentColor"/>
                </svg>
              </div>
              <span className={styles.logoText}>Carousel <span className={styles.accent}>Builder</span></span>
            </div>
            <div className={styles.settingsActions}>
              <button className={styles.headerBtn} onClick={() => importRef.current?.click()} title="Import JSON config">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Import
              </button>
              <button className={styles.headerBtn} onClick={exportJson} title="Export JSON config">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export
              </button>
            </div>
            <input ref={importRef} type="file" accept=".json" style={{ display:'none' }} onChange={importJson}/>
          </div>

          {/* Slides */}
          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionLabel}>Slides</span>
              <span className={styles.sectionMeta}>{slides.length} slide{slides.length !== 1 ? 's' : ''}</span>
            </div>
            <div className={styles.templateRow}>
              {TEMPLATES.map(tpl => (
                <button key={tpl.label} className={styles.templateBtn} onClick={() => applyTemplate(tpl)} title={`Load ${tpl.label} template`}>
                  <span>{tpl.icon}</span>
                  <span>{tpl.label}</span>
                </button>
              ))}
            </div>
            <div className={styles.slideList}>
              {slides.map((s, i) => (
                <div key={s.id}
                  className={`${styles.slideCard}${i === current ? ' ' + styles.slideCardActive : ''}`}
                  onClick={() => setCurrent(i)}
                >
                  {/* Row 1: num · bg color · grad toggle · move · dup · delete */}
                  <div className={styles.slideCardTop}>
                    <span className={styles.slideNum}>#{i+1}</span>
                    <input
                      type="color" className={styles.slideBgInput}
                      value={s.bg} title={s.bgType === 'gradient' ? 'Gradient start color' : 'Background color'}
                      onChange={e => updateSlide(s.id, { bg: e.target.value })}
                      onClick={e => e.stopPropagation()}
                    />
                    <button
                      className={`${styles.bgTypeBtn}${s.bgType === 'gradient' ? ' ' + styles.bgTypeBtnActive : ''}`}
                      title="Toggle gradient background" style={{ width: 22, height: 22 }} 
                      onClick={e => { e.stopPropagation(); updateSlide(s.id, { bgType: s.bgType === 'gradient' ? 'solid' : 'gradient' }); }}
                    >~</button>
                    <div className={styles.slideActions}>
                      <button className={styles.slideBtn} title="Move up"   disabled={i === 0}               onClick={e => { e.stopPropagation(); moveSlide(s.id, -1); }}>↑</button>
                      <button className={styles.slideBtn} title="Move down" disabled={i === slides.length-1} onClick={e => { e.stopPropagation(); moveSlide(s.id,  1); }}>↓</button>
                      <button className={styles.slideBtn} title="Duplicate" onClick={e => { e.stopPropagation(); duplicateSlide(s.id); }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="8" y="8" width="13" height="13" rx="2"/><path d="M4 16H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                      <button className={`${styles.slideBtn} ${styles.slideBtnDel}`} title="Remove" disabled={slides.length <= 1} onClick={e => { e.stopPropagation(); removeSlide(s.id); }}>✕</button>
                    </div>
                  </div>

                  {/* Row 2: gradient end color + angle (only in gradient mode) */}
                  {s.bgType === 'gradient' && (
                    <div className={styles.gradRow}>
                      <span className={styles.gradLabel}>To</span>
                      <input
                        type="color" className={styles.slideBgInput}
                        value={s.bgTo || '#1e1b4b'} title="Gradient end color"
                        onChange={e => updateSlide(s.id, { bgTo: e.target.value })}
                        onClick={e => e.stopPropagation()}
                      />
                      <span className={styles.gradLabel}>Angle</span>
                      <input
                        type="number" className={styles.angleInput}
                        value={s.bgAngle ?? 135} min={0} max={360}
                        onChange={e => updateSlide(s.id, { bgAngle: Number(e.target.value) })}
                        onClick={e => e.stopPropagation()}
                      />
                      <span className={styles.gradLabel}>°</span>
                    </div>
                  )}

                  {/* Row 3: emoji · title */}
                  <div className={styles.slideInputRow}>
                    <input className={styles.emojiInput} value={s.emoji} maxLength={2}
                      onChange={e => updateSlide(s.id, { emoji: e.target.value })}
                      onClick={e => e.stopPropagation()} placeholder="👋"/>
                    <input className={styles.titleInput} value={s.title}
                      onChange={e => updateSlide(s.id, { title: e.target.value })}
                      onClick={e => e.stopPropagation()} placeholder="Title"/>
                  </div>

                  {/* Row 3b: align */}
                  <div className={styles.alignRow}>
                    <span className={styles.fontRowLabel}>Align</span>
                    <div className={styles.alignBtns}>
                      {[['left','L'],['center','C'],['right','R']].map(([a, label]) => (
                        <button key={a}
                          className={`${styles.alignBtn}${s.align === a ? ' ' + styles.alignBtnActive : ''}`}
                          title={`Align ${a}`}
                          onClick={e => { e.stopPropagation(); updateSlide(s.id, { align: a }); }}
                        >{label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: description */}
                  <textarea className={styles.descInput} rows={2} value={s.desc}
                    onChange={e => updateSlide(s.id, { desc: e.target.value })}
                    onClick={e => e.stopPropagation()} placeholder="Description"/>

                  {/* Row 5: font sizes */}
                  <div className={styles.fontRow}>
                    <span className={styles.fontRowLabel}>T</span>
                    <input type="range" className={styles.fontSlider} min={14} max={48} step={1}
                      value={s.titleSize || 28}
                      onChange={e => updateSlide(s.id, { titleSize: Number(e.target.value) })}
                      onClick={e => e.stopPropagation()}/>
                    <span className={styles.fontVal}>{s.titleSize || 28}px</span>
                    <span className={styles.fontRowLabel}>D</span>
                    <input type="range" className={styles.fontSlider} min={10} max={24} step={1}
                      value={s.descSize || 14}
                      onChange={e => updateSlide(s.id, { descSize: Number(e.target.value) })}
                      onClick={e => e.stopPropagation()}/>
                    <span className={styles.fontVal}>{s.descSize || 14}px</span>
                  </div>

                  {/* Row 6: CTA button */}
                  <div className={styles.ctaRow}>
                    <input
                      type="color" className={styles.slideBgInput}
                      value={s.ctaBg || cfg.accent}
                      title="Button color"
                      onChange={e => updateSlide(s.id, { ctaBg: e.target.value })}
                      onClick={e => e.stopPropagation()}
                    />
                    <input className={styles.ctaInput} value={s.ctaLabel || ''} placeholder="Button label"
                      onChange={e => updateSlide(s.id, { ctaLabel: e.target.value })}
                      onClick={e => e.stopPropagation()}/>
                    <input className={styles.ctaInput} value={s.ctaUrl || ''} placeholder="https://..."
                      onChange={e => updateSlide(s.id, { ctaUrl: e.target.value })}
                      onClick={e => e.stopPropagation()}/>
                  </div>

                  {/* Row 7: image */}
                  <div className={styles.imgRow}>
                    <input className={styles.imgInput} value={s.img}
                      onChange={e => updateSlide(s.id, { img: e.target.value })}
                      onClick={e => e.stopPropagation()} placeholder="Image URL (optional)"/>
                    {s.img && (
                      <div className={styles.imgFitToggle}>
                        {['cover','contain'].map(f => (
                          <button key={f}
                            className={`${styles.imgFitBtn}${s.imgFit === f ? ' ' + styles.imgFitBtnActive : ''}`}
                            onClick={e => { e.stopPropagation(); updateSlide(s.id, { imgFit: f }); }}
                          >{f}</button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              ))}
              <button className={styles.addSlideBtn} onClick={addSlide}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Slide
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionLabel}>Navigation</span></div>
            <Field label="Arrows"><Toggle value={cfg.showArrows} onChange={v => set('showArrows', v)}/></Field>
            {cfg.showArrows && <Field label="Style"><Radio value={cfg.arrowStyle} options={[['circle','Circle'],['square','Square'],['minimal','Ghost']]} onChange={v => set('arrowStyle', v)}/></Field>}
            <Field label="Dots"><Toggle value={cfg.showDots} onChange={v => set('showDots', v)}/></Field>
            {cfg.showDots && <Field label="Dot style"><Radio value={cfg.dotStyle} options={[['circle','Circle'],['dash','Dash'],['square','Square']]} onChange={v => set('dotStyle', v)}/></Field>}
          </div>

          {/* Behavior */}
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionLabel}>Behavior</span></div>
            <Field label="Autoplay"><Toggle value={cfg.autoplay} onChange={v => set('autoplay', v)}/></Field>
            {cfg.autoplay && <Field label="Speed"><Slider value={cfg.autoplaySpeed} min={1000} max={8000} step={500} fmt={v => `${v/1000}s`} onChange={v => set('autoplaySpeed', v)}/></Field>}
            <Field label="Loop"><Toggle value={cfg.loop} onChange={v => set('loop', v)}/></Field>
            {cfg.autoplay && <Field label="Pause on hover"><Toggle value={cfg.pauseOnHover} onChange={v => set('pauseOnHover', v)}/></Field>}
          </div>

          {/* Transition */}
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionLabel}>Transition</span></div>
            <Field label="Type">
              <select
                className={styles.selectInput}
                value={cfg.transition}
                onChange={e => set('transition', e.target.value)}
              >
                <option value="slide">Slide</option>
                <option value="fade">Fade</option>
                <option value="zoom">Zoom</option>
                <option value="flip">Flip</option>
                <option value="blur">Blur</option>
              </select>
            </Field>
            {cfg.transition === 'slide' && <Field label="Direction"><Radio value={cfg.direction} options={[['horizontal','H'],['vertical','V']]} onChange={v => set('direction', v)}/></Field>}
            {cfg.transition === 'slide' && <Field label="Per view"><input type="number" className={styles.numInput} min={1} step={1} value={cfg.perView} onChange={e => set('perView', Math.max(1, Number(e.target.value) || 1))} /></Field>}
            {cfg.transition === 'slide' && <Field label="Gap"><Slider value={cfg.gap} min={0} max={32} step={2} fmt={v => `${v}px`} onChange={v => set('gap', v)}/></Field>}
            <Field label="Duration"><Slider value={cfg.duration} min={100} max={800} step={50} fmt={v => `${v}ms`} onChange={v => set('duration', v)}/></Field>
          </div>

          {/* Appearance */}
          <div className={styles.section}>
            <div className={styles.sectionHead}><span className={styles.sectionLabel}>Appearance</span></div>
            <Field label="Accent">
              <div className={styles.colorRow}>
                <input type="color" className={styles.colorInput} value={cfg.accent} onChange={e => set('accent', e.target.value)}/>
                <span className={styles.colorVal}>{cfg.accent}</span>
              </div>
            </Field>
            <Field label="Radius"><Slider value={cfg.radius} min={0} max={24} step={1} fmt={v => `${v}px`} onChange={v => set('radius', v)}/></Field>
            <Field label="Height"><Slider value={cfg.height} min={180} max={500} step={10} fmt={v => `${v}px`} onChange={v => set('height', v)}/></Field>
            <Field label="Overlay"><Slider value={cfg.overlay} min={0} max={80} step={5} fmt={v => `${v}%`} onChange={v => set('overlay', v)}/></Field>
          </div>

        </div>

        {/* Center: Preview */}
        <div className={styles.preview}>
          <PlaygroundTopAd />
          <div className={styles.paneHeader}>
            <button className={`${styles.headerBtn} ${styles.headerBtnDanger}`} onClick={clearAll} title="Reset to defaults">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
              Clear
            </button>
            <div className={styles.headerSep}/>
            <span className={styles.paneTitle}>Preview</span>
            <span className={styles.paneMeta}>Slide {current+1} / {slides.length} · {cfg.direction} · {cfg.transition} · {cfg.height}px</span>
            <div className={styles.previewSizeToggle}>
              {[['mobile','📱','375px'],['tablet','⊡','768px'],['full','▢','Full']].map(([sz,icon,label]) => (
                <button key={sz}
                  className={`${styles.previewSizeBtn}${previewSize === sz ? ' ' + styles.previewSizeBtnActive : ''}`}
                  onClick={() => setPreviewSize(sz)}
                  title={label}
                >{icon}</button>
              ))}
            </div>
            <div className={styles.headerSep}/>
            <button className={styles.headerBtn} onClick={undo} disabled={!canUndo} title="Undo (Ctrl+Z)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
              Undo
            </button>
            <button className={styles.headerBtn} onClick={redo} disabled={!canRedo} title="Redo (Ctrl+Y)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
              Redo
            </button>
          </div>
          <div className={styles.previewBody} style={{ height: previewH }}>
            <div className={styles.previewConstraint} style={
              previewSize === 'mobile' ? { maxWidth: 375 } :
              previewSize === 'tablet' ? { maxWidth: 768 } : {}
            }>
              <PreviewCarousel slides={slides} cfg={cfg} current={current}
                onPrev={() => goTo(current-1)} onNext={() => goTo(current+1)} onDot={goTo}
                onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}/>
            </div>
          </div>
          <div className={styles.resizeHandle} onMouseDown={startResize}>
            <div className={styles.resizeHandleBar}/>
          </div>
          <div className={styles.exportBar}>
            <div className={styles.exportBarLabel}>Export</div>
            <div className={styles.exportFmtTabs}>
              {[['html','HTML'],['css','CSS'],['js','JS'],['react','React'],['all','All-in-one']].map(([f,l]) => (
                <button key={f}
                  className={`${styles.fmtTab}${codeFmt === f ? ' ' + styles.fmtTabActive : ''}`}
                  onClick={() => setCodeFmt(f)}
                >{l}</button>
              ))}
            </div>
            <div className={styles.exportBarActions}>
              <button className={`${styles.btnCopy}${copyDone ? ' ' + styles.btnCopyDone : ''}`} onClick={copyCode}>{copyLabel}</button>
              <button className={styles.btnTool} onClick={downloadCode}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download .{extMap[codeFmt]}
              </button>
            </div>
          </div>
          <div className={styles.previewCodeBody}>
            <pre
              className={styles.codePre}
              dangerouslySetInnerHTML={{ __html: highlightCode(code, codeFmt) + '\n' }}
            />
          </div>
        </div>

      </div>

      {/* ── Status ── */}
      <div className={styles.statusBar}>
        <div className={`${styles.statusDot} ${styles.statusOk}`}/>
        <span className={styles.statusText}>
          {slides.length} slide{slides.length !== 1 ? 's' : ''} · {cfg.direction} · {cfg.transition}{cfg.transition === 'slide' && cfg.perView > 1 ? ` · ${cfg.perView} per view` : ''} · {cfg.duration}ms
          {cfg.showArrows ? ' · arrows' : ''}{cfg.showDots ? ' · dots' : ''}
          {cfg.autoplay ? ` · autoplay ${cfg.autoplaySpeed/1000}s` : ''}
        </span>
      </div>
    </div>
  );
}
