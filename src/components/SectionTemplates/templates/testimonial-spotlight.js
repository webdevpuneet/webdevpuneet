import { IMG } from './meta.js';

export default {
  id: 'testimonial-spotlight',
  name: 'Testimonial Spotlight',
  version: '1.0.0',
  category: 'testimonials',
  tags: ['testimonials', 'quote', 'case-study', 'single', 'stats', 'big-quote', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Featured Testimonial Section — Free Big Quote Template HTML',
  seoDescription: 'Free featured testimonial: one large customer quote with photo, name, role and company, plus result stats and a GSAP quote reveal. Export HTML, React or Vue.',
  description: 'One customer story, told big: a large quote that reveals line by line, the customer’s photo with their name, role and company, and a row of result stats (like "3× faster reporting") with a link to the full case study. Ideal when one great quote says more than ten small ones.',
  bestFor: ['Case-study teasers on a homepage', 'B2B landing pages with a flagship customer', 'Portfolio and agency client highlights'],

  groups: [
    { id: 'quote', label: 'Quote' },
    { id: 'person', label: 'Customer' },
    { id: 'items', label: 'Results', toggle: 'showStats' },
    { id: 'link', label: 'Case study link' },
  ],
  fields: [
    { key: 'company', group: 'quote', label: 'Company name (optional)', type: 'text', value: 'NORTHWIND' },
    { key: 'quote', group: 'quote', label: 'Quote', type: 'textarea', value: 'We cut our reporting time by two thirds in the first month. For the first time, everyone from engineering to the board is looking at *the same live numbers*.' },
    { key: 'photo', group: 'person', label: 'Photo', type: 'image', value: IMG('avatar-6.jpg'), hint: 'A square photo, at least 160×160 px.', upload: { name: 'customer', maxW: 400 } },
    { key: 'photoAlt', group: 'person', label: 'Photo alt text', type: 'text', value: '' },
    { key: 'name', group: 'person', label: 'Name', type: 'text', value: 'Aisha Bello' },
    { key: 'role', group: 'person', label: 'Role', type: 'text', value: 'Operations Director, Northwind' },
    { key: 'link', group: 'link', label: 'Link text (optional)', type: 'text', value: 'Read the full case study' },
    { key: 'linkUrl', group: 'link', label: 'Link', type: 'url', value: 'https://webdevpuneet.com/customers/northwind' },
  ],
  lists: [{
    key: 'stats', group: 'items', label: 'Results', itemLabel: 'Result', titleKey: 'value', min: 1, max: 4,
    fields: [
      { key: 'value', label: 'Number', type: 'text', value: '50%' },
      { key: 'label', label: 'Label', type: 'text', value: 'What improved' },
    ],
    value: [
      { value: '3×', label: 'faster weekly reporting' },
      { value: '64%', label: 'fewer status meetings' },
      { value: '9 days', label: 'to roll out to 80 people' },
    ],
  }],
  toggles: [{ key: 'showStats', label: 'Results', value: true }],
  theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#faf7ff', surface: '#ffffff', text: '#1e1b2e', muted: '#5b5675', radius: '20' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <figure class="ts-card">
    <span class="ts-mark" aria-hidden="true">“</span>
    <p class="ts-company" data-anim="item" data-edit="company"></p>
    <blockquote class="ts-quote" data-anim="item" data-anim-text><p data-edit="quote"></p></blockquote>
    <figcaption class="ts-person" data-anim="item">
      <img class="ts-photo" data-image="photo" data-optional alt="" width="160" height="160" loading="lazy">
      <div><p class="ts-name" data-edit="name"></p><p class="ts-role" data-edit="role"></p></div>
    </figcaption>
    <dl class="ts-stats" data-show="showStats" data-list="stats">
      <div class="ts-stat" data-anim="item"><dt class="ts-label" data-edit="label"></dt><dd class="ts-value" data-edit="value"></dd></div>
    </dl>
    <a class="ts-link" data-anim="item" data-href="linkUrl" data-show-if="link"><span data-edit="link"></span> <span aria-hidden="true">→</span></a>
  </figure>
</div>`,
  css: `.st-testimonial-spotlight{padding:clamp(64px,8cqi,112px) 0}
.ts-card{position:relative;max-width:980px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:28px;padding:clamp(36px,6cqi,72px) clamp(22px,6cqi,80px);text-align:center;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 6%,transparent);box-shadow:0 40px 90px -50px color-mix(in srgb,var(--st-brand) 50%,transparent)}
.ts-mark{position:absolute;top:-34px;left:50%;transform:translateX(-50%);display:grid;place-items:center;width:68px;height:68px;border-radius:50%;background:var(--st-brand);color:var(--st-btn-text);font:800 64px/1 Georgia,serif;padding-top:22px}
.ts-company{font:800 15px/1 var(--st-font-heading);letter-spacing:.3em;color:var(--st-muted)}
.ts-quote{font:600 clamp(22px,1.6cqi + 14px,32px)/1.45 var(--st-font-heading);letter-spacing:-.01em;max-width:30em}
.ts-person{display:flex;align-items:center;gap:16px;text-align:left}
.ts-photo{width:60px;height:60px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.ts-name{font-weight:800;font-size:17px}
.ts-role{color:var(--st-muted);font-size:15px}
.ts-stats{display:flex;flex-wrap:wrap;justify-content:center;width:100%;padding-top:28px;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.ts-stat{flex:1 1 160px;display:flex;flex-direction:column-reverse;gap:4px;padding:6px 16px}
.ts-stat + .ts-stat{border-left:1px solid color-mix(in srgb,var(--st-text) 9%,transparent)}
.ts-value{font:800 clamp(30px,2.4cqi + 14px,42px)/1.1 var(--st-font-heading);color:var(--st-brand);letter-spacing:-.02em}
.ts-label{color:var(--st-muted);font-size:15px}
.ts-link{color:var(--st-brand);font-weight:700;text-decoration:none}
.ts-link:hover{text-decoration:underline}
@container st (max-width:600px){.ts-stat + .ts-stat{border-left:0;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);padding-top:14px}.ts-stats{flex-direction:column;gap:10px}.ts-stat{flex:none}}`,
};
