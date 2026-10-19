import { esc, escBr, safeUrl, wrapText, rich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, headerHtml, footerHtml, h1Html, textFooter, cleanText, IMG, buttonRow, socialFields, socialRowHtml, socialText } from './shell.js';

const FEATS = [1, 2, 3];
const MORE = [1, 2, 3];
const feats = f => FEATS.map(n => ({ n, icon: f[`f${n}Icon`], title: f[`f${n}Title`], text: f[`f${n}Text`] })).filter(x => String(x.title || '').trim());
const more = f => MORE.map(n => [f[`more${n}`], `more${n}`]).filter(([x]) => String(x || '').trim());

export default {
  id: 'product-update',
  name: 'Product Update Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['product-update', 'feature-announcement', 'changelog', 'release-notes', 'saas', 'launch', 'dark-mode'],
  created: '2026-10-19',
  updated: '2026-10-19',
  seoTitle: 'Product Update Email Template — Free Feature Announcement',
  seoDescription: 'Free product update email template for SaaS feature announcements: hero image, "New" label, three feature highlights, a try-it button and a changelog list.',
  description: 'A SaaS product update and feature announcement email: a month label in the header, a feature image, a "New" label and headline, a short intro, three feature highlights with icons, a "Try it now" button, an "Also new" changelog list with a link to the full release notes, and social links.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Feature image', toggle: 'showHero' },
    { id: 'main', label: 'Announcement & button' },
    { id: 'features', label: 'Highlights (leave a title empty to hide it)' },
    { id: 'more', label: 'Also new', toggle: 'showMore' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],
  fields: [
    ...inboxFields('New in Acme: Automations are here', 'Put repetitive work on autopilot, plus three smaller updates you asked for.', 'Acme Product Team'),
    ...brandFields(),
    { key: 'updateLabel', group: 'brand', label: 'Header label', type: 'text', value: 'Product update · October 2026' },
    { key: 'heroUrl', group: 'hero', label: 'Feature image URL', type: 'url', value: IMG('product-update-feature.png'), hint: 'A screenshot or illustration of the feature. 1200×600 px works best.', upload: { name: 'feature', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'heroAlt', group: 'hero', label: 'Image alt text', type: 'text', value: 'An automation flow with a trigger, two actions and a completed step' },
    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'New' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Introducing Automations' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Hi {{first_name}}, you told us you spend hours every week on the same updates. Automations take care of them: pick a trigger, choose what should happen, and Acme does the rest.' },
    { key: 'f1Icon', group: 'features', label: 'Highlight 1 icon', type: 'text', value: '⚡' },
    { key: 'f1Title', group: 'features', label: 'Highlight 1 title', type: 'text', value: 'Triggers for everything' },
    { key: 'f1Text', group: 'features', label: 'Highlight 1 text', type: 'text', value: 'Start a flow when a task moves, a form is submitted or a date arrives.' },
    { key: 'f2Icon', group: 'features', label: 'Highlight 2 icon', type: 'text', value: '🧩' },
    { key: 'f2Title', group: 'features', label: 'Highlight 2 title', type: 'text', value: '30 ready-made recipes' },
    { key: 'f2Text', group: 'features', label: 'Highlight 2 text', type: 'text', value: 'Weekly reports, reminders and hand-offs, set up in under a minute.' },
    { key: 'f3Icon', group: 'features', label: 'Highlight 3 icon', type: 'text', value: '🔌' },
    { key: 'f3Title', group: 'features', label: 'Highlight 3 title', type: 'text', value: 'Works with your tools' },
    { key: 'f3Text', group: 'features', label: 'Highlight 3 text', type: 'text', value: 'Send updates to Slack, open GitHub issues and add events to Google Calendar.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Try Automations' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/automations' },
    { key: 'moreTitle', group: 'more', label: 'Section title', type: 'text', value: 'Also new this month' },
    { key: 'more1', group: 'more', label: 'Update 1', type: 'text', value: '<b>Dark mode</b> for the mobile apps' },
    { key: 'more2', group: 'more', label: 'Update 2', type: 'text', value: '<b>CSV export</b> for every report' },
    { key: 'more3', group: 'more', label: 'Update 3', type: 'text', value: '<b>Faster search</b>, now up to 3× quicker on large workspaces' },
    { key: 'changelogText', group: 'more', label: 'Changelog link text', type: 'text', value: 'Read the full changelog' },
    { key: 'changelogUrl', group: 'more', label: 'Changelog link', type: 'url', value: 'https://yoursite.com/changelog' },
    ...socialFields({ instagram: '', youtube: 'https://www.youtube.com/@yourbrand' }),
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you have an Acme account and opted in to product updates.' }),
  ],
  toggles: [
    { key: 'showHero', label: 'Feature image', value: true },
    { key: 'showMore', label: 'Also new', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
  ],
  vars: DEFAULT_VARS('#4f46e5'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const fs = feats(f);
    const ms = more(f);
    const hasHero = on.showHero && f.heroUrl;
    const header = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="middle">${headerHtml(c)}</td>
            ${f.updateLabel ? `<td align="right" valign="middle" class="m"${A('updateLabel')} style="font-family:${B};font-size:12px;line-height:18px;font-weight:600;color:${v.muted};">${rich(f.updateLabel)}</td>` : ''}
          </tr></table>`;
    const card = `
              ${hasHero ? `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${safeUrl(f.ctaUrl)}" target="_blank"><img${A('heroUrl')} src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></a></td></tr>` : ''}
              <tr>
                <td class="px" style="padding:${hasHero ? 36 : 44}px 48px 8px;font-family:${B};">
                  ${f.eyebrow ? `<p style="margin:0 0 12px;"><span${A('eyebrow')} style="display:inline-block;padding:4px 11px;border-radius:99px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:12px;line-height:16px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">${rich(f.eyebrow)}</span></p>` : ''}
                  ${h1Html(c, 'headline', f.headline)}
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 24px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              ${fs.length ? `<tr>
                <td class="px" style="padding:0 48px 10px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    ${fs.map(x => `<tr>
                      <td width="52" valign="top" style="width:52px;padding:0 14px 18px 0;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="40" height="40" class="soft"${A(`f${x.n}Icon`)} style="width:40px;height:40px;border-radius:10px;background:#eef2ff;font-size:20px;line-height:40px;mso-line-height-rule:exactly;">${rich(x.icon)}</td></tr></table>
                      </td>
                      <td valign="top" style="padding:0 0 18px;font-family:${B};">
                        <p class="t"${A(`f${x.n}Title`)} style="margin:0 0 2px;font-family:${H};font-size:16px;line-height:23px;font-weight:700;color:${v.text};">${rich(x.title)}</p>
                        ${x.text ? `<p class="m"${A(`f${x.n}Text`)} style="margin:0;font-size:15px;line-height:23px;color:${v.muted};">${rich(x.text)}</p>` : ''}
                      </td>
                    </tr>`).join('\n                    ')}
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 8px;">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 28px' })}
                </td>
              </tr>
              ${on.showMore && ms.length ? `<tr>
                <td class="px" style="padding:0 48px 36px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#f8fafc;border-radius:12px;"><tr>
                    <td style="padding:20px 22px;font-family:${B};">
                      ${f.moreTitle ? `<p class="t"${A('moreTitle')} style="margin:0 0 10px;font-family:${H};font-size:15px;line-height:22px;font-weight:800;color:${v.text};">${rich(f.moreTitle)}</p>` : ''}
                      ${ms.map(([x, key]) => `<p class="m" style="margin:0 0 6px;font-size:14px;line-height:22px;color:${v.muted};">&bull;&nbsp; <span${A(key)}>${rich(x)}</span></p>`).join('\n                      ')}
                      ${f.changelogText ? `<p style="margin:10px 0 0;font-size:14px;line-height:20px;"><a${A('changelogText')} href="${safeUrl(f.changelogUrl)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">${rich(f.changelogText)} &rarr;</a></p>` : ''}
                    </td>
                  </tr></table>
                </td>
              </tr>` : '<tr><td style="padding:0 0 12px;font-size:0;line-height:0;">&nbsp;</td></tr>'}`;
    return emailShell(c, { card, header, footer: footerHtml(c, { socials: socialRowHtml(c) }) });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const strip = x => String(x || '').replace(/<[^>]+>/g, '');
    const out = [`${f.brandName}${f.updateLabel ? ` — ${f.updateLabel}` : ''}`, '', `${f.eyebrow ? `[${f.eyebrow}] ` : ''}${f.headline}`, '', wrapText(f.intro), ''];
    for (const x of feats(f)) out.push(`${x.icon ? `${x.icon} ` : ''}${x.title}`, wrapText(x.text || ''), '');
    out.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showMore) {
      const ms = more(f);
      if (ms.length) out.push(f.moreTitle, ...ms.map(([x]) => `- ${strip(x)}`), f.changelogText ? `${f.changelogText}: ${safeUrl(f.changelogUrl)}` : '', '');
    }
    const so = socialText(f, on);
    if (so) out.push(so, '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
