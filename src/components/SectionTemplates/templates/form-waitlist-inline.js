import { FK_CSS, formTop, HONEYPOT, formClose, fCheck, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';
import { IMG } from './meta.js';

export default {
  id: 'form-waitlist-inline',
  name: 'Waitlist Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['waitlist', 'early-access', 'lead', 'inline', 'email', 'signup', 'form', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Waitlist Form Section — Free Inline Email Sign-Up HTML',
  seoDescription: 'Free waitlist form section: a one-row email form with a role menu and button, proof avatars and a consent line. Collects early-access sign-ups with Formspree.',
  description: 'A compact early-access or waitlist section: heading and text, then a one-row form with an email field, an optional “I am a…” menu and the join button, a consent line, and a proof row with avatars and a sign-up count. On narrow screens the fields stack. It posts to Formspree, Basin, Getform or your own server with a success message.',
  bestFor: ['Product launches and early access', 'Newsletter and community sign-ups', 'Beta programmes and pre-orders'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'proof', label: 'Social proof' }, { id: 'labels', label: 'Fields' }, { id: 'lists', label: 'Roles' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Early access', heading: 'Be the first to try *Nimbus*', lead: 'Join the waitlist and we will invite you as soon as your spot opens. No spam, only one email when it is your turn.' }),
    lbl('proofText', 'Proof text (empty to remove)', 'Join 4,200+ people already on the list', 'proof'),
    { key: 'avatar1', group: 'proof', label: 'Avatar 1', type: 'image', value: IMG('avatar-1.jpg'), upload: { name: 'wait-a', maxW: 160 } },
    { key: 'avatar2', group: 'proof', label: 'Avatar 2', type: 'image', value: IMG('avatar-2.jpg'), upload: { name: 'wait-b', maxW: 160 } },
    { key: 'avatar3', group: 'proof', label: 'Avatar 3', type: 'image', value: IMG('avatar-3.jpg'), upload: { name: 'wait-c', maxW: 160 } },
    lbl('emailLabel', 'Email field label (for screen readers)', 'Email address', 'labels'),
    lbl('emailPlaceholder', 'Email placeholder', 'you@company.com', 'labels'),
    lbl('roleLabel', 'Role menu label (empty to remove the menu)', 'I am a', 'labels'),
    lbl('consentText', 'Consent text (empty to remove the box)', 'I agree to receive launch emails. I can unsubscribe at any time.', 'labels'),
    ...tailFields({ sends: 'email, role, consent', submit: 'Join the waitlist', note: '', successTitle: 'You’re on the list!', successText: 'We’ll email you as soon as your spot opens.' }),
  ],
  lists: [{
    key: 'roles', group: 'lists', label: 'Roles', itemLabel: 'Role', titleKey: 'name', min: 1, max: 8,
    fields: [{ key: 'name', label: 'Role', type: 'text', value: 'Designer' }],
    value: [{ name: 'Designer' }, { name: 'Developer' }, { name: 'Founder' }, { name: 'Marketer' }, { name: 'Something else' }],
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#f4f5ff', surface: '#ffffff', text: '#14153a', muted: '#5f6290', radius: '999' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap wl">
  ${headHtml()}
  <div class="wl-box" data-anim="media">
    ${formTop()}
        <div class="wl-row">
          <label class="wl-email"><span class="visually-hidden fk-sr" data-edit="emailLabel"></span><input name="email" type="email" required autocomplete="email" data-set="placeholder:emailPlaceholder"></label>
          <label class="wl-role" data-show-if="roleLabel"><span class="visually-hidden fk-sr" data-edit="roleLabel"></span><select name="role" data-list="roles"><option data-set="value:name" data-edit="name"></option></select></label>
          ${HONEYPOT}
          <button class="st-btn wl-btn" type="submit"><span data-edit="submit"></span></button>
        </div>
        ${fCheck('consent', 'consentText', { required: true, optional: true })}
        <p class="st-form-note" data-show-if="note" data-edit="note"></p>
${formClose()}
    <div class="wl-proof" data-show-if="proofText">
      <span class="wl-avatars"><img data-image="avatar1" data-optional alt="" loading="lazy"><img data-image="avatar2" data-optional alt="" loading="lazy"><img data-image="avatar3" data-optional alt="" loading="lazy"></span>
      <span data-edit="proofText"></span>
    </div>
  </div>
</div>`,
  css: `.st-form-waitlist-inline{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.wl{max-width:760px;margin:0 auto}
.wl-box{display:flex;flex-direction:column;align-items:center;gap:22px}
.wl-box .st-form{width:100%}
.wl-box .st-form-fields{gap:14px;align-items:center}
.wl-row{display:flex;gap:10px;width:100%;padding:8px;border-radius:999px;background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);box-shadow:0 20px 50px -30px color-mix(in srgb,var(--st-text) 50%,transparent)}
.wl-email{flex:1;min-width:0}
.wl-email input,.wl-role select{width:100%;height:100%;min-height:50px;padding:0 20px;border:0;border-radius:999px;background:transparent;color:var(--st-text);font:400 16px var(--st-font-body);outline:none}
.wl-role{flex:none;width:170px;border-left:1px solid color-mix(in srgb,var(--st-text) 12%,transparent)}
.wl-role select{-webkit-appearance:none;appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;background-size:16px;padding-right:36px}
.wl-email:focus-within,.wl-role:focus-within{box-shadow:inset 0 0 0 2px var(--st-brand);border-radius:999px}
.wl-btn{flex:none;min-height:50px;padding-inline:26px}
.wl .fk-check{justify-content:center;text-align:left;max-width:520px}
.wl .st-form-note{text-align:center}
.wl-proof{display:flex;align-items:center;gap:12px;font-size:14.5px;color:var(--st-muted);font-weight:500}
.wl-avatars{display:inline-flex}.wl-avatars img{width:34px;height:34px;border-radius:50%;object-fit:cover;border:2px solid var(--st-bg);margin-left:-10px}.wl-avatars img:first-child{margin-left:0}
@container st (max-width:640px){.wl-row{flex-direction:column;border-radius:22px;padding:10px}.wl-email input,.wl-role select{min-height:50px;border:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);border-radius:14px}.wl-role{width:100%;border-left:0}.wl-btn{width:100%;border-radius:14px}}`,
};
