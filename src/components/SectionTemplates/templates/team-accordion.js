import { avatar } from './parts.js';
import { esc } from './meta.js';

/* Interactive Team Accordion: team members as a row of tall, narrow image strips, all grayscale. Clicking a strip
   grows it (flex-grow transition) to reveal a content area on the left (name, role, social icons, bio) and the
   full-colour photo on the right; the other strips stay narrow. On small screens the strips stack vertically and
   the open one grows downwards. The click, keyboard arrows and aria-expanded are handled by the `strips`
   behaviour (behaviors.js); the animation is pure CSS. Without JavaScript the first strip is shown open.
   `finalize` (render.js fillHtml) writes which strip starts open and whether closed strips are grayscale. */

const member = (photo, name, role, bio, linkedin = 'https://www.linkedin.com/', x = '', instagram = '') => ({
  photo: avatar(photo), name, role, bio,
  s1Icon: 'linkedin', s1Url: linkedin, s1Label: 'LinkedIn',
  s2Icon: 'twitter', s2Url: x, s2Label: 'X (Twitter)',
  s3Icon: 'instagram', s3Url: instagram, s3Label: 'Instagram',
});

export default {
  id: 'team-accordion',
  name: 'Interactive Team Accordion',
  version: '1.0.0',
  category: 'team',
  tags: ['team', 'about', 'accordion', 'people', 'image-strips', 'grayscale', 'interactive', 'social-links', 'light'],
  created: '2026-10-30',
  updated: '2026-10-30',
  seoTitle: 'Team Accordion Section: Expanding Image Strips Template',
  seoDescription: 'Free interactive team section: grayscale image strips that expand on click to show name, role, social icons and bio. CSS flex-grow, vanilla JS. Export code.',
  description: 'An interactive meet-the-team section made of tall, narrow image strips. All photos start in grayscale. Click a strip and it grows smoothly to reveal the member\'s name, job title, social icons and bio on the left, with the full-colour photo on the right, while the others stay narrow. It stacks vertically on phones, works with a keyboard and animates with CSS only.',
  bestFor: ['About and company pages', 'Agency, studio and creative team pages', 'Any team that wants a memorable, interactive introduction'],
  behaviors: ['strips'],
  /* Writes the root settings (called by fillHtml) */
  finalize: (html, state) => {
    const f = state.fields || {};
    const toggles = state.toggles || {};
    const n = parseInt(f.defaultOpen, 10);
    const open = Number.isFinite(n) ? Math.min(12, Math.max(1, n)) : 1;
    const attrs = ` data-open="${esc(open)}" data-gray="${toggles.grayscale === false ? 'off' : 'on'}"`;
    return html.replace('<div class="ta" data-ta>', () => `<div class="ta" data-ta${attrs}>`);
  },

  groups: [
    { id: 'header', label: 'Heading', toggle: 'showHeading' },
    { id: 'settings', label: 'Strips' },
    { id: 'items', label: 'Team members' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Our team' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Meet the *people behind the work*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'Click a face to read a little about each person on the team.' },
    { key: 'defaultOpen', group: 'settings', label: 'Strip open at the start (number)', type: 'text', value: '3', hint: 'Which member is open when the page loads: 1 is the first strip. Without JavaScript the first strip is shown.' },
  ],
  lists: [{
    key: 'members', group: 'items', label: 'Team members', itemLabel: 'Member', titleKey: 'name', min: 2, max: 8,
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', value: '', hint: 'A portrait or square photo, at least 600×800 px. It is cropped to fill the strip.', upload: { name: 'member', maxW: 900 } },
      { key: 'photoAlt', label: 'Photo alt text', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'New person' },
      { key: 'role', label: 'Job title', type: 'text', value: 'Job title' },
      { key: 'bio', label: 'Bio', type: 'textarea', value: '' },
      { key: 's1Icon', label: 'Social icon 1', type: 'icon', value: 'linkedin' },
      { key: 's1Url', label: 'Social link 1 (optional)', type: 'url', value: '', hint: 'Pick any icon above (LinkedIn, X, Instagram, Facebook, YouTube, GitHub, email, website and more). The icon only shows when a link is entered.' },
      { key: 's1Label', label: 'Social link 1 name (screen readers)', type: 'text', value: 'LinkedIn' },
      { key: 's2Icon', label: 'Social icon 2', type: 'icon', value: 'twitter' },
      { key: 's2Url', label: 'Social link 2 (optional)', type: 'url', value: '' },
      { key: 's2Label', label: 'Social link 2 name (screen readers)', type: 'text', value: 'X (Twitter)' },
      { key: 's3Icon', label: 'Social icon 3', type: 'icon', value: 'instagram' },
      { key: 's3Url', label: 'Social link 3 (optional)', type: 'url', value: '' },
      { key: 's3Label', label: 'Social link 3 name (screen readers)', type: 'text', value: 'Instagram' },
    ],
    value: [
      member(7, 'Marcus Reid', 'Creative Director', 'Leads our brand and campaign work. Thirteen years in studios across London and Lisbon, and still sketches every idea on paper first.', 'https://www.linkedin.com/', 'https://x.com/', ''),
      member(2, 'Elena Ruiz', 'Head of Strategy', 'Turns messy briefs into clear plans. She believes the best strategy fits on one page and can be explained to a ten-year-old.', 'https://www.linkedin.com/', '', 'https://www.instagram.com/'),
      member(6, 'Aisha Bello', 'Co-founder & CEO', 'Ex-product lead at two scale-ups. Obsessed with calm software, honest roadmaps and teams that ship on Fridays without panic.', 'https://www.linkedin.com/', 'https://x.com/', 'https://www.instagram.com/'),
      member(1, 'Leo Martins', 'Lead Engineer', 'Builds fast, reliable systems and loves deleting code. Believes performance is a feature people feel before they can name it.', 'https://www.linkedin.com/', 'https://x.com/', ''),
      member(5, 'Nora Quinn', 'Head of Design', 'Designs for clarity first and decoration second. Previously ran a small design studio in Dublin and still teaches a weekend type class.', 'https://www.linkedin.com/', '', 'https://www.instagram.com/'),
    ],
  }],
  toggles: [
    { key: 'showHeading', label: 'Heading', value: true },
    { key: 'grayscale', label: 'Grayscale until opened', value: true },
  ],
  theme: { brand: '#7c3aed', brandText: '#ffffff', bg: '#f5f2fb', surface: '#ffffff', text: '#1e1b2e', muted: '#5f5a73', radius: '22' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head" data-show="showHeading">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <div class="ta" data-ta>
    <ul class="ta-strips" data-list="members">
      <li class="ta-item" data-anim="item">
        <button type="button" class="ta-trigger" aria-expanded="false" data-set="aria-label:name"></button>
        <div class="ta-info">
          <div class="ta-inner">
            <h3 class="ta-name" data-edit="name"></h3>
            <p class="ta-role" data-edit="role"></p>
            <div class="ta-social">
              <a data-href="s1Url" data-show-if="s1Url" data-set="aria-label:s1Label"><span class="st-icon" data-icon="s1Icon"></span></a>
              <a data-href="s2Url" data-show-if="s2Url" data-set="aria-label:s2Label"><span class="st-icon" data-icon="s2Icon"></span></a>
              <a data-href="s3Url" data-show-if="s3Url" data-set="aria-label:s3Label"><span class="st-icon" data-icon="s3Icon"></span></a>
            </div>
            <p class="ta-bio" data-edit="bio"></p>
          </div>
        </div>
        <div class="ta-photo"><img data-image="photo" alt="" width="600" height="800" loading="lazy"></div>
      </li>
    </ul>
  </div>
</div>`,
  css: `.st-team-accordion{padding:clamp(64px,8cqi,112px) 0;background:radial-gradient(60% 70% at 15% 20%,color-mix(in srgb,var(--st-brand) 14%,transparent),transparent 70%),radial-gradient(50% 60% at 90% 80%,color-mix(in srgb,#ec4899 12%,transparent),transparent 70%),var(--st-bg)}
.ta-strips{list-style:none;display:flex;gap:clamp(8px,1.2cqi,16px);height:clamp(380px,40cqi,500px);margin:0;padding:clamp(8px,1.2cqi,14px);border-radius:calc(var(--st-radius) * 1.4px);background:color-mix(in srgb,var(--st-surface) 78%,transparent);box-shadow:0 30px 70px -30px color-mix(in srgb,var(--st-text) 35%,transparent),0 0 0 1px color-mix(in srgb,var(--st-text) 6%,transparent)}
.ta-item{position:relative;display:flex;flex:1 1 0;min-width:0;overflow:hidden;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);transition:flex-grow .65s cubic-bezier(.4,0,.2,1)}
.ta-item.is-open,.ta:not([data-ta-ready]) .ta-item:first-child{flex-grow:7}
.ta-trigger{position:absolute;inset:0;z-index:1;padding:0;border:0;background:transparent;cursor:pointer;border-radius:inherit}
.ta-item.is-open .ta-trigger{cursor:default}
.ta-trigger:focus-visible{outline:3px solid var(--st-brand);outline-offset:-4px}
.ta-info{position:relative;z-index:2;flex:0 1 0;min-width:0;overflow:hidden;visibility:hidden;opacity:0;transition:flex-grow .65s cubic-bezier(.4,0,.2,1),opacity .35s ease,visibility 0s .65s}
.ta-item.is-open .ta-info,.ta:not([data-ta-ready]) .ta-item:first-child .ta-info{flex-grow:1.15;visibility:visible;opacity:1;transition:flex-grow .65s cubic-bezier(.4,0,.2,1),opacity .45s ease .2s,visibility 0s}
.ta-inner{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:10px;width:clamp(260px,26cqi,360px);height:100%;padding:clamp(22px,3cqi,40px)}
.ta-name{font-size:clamp(22px,2cqi + 8px,30px);letter-spacing:-.02em}
.ta-role{color:var(--st-brand);font-size:15px;font-weight:600}
.ta-social{display:flex;gap:8px;margin:4px 0 6px}
.ta-social a{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:color-mix(in srgb,var(--st-brand) 12%,transparent);color:var(--st-brand);transition:background .2s ease,color .2s ease,transform .2s ease}
.ta-social a:hover{background:var(--st-brand);color:var(--st-btn-text);transform:translateY(-2px)}
.ta-social a:focus-visible{outline:3px solid var(--st-brand);outline-offset:2px}
.ta-social:not(:has(a:not([hidden]))){display:none}
.ta-social .st-icon{display:inline-grid;place-items:center;width:17px;height:17px}
.ta-social svg{width:17px;height:17px}
.ta-bio{color:var(--st-muted);font-size:15.5px;line-height:1.65}
.ta-bio:empty{display:none}
.ta-photo{position:relative;flex:1 1 0;min-width:0;background:var(--st-surface)}
.ta-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 22%;transition:filter .5s ease,transform .8s ease}
.ta[data-gray=on] .ta-item:not(.is-open) .ta-photo img{filter:grayscale(1) contrast(1.05)}
.ta[data-gray=on]:not([data-ta-ready]) .ta-item:not(:first-child) .ta-photo img{filter:grayscale(1) contrast(1.05)}
.ta-item:not(.is-open):hover .ta-photo img{transform:scale(1.05)}
@container st (max-width:760px){
.ta-strips{flex-direction:column;height:clamp(600px,178cqi,830px)}
.ta-item{flex-direction:column;min-height:56px}
.ta-info{flex:0 1 0;width:100%}
.ta-item.is-open .ta-info,.ta:not([data-ta-ready]) .ta-item:first-child .ta-info{flex-grow:2.6}
.ta-inner{width:100%;gap:6px;padding:16px 20px;justify-content:flex-start;overflow-y:auto}
.ta-bio{font-size:14.5px;line-height:1.55}
.ta-photo{flex:1 1 0;min-height:96px}
.ta-photo img{object-position:center 18%}
}
@media (prefers-reduced-motion:reduce){.ta-item,.ta-info,.ta-photo img{transition:none}}`,
};
