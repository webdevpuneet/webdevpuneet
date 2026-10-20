export default {
  id: 'cta-newsletter',
  name: 'Newsletter Signup CTA',
  version: '1.0.0',
  category: 'cta',
  tags: ['cta', 'newsletter', 'email-signup', 'form', 'subscribe', 'mailchimp', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Newsletter Signup Section — Free Email Subscribe Form HTML',
  seoDescription: 'Free newsletter signup section: heading, subscriber count and an email form that posts to Mailchimp, Kit or any service, plus a privacy note. Export HTML.',
  description: 'An email newsletter sign-up: an icon, heading and short pitch, social proof (“Join 25,000 readers”), then an email field and subscribe button side by side, with a privacy note below. The form posts to any email service’s form URL, so it works in a plain HTML page.',
  bestFor: ['Blogs, newsletters and creators', 'Product update and waitlist sign-ups', 'End of articles and resource pages'],

  groups: [
    { id: 'main', label: 'Heading & text' },
    { id: 'form', label: 'Form' },
  ],
  fields: [
    { key: 'icon', group: 'main', label: 'Icon', type: 'icon', value: 'mail' },
    { key: 'heading', group: 'main', label: 'Heading', type: 'textarea', value: 'Get *one useful idea* every week' },
    { key: 'lead', group: 'main', label: 'Supporting text (optional)', type: 'textarea', value: 'Short, practical tips on design and building products. No spam, unsubscribe in one click.' },
    { key: 'proof', group: 'main', label: 'Social proof (optional)', type: 'text', value: 'Join 25,000+ readers' },
    { key: 'formAction', group: 'form', label: 'Form URL (action)', type: 'url', value: 'https://yoursite.com/subscribe', hint: 'Paste the form action URL from Mailchimp, ConvertKit (Kit), Buttondown, Brevo or your own endpoint.' },
    { key: 'inputName', group: 'form', label: 'Email field name', type: 'text', value: 'email', hint: 'The name your service expects, e.g. EMAIL for Mailchimp or email_address for Kit.' },
    { key: 'placeholder', group: 'form', label: 'Placeholder', type: 'text', value: 'you@example.com' },
    { key: 'button', group: 'form', label: 'Button text', type: 'text', value: 'Subscribe' },
    { key: 'note', group: 'form', label: 'Note under the form (optional)', type: 'text', value: 'We respect your inbox. Read our privacy policy.' },
  ],
  toggles: [],
  theme: { brand: '#ea580c', brandText: '#ffffff', bg: '#fff7ed', surface: '#ffffff', text: '#1c1917', muted: '#57534e', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="cn" data-anim="media">
    <span class="st-icon cn-icon" data-anim="item" data-icon="icon"></span>
    <h2 class="st-h2 cn-title" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead cn-lead" data-anim="item" data-edit="lead"></p>
    <form class="cn-form" data-anim="item" method="post" data-set="action:formAction">
      <input class="cn-input" type="email" required autocomplete="email" data-set="name:inputName;placeholder:placeholder;aria-label:placeholder">
      <button class="st-btn cn-btn" type="submit"><span data-edit="button"></span></button>
    </form>
    <p class="cn-meta" data-anim="item"><span class="cn-proof" data-edit="proof"></span><span class="cn-note" data-edit="note"></span></p>
  </div>
</div>`,
  css: `.st-cta-newsletter{padding:clamp(56px,7cqi,104px) 0}
.cn{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:16px;padding:clamp(36px,5cqi,60px) clamp(22px,5cqi,60px);text-align:center;border-radius:calc(var(--st-radius) * 1.4px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);box-shadow:0 30px 70px -40px color-mix(in srgb,var(--st-brand) 50%,transparent)}
.cn-icon{width:56px;height:56px;margin-bottom:6px}
.cn-icon svg{width:28px;height:28px}
.cn .cn-title{font-size:clamp(28px,2.4cqi + 14px,42px)}
.cn-form{display:flex;gap:10px;width:100%;max-width:520px;margin-top:10px;padding:6px;border-radius:calc(var(--st-radius) * 1px + 6px);background:var(--st-bg);border:1px solid color-mix(in srgb,var(--st-text) 12%,transparent)}
.cn-form:focus-within{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.cn-input{flex:1;min-width:0;padding:0 14px;border:0;background:none;color:var(--st-text);font:500 16px/1 var(--st-font-body);outline:none}
.cn-input::placeholder{color:color-mix(in srgb,var(--st-muted) 75%,transparent)}
.cn-btn{flex:none}
.cn-meta{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 14px;font-size:14px;color:var(--st-muted)}
.cn-proof{font-weight:700;color:var(--st-text)}
.cn-proof:empty,.cn-note:empty{display:none}
@container st (max-width:520px){.cn-form{flex-direction:column;background:none;border:0;padding:0}.cn-form:focus-within{box-shadow:none}.cn-input{min-height:52px;border-radius:calc(var(--st-radius) * 1px);border:1px solid color-mix(in srgb,var(--st-text) 15%,transparent);background:var(--st-bg)}.cn-btn{width:100%}}`,
};
