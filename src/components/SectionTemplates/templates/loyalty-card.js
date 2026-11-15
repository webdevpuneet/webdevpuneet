/* Loyalty stamp card: a "collect 8 stamps, get one free" card that visitors can try. The copy beside it explains the
   scheme in three short steps. The card is drawn by the "loyalty" behaviour; progress is kept in the visitor's browser
   (localStorage, wrapped so a private window just forgets it). Turn the demo buttons off to show a fixed card. */

export default {
  id: 'loyalty-card',
  name: 'Loyalty Stamp Card',
  version: '1.0.0',
  category: 'cta',
  tags: ['loyalty', 'stamp card', 'rewards', 'cafe', 'coffee', 'punch card', 'points', 'membership', 'interactive', 'light'],
  created: '2026-11-15',
  updated: '2026-11-15',
  seoTitle: 'Loyalty Stamp Card Section — Free Rewards Card HTML',
  seoDescription: 'Free loyalty stamp card section: a coffee-shop style card that visitors fill one stamp at a time, saved in their browser, with a reward and how-it-works steps.',
  description: 'A rewards card visitors can actually play with. A grid of stamps fills as they press "Add a stamp", a progress line says how many are left, and the last stamp turns into the reward ("Free drink"). The card remembers its progress in the visitor’s browser, so it is still there on the next visit. Beside it sit a heading, a short explanation and three “how it works” steps. Choose 6 to 12 stamps, change the glyph, the reward and every label, or turn the demo buttons off to show a fixed card for a café, bakery, salon or shop.',
  bestFor: ['Cafés, bakeries and juice bars', 'Salons, barbers and car washes', 'Shops that want a simple rewards scheme'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'card', label: 'The card' },
    { id: 'texts', label: 'Messages' },
    { id: 'steps', label: 'How it works', toggle: 'showSteps' },
    { id: 'cta', label: 'Button' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Rewards' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Every eighth drink is *on us*' },
    { key: 'lead', group: 'header', label: 'Short text', type: 'textarea', value: 'Collect a stamp with every drink and your next one is free. No app to download and no sign-up: just show the card at the counter.' },

    { key: 'cardTitle', group: 'card', label: 'Card name', type: 'text', value: 'Daily Grind Rewards' },
    { key: 'cardSub', group: 'card', label: 'Card sub-title (optional)', type: 'text', value: 'One stamp per drink' },
    { key: 'stamps', group: 'card', label: 'Stamps on the card', type: 'choice', options: [['6', '6 stamps'], ['8', '8 stamps'], ['10', '10 stamps'], ['12', '12 stamps']], value: '8' },
    { key: 'startFilled', group: 'card', label: 'Stamps already collected', type: 'text', value: '3', hint: 'A number from 0 up to the number of stamps. It is where a new visitor’s card starts.' },
    { key: 'stampGlyph', group: 'card', label: 'Stamp symbol', type: 'text', value: '☕', hint: 'One emoji or letter shown on each collected stamp.' },
    { key: 'rewardShort', group: 'card', label: 'Last stamp label', type: 'text', value: 'FREE' },
    { key: 'rewardText', group: 'card', label: 'Reward line', type: 'text', value: 'Reward: any drink, free' },
    { key: 'note', group: 'card', label: 'Small print (optional)', type: 'text', value: 'Demo card: press the button to add a stamp. Progress is saved in this browser.' },

    { key: 'progressText', group: 'texts', label: 'Progress message', type: 'text', value: '{n} of {t} stamps collected', hint: '{n} is the stamps collected and {t} the total.' },
    { key: 'doneText', group: 'texts', label: 'Card full message', type: 'text', value: 'Card complete! Show it at the counter for your free drink.' },
    { key: 'addLabel', group: 'texts', label: 'Add button text', type: 'text', value: 'Add a stamp' },
    { key: 'resetLabel', group: 'texts', label: 'New card button text', type: 'text', value: 'Start a new card' },

    { key: 'joinLabel', group: 'cta', label: 'Button text (optional)', type: 'text', value: 'See the menu' },
    { key: 'joinUrl', group: 'cta', label: 'Button link', type: 'url', value: '#menu' },
  ],
  lists: [
    {
      key: 'steps', group: 'steps', label: 'Steps', itemLabel: 'Step', titleKey: 'title', min: 1, max: 4,
      fields: [
        { key: 'icon', label: 'Icon', type: 'icon', value: 'coffee' },
        { key: 'title', label: 'Title', type: 'text', value: 'Order' },
        { key: 'text', label: 'Text', type: 'textarea', value: 'Say hello and order anything from the menu.' },
      ],
      value: [
        { icon: 'coffee', title: 'Order anything', text: 'Any drink counts, from a small espresso to a large iced latte.' },
        { icon: 'star', title: 'Get a stamp', text: 'We stamp your card at the counter or add one to your phone.' },
        { icon: 'gift', title: 'Enjoy the reward', text: 'Fill all the stamps and your next drink is free, any size.' },
      ],
    },
  ],
  toggles: [
    { key: 'showSteps', label: 'How it works steps', value: true },
    { key: 'showDemo', label: 'Demo buttons (add a stamp)', value: true },
  ],
  theme: { brand: '#9a5b2e', brandText: '#ffffff', bg: '#fffaf3', surface: '#f6ecdf', text: '#2b1d14', muted: '#6b5444', radius: '16' },
  fonts: { heading: 'playfair', body: 'dmsans' },
  behaviors: ['loyalty'],

  html: `<div class="st-wrap">
  <div class="lc" data-loyalty data-set="data-total:stamps;data-start:startFilled;data-glyph:stampGlyph;data-last:rewardShort;data-progress:progressText;data-done:doneText;data-key:cardTitle">
    <div class="lc-copy">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="lc-lead" data-anim="item" data-edit="lead"></p>
      <ol class="lc-steps" data-anim="item" data-show="showSteps" data-list="steps">
        <li class="lc-step">
          <span class="st-icon" data-icon="icon"></span>
          <div><h3 class="lc-stitle" data-edit="title"></h3><p class="lc-stext" data-edit="text"></p></div>
        </li>
      </ol>
      <div class="st-btns" data-anim="item">
        <a class="st-btn" data-show-if="joinLabel" data-href="joinUrl"><span data-edit="joinLabel"></span></a>
      </div>
    </div>
    <div class="lc-card" data-anim="media">
      <div class="lc-top"><strong class="lc-name" data-edit="cardTitle"></strong><span class="lc-sub" data-show-if="cardSub" data-edit="cardSub"></span></div>
      <ol class="lc-stamps" data-stamps aria-label="Stamps"></ol>
      <p class="lc-progress" data-progress-out aria-live="polite"></p>
      <p class="lc-reward" data-show-if="rewardText" data-edit="rewardText"></p>
      <div class="lc-actions" data-show="showDemo">
        <button type="button" class="st-btn lc-add" data-add><span data-edit="addLabel"></span></button>
        <button type="button" class="st-btn st-btn--ghost lc-reset" data-reset hidden><span data-edit="resetLabel"></span></button>
      </div>
      <p class="lc-note" data-show-if="note" data-edit="note"></p>
    </div>
  </div>
</div>`,
  css: `.st-loyalty-card{padding:clamp(64px,8cqi,112px) 0}
.lc{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(28px,5cqi,72px);align-items:center}
.lc-copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(12px,1.6cqi,18px)}
.lc-copy .st-h2{text-align:left}
.lc-lead{color:var(--st-muted);font-size:clamp(16px,1.5cqi,18px);line-height:1.7}
.lc-steps{list-style:none;display:flex;flex-direction:column;gap:14px;margin:6px 0 8px;width:100%}
.lc-step{display:flex;gap:14px;align-items:flex-start}
.lc-step .st-icon{flex:none;background:color-mix(in srgb,var(--st-brand) 14%,transparent)}
.lc-stitle{font-size:17px;margin-bottom:2px}
.lc-stext{color:var(--st-muted);font-size:15.5px;line-height:1.55}
.lc-card{position:relative;display:flex;flex-direction:column;gap:14px;padding:clamp(20px,2.6cqi,32px);border-radius:calc(var(--st-radius) * 1.6px);background:linear-gradient(160deg,color-mix(in srgb,var(--st-brand) 94%,#fff),color-mix(in srgb,var(--st-brand) 72%,#000));color:var(--st-btn-text);box-shadow:0 30px 60px -28px color-mix(in srgb,var(--st-brand) 80%,#000)}
.lc-top{display:flex;flex-direction:column;gap:2px}
.lc-name{font:700 clamp(20px,2.2cqi,26px)/1.2 var(--st-font-heading)}
.lc-sub{font-size:14px;opacity:.85}
.lc-stamps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(8px,1.4cqi,14px);margin:4px 0}
.lc-stamp{aspect-ratio:1;display:grid;place-items:center;border-radius:50%;border:2px dashed color-mix(in srgb,var(--st-btn-text) 55%,transparent);font:700 clamp(13px,1.5cqi,16px)/1 var(--st-font-body);color:color-mix(in srgb,var(--st-btn-text) 75%,transparent);transition:transform .25s,background .25s}
.lc-stamp.is-on{border-style:solid;border-color:var(--st-btn-text);background:var(--st-btn-text);color:var(--st-brand);font-size:clamp(20px,2.6cqi,28px)}
.lc-stamp.is-last{border-color:#fcd34d;color:#fcd34d;font-size:clamp(11px,1.2cqi,13px);letter-spacing:.06em}
.lc-stamp.is-last.is-on{background:#fcd34d;border-color:#fcd34d;color:#3b2a06}
.lc-stamp.pop{animation:lc-pop .45s cubic-bezier(.3,1.6,.5,1)}
@keyframes lc-pop{0%{transform:scale(.4);opacity:.3}100%{transform:scale(1);opacity:1}}
.lc-progress{font-weight:700;font-size:16px}
.lc-reward{font-size:14px;opacity:.9}
.lc.is-done .lc-progress{color:#fcd34d}
.lc-actions{display:flex;flex-wrap:wrap;gap:10px}
.lc-card .st-btn{background:var(--st-btn-text);color:var(--st-brand)}
.lc-card .st-btn--ghost{background:transparent;color:var(--st-btn-text);border:1.5px solid color-mix(in srgb,var(--st-btn-text) 60%,transparent)}
.lc-card .st-btn[disabled]{opacity:.45;cursor:not-allowed}
.lc-note{font-size:12.5px;opacity:.75}
.lc-card [hidden]{display:none!important}
@media (prefers-reduced-motion:reduce){.lc-stamp.pop{animation:none}}
@container st (max-width:820px){.lc{grid-template-columns:1fr}}
@container st (max-width:420px){.lc-stamps{grid-template-columns:repeat(3,1fr)}}`,
};
