export default {
  id: 'testimonial',
  name: 'Customer Testimonial',
  version: '1.0.0',
  category: 'social-proof',
  tags: ['testimonial', 'review', 'stars', 'photo', 'light'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Testimonial Post Template — Free Customer Review Social Post',
  seoDescription: 'Free customer testimonial post template with star rating, review quote, customer photo, name and company. Edit it online, download PNG sizes or copy the HTML.',
  description: 'A clean review card with a five-star rating, the customer quote, their photo, name and company, and an optional company logo.',
  bestFor: ['Customer reviews and case-study quotes', 'G2, Trustpilot or App Store reviews', 'Client results for agencies and freelancers'],
  fonts: { heading: 'jakarta', body: 'inter' },
  vars: [
    { key: 'bg', label: 'Background', value: '#eef2ff' },
    { key: 'card', label: 'Card', value: '#ffffff' },
    { key: 'text', label: 'Text', value: '#0f172a' },
    { key: 'accent', label: 'Accent', value: '#f59e0b' },
  ],
  fields: [
    { key: 'stars', label: 'Stars', type: 'text', value: '★★★★★' },
    { key: 'quote', label: 'Review', type: 'textarea', value: '“We cut onboarding time in half. Our team *actually enjoys* using it.”' },
    { key: 'name', label: 'Customer name', type: 'text', value: 'Jordan Rivera' },
    { key: 'company', label: 'Role & company', type: 'text', value: 'Head of Ops, Northwind' },
    { key: 'photo', label: 'Customer photo', type: 'image' },
    { key: 'logo', label: 'Company logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="ts">
  <div class="ts-card" data-fit-box>
    <span class="ts-stars" data-edit="stars"></span>
    <p class="ts-quote" data-edit="quote" data-fit></p>
    <div class="ts-foot">
      <div class="ts-photo" data-image="photo"></div>
      <div class="ts-who"><span class="ts-name" data-edit="name"></span><span class="ts-co" data-edit="company"></span></div>
      <div class="ts-logo" data-image="logo" data-image-fit="contain"></div>
    </div>
  </div>
</div>`,
  css: `.ts{position:absolute;inset:0;display:flex;padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 100% 0%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 45%),var(--bg)}
.ts-card{flex:1;display:flex;flex-direction:column;justify-content:center;gap:calc(var(--u)*5);padding:calc(var(--u)*8);background:var(--card);border-radius:calc(var(--u)*4);box-shadow:0 calc(var(--u)*2) calc(var(--u)*8) rgba(15,23,42,.1)}
.ts-stars{font-size:calc(var(--u)*6.4);letter-spacing:.08em;color:var(--accent);line-height:1}
.ts-quote{font-family:var(--font-heading);font-size:calc(var(--u)*6.4);line-height:1.25;font-weight:700;letter-spacing:-.015em}
.ts-foot{display:flex;align-items:center;gap:calc(var(--u)*3);margin-top:auto}
.ts-photo{width:calc(var(--u)*12);height:calc(var(--u)*12);border-radius:50%;flex:none}
.ts-who{display:flex;flex-direction:column;gap:calc(var(--u)*.5);min-width:0}
.ts-name{font-weight:700;font-size:calc(var(--u)*3.6)}
.ts-co{font-size:calc(var(--u)*2.9);opacity:.65}
.ts-logo{margin-left:auto;width:calc(var(--u)*14);height:calc(var(--u)*7)}`,
};
