import { BRAND_HTML, BRAND_CSS, brandFields, SOCIAL_HTML, SOCIAL_CSS, socialFields, DEMO_SOCIALS, columnFields, DEMO_COLUMNS } from './parts.js';

export default {
  id: 'footer-newsletter',
  name: 'Footer With Newsletter',
  version: '1.0.0',
  category: 'footer',
  tags: ['footer', 'newsletter', 'email-signup', 'columns', 'social-icons', 'form', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Footer With Newsletter Signup — Free Footer Template HTML',
  seoDescription: 'Free footer with a newsletter form that posts to Mailchimp, Kit or any service, beside link columns, social icons and legal links. Export HTML or React.',
  description: 'A footer that grows your list: on the left your logo, a short newsletter pitch and an email form that posts to any email service; on the right columns of links; underneath, social icons, the copyright and legal links. Shown in a deep navy theme.',
  bestFor: ['Blogs, media and creator sites', 'E-commerce stores', 'SaaS sites that send product updates'],

  groups: [
    { id: 'brand', label: 'Logo' },
    { id: 'form', label: 'Newsletter' },
    { id: 'items', label: 'Link columns' },
    { id: 'social', label: 'Social links', toggle: 'showSocials' },
    { id: 'bottom', label: 'Bottom bar' },
  ],
  fields: [
    ...brandFields(),
    { key: 'nlTitle', group: 'form', label: 'Title', type: 'text', value: 'Get the weekly digest' },
    { key: 'nlText', group: 'form', label: 'Text (optional)', type: 'textarea', value: 'Product news, guides and one good idea every Friday. No spam, ever.' },
    { key: 'formAction', group: 'form', label: 'Form URL (action)', type: 'url', value: 'https://yoursite.com/subscribe', hint: 'Paste the form action URL from Mailchimp, Kit (ConvertKit), Buttondown, Brevo or your own endpoint.' },
    { key: 'inputName', group: 'form', label: 'Email field name', type: 'text', value: 'email', hint: 'e.g. EMAIL for Mailchimp, email_address for Kit.' },
    { key: 'placeholder', group: 'form', label: 'Placeholder', type: 'text', value: 'Your email address' },
    { key: 'button', group: 'form', label: 'Button text', type: 'text', value: 'Subscribe' },
    { key: 'copyright', group: 'bottom', label: 'Copyright', type: 'text', value: '© 2026 Acme Inc.' },
    { key: 'legal', group: 'bottom', label: 'Legal links (optional)', type: 'links', value: 'Privacy | /privacy/\nTerms | /terms/' },
  ],
  lists: [
    { key: 'columns', group: 'items', label: 'Link columns', itemLabel: 'Column', titleKey: 'title', min: 1, max: 4, fields: columnFields(), value: DEMO_COLUMNS },
    { key: 'socials', group: 'social', label: 'Social links', itemLabel: 'Social link', titleKey: 'label', min: 1, max: 8, fields: socialFields(), value: DEMO_SOCIALS },
  ],
  toggles: [{ key: 'showSocials', label: 'Social links', value: true }],
  theme: { brand: '#38bdf8', brandText: '#082f49', bg: '#0b1324', surface: '#111c33', text: '#e7edf7', muted: '#94a3b8', radius: '12' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<footer class="st-wrap fn">
  <div class="fn-top">
    <div class="fn-news" data-anim="item">
      ${BRAND_HTML}
      <h2 class="fn-title" data-edit="nlTitle"></h2>
      <p class="fn-text" data-edit="nlText"></p>
      <form class="fn-form" method="post" data-set="action:formAction">
        <input class="fn-input" type="email" required autocomplete="email" data-set="name:inputName;placeholder:placeholder;aria-label:placeholder">
        <button class="st-btn" type="submit"><span data-edit="button"></span></button>
      </form>
    </div>
    <div class="fn-cols" data-list="columns">
      <nav class="fn-col" data-anim="item" data-set="aria-label:title">
        <h2 class="fn-col-title" data-edit="title"></h2>
        <ul class="fn-links" data-links="links"></ul>
      </nav>
    </div>
  </div>
  <div class="fn-bottom">
    <div data-show="showSocials">${SOCIAL_HTML}</div>
    <p class="fn-copy" data-edit="copyright"></p>
    <ul class="fn-legal" data-show-if="legal" data-links="legal"></ul>
  </div>
</footer>`,
  css: `.st-footer-newsletter{padding:clamp(56px,7cqi,96px) 0 28px}
${BRAND_CSS}
${SOCIAL_CSS}
.fn-top{display:grid;grid-template-columns:minmax(260px,1.2fr) 2fr;gap:clamp(36px,6cqi,96px)}
.fn-news{display:flex;flex-direction:column;align-items:flex-start;gap:14px}
.fn-news .st-brand{margin-bottom:10px}
.fn-title{font-size:21px;letter-spacing:-.01em}
.fn-text{color:var(--st-muted);font-size:15.5px}
.fn-text:empty{display:none}
.fn-form{display:flex;gap:8px;width:100%;max-width:420px;margin-top:4px}
.fn-input{flex:1;min-width:0;min-height:48px;padding:0 16px;border-radius:calc(var(--st-radius) * 1px);border:1px solid color-mix(in srgb,var(--st-text) 16%,transparent);background:var(--st-surface);color:var(--st-text);font:500 15px/1 var(--st-font-body);outline:none}
.fn-input:focus{border-color:var(--st-brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--st-brand) 25%,transparent)}
.fn-input::placeholder{color:var(--st-muted)}
.fn-form .st-btn{min-height:48px;padding:0 20px}
.fn-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:28px}
.fn-col-title{font:700 14px/1.2 var(--st-font-body);letter-spacing:.06em;text-transform:uppercase;margin-bottom:16px}
.fn-links{list-style:none;display:flex;flex-direction:column;gap:11px}
.fn-links a,.fn-legal a{color:var(--st-muted);font-size:15px;text-decoration:none}
.fn-links a:hover,.fn-legal a:hover{color:var(--st-brand)}
.fn-bottom{display:flex;align-items:center;flex-wrap:wrap;gap:14px 28px;margin-top:clamp(40px,5cqi,64px);padding-top:24px;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.fn-copy{color:var(--st-muted);font-size:14px;margin-left:auto}
.fn-legal{list-style:none;display:flex;gap:20px}
.fn-legal a{font-size:14px}
@container st (max-width:820px){.fn-top{grid-template-columns:1fr}}
@container st (max-width:520px){.fn-form{flex-direction:column}.fn-cols{grid-template-columns:1fr 1fr}.fn-copy{margin-left:0}}`,
};
