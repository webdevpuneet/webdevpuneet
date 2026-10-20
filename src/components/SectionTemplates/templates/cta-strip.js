export default {
  id: 'cta-strip',
  name: 'CTA Strip',
  version: '1.0.0',
  category: 'cta',
  tags: ['cta', 'call-to-action', 'strip', 'band', 'inline', 'minimal', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'CTA Strip Section Template — Free Inline Call to Action Bar',
  seoDescription: 'Free CTA strip: a slim band with an icon, heading and text beside magnetic buttons, for between sections or above the footer. Edit online, export HTML or React.',
  description: 'A compact call to action that fits between other sections: a tinted band with an icon, a one-line heading and a short sentence on the left and two buttons on the right. It stacks neatly on phones and keeps the page moving without a big interruption.',
  bestFor: ['Between content sections on long pages', 'Above the footer on every page', 'Blog posts and documentation pages'],
  behaviors: ['magnetic'],

  groups: [
    { id: 'main', label: 'Heading & text' },
    { id: 'buttons', label: 'Buttons' },
  ],
  fields: [
    { key: 'icon', group: 'main', label: 'Icon', type: 'icon', value: 'rocket' },
    { key: 'heading', group: 'main', label: 'Heading', type: 'text', value: 'Start your free 14-day trial' },
    { key: 'lead', group: 'main', label: 'Supporting text (optional)', type: 'text', value: 'Every feature unlocked. No credit card needed.' },
    { key: 'cta1', group: 'buttons', label: 'Primary button', type: 'text', value: 'Get started' },
    { key: 'cta1Url', group: 'buttons', label: 'Primary button link', type: 'url', value: 'https://yoursite.com/signup' },
    { key: 'cta2', group: 'buttons', label: 'Secondary button (optional)', type: 'text', value: 'See a demo' },
    { key: 'cta2Url', group: 'buttons', label: 'Secondary button link', type: 'url', value: 'https://yoursite.com/demo' },
  ],
  toggles: [],
  theme: { brand: '#0891b2', brandText: '#ffffff', bg: '#ffffff', surface: '#ecfeff', text: '#0f172a', muted: '#475569', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="cst" data-anim="media">
    <div class="cst-copy">
      <span class="st-icon" data-icon="icon"></span>
      <div>
        <h2 class="cst-title" data-anim="item" data-edit="heading"></h2>
        <p class="cst-lead" data-anim="item" data-edit="lead"></p>
      </div>
    </div>
    <div class="st-btns cst-btns" data-anim="item">
      <a class="st-btn" data-magnetic data-href="cta1Url"><span data-edit="cta1"></span></a>
      <a class="st-btn st-btn--ghost" data-magnetic data-href="cta2Url" data-show-if="cta2"><span data-edit="cta2"></span></a>
    </div>
  </div>
</div>`,
  css: `.st-cta-strip{padding:clamp(32px,5cqi,64px) 0}
.cst{display:flex;align-items:center;justify-content:space-between;gap:24px 40px;flex-wrap:wrap;padding:clamp(22px,3cqi,36px) clamp(22px,3.4cqi,44px);border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-brand) 22%,transparent)}
.cst-copy{display:flex;align-items:center;gap:18px;min-width:0;flex:1 1 360px}
.cst .st-icon{width:54px;height:54px;background:var(--st-brand);color:var(--st-btn-text)}
.cst .st-icon svg{width:26px;height:26px}
.cst-title{font-size:clamp(21px,1cqi + 16px,26px)}
.cst-lead{color:var(--st-muted);font-size:16px;margin-top:2px}
.cst-btns{flex:none}
@container st (max-width:640px){.cst{flex-direction:column;align-items:flex-start}.cst-copy{flex-direction:column;align-items:flex-start;flex:none}.cst-btns{width:100%}.cst-btns .st-btn{flex:1;padding:0 14px;white-space:nowrap}}`,
};
