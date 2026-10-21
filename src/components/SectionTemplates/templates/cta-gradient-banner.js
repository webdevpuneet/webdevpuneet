export default {
  id: 'cta-gradient-banner',
  name: 'Gradient CTA Banner',
  version: '1.0.0',
  category: 'cta',
  tags: ['cta', 'call-to-action', 'banner', 'gradient', 'spotlight', 'magnetic-button', 'saas'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Call to Action Section Template — Free Gradient CTA Banner',
  seoDescription: 'Free CTA banner: a rounded gradient panel with a glow that follows the cursor, a bold heading and magnetic buttons, animated with GSAP. Export HTML or React.',
  description: 'A bold closing call to action: a rounded panel in a rich brand gradient with a subtle grid texture and a soft glow that follows the pointer, a centred heading and text, two buttons that drift toward the cursor, and a short reassurance note underneath.',
  bestFor: ['The final section before the footer', 'Product launches and sign-up pushes', 'Breaking up long landing pages'],
  behaviors: ['spotlight', 'magnetic'],

  groups: [
    { id: 'main', label: 'Heading & text' },
    { id: 'buttons', label: 'Buttons' },
  ],
  fields: [
    { key: 'heading', group: 'main', label: 'Heading', type: 'textarea', value: 'Ready to ship your best work yet?' },
    { key: 'lead', group: 'main', label: 'Supporting text (optional)', type: 'textarea', value: 'Join 12,000+ teams who plan, build and launch faster. Set up in minutes, free for small teams.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Start for free' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://webdevpuneet.com/signup' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'Talk to sales' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://webdevpuneet.com/contact' },
    { key: 'note', group: 'buttons', label: 'Note under the buttons (optional)', type: 'text', value: 'No credit card required · Cancel any time' },
  ],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f5fb', text: '#0f172a', muted: '#475569', radius: '24' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="cb" data-spotlight data-anim="media">
    <h2 class="st-h2 cb-title" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="cb-lead" data-anim="item" data-edit="lead"></p>
    <div class="st-btns cb-btns" data-anim="item">
      <a class="st-btn" data-magnetic data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost" data-magnetic data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
    <p class="cb-note" data-anim="item" data-edit="note"></p>
  </div>
</div>`,
  css: `.st-cta-gradient-banner{padding:clamp(48px,7cqi,96px) 0}
.cb{--mx:50%;--my:30%;position:relative;overflow:hidden;isolation:isolate;display:flex;flex-direction:column;align-items:center;gap:20px;padding:clamp(48px,7cqi,96px) clamp(24px,5cqi,72px);text-align:center;border-radius:calc(var(--st-radius) * 1px);color:#fff;background:linear-gradient(135deg,var(--st-brand),color-mix(in srgb,var(--st-brand) 55%,#0f172a));box-shadow:0 40px 80px -40px color-mix(in srgb,var(--st-brand) 70%,transparent)}
.cb::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(520px circle at var(--mx) var(--my),rgba(255,255,255,.28),transparent 60%)}
.cb::after{content:"";position:absolute;inset:0;z-index:-1;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:44px 44px;-webkit-mask:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.cb .cb-title{color:#fff;max-width:18em;font-size:clamp(32px,3.2cqi + 14px,54px)}
.cb-lead{max-width:36em;font-size:clamp(17px,1cqi + 13px,20px);color:rgba(255,255,255,.85)}
.cb-btns{justify-content:center;margin-top:8px}
.cb .st-btn{background:#fff;border-color:#fff;color:var(--st-brand)}
.cb .st-btn:hover{box-shadow:0 12px 30px rgba(0,0,0,.25)}
.cb .st-btn--ghost{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.45);color:#fff}
.cb .st-btn--ghost:hover{border-color:#fff;box-shadow:none}
.cb-note{font-size:14px;color:rgba(255,255,255,.72)}`,
};
