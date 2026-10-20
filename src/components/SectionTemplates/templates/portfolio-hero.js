import { IMG } from './meta.js';

export default {
  id: 'portfolio-hero',
  name: 'Personal Portfolio Hero',
  version: '1.0.0',
  category: 'hero',
  tags: ['hero', 'portfolio', 'personal', 'freelancer', 'designer', 'developer', 'photo'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Portfolio Hero Section Template — Free Personal Website Hero',
  seoDescription: 'Free portfolio hero section for freelancers and developers: photo, "available for work" badge, intro, two buttons and social links. Edit online, export HTML, React or Vue.',
  description: 'A personal website hero for designers, developers and freelancers: an "available for work" badge with a live dot, a friendly "Hi, I\'m…" headline, a short bio, buttons for your work and contact, social links, and your photo in an organic blob frame.',
  bestFor: ['Developer and designer portfolios', 'Freelancer and consultant websites', 'Personal brand and creator homepages'],

  groups: [
    { id: 'status', label: 'Availability badge', toggle: 'showStatus' },
    { id: 'main', label: 'Intro' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'media', label: 'Photo' },
  ],
  fields: [
    { key: 'status', group: 'status', label: 'Badge text', type: 'text', value: 'Available for freelance work' },
    { key: 'hello', group: 'main', label: 'Greeting', type: 'text', value: 'Hi, I’m Alex 👋' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'textarea', value: 'I design and build *websites people love to use*' },
    { key: 'lead', group: 'main', label: 'Short bio', type: 'textarea', value: 'Product designer and front-end developer with 8 years of experience helping startups launch fast, accessible and beautiful products.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'See my work' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: '#work' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Get in touch' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'mailto:hello@yoursite.com' },
    { key: 'link1', group: 'social', label: 'Link 1 text', type: 'text', value: 'GitHub' },
    { key: 'link1Url', group: 'social', label: 'Link 1 URL', type: 'url', value: 'https://github.com/yourname' },
    { key: 'link2', group: 'social', label: 'Link 2 text', type: 'text', value: 'LinkedIn' },
    { key: 'link2Url', group: 'social', label: 'Link 2 URL', type: 'url', value: 'https://www.linkedin.com/in/yourname' },
    { key: 'link3', group: 'social', label: 'Link 3 text', type: 'text', value: 'Dribbble' },
    { key: 'link3Url', group: 'social', label: 'Link 3 URL', type: 'url', value: 'https://dribbble.com/yourname' },
    { key: 'image', group: 'media', label: 'Your photo', type: 'image', value: IMG('hero-portrait.jpg'), hint: 'A portrait photo works best (about 900×1000 px). It is cropped to the blob shape.', upload: { name: 'portrait', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'imageAlt', group: 'media', label: 'Photo alt text', type: 'text', value: 'Portrait of Alex' },
  ],
  toggles: [
    { key: 'showStatus', label: 'Availability badge', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
  ],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#fffaf5', surface: '#fdeee2', text: '#24160c', muted: '#6f5a4b', radius: '12' },
  fonts: { heading: 'dmsans', body: 'inter' },

  html: `<div class="pf st-wrap">
  <div class="pf-copy">
    <span class="pf-status" data-anim="item" data-show="showStatus"><i aria-hidden="true"></i><span data-edit="status"></span></span>
    <p class="pf-hello" data-anim="item" data-edit="hello"></p>
    <h1 class="pf-title" data-anim="item" data-edit="headline"></h1>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns" data-anim="item">
      <a class="st-btn" data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost" data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
    <nav class="pf-social" data-anim="item" data-show="showSocial" aria-label="Social links">
      <a data-href="link1Url" data-show-if="link1"><span data-edit="link1"></span></a>
      <a data-href="link2Url" data-show-if="link2"><span data-edit="link2"></span></a>
      <a data-href="link3Url" data-show-if="link3"><span data-edit="link3"></span></a>
    </nav>
  </div>
  <div class="pf-media" data-anim="media">
    <div class="pf-ring" aria-hidden="true"></div>
    <img class="pf-photo" data-image="image" alt="" width="900" height="1000">
  </div>
</div>`,
  css: `.st-portfolio-hero{padding:clamp(56px,7cqi,104px) 0}
.pf{display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:clamp(32px,5cqi,72px)}
.pf-copy{display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.pf-status{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:var(--st-surface);font-size:13.5px;font-weight:700}
.pf-status i{width:9px;height:9px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 4px color-mix(in srgb,#16a34a 25%,transparent)}
.pf-hello{font-family:var(--st-font-heading);font-size:clamp(20px,1.6cqi + 12px,26px);font-weight:700;color:var(--st-brand)}
.pf-title{font-size:clamp(36px,4.4cqi + 10px,62px)}
.pf-social{display:flex;flex-wrap:wrap;gap:18px;padding-top:8px}
.pf-social a{font-weight:700;font-size:15px;text-decoration:none;color:var(--st-muted);border-bottom:2px solid color-mix(in srgb,var(--st-brand) 35%,transparent);padding-bottom:2px}
.pf-social a:hover{color:var(--st-text);border-color:var(--st-brand)}
.pf-media{position:relative;justify-self:center;width:min(420px,100%)}
.pf-ring{position:absolute;inset:-6%;border-radius:60% 40% 55% 45%/50% 55% 45% 50%;border:2px dashed color-mix(in srgb,var(--st-brand) 55%,transparent)}
.pf-photo{position:relative;width:100%;aspect-ratio:9/10;object-fit:cover;border-radius:58% 42% 50% 50%/48% 52% 48% 52%;box-shadow:0 30px 60px -24px color-mix(in srgb,var(--st-text) 40%,transparent)}
@container st (max-width:760px){.pf{grid-template-columns:1fr}.pf-media{grid-row:1;width:min(260px,70%)}}`,
};
