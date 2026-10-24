export default {
  id: 'article-text',
  name: 'Legal & Long-Form Text Page',
  version: '1.0.0',
  category: 'blog',
  tags: ['legal', 'privacy-policy', 'terms', 'article', 'text', 'table-of-contents', 'long-form', 'light'],
  created: '2026-10-24',
  updated: '2026-10-24',
  seoTitle: 'Privacy Policy & Terms Page Template — Free Legal Text HTML',
  seoDescription: 'Free policy page layout for privacy, terms and long articles: numbered sections, an automatic table of contents and a contact box. Export HTML, React or Vue.',
  description: 'A readable long-form text layout for legal pages and articles: a title with a last-updated date and an intro, then numbered sections each with a heading, paragraphs and an optional bullet list. On wide screens a table of contents built from the section headings sticks to the side and highlights the section you are reading; a contact box closes the page.',
  bestFor: ['Privacy policies, terms of service and cookie policies', 'Help-centre, documentation and policy pages', 'Long articles, guides and “about” write-ups'],
  behaviors: ['toc'],

  groups: [
    { id: 'header', label: 'Title' },
    { id: 'items', label: 'Sections' },
    { id: 'contact', label: 'Contact box', toggle: 'showContact' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Legal' },
    { key: 'heading', group: 'header', label: 'Title', type: 'textarea', value: 'Privacy *policy*' },
    { key: 'updated', group: 'header', label: 'Last updated (optional)', type: 'text', value: 'Last updated 24 October 2026' },
    { key: 'lead', group: 'header', label: 'Introduction (optional)', type: 'textarea', value: 'This policy explains what information we collect, how we use it and the choices you have. We keep it short and in plain language.' },
    { key: 'tocHeading', group: 'header', label: 'Contents heading', type: 'text', value: 'On this page' },
    { key: 'contactHeading', group: 'contact', label: 'Contact heading', type: 'text', value: 'Questions about this policy?' },
    { key: 'contactText', group: 'contact', label: 'Contact text', type: 'textarea', value: 'Write to us at privacy@example.com and we will reply within five working days.' },
  ],
  lists: [{
    key: 'sections', group: 'items', label: 'Sections', itemLabel: 'Section', titleKey: 'title', min: 1, max: 20,
    fields: [
      { key: 'title', label: 'Section heading', type: 'text', value: 'Section heading' },
      { key: 'text', label: 'Text', type: 'textarea', value: '', hint: 'Leave a blank line between paragraphs. Select text to make it bold or add a link.' },
      { key: 'points', label: 'Bullet list (one per line, optional)', type: 'textarea', value: '' },
    ],
    value: [
      { title: 'Information we collect', text: 'We collect the information you give us directly, such as your name and email address when you create an account or contact us.\n\nWe also collect basic technical information automatically when you use the site.', points: 'Account details you provide\nMessages you send us\nDevice, browser and page-view data' },
      { title: 'How we use your information', text: 'We use your information to run the service, to answer your questions and to improve the product. We do not sell your personal data.', points: 'To provide and secure your account\nTo send service messages you need\nTo understand which features are used' },
      { title: 'Cookies and analytics', text: 'We use a small number of cookies to keep you signed in and to measure how the site is used. You can block or delete cookies in your browser settings at any time.', points: '' },
      { title: 'Sharing your information', text: 'We share information only with the service providers that help us run the site, such as hosting and email delivery, and only as far as they need to do their job. We may also share it when the law requires.', points: '' },
      { title: 'Your choices and rights', text: 'You can ask us to access, correct or delete your personal data, and to stop using it for certain purposes. Contact us and we will help.', points: 'Ask for a copy of your data\nCorrect anything that is wrong\nAsk us to delete your account' },
      { title: 'Changes to this policy', text: 'If we change this policy in a way that matters, we will update the date at the top and tell you by email or on the site.', points: '' },
    ],
  }],
  toggles: [{ key: 'showContact', label: 'Contact box', value: true }],
  theme: { brand: '#0369a1', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f7fa', text: '#0f172a', muted: '#475569', radius: '14', maxWidth: '1100' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap at">
  <aside class="at-toc" data-toc aria-label="Table of contents" hidden>
    <p class="at-toc-title" data-edit="tocHeading"></p>
    <ol class="at-toc-list" data-toc-list></ol>
  </aside>
  <article class="at-main">
    <header class="at-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h1 class="at-title" data-anim="item" data-anim-text data-edit="heading"></h1>
      <p class="at-updated" data-show-if="updated" data-edit="updated"></p>
      <p class="at-lead" data-show-if="lead" data-edit="lead"></p>
    </header>
    <div class="at-sections" data-toc-source data-list="sections">
      <section class="at-section" data-anim="item">
        <h2 class="at-h2" data-edit="title"></h2>
        <p class="at-text" data-show-if="text" data-edit="text"></p>
        <ul class="at-points" data-lines="points"></ul>
      </section>
    </div>
    <aside class="at-contact" data-show="showContact" data-anim="item">
      <h2 class="at-contact-title" data-edit="contactHeading"></h2>
      <p data-edit="contactText"></p>
    </aside>
  </article>
</div>`,
  css: `.st-article-text{padding:clamp(56px,7cqi,104px) 0}
.at{display:grid;grid-template-columns:230px minmax(0,1fr);align-items:start;gap:clamp(32px,5cqi,72px)}
.at-toc{position:sticky;top:24px;padding-right:12px}
.at-toc[hidden]{display:none}
.at-toc-title{margin-bottom:12px;color:var(--st-muted);font:700 12.5px/1 var(--st-font-body);letter-spacing:.08em;text-transform:uppercase}
.at-toc-list{list-style:none;display:flex;flex-direction:column;border-left:2px solid color-mix(in srgb,var(--st-text) 10%,transparent);counter-reset:at}
.at-toc-list li{counter-increment:at}
.at-toc-list a{display:block;margin-left:-2px;padding:7px 0 7px 14px;border-left:2px solid transparent;color:var(--st-muted);font-size:14.5px;line-height:1.4;text-decoration:none;transition:color .2s ease,border-color .2s ease}
.at-toc-list a::before{content:counter(at) ". ";font-variant-numeric:tabular-nums}
.at-toc-list a:hover{color:var(--st-text)}
.at-toc-list a.is-current{color:var(--st-brand);border-left-color:var(--st-brand);font-weight:700}
.at-main{max-width:760px}
.at-head{display:flex;flex-direction:column;align-items:flex-start;gap:12px;margin-bottom:clamp(28px,3.4cqi,44px)}
.at-title{font-size:clamp(34px,3.4cqi + 14px,52px)}
.at-updated{color:var(--st-muted);font-size:14.5px}
.at-lead{color:var(--st-muted);font-size:18px;line-height:1.65}
.at-sections{counter-reset:atsec}
.at-section{padding:clamp(22px,2.6cqi,32px) 0;border-top:1px solid color-mix(in srgb,var(--st-text) 9%,transparent);scroll-margin-top:24px;counter-increment:atsec}
.at-h2{margin-bottom:12px;font-size:clamp(21px,1.2cqi + 14px,26px);letter-spacing:-.02em}
.at-h2::before{content:counter(atsec) ". ";color:var(--st-brand)}
.at-text{color:color-mix(in srgb,var(--st-text) 82%,transparent);font-size:16.5px;line-height:1.75}
.at-text:empty{display:none}
.at-points{list-style:none;display:flex;flex-direction:column;gap:8px;margin-top:14px}
.at-points:empty{display:none}
.at-points li{position:relative;padding-left:22px;font-size:16px;line-height:1.6}
.at-points li::before{content:"";position:absolute;left:4px;top:.68em;width:7px;height:7px;border-radius:50%;background:var(--st-brand)}
.at-contact{margin-top:clamp(20px,2.6cqi,32px);padding:clamp(20px,2.6cqi,30px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface)}
.at-contact-title{margin-bottom:6px;font-size:20px}
.at-contact p{color:var(--st-muted)}
@container st (max-width:860px){.at{grid-template-columns:1fr}.at-toc{position:static;padding:16px 18px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface)}}`,
};
