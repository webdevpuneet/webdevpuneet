import { STARS_HTML, PERSON_HTML, PERSON_CSS, quoteFields, avatar } from './parts.js';

export default {
  id: 'testimonials-carousel',
  name: 'Testimonial Carousel',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['testimonials', 'carousel', 'slider', 'draggable', 'reviews', 'social-proof', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Testimonial Slider Template — Free Draggable Carousel HTML',
  seoDescription: 'Free testimonial carousel: drag or swipe quote cards with momentum, arrow buttons and snap scrolling, powered by GSAP Draggable. Export HTML, React or Vue.',
  description: 'A testimonial slider with a left-aligned heading and arrow buttons above a row of quote cards. Drag it with the mouse and it glides with momentum and snaps to the nearest card (GSAP Draggable + Inertia); swipe on touch screens, or use the arrows, which ease from card to card.',
  bestFor: ['Landing pages with many testimonials', 'Mobile-friendly social proof', 'Case-study teasers and press quotes'],
  behaviors: ['carousel'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Testimonials' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Customer stories' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Don’t take *our word* for it' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Thousands of teams plan and ship with us every day. Here is what a few of them say.' },
    { key: 'prevLabel', group: 'header', label: 'Previous button label (screen readers)', type: 'text', value: 'Previous testimonials' },
    { key: 'nextLabel', group: 'header', label: 'Next button label (screen readers)', type: 'text', value: 'Next testimonials' },
  ],
  lists: [{
    key: 'quotes', group: 'items', label: 'Testimonials', itemLabel: 'Testimonial', titleKey: 'name', min: 1, max: 12,
    fields: quoteFields(),
    value: [
      { quote: 'Our launch checklist used to live in five places. Now it lives in one, and we haven’t missed a step since.', name: 'Priya Raman', role: 'Product Marketing, Orbit', avatar: avatar(5) },
      { quote: 'The best onboarding I’ve seen. Our whole team was productive on day one without a single training session.', name: 'Marcus Webb', role: 'COO, Fernhill', avatar: avatar(4) },
      { quote: 'Reports that used to take me Friday afternoon now build themselves. I got my Fridays back.', name: 'Lena Fischer', role: 'Project Lead, Alder & Co', avatar: avatar(3) },
      { quote: 'It scales with us. Twelve people last year, ninety this year, and it still feels fast and simple.', name: 'Tom Alvarez', role: 'VP Engineering, Quill', avatar: avatar(7) },
      { quote: 'Clients can follow progress with a view-only link. Fewer status emails, happier clients.', name: 'Grace Kim', role: 'Agency Owner, Studio Kim', avatar: avatar(8) },
    ],
  }],
  toggles: [{ key: 'showStars', label: 'Star ratings', value: true }],
  theme: { brand: '#2563eb', brandText: '#ffffff', bg: '#ffffff', surface: '#f3f6fc', text: '#0f172a', muted: '#475569', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="tc-top">
    <header class="st-head st-head--left tc-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <div class="tc-arrows" data-anim="item">
      <button type="button" class="tc-arrow" data-carousel-prev><span class="tc-sr" data-edit="prevLabel"></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <button type="button" class="tc-arrow" data-carousel-next><span class="tc-sr" data-edit="nextLabel"></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
  </div>
  <div class="tc-track" data-carousel tabindex="0" role="region" aria-label="Testimonials" data-list="quotes">
    <figure class="tc-card" data-anim="item">
      ${STARS_HTML}
      <blockquote class="tc-quote"><p data-edit="quote"></p></blockquote>
      <figcaption>${PERSON_HTML}</figcaption>
    </figure>
  </div>
</div>`,
  css: `.st-testimonials-carousel{padding:clamp(64px,8cqi,112px) 0}
${PERSON_CSS}
.tc-top{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:clamp(28px,3.4cqi,44px)}
.tc-head{margin:0}
.tc-arrows{display:flex;gap:10px;flex:none}
.tc-arrow{position:relative;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:var(--st-bg);color:var(--st-text);cursor:pointer;transition:background .2s ease,color .2s ease,opacity .2s ease}
.tc-arrow:hover:not(:disabled){background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.tc-arrow:disabled{opacity:.35;cursor:default}
.tc-arrow:focus-visible,.tc-track:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 45%,transparent);outline-offset:3px}
.tc-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tc-track{display:flex;gap:clamp(14px,1.8cqi,22px);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 2px 16px;margin:0 -2px;overscroll-behavior-x:contain}
.tc-track::-webkit-scrollbar{display:none}
.tc-track.is-draggable{scroll-snap-type:none;cursor:grab}
.tc-track.is-draggable:active{cursor:grabbing}
.tc-card{flex:0 0 clamp(280px,32%,400px);scroll-snap-align:start;display:flex;flex-direction:column;gap:16px;margin:0;padding:clamp(24px,2.6cqi,32px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);user-select:none}
.tc-quote{flex:1;font-size:17px;line-height:1.65}
@container st (max-width:700px){.tc-top{flex-direction:column;align-items:flex-start}.tc-card{flex-basis:85%}}`,
};
