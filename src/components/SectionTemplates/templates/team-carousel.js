import { avatar } from './parts.js';

export default {
  id: 'team-carousel',
  name: 'Team Carousel',
  version: '1.0.0',
  category: 'team',
  tags: ['team', 'carousel', 'slider', 'draggable', 'portraits', 'about', 'dark'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Team Slider Template — Free Draggable Team Carousel HTML',
  seoDescription: 'Free team carousel: tall portrait cards with names and roles that you drag with momentum, swipe or step through with arrows. GSAP Draggable; export HTML.',
  description: 'A team section with personality: tall portrait cards in a horizontal row, each with the person’s name and role over a soft gradient at the bottom of the photo. Drag it with the mouse (GSAP Draggable + Inertia), swipe on touch screens, or use the arrow buttons beside the heading.',
  bestFor: ['Larger teams that don’t fit one row', 'Studios, agencies and creative teams', 'Speaker or instructor line-ups'],
  behaviors: ['carousel'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'People' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'The studio' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Small team, *big ideas*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Designers, developers and strategists who love hard problems and clean solutions.' },
    { key: 'prevLabel', group: 'header', label: 'Previous button label (screen readers)', type: 'text', value: 'Previous people' },
    { key: 'nextLabel', group: 'header', label: 'Next button label (screen readers)', type: 'text', value: 'Next people' },
  ],
  lists: [{
    key: 'people', group: 'items', label: 'People', itemLabel: 'Person', titleKey: 'name', min: 1, max: 16,
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', value: '', hint: 'A portrait photo; it is cropped to a tall card.', upload: { name: 'person', maxW: 700 } },
      { key: 'photoAlt', label: 'Photo alt text', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'New person' },
      { key: 'role', label: 'Role', type: 'text', value: 'Role' },
      { key: 'url', label: 'Profile link (optional)', type: 'url', value: '' },
    ],
    value: [
      { photo: avatar(8), name: 'Hana Sato', role: 'Creative Director' },
      { photo: avatar(1), name: 'Marcus Webb', role: 'Technical Lead' },
      { photo: avatar(2), name: 'Zara Ahmed', role: 'Brand Designer' },
      { photo: avatar(7), name: 'Ben Carter', role: 'Strategist' },
      { photo: avatar(3), name: 'Lena Fischer', role: 'Motion Designer' },
      { photo: avatar(4), name: 'Omar Haddad', role: 'Front-end Developer' },
    ],
  }],
  toggles: [],
  theme: { brand: '#facc15', brandText: '#1c1917', bg: '#0f0f12', surface: '#1a1a20', text: '#fafafa', muted: '#a1a1aa', radius: '20' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="tc2-top">
    <header class="st-head st-head--left tc2-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-edit="lead"></p>
    </header>
    <div class="tc2-arrows" data-anim="item">
      <button type="button" class="tc2-arrow" data-carousel-prev><span class="tc2-sr" data-edit="prevLabel"></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <button type="button" class="tc2-arrow" data-carousel-next><span class="tc2-sr" data-edit="nextLabel"></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
  </div>
  <ul class="tc2-track" data-carousel tabindex="0" role="region" aria-label="Team" data-list="people">
    <li class="tc2-card" data-anim="item">
      <img data-image="photo" alt="" width="420" height="560" loading="lazy" draggable="false">
      <div class="tc2-info">
        <h3 class="tc2-name"><a data-href="url" data-show-if="url"><span data-edit="name"></span></a><span data-hide-if="url" data-edit="name"></span></h3>
        <p class="tc2-role" data-edit="role"></p>
      </div>
    </li>
  </ul>
</div>`,
  css: `.st-team-carousel{padding:clamp(64px,8cqi,112px) 0}
.tc2-top{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:clamp(28px,3.4cqi,44px)}
.tc2-head{margin:0}
.tc2-arrows{display:flex;gap:10px;flex:none}
.tc2-arrow{position:relative;display:grid;place-items:center;width:50px;height:50px;border-radius:50%;border:1px solid color-mix(in srgb,var(--st-text) 18%,transparent);background:none;color:var(--st-text);cursor:pointer;transition:background .2s ease,color .2s ease,opacity .2s ease}
.tc2-arrow:hover:not(:disabled){background:var(--st-brand);border-color:var(--st-brand);color:var(--st-btn-text)}
.tc2-arrow:disabled{opacity:.3;cursor:default}
.tc2-arrow:focus-visible,.tc2-track:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:3px}
.tc2-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tc2-track{list-style:none;display:flex;gap:clamp(14px,1.8cqi,20px);overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:2px 2px 8px;margin:0 -2px}
.tc2-track::-webkit-scrollbar{display:none}
.tc2-track.is-draggable{scroll-snap-type:none;cursor:grab}
.tc2-track.is-draggable:active{cursor:grabbing}
.tc2-card{position:relative;flex:0 0 clamp(220px,24%,300px);aspect-ratio:3/4;overflow:hidden;scroll-snap-align:start;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);user-select:none}
.tc2-card img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease}
.tc2-card:hover img{transform:scale(1.05)}
.tc2-info{position:absolute;inset:auto 0 0;padding:48px 18px 18px;background:linear-gradient(transparent,rgba(0,0,0,.78))}
.tc2-name{color:#fff;font-size:18px}
.tc2-name a{color:inherit;text-decoration:none}
.tc2-name a:hover{color:var(--st-brand)}
.tc2-role{color:var(--st-brand);font-size:14px;font-weight:600;margin-top:2px}
@container st (max-width:700px){.tc2-top{flex-direction:column;align-items:flex-start}.tc2-card{flex-basis:72%}}`,
};
