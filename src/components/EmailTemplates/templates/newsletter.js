import { esc, escBr, safeUrl, buttonHtml, wrapText } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, headerHtml, footerHtml, textFooter, cleanText } from './shell.js';

const FEATURE_IMG = 'https://webdevpuneet.com/images/email-templates/newsletter-feature.png';
const STORIES = [1, 2, 3];
const storyFields = (n, tag, title, blurb) => [
  { key: `s${n}Tag`, group: 'stories', label: `Story ${n} tag`, type: 'text', value: tag },
  { key: `s${n}Title`, group: 'stories', label: `Story ${n} title`, type: 'text', value: title },
  { key: `s${n}Blurb`, group: 'stories', label: `Story ${n} summary`, type: 'textarea', value: blurb },
  { key: `s${n}Url`, group: 'stories', label: `Story ${n} link`, type: 'url', value: `https://yoursite.com/blog/story-${n}` },
];
const stories = f => STORIES.map(n => ({ n, tag: f[`s${n}Tag`], title: f[`s${n}Title`], blurb: f[`s${n}Blurb`], url: f[`s${n}Url`] })).filter(x => String(x.title || '').trim());
const socialList = f => [['X', f.xUrl, 'xUrl'], ['LinkedIn', f.linkedinUrl, 'linkedinUrl'], ['Instagram', f.instagramUrl, 'instagramUrl'], ['YouTube', f.youtubeUrl, 'youtubeUrl']].filter(([, u]) => String(u || '').trim());

export default {
  id: 'newsletter',
  name: 'Newsletter Email',
  version: '1.0.0',
  category: 'marketing',
  tags: ['newsletter', 'content', 'blog-digest', 'saas', 'marketing', 'dark-mode'],
  created: '2026-10-17',
  updated: '2026-10-17',
  seoTitle: 'Newsletter Email Template — Free Responsive HTML Newsletter',
  seoDescription: 'Free HTML newsletter email template: issue masthead, featured story with image, three article summaries, tip box, social links and an unsubscribe footer.',
  description: 'A weekly or monthly newsletter: masthead with issue number and date, an editor’s intro, a featured story with image and button, three article summaries with links, a highlighted tip box, social links and a CAN-SPAM-ready footer with unsubscribe.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & masthead' },
    { id: 'intro', label: 'Editor’s intro' },
    { id: 'feature', label: 'Featured story', toggle: 'showFeature' },
    { id: 'stories', label: 'More stories (leave a title empty to hide it)' },
    { id: 'tip', label: 'Tip box', toggle: 'showTip' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('The Acme Weekly #42: shipping faster with smaller PRs', 'This week: smaller pull requests, a new dashboard and one tip that saves an hour a week.', 'Acme Weekly'),
    ...brandFields(),
    { key: 'issue', group: 'brand', label: 'Issue label', type: 'text', value: 'Issue #42 · October 17, 2026' },
    { key: 'webUrl', group: 'brand', label: '"View in browser" link (optional)', type: 'url', value: 'https://yoursite.com/newsletter/42' },
    { key: 'greeting', group: 'intro', label: 'Greeting', type: 'text', value: 'Hi there,' },
    { key: 'intro', group: 'intro', label: 'Intro', type: 'textarea', value: 'This week we’re looking at why small pull requests ship faster, what changed in our new dashboard, and a keyboard shortcut you’ll use every day. Grab a coffee, it’s a five-minute read.' },
    { key: 'imageUrl', group: 'feature', label: 'Featured image URL', type: 'url', value: FEATURE_IMG, hint: 'Paste a hosted URL or upload an image. 1200×600 px works best.', upload: { name: 'feature', maxW: 1200, mime: 'image/jpeg' } },
    { key: 'imageAlt', group: 'feature', label: 'Image alt text', type: 'text', value: 'Illustration of a pull request being merged' },
    { key: 'featureTag', group: 'feature', label: 'Tag', type: 'text', value: 'Featured' },
    { key: 'featureTitle', group: 'feature', label: 'Title', type: 'text', value: 'Why small pull requests ship twice as fast' },
    { key: 'featureBlurb', group: 'feature', label: 'Summary', type: 'textarea', value: 'We tracked 1,200 pull requests over six months. The ones under 200 lines were reviewed in hours, not days, and caused fewer incidents. Here’s how our team changed the way we split work.' },
    { key: 'featureCta', group: 'feature', label: 'Button text', type: 'text', value: 'Read the story' },
    { key: 'featureUrl', group: 'feature', label: 'Button link', type: 'url', value: 'https://yoursite.com/blog/small-prs' },
    ...storyFields(1, 'Product', 'The new dashboard is here', 'Custom widgets, saved views and a dark theme. See what’s new and how to turn it on for your team.'),
    ...storyFields(2, 'Guide', 'Writing release notes people read', 'A simple four-part template for release notes that customers actually open, with real examples.'),
    ...storyFields(3, 'Community', 'Meet this month’s featured maker', 'How a two-person studio in Austin uses Acme to run client projects without a project manager.'),
    { key: 'tipTitle', group: 'tip', label: 'Tip title', type: 'text', value: '⚡ Tip of the week' },
    { key: 'tipText', group: 'tip', label: 'Tip', type: 'textarea', value: 'Press Ctrl + K (or ⌘ + K on Mac) anywhere in Acme to open the command bar and jump to any project, file or setting.' },
    { key: 'signoff', group: 'intro', label: 'Sign-off', type: 'textarea', value: 'See you next week,\nSam from the Acme team' },
    { key: 'xUrl', group: 'social', label: 'X (Twitter) URL', type: 'url', value: 'https://x.com/yourbrand' },
    { key: 'linkedinUrl', group: 'social', label: 'LinkedIn URL', type: 'url', value: 'https://www.linkedin.com/company/yourbrand' },
    { key: 'instagramUrl', group: 'social', label: 'Instagram URL', type: 'url', value: '' },
    { key: 'youtubeUrl', group: 'social', label: 'YouTube URL', type: 'url', value: 'https://www.youtube.com/@yourbrand' },
    ...footerFields({ marketing: true, reason: 'You’re receiving this because you subscribed to The Acme Weekly.' }),
  ],
  toggles: [
    { key: 'showFeature', label: 'Featured story', value: true },
    { key: 'showTip', label: 'Tip box', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
  ],
  vars: DEFAULT_VARS('#e11d48'),
  fonts: { heading: 'playfair', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const list = stories(f);
    const socials = socialList(f);
    const header = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
            <td valign="middle">${headerHtml(c)}</td>
            <td align="right" valign="middle" class="m" style="font-family:${B};font-size:12px;line-height:18px;color:${v.muted};">${f.issue ? `<span${A('issue')}>${esc(f.issue)}</span>` : ''}${f.webUrl ? `${f.issue ? '<br>' : ''}<a${A('webUrl')} href="${safeUrl(f.webUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">View in browser</a>` : ''}</td>
          </tr></table>`;
    const feature = on.showFeature ? `
              ${f.imageUrl ? `<tr><td style="padding:0;font-size:0;line-height:0;"><a href="${safeUrl(f.featureUrl)}" target="_blank"><img${A('imageUrl')} src="${safeUrl(f.imageUrl)}" width="600" alt="${esc(f.imageAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;"></a></td></tr>` : ''}
              <tr>
                <td class="px" style="padding:${f.imageUrl ? 32 : 44}px 48px 8px;font-family:${B};">
                  ${f.featureTag ? `<p${A('featureTag')} style="margin:0 0 10px;font-family:${B};font-size:12px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.brand};">${esc(f.featureTag)}</p>` : ''}
                  <h1 class="h1 t"${A('featureTitle')} style="margin:0 0 14px;font-family:${H};font-size:30px;line-height:38px;font-weight:700;color:${v.text};"><a href="${safeUrl(f.featureUrl)}" target="_blank" class="t" style="color:${v.text};text-decoration:none;">${esc(f.featureTitle)}</a></h1>
                  ${f.featureBlurb ? `<p class="m"${A('featureBlurb')} style="margin:0 0 22px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.featureBlurb)}</p>` : ''}
                  ${f.featureCta ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 28px;">${buttonHtml({ text: f.featureCta, url: f.featureUrl, bg: v.brand, color: v.btnText, font: B, width: 200, height: 46, attrs: A('featureCta') })}</td></tr></table>` : ''}
                </td>
              </tr>` : '';
    const card = `
              ${feature}
              <tr>
                <td class="px" style="padding:${on.showFeature ? '0 48px 8px' : '44px 48px 8px'};font-family:${B};">
                  ${on.showFeature ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:28px 0 0;font-size:0;line-height:0;">&nbsp;</td></tr></table>` : ''}
                  ${f.greeting ? `<p class="t"${A('greeting')} style="margin:0 0 10px;font-size:16px;line-height:26px;font-weight:600;color:${v.text};">${esc(f.greeting)}</p>` : ''}
                  ${f.intro ? `<p class="m"${A('intro')} style="margin:0 0 24px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>` : ''}
                </td>
              </tr>
              ${list.map(x => `<tr>
                <td class="px" style="padding:0 48px 22px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td width="4" style="width:4px;background:${v.brand};border-radius:4px;font-size:0;line-height:0;">&nbsp;</td>
                    <td style="padding:2px 0 2px 18px;">
                      ${x.tag ? `<p class="m"${A(`s${x.n}Tag`)} style="margin:0 0 4px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${v.muted};">${esc(x.tag)}</p>` : ''}
                      <p style="margin:0 0 6px;font-family:${H};font-size:20px;line-height:27px;font-weight:700;"><a${A(`s${x.n}Title`)} href="${safeUrl(x.url)}" target="_blank" class="t" style="color:${v.text};text-decoration:none;">${esc(x.title)}</a></p>
                      ${x.blurb ? `<p class="m"${A(`s${x.n}Blurb`)} style="margin:0 0 6px;font-size:15px;line-height:24px;color:${v.muted};">${escBr(x.blurb)}</p>` : ''}
                      <a${A(`s${x.n}Url`)} href="${safeUrl(x.url)}" target="_blank" style="font-size:14px;line-height:22px;font-weight:700;color:${v.brand};text-decoration:none;">Read more &rarr;</a>
                    </td>
                  </tr></table>
                </td>
              </tr>`).join('\n              ')}
              ${on.showTip && f.tipText ? `<tr>
                <td class="px" style="padding:6px 48px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="background:#fff7ed;border-radius:12px;">
                    <tr><td style="padding:20px 22px;font-family:${B};">
                      ${f.tipTitle ? `<p class="t"${A('tipTitle')} style="margin:0 0 6px;font-family:${B};font-size:15px;line-height:22px;font-weight:800;color:${v.text};">${esc(f.tipTitle)}</p>` : ''}
                      <p class="m"${A('tipText')} style="margin:0;font-size:15px;line-height:24px;color:${v.muted};">${escBr(f.tipText)}</p>
                    </td></tr>
                  </table>
                </td>
              </tr>` : ''}
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  ${f.signoff ? `<p class="t"${A('signoff')} style="margin:0;font-size:15px;line-height:24px;color:${v.text};">${escBr(f.signoff)}</p>` : ''}
                </td>
              </tr>`;
    const socialHtml = on.showSocial && socials.length ? `
              <tr>
                <td align="center" style="padding:0 0 14px;font-family:${B};font-size:13px;line-height:20px;">
                  ${socials.map(([label, u, key]) => `<a${A(key)} href="${safeUrl(u)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">${label}</a>`).join(' <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> ')}
                </td>
              </tr>` : '';
    return emailShell(c, { card, header, footer: footerHtml(c, { socials: socialHtml }) });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [`${f.brandName} — ${f.issue}`];
    if (f.webUrl) out.push(`View in browser: ${safeUrl(f.webUrl)}`);
    out.push('');
    if (on.showFeature) out.push(f.featureTitle.toUpperCase(), wrapText(f.featureBlurb), `${f.featureCta}: ${safeUrl(f.featureUrl)}`, '');
    if (f.greeting) out.push(f.greeting);
    if (f.intro) out.push(wrapText(f.intro), '');
    for (const x of stories(f)) out.push(`${x.tag ? `[${x.tag}] ` : ''}${x.title}`, wrapText(x.blurb || ''), safeUrl(x.url), '');
    if (on.showTip && f.tipText) out.push(f.tipTitle, wrapText(f.tipText), '');
    if (f.signoff) out.push(f.signoff, '');
    if (on.showSocial) {
      const so = socialList(f);
      if (so.length) out.push(so.map(([l, u]) => `${l}: ${safeUrl(u)}`).join('\n'), '');
    }
    out.push(textFooter(f));
    return cleanText(out);
  },
};
