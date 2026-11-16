export default {
  id: 'receipt',
  name: 'Receipt Post',
  version: '1.0.0',
  category: 'quotes',
  tags: ['receipt', 'build-in-public', 'costs', 'weekly-wins', 'numbers', 'breakdown', 'monospace', 'trend', 'dark'],
  created: '2026-11-16',
  updated: '2026-11-16',
  seoTitle: 'Receipt Post Template — Free Itemised Breakdown Graphic',
  seoDescription: 'Free receipt post template: a thermal-paper till receipt with up to five line items, a bold total and a barcode. Show costs, wins or numbers. Edit online.',
  description: 'A thermal-paper till receipt on a dark backdrop: a title and date line, up to five itemised rows with amounts, a bold total, a thank-you line and a barcode. Empty rows disappear and the lines print in one by one.',
  bestFor: ['Build-in-public costs and revenue updates', 'Weekly wins, expenses and project breakdowns', 'Pricing and "what it really costs" posts'],
  fonts: { heading: 'g:Courier Prime|48|m', body: 'g:Courier Prime|48|m' },
  vars: [
    { key: 'bg', label: 'Background', value: '#1c1f2b' },
    { key: 'text', label: 'Receipt ink', value: '#23201b' },
    { key: 'accent', label: 'Total colour', value: '#d6336c' },
    { key: 'pop', label: 'Receipt paper', value: '#fbf8f0' },
  ],
  fields: [
    { key: 'store', label: 'Receipt title', type: 'text', value: 'MY SIDE PROJECT' },
    { key: 'sub', label: 'Date line', type: 'text', value: 'Month 3 · Nov 2026' },
    { key: 'i1n', label: 'Item 1 name', type: 'text', value: 'Hosting' },
    { key: 'i1p', label: 'Item 1 amount', type: 'text', value: '$12.00' },
    { key: 'i2n', label: 'Item 2 name', type: 'text', value: 'Domain' },
    { key: 'i2p', label: 'Item 2 amount', type: 'text', value: '$1.50' },
    { key: 'i3n', label: 'Item 3 name', type: 'text', value: 'Design tools' },
    { key: 'i3p', label: 'Item 3 amount', type: 'text', value: '$15.00' },
    { key: 'i4n', label: 'Item 4 name', type: 'text', value: 'Coffee (a lot)' },
    { key: 'i4p', label: 'Item 4 amount', type: 'text', value: '$48.00' },
    { key: 'i5n', label: 'Item 5 name (optional)', type: 'text', value: 'Sleep' },
    { key: 'i5p', label: 'Item 5 amount', type: 'text', value: '-6 hrs' },
    { key: 'tl', label: 'Total label', type: 'text', value: 'TOTAL' },
    { key: 'total', label: 'Total', type: 'text', value: '$76.50' },
    { key: 'foot', label: 'Thank-you line', type: 'text', value: 'Thank you for following along!' },
    { key: 'handle', label: 'Handle', type: 'text', value: '@yourbrand' },
    { key: 'logo', label: 'Logo (optional)', type: 'image', fit: 'contain' },
  ],
  html: `<div class="rc">
  <div class="rc-paper" data-anim="settle">
    <div class="rc-head"><h2 class="rc-store" data-edit="store" data-fit></h2><p class="rc-sub" data-edit="sub"></p></div>
    <div class="rc-lines" data-fit-box>
      <p data-anim="wipe-r" data-at="0.4"><span data-edit="i1n"></span><i aria-hidden="true"></i><b data-edit="i1p"></b></p>
      <p data-anim="wipe-r" data-at="0.7"><span data-edit="i2n"></span><i aria-hidden="true"></i><b data-edit="i2p"></b></p>
      <p data-anim="wipe-r" data-at="1"><span data-edit="i3n"></span><i aria-hidden="true"></i><b data-edit="i3p"></b></p>
      <p data-anim="wipe-r" data-at="1.3"><span data-edit="i4n"></span><i aria-hidden="true"></i><b data-edit="i4p"></b></p>
      <p data-anim="wipe-r" data-at="1.6"><span data-edit="i5n"></span><i aria-hidden="true"></i><b data-edit="i5p"></b></p>
    </div>
    <div class="rc-total"><span data-edit="tl"></span><b data-edit="total" data-anim="count" data-fit></b></div>
    <p class="rc-foot" data-edit="foot"></p>
    <div class="rc-bar" aria-hidden="true"></div>
    <div class="rc-brand"><span class="spt-brand"><span class="spt-logo" data-image="logo" data-image-fit="contain"></span><span class="rc-handle" data-edit="handle"></span></span></div>
  </div>
</div>`,
  css: `.rc{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:var(--pt) var(--pad) var(--pb);background:radial-gradient(circle at 20% 10%,color-mix(in srgb,var(--accent) 22%,transparent),transparent 55%),var(--bg)}
.rc-paper{position:relative;width:min(100%,calc(var(--u)*78));max-height:100%;display:flex;flex-direction:column;gap:calc(var(--u)*2.4);padding:calc(var(--u)*5) calc(var(--u)*5);background:var(--pop);color:var(--text);font-family:var(--font-body);box-shadow:0 calc(var(--u)*2) calc(var(--u)*6) rgba(0,0,0,.45);clip-path:polygon(0 0,100% 0,100% calc(100% - var(--u)*1.6),97% 100%,94% calc(100% - var(--u)*1.6),91% 100%,88% calc(100% - var(--u)*1.6),85% 100%,82% calc(100% - var(--u)*1.6),79% 100%,76% calc(100% - var(--u)*1.6),73% 100%,70% calc(100% - var(--u)*1.6),67% 100%,64% calc(100% - var(--u)*1.6),61% 100%,58% calc(100% - var(--u)*1.6),55% 100%,52% calc(100% - var(--u)*1.6),49% 100%,46% calc(100% - var(--u)*1.6),43% 100%,40% calc(100% - var(--u)*1.6),37% 100%,34% calc(100% - var(--u)*1.6),31% 100%,28% calc(100% - var(--u)*1.6),25% 100%,22% calc(100% - var(--u)*1.6),19% 100%,16% calc(100% - var(--u)*1.6),13% 100%,10% calc(100% - var(--u)*1.6),7% 100%,4% calc(100% - var(--u)*1.6),1% 100%,0 calc(100% - var(--u)*1.6))}
.rc-head{text-align:center;border-bottom:calc(var(--u)*.4) dashed currentColor;padding-bottom:calc(var(--u)*2.4)}
.rc-store{font-family:var(--font-heading);font-size:calc(var(--u)*5.6);line-height:1.3;font-weight:700;letter-spacing:.06em}
.rc-sub{font-size:calc(var(--u)*2.8);opacity:.7;margin-top:calc(var(--u)*.6)}
.rc-lines{display:flex;flex-direction:column;gap:calc(var(--u)*1.8);padding:calc(var(--u)*.6) 0}
.rc-lines p{display:flex;align-items:baseline;gap:calc(var(--u)*1.2);font-size:calc(var(--u)*3.6);line-height:1.3}
.rc-lines i{flex:1;min-width:calc(var(--u)*4);border-bottom:calc(var(--u)*.4) dotted currentColor;opacity:.5;transform:translateY(calc(var(--u)*-.6))}
.rc-lines b{font-weight:700}
.rc-lines p:has(> span:empty){display:none}
.rc-total{display:flex;align-items:baseline;justify-content:space-between;gap:calc(var(--u)*2);border-top:calc(var(--u)*.4) dashed currentColor;padding-top:calc(var(--u)*2.4);font-size:calc(var(--u)*4.4);font-weight:700}
.rc-total b{font-size:calc(var(--u)*9.4);line-height:1.3;color:var(--accent);font-weight:700;white-space:nowrap}
.rc-foot{text-align:center;font-size:calc(var(--u)*3);opacity:.8}
.rc-bar{height:calc(var(--u)*7);background:repeating-linear-gradient(90deg,currentColor 0 calc(var(--u)*.5),transparent calc(var(--u)*.5) calc(var(--u)*1.1),currentColor calc(var(--u)*1.1) calc(var(--u)*2.1),transparent calc(var(--u)*2.1) calc(var(--u)*2.5),currentColor calc(var(--u)*2.5) calc(var(--u)*2.8),transparent calc(var(--u)*2.8) calc(var(--u)*3.6))}
.rc-brand{display:flex;justify-content:center;font-size:calc(var(--u)*2.8);font-weight:700;padding-bottom:calc(var(--u)*1.6)}
.rc-handle{flex:none;white-space:nowrap}
.is-square .rc-paper{padding:calc(var(--u)*3.4) calc(var(--u)*5);gap:calc(var(--u)*1.6)}
.is-square .rc-store{font-size:calc(var(--u)*4.6)}
.is-square .rc-lines{gap:calc(var(--u)*1.2)}
.is-square .rc-lines p{font-size:calc(var(--u)*3.1)}
.is-square .rc-total{padding-top:calc(var(--u)*1.6)}
.is-square .rc-total b{font-size:calc(var(--u)*7.6)}
.is-square .rc-bar{height:calc(var(--u)*5)}
.is-landscape .rc-paper{width:min(100%,calc(var(--u)*66));padding:calc(var(--u)*2.6) calc(var(--u)*4);gap:calc(var(--u)*1.2)}
.is-landscape .rc-store{font-size:calc(var(--u)*4)}
.is-landscape .rc-lines{gap:calc(var(--u)*.8)}
.is-landscape .rc-lines p{font-size:calc(var(--u)*2.6)}
.is-landscape .rc-total{font-size:calc(var(--u)*3.2);padding-top:calc(var(--u)*1.2)}
.is-landscape .rc-total b{font-size:calc(var(--u)*6)}
.is-landscape .rc-bar{height:calc(var(--u)*3.4)}
.is-landscape .rc-foot,.is-landscape .rc-sub{font-size:calc(var(--u)*2.2)}
.is-landscape .rc-brand{display:none}
.is-story .rc-paper{width:100%}
.is-story .rc-lines p{font-size:calc(var(--u)*4.2)}`,
};
