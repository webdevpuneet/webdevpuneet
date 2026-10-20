/* Markup and CSS shared by several sections (testimonials now). Item fields they read:
   quote, name, role, avatar (+ avatarAlt); toggle: showStars. */
import { IMG } from './meta.js';

export const STARS_HTML = `<p class="st-stars" data-show="showStars" role="img" aria-label="Rated 5 out of 5"><span aria-hidden="true">★★★★★</span></p>`;

export const PERSON_HTML = `<div class="st-person">
        <img class="st-avatar" data-image="avatar" data-optional alt="" width="96" height="96" loading="lazy">
        <div><p class="st-person-name" data-edit="name"></p><p class="st-person-role" data-edit="role"></p></div>
      </div>`;

export const PERSON_CSS = `.st-stars{color:#f59e0b;font-size:16px;letter-spacing:2px;line-height:1}
.st-person{display:flex;align-items:center;gap:12px}
.st-avatar{width:44px;height:44px;flex:none;border-radius:50%;object-fit:cover;background:var(--st-surface)}
.st-person-name{font-weight:700;font-size:15.5px;line-height:1.3}
.st-person-role{color:var(--st-muted);font-size:14px;line-height:1.4}
.st-person-role:empty{display:none}`;

/** List fields for one testimonial */
export const quoteFields = ({ avatar = true } = {}) => [
  { key: 'quote', label: 'Quote', type: 'textarea', value: 'What this customer said about you.' },
  { key: 'name', label: 'Name', type: 'text', value: 'Customer name' },
  { key: 'role', label: 'Role and company (optional)', type: 'text', value: '' },
  ...(avatar ? [
    { key: 'avatar', label: 'Photo (optional)', type: 'image', value: '', hint: 'A square photo, at least 96×96 px. Leave empty to hide.', upload: { name: 'avatar', maxW: 240 } },
    { key: 'avatarAlt', label: 'Photo alt text', type: 'text', value: '' },
  ] : []),
];

export const avatar = n => IMG(`avatar-${n}.jpg`);
