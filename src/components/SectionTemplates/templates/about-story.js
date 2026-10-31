/* About / Our story: a picture with a badge, the story in two short paragraphs, the person behind it,
   three headline facts and a row of values. The name, year and founder are also written as schema.org
   Organization data. */
import { IMG } from './meta.js';

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export default {
  id: 'about-story',
  name: 'About Us & Our Story',
  version: '1.0.0',
  category: 'about',
  tags: ['about us', 'our story', 'company', 'values', 'mission', 'founder', 'facts', 'brand', 'light'],
  created: '2026-10-31',
  updated: '2026-10-31',
  seoTitle: 'About Us Section Template — Free Our Story & Values HTML',
  seoDescription: 'Free About us section: a picture with a badge, your story, founder, key facts and a values grid, plus Organization data for search engines. Edit and export.',
  description: 'The About page section most websites are missing: a large picture with a floating badge such as “Since 2014”, a heading and your story in two short paragraphs, the founder with a photo and role, three headline facts, and a grid of values with icons. Every part is optional, so it works for a one-person studio or a company. The name, founding year and founder are also written as schema.org Organization data so search engines understand who is behind the site.',
  bestFor: ['About pages of agencies, studios and small businesses', 'Clinics, restaurants, shops and schools telling their story', 'Founders and freelancers building trust'],
  schema: state => {
    const f = state.fields || {};
    const name = plain(f.orgName);
    if (!name) return null;
    const year = String(f.foundedYear || '').trim();
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      ...(plain(f.story) && { description: plain(f.story) }),
      ...(/^\d{4}$/.test(year) && { foundingDate: year }),
      ...(plain(f.founder) && { founder: { '@type': 'Person', name: plain(f.founder), ...(plain(f.founderRole) && { jobTitle: plain(f.founderRole) }) } }),
    };
  },

  groups: [
    { id: 'header', label: 'Heading and story' },
    { id: 'media', label: 'Picture and badge' },
    { id: 'founder', label: 'Founder', toggle: 'showFounder' },
    { id: 'facts', label: 'Key facts', toggle: 'showFacts' },
    { id: 'values', label: 'Values', toggle: 'showValues' },
    { id: 'cta', label: 'Buttons' },
    { id: 'seo', label: 'Organization (for search engines)' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'About us' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Started in a spare room, built by *people who care*' },
    { key: 'story', group: 'header', label: 'Story', type: 'textarea', value: 'Fieldnote began in 2014 with one laptop, one borrowed desk and a belief that good design should feel simple. Ten years on we are a team of nine, working with founders, clinics, restaurants and schools across the world.' },
    { key: 'story2', group: 'header', label: 'Second paragraph (optional)', type: 'textarea', value: 'We keep our projects small on purpose. That way the people you meet in the first call are the people who build your site, and every detail gets the time it deserves.' },

    { key: 'image', group: 'media', label: 'Picture', type: 'image', value: IMG('about-studio.jpg'), upload: { name: 'about', maxW: 1400 }, hint: 'A portrait picture works best (4 by 5). Use the focus point if it is cropped.' },
    { key: 'imageAlt', group: 'media', label: 'Picture description (alt text)', type: 'text', value: 'A bright workshop with a laptop, coffee mugs and notes on the pinboard' },
    { key: 'badgeNumber', group: 'media', label: 'Badge number (optional)', type: 'text', value: '10' },
    { key: 'badgeLabel', group: 'media', label: 'Badge text', type: 'text', value: 'years of craft' },

    { key: 'founderPhoto', group: 'founder', label: 'Photo', type: 'image', value: IMG('avatar-3.jpg'), upload: { name: 'founder', maxW: 300 } },
    { key: 'founderPhotoAlt', group: 'founder', label: 'Photo description (alt text)', type: 'text', value: 'Maya Okafor, founder' },
    { key: 'founder', group: 'founder', label: 'Name', type: 'text', value: 'Maya Okafor' },
    { key: 'founderRole', group: 'founder', label: 'Role', type: 'text', value: 'Founder and creative director' },
    { key: 'quote', group: 'founder', label: 'Short quote (optional)', type: 'textarea', value: '“We would rather do fewer things and do them properly.”' },

    { key: 'primaryLabel', group: 'cta', label: 'Main button text (optional)', type: 'text', value: 'Meet the team' },
    { key: 'primaryUrl', group: 'cta', label: 'Main button link', type: 'url', value: '/team/' },
    { key: 'secondaryLabel', group: 'cta', label: 'Second button text (optional)', type: 'text', value: 'See our work' },
    { key: 'secondaryUrl', group: 'cta', label: 'Second button link', type: 'url', value: '/work/' },

    { key: 'orgName', group: 'seo', label: 'Organization name', type: 'text', value: 'Fieldnote Studio', hint: 'Written into the page as Organization data. Leave empty to leave it out.' },
    { key: 'foundedYear', group: 'seo', label: 'Year founded (optional)', type: 'text', value: '2014', hint: 'Four digits, for example 2014.' },
  ],
  lists: [
    {
      key: 'facts', group: 'facts', label: 'Facts', itemLabel: 'Fact', titleKey: 'label', min: 1, max: 4,
      fields: [
        { key: 'number', label: 'Number', type: 'text', value: '100+' },
        { key: 'label', label: 'Label', type: 'text', value: 'projects launched' },
      ],
      value: [
        { number: '120+', label: 'projects launched' },
        { number: '9', label: 'countries served' },
        { number: '4.9', label: 'average client rating' },
      ],
    },
    {
      key: 'values', group: 'values', label: 'Values', itemLabel: 'Value', titleKey: 'title', min: 1, max: 6,
      fields: [
        { key: 'icon', label: 'Icon', type: 'icon', value: 'award' },
        { key: 'title', label: 'Title', type: 'text', value: 'Our value' },
        { key: 'text', label: 'Text', type: 'textarea', value: 'What we believe and how it shows in our work.' },
      ],
      value: [
        { icon: 'award', title: 'Craft over speed', text: 'We would rather ship something right than something fast, and say so when a deadline puts that at risk.' },
        { icon: 'shield-check', title: 'Honest by default', text: 'Fixed prices, plain language and no surprises. If something is not working, you hear it from us first.' },
        { icon: 'heart', title: 'People first', text: 'Good work comes from a team that is looked after, and clients who are treated as partners.' },
      ],
    },
  ],
  toggles: [
    { key: 'showFounder', label: 'Founder', value: true },
    { key: 'showFacts', label: 'Key facts', value: true },
    { key: 'showValues', label: 'Values', value: true },
  ],
  theme: { brand: '#0f766e', brandText: '#ffffff', bg: '#ffffff', surface: '#f1f7f6', text: '#10211f', muted: '#4b6360', radius: '18' },
  fonts: { heading: 'lora', body: 'dmsans' },

  html: `<div class="st-wrap">
  <div class="ab">
    <div class="ab-media" data-anim="media">
      <img class="ab-img" data-image="image" alt="">
      <p class="ab-badge" data-show-if="badgeNumber"><strong data-edit="badgeNumber"></strong><span data-edit="badgeLabel"></span></p>
    </div>
    <div class="ab-copy">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="ab-story" data-anim="item" data-edit="story"></p>
      <p class="ab-story" data-anim="item" data-show-if="story2" data-edit="story2"></p>
      <ul class="ab-facts" data-anim="item" data-show="showFacts" data-list="facts">
        <li class="ab-fact"><strong class="ab-num" data-edit="number"></strong><span class="ab-label" data-edit="label"></span></li>
      </ul>
      <figure class="ab-founder" data-anim="item" data-show="showFounder">
        <img class="ab-face" data-image="founderPhoto" data-optional alt="">
        <figcaption><strong class="ab-who" data-edit="founder"></strong><span class="ab-role" data-edit="founderRole"></span></figcaption>
        <blockquote class="ab-quote" data-show-if="quote" data-edit="quote"></blockquote>
      </figure>
      <div class="st-btns" data-anim="item">
        <a class="st-btn" data-show-if="primaryLabel" data-href="primaryUrl"><span data-edit="primaryLabel"></span></a>
        <a class="st-btn st-btn--ghost" data-show-if="secondaryLabel" data-href="secondaryUrl"><span data-edit="secondaryLabel"></span></a>
      </div>
    </div>
  </div>
  <ul class="ab-values" data-show="showValues" data-list="values">
    <li class="ab-value" data-anim="item">
      <span class="st-icon" data-icon="icon"></span>
      <h3 class="ab-vtitle" data-edit="title"></h3>
      <p class="ab-vtext" data-edit="text"></p>
    </li>
  </ul>
</div>`,
  css: `.st-about-story{padding:clamp(64px,8cqi,112px) 0}
.ab{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5cqi,76px);align-items:center}
.ab-media{position:relative}
.ab-img{width:100%;aspect-ratio:4 / 5;object-fit:cover;border-radius:calc(var(--st-radius) * 1.6px);background:var(--st-surface)}
.ab-badge{position:absolute;left:clamp(12px,2cqi,22px);bottom:clamp(12px,2cqi,22px);display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:14px 20px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-brand);color:var(--st-btn-text);box-shadow:0 18px 40px -16px color-mix(in srgb,var(--st-brand) 70%,#000)}
.ab-badge strong{font:700 clamp(30px,3.6cqi,42px)/1 var(--st-font-heading)}
.ab-badge span{font-size:14px;font-weight:600;opacity:.92}
.ab-copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(12px,1.6cqi,18px)}
.ab-copy .st-h2{text-align:left}
.ab-story{color:var(--st-muted);font-size:clamp(16px,1.5cqi,18px);line-height:1.7}
.ab-facts{list-style:none;display:flex;flex-wrap:wrap;gap:16px clamp(24px,4cqi,48px);margin:6px 0;padding:18px 0;width:100%;border-block:1px solid color-mix(in srgb,var(--st-text) 11%,transparent)}
.ab-fact{display:flex;flex-direction:column;gap:2px}
.ab-num{font:700 clamp(28px,3.2cqi,38px)/1.1 var(--st-font-heading);color:var(--st-brand)}
.ab-label{color:var(--st-muted);font-size:14px}
.ab-founder{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:4px 14px;width:100%}
.ab-face{width:56px;height:56px;border-radius:50%;object-fit:cover;background:var(--st-surface)}
.ab-founder figcaption{display:flex;flex-direction:column}
.ab-who{font-size:16px}
.ab-role{color:var(--st-muted);font-size:14px}
.ab-quote{grid-column:1 / -1;margin-top:8px;padding-left:16px;border-left:3px solid var(--st-brand);color:var(--st-text);font:italic 500 clamp(17px,1.7cqi,20px)/1.5 var(--st-font-heading)}
.ab-values{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:clamp(14px,1.8cqi,22px);margin-top:clamp(40px,6cqi,76px)}
.ab-value{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:clamp(22px,2.4cqi,30px);border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 8%,transparent)}
.ab-value .st-icon{background:color-mix(in srgb,var(--st-brand) 14%,transparent);margin-bottom:4px}
.ab-vtitle{font-size:19px}
.ab-vtext{color:var(--st-muted);font-size:15.5px}
@container st (max-width:820px){.ab{grid-template-columns:1fr}.ab-img{aspect-ratio:5 / 4}}`,
};
