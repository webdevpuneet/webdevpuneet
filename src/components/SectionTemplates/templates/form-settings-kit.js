import { FK_CSS, formTop, formBottom, fText, fSelect, fArea, fOptions, fDrop, lbl, tailFields, headFields, headHtml, HEAD_GROUP } from './forms-shared.js';

const SWITCH = (name, titleKey, descKey, checked = false) =>
  `<label class="fk-switch"><span><strong data-edit="${titleKey}"></strong><small data-show-if="${descKey}" data-edit="${descKey}"></small></span><input type="checkbox" role="switch" name="${name}"${checked ? ' checked' : ''}></label>`;

export default {
  id: 'form-settings-kit',
  name: 'Profile & Preferences Form',
  version: '1.0.0',
  category: 'forms',
  tags: ['settings', 'profile', 'preferences', 'switch', 'range', 'select', 'date', 'file-upload', 'form', 'light'],
  created: '2026-11-12',
  updated: '2026-11-12',
  seoTitle: 'Profile & Settings Form — Switches, Range and Select',
  seoDescription: 'Free profile and preferences form: fields, select, date picker, avatar upload, toggle switches, option cards and a range slider with a live value. Pure HTML.',
  description: 'A settings-style form that shows every common control in one consistent style: text and email fields, a bio box with a character counter, a select menu, a date picker, an avatar drop area, toggle switches with descriptions, theme option cards and a range slider with a live value. Use it as a profile page, a preferences screen, an onboarding step or a reference for how each control should look, and it posts to Formspree, Basin, Getform or your own server.',
  bestFor: ['Account, profile and notification settings', 'Onboarding steps and preference centres', 'A design reference for a consistent set of form controls'],
  behaviors: ['form', 'formkit'],

  groups: [HEAD_GROUP, { id: 'profile', label: 'Profile' }, { id: 'prefs', label: 'Preferences' }, { id: 'lists', label: 'Choices' }, { id: 'form', label: 'Form' }],
  fields: [
    ...headFields({ eyebrow: 'Settings', heading: 'Your *profile* and preferences', lead: 'Update your details and choose how the product looks and what it tells you about.' }),
    lbl('dropTitle', 'Avatar area title', 'Upload a profile photo', 'profile'),
    lbl('dropHint', 'Avatar area hint (optional)', 'PNG or JPG, square works best', 'profile'),
    lbl('nameLabel', 'Name label', 'Full name', 'profile'),
    lbl('emailLabel', 'Email label', 'Email', 'profile'),
    lbl('roleLabel', 'Role label', 'Role', 'profile'),
    lbl('dateLabel', 'Date label', 'Date of birth', 'profile'),
    lbl('bioLabel', 'Bio label', 'About you', 'profile'),
    lbl('themeLegend', 'Theme heading', 'Appearance', 'prefs'),
    lbl('notifyHeading', 'Notifications heading', 'Notifications', 'prefs'),
    lbl('sw1', 'Switch 1 title', 'Product updates', 'prefs'), lbl('sw1d', 'Switch 1 text', 'News about new features, once a month.', 'prefs'),
    lbl('sw2', 'Switch 2 title', 'Comments and mentions', 'prefs'), lbl('sw2d', 'Switch 2 text', 'An email when someone replies to you.', 'prefs'),
    lbl('sw3', 'Switch 3 title', 'Weekly summary', 'prefs'), lbl('sw3d', 'Switch 3 text', 'A short recap every Monday morning.', 'prefs'),
    lbl('rangeLabel', 'Range label', 'Text size', 'prefs'),
    ...tailFields({ sends: 'avatar (file), name, email, role, birthday, bio, theme, notification switches, text size', submit: 'Save changes', note: '', successTitle: 'Settings saved', successText: 'Your profile and preferences were updated.' }),
  ],
  lists: [
    { key: 'roles', group: 'lists', label: 'Roles', itemLabel: 'Role', titleKey: 'name', min: 1, max: 10, fields: [{ key: 'name', label: 'Role', type: 'text', value: 'Designer' }], value: [{ name: 'Designer' }, { name: 'Developer' }, { name: 'Product manager' }, { name: 'Founder' }, { name: 'Other' }] },
    { key: 'themes', group: 'lists', label: 'Appearance options', itemLabel: 'Option', titleKey: 'name', min: 2, max: 4, fields: [{ key: 'name', label: 'Name', type: 'text', value: 'Light' }, { key: 'desc', label: 'Description (optional)', type: 'text', value: '' }], value: [{ name: 'Light', desc: 'Bright and clear' }, { name: 'Dark', desc: 'Easy on the eyes' }, { name: 'System', desc: 'Match my device' }] },
  ],
  toggles: [],
  theme: { brand: '#6366f1', brandText: '#ffffff', bg: '#ffffff', surface: '#f7f8fc', text: '#111633', muted: '#626a8f', radius: '14' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap sk">
  ${headHtml({ left: true, cls: 'sk-head' })}
  <div class="fk-card sk-card" data-anim="media">
    ${formTop('enctype="multipart/form-data"')}
        ${fDrop('avatar', 'dropTitle', 'dropHint', { accept: 'image/*' })}
        <div class="fk-two">
          ${fText('name', 'nameLabel', { required: true, auto: 'name' })}
          ${fText('email', 'emailLabel', { type: 'email', required: true, auto: 'email' })}
        </div>
        <div class="fk-two">
          ${fSelect('role', 'roleLabel', 'roles')}
          ${fText('birthday', 'dateLabel', { type: 'date', auto: 'bday' })}
        </div>
        ${fArea('bio', 'bioLabel', { rows: 3, max: 240, counter: true })}
        <hr class="sk-rule">
        ${fOptions('theme', 'themeLegend', 'themes', { required: true })}
        <div class="fk-group"><span class="fk-legend" data-edit="notifyHeading"></span>
          <div class="sk-switches">${SWITCH('notify_updates', 'sw1', 'sw1d', true)}${SWITCH('notify_comments', 'sw2', 'sw2d', true)}${SWITCH('notify_summary', 'sw3', 'sw3d')}</div>
        </div>
        <label class="st-field"><span data-edit="rangeLabel"></span><span class="fk-range" data-fk-range data-suffix="%"><input type="range" name="text_size" min="80" max="140" step="5" value="100"><output></output></span></label>
${formBottom()}
  </div>
</div>`,
  css: `.st-form-settings-kit{padding:clamp(64px,8cqi,112px) 0}
${FK_CSS}
.sk{max-width:760px;margin:0 auto}
.sk-card .st-form-fields{gap:20px}
.sk-rule{border:0;border-top:1px solid color-mix(in srgb,var(--st-text) 10%,transparent);margin:2px 0}
.sk-switches{display:flex;flex-direction:column}
.sk-switches .fk-switch{border-bottom:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.sk-switches .fk-switch:last-child{border-bottom:0}
.sk-card .fk-drop{flex-direction:row;justify-content:flex-start;text-align:left;gap:16px;padding:18px 20px}
.sk-card .fk-drop-icon{margin:0;flex:none}
.sk-card .fk-drop-title,.sk-card .fk-drop-hint{display:block}`,
};
