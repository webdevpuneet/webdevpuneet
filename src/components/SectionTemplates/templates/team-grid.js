import { avatar } from './parts.js';
import { iconSvg } from './icons.js';

const member = (photo, name, role, bio, linkedin = 'https://www.linkedin.com/', x = '') => ({ photo: avatar(photo), name, role, bio, linkedin, x });

export default {
  id: 'team-grid',
  name: 'Team Grid',
  version: '1.0.0',
  category: 'team',
  tags: ['team', 'about', 'people', 'grid', 'cards', 'social-links', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Team Section Template — Free Meet the Team Grid HTML & CSS',
  seoDescription: 'Free team section: a grid of member cards with photos, names, roles, short bios and LinkedIn or X links that slide in on hover. Responsive; export HTML, React.',
  description: 'A “meet the team” grid: a centred heading, then cards with each person’s photo, name, role and a one-line bio. LinkedIn and X icons slide up over the photo on hover (and are always visible on touch screens). Add up to twelve people; the grid reflows from four columns to two.',
  bestFor: ['About and company pages', 'Agency and studio team pages', 'Startups introducing founders and early team'],

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Team members' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Our team' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'The people *behind the product*' },
    { key: 'lead', group: 'header', label: 'Intro text (optional)', type: 'textarea', value: 'A small, remote team of designers, engineers and support specialists across six countries.' },
  ],
  lists: [{
    key: 'members', group: 'items', label: 'Team members', itemLabel: 'Member', titleKey: 'name', min: 1, max: 12,
    fields: [
      { key: 'photo', label: 'Photo', type: 'image', value: '', hint: 'A square photo, at least 400×400 px.', upload: { name: 'member', maxW: 600 } },
      { key: 'photoAlt', label: 'Photo alt text', type: 'text', value: '' },
      { key: 'name', label: 'Name', type: 'text', value: 'New person' },
      { key: 'role', label: 'Role', type: 'text', value: 'Role' },
      { key: 'bio', label: 'Short bio (optional)', type: 'textarea', value: '' },
      { key: 'linkedin', label: 'LinkedIn URL (optional)', type: 'url', value: '' },
      { key: 'x', label: 'X / Twitter URL (optional)', type: 'url', value: '' },
    ],
    value: [
      member(6, 'Aisha Bello', 'Co-founder & CEO', 'Ex-product lead at two scale-ups. Obsessed with calm software.'),
      member(1, 'Leo Martins', 'Co-founder & CTO', 'Builds fast, boring, reliable systems. Coffee-powered.', 'https://www.linkedin.com/', 'https://x.com/'),
      member(5, 'Nora Quinn', 'Head of Design', 'Designs for clarity first. Previously at a design studio in Dublin.'),
      member(4, 'Ravi Shah', 'Lead Engineer', 'Performance nerd who makes every click feel instant.', 'https://www.linkedin.com/', 'https://x.com/'),
    ],
  }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#64748b', radius: '18' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-edit="lead"></p>
  </header>
  <ul class="tm2-grid" data-list="members">
    <li class="tm2-card" data-anim="item">
      <div class="tm2-photo">
        <img data-image="photo" alt="" width="400" height="400" loading="lazy">
        <div class="tm2-social">
          <a data-href="linkedin" data-show-if="linkedin" aria-label="LinkedIn">${iconSvg('linkedin', 17)}</a>
          <a data-href="x" data-show-if="x" aria-label="X (Twitter)">${iconSvg('twitter', 17)}</a>
        </div>
      </div>
      <h3 class="tm2-name" data-edit="name"></h3>
      <p class="tm2-role" data-edit="role"></p>
      <p class="tm2-bio" data-edit="bio"></p>
    </li>
  </ul>
</div>`,
  css: `.st-team-grid{padding:clamp(64px,8cqi,112px) 0}
.tm2-grid{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(18px,2.4cqi,32px)}
.tm2-card{display:flex;flex-direction:column}
.tm2-photo{position:relative;overflow:hidden;margin-bottom:16px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);aspect-ratio:1}
.tm2-photo img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.tm2-card:hover .tm2-photo img{transform:scale(1.05)}
.tm2-social{position:absolute;left:12px;bottom:12px;display:flex;gap:8px;transform:translateY(calc(100% + 16px));transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.tm2-card:hover .tm2-social,.tm2-card:focus-within .tm2-social{transform:none}
@media (hover:none){.tm2-social{transform:none}}
.tm2-social a{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.92);color:#0f172a;box-shadow:0 6px 16px rgba(0,0,0,.18)}
.tm2-social a:hover{background:var(--st-brand);color:var(--st-btn-text)}
.tm2-social svg{width:17px;height:17px}
.tm2-name{font-size:18px;letter-spacing:-.01em}
.tm2-role{color:var(--st-brand);font-size:14.5px;font-weight:600;margin-top:2px}
.tm2-bio{color:var(--st-muted);font-size:15px;margin-top:8px}
.tm2-bio:empty{display:none}
@container st (max-width:960px){.tm2-grid{grid-template-columns:repeat(3,1fr)}}
@container st (max-width:700px){.tm2-grid{grid-template-columns:repeat(2,1fr)}}`,
};
