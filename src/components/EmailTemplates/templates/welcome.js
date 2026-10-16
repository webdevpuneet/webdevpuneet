import { esc, escBr, safeUrl, preheaderHtml, buttonHtml, fontStackById, wrapText } from './meta.js';

const HERO = 'https://webdevpuneet.com/images/email-templates/welcome-hero.png';

export default {
  id: 'welcome',
  name: 'Welcome Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['welcome', 'onboarding', 'saas', 'dark-mode', 'responsive'],
  created: '2026-10-16',
  updated: '2026-10-16',
  seoTitle: 'Welcome Email Template — Free Responsive HTML Email',
  seoDescription: 'Free responsive welcome email template with dark mode, an Outlook-safe button and 3 getting-started steps. Edit it online, copy the HTML or fork it to My Code.',
  description: 'A responsive SaaS welcome email: logo header, hero image, headline, intro, an Outlook-safe call-to-action button, three numbered getting-started steps, a personal note from the founder, social links and a CAN-SPAM-ready footer, with dark mode built in.',
  defaultSubject: 'Welcome to Acme — let’s get you set up',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'hero', label: 'Hero', toggle: 'showHero' },
    { id: 'main', label: 'Message & button' },
    { id: 'steps', label: 'Getting-started steps', toggle: 'showSteps' },
    { id: 'note', label: 'Personal note', toggle: 'showNote' },
    { id: 'social', label: 'Social links', toggle: 'showSocial' },
    { id: 'footer', label: 'Footer (required by law)' },
  ],

  fields: [
    { key: 'fromName', group: 'inbox', label: 'Sender name', type: 'text', value: 'Maya at Acme' },
    { key: 'subject', group: 'inbox', label: 'Subject line', type: 'text', value: 'Welcome to Acme — let’s get you set up' },
    { key: 'preheader', group: 'inbox', label: 'Preheader (inbox preview text)', type: 'text', value: 'Three quick steps to your first project, plus a note from our founder.' },

    { key: 'brandName', group: 'brand', label: 'Brand name', type: 'text', value: 'Acme' },
    { key: 'logoUrl', group: 'brand', label: 'Logo image URL (optional)', type: 'url', value: '', hint: 'Leave empty to show the brand name as text.' },
    { key: 'logoWidth', group: 'brand', label: 'Logo width (px)', type: 'number', value: '120' },
    { key: 'headerLink', group: 'brand', label: 'Header link', type: 'url', value: 'https://yoursite.com' },

    { key: 'heroUrl', group: 'hero', label: 'Hero image URL', type: 'url', value: HERO, hint: '1200×520 px works best (shown at 600×260).' },
    { key: 'heroAlt', group: 'hero', label: 'Hero alt text', type: 'text', value: 'Welcome to Acme' },

    { key: 'eyebrow', group: 'main', label: 'Small label', type: 'text', value: 'You’re in' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Welcome aboard, Jordan!' },
    { key: 'intro', group: 'main', label: 'Intro', type: 'textarea', value: 'Thanks for joining Acme. You now have everything you need to plan, ship and report on your work in one calm place.\n\nHere’s how to get value in your first ten minutes.' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Open your dashboard' },
    { key: 'ctaUrl', group: 'main', label: 'Button link', type: 'url', value: 'https://yoursite.com/dashboard' },

    { key: 'stepsTitle', group: 'steps', label: 'Steps heading', type: 'text', value: 'Get started in 3 steps' },
    { key: 's1Title', group: 'steps', label: 'Step 1 title', type: 'text', value: 'Create your first project' },
    { key: 's1Text', group: 'steps', label: 'Step 1 text', type: 'text', value: 'Give it a name and pick a template. It takes about a minute.' },
    { key: 's2Title', group: 'steps', label: 'Step 2 title', type: 'text', value: 'Invite your team' },
    { key: 's2Text', group: 'steps', label: 'Step 2 text', type: 'text', value: 'Projects are better together. Your first five seats are free.' },
    { key: 's3Title', group: 'steps', label: 'Step 3 title', type: 'text', value: 'Connect your tools' },
    { key: 's3Text', group: 'steps', label: 'Step 3 text', type: 'text', value: 'Sync Slack, GitHub and Google Calendar so updates flow in automatically.' },

    { key: 'noteText', group: 'note', label: 'Note', type: 'textarea', value: 'I started Acme because planning work shouldn’t feel like work. If anything is confusing, or you just want to say hi, reply to this email. It comes straight to me.' },
    { key: 'noteName', group: 'note', label: 'Signed by', type: 'text', value: 'Maya Chen' },
    { key: 'noteRole', group: 'note', label: 'Role', type: 'text', value: 'Founder & CEO, Acme' },

    { key: 'xUrl', group: 'social', label: 'X (Twitter) URL', type: 'url', value: 'https://x.com/yourbrand' },
    { key: 'linkedinUrl', group: 'social', label: 'LinkedIn URL', type: 'url', value: 'https://www.linkedin.com/company/yourbrand' },
    { key: 'instagramUrl', group: 'social', label: 'Instagram URL', type: 'url', value: 'https://www.instagram.com/yourbrand' },
    { key: 'youtubeUrl', group: 'social', label: 'YouTube URL', type: 'url', value: '' },

    { key: 'address', group: 'footer', label: 'Company postal address', type: 'textarea', value: 'Acme Inc., 548 Market St #12345, San Francisco, CA 94104, USA', hint: 'US CAN-SPAM requires a valid postal address in commercial email.' },
    { key: 'reason', group: 'footer', label: 'Why they got this email', type: 'text', value: 'You’re receiving this email because you created an Acme account.' },
    { key: 'unsubscribeUrl', group: 'footer', label: 'Unsubscribe link', type: 'url', value: 'https://yoursite.com/unsubscribe', hint: 'Most email services replace this with their own merge tag, e.g. *|UNSUB|*.' },
    { key: 'prefsUrl', group: 'footer', label: 'Email preferences link (optional)', type: 'url', value: 'https://yoursite.com/settings/email' },
  ],

  toggles: [
    { key: 'showHero', label: 'Hero image', value: true },
    { key: 'showSteps', label: 'Getting-started steps', value: true },
    { key: 'showNote', label: 'Personal note', value: true },
    { key: 'showSocial', label: 'Social links', value: true },
  ],

  vars: [
    { key: 'brand', label: 'Brand / button', value: '#6366f1', group: 'light' },
    { key: 'btnText', label: 'Button text', value: '#ffffff', group: 'light' },
    { key: 'bg', label: 'Page background', value: '#eef0f7', group: 'light' },
    { key: 'card', label: 'Card', value: '#ffffff', group: 'light' },
    { key: 'text', label: 'Text', value: '#0f172a', group: 'light' },
    { key: 'muted', label: 'Muted text', value: '#64748b', group: 'light' },
    { key: 'darkBg', label: 'Page background', value: '#0b0f19', group: 'dark' },
    { key: 'darkCard', label: 'Card', value: '#151a28', group: 'dark' },
    { key: 'darkText', label: 'Text', value: '#f1f5f9', group: 'dark' },
    { key: 'darkMuted', label: 'Muted text', value: '#94a3b8', group: 'dark' },
  ],

  fonts: { heading: 'inter', body: 'system' },

  /** Full email HTML: tables, inline styles, Outlook (MSO) fixes, mobile and dark-mode CSS */
  build(s) {
    const f = s.fields, v = s.vars, on = s.toggles;
    const hf = fontStackById(s.fonts.heading), bf = fontStackById(s.fonts.body);
    const H = hf.stack.replace(/"/g, "'"), B = bf.stack.replace(/"/g, "'");
    const googles = [...new Set([hf.google, bf.google].filter(Boolean))];
    const logoW = Math.max(40, Math.min(240, parseInt(f.logoWidth, 10) || 120));
    const steps = [1, 2, 3].map(n => ({ n, title: f[`s${n}Title`], text: f[`s${n}Text`] })).filter(x => x.title || x.text);
    const socials = [['X', f.xUrl], ['LinkedIn', f.linkedinUrl], ['Instagram', f.instagramUrl], ['YouTube', f.youtubeUrl]].filter(([, u]) => String(u || '').trim());

    const header = f.logoUrl
      ? `<a href="${safeUrl(f.headerLink)}" target="_blank" style="text-decoration:none;"><img src="${safeUrl(f.logoUrl)}" width="${logoW}" alt="${esc(f.brandName)}" style="display:block;width:${logoW}px;max-width:100%;height:auto;border:0;"></a>`
      : `<a href="${safeUrl(f.headerLink)}" target="_blank" class="t" style="font-family:${H};font-size:22px;font-weight:800;letter-spacing:-0.4px;color:${v.text};text-decoration:none;"><span style="display:inline-block;width:12px;height:12px;border-radius:4px;background:${v.brand};margin-right:8px;vertical-align:middle;"></span>${esc(f.brandName)}</a>`;

    const hero = on.showHero && f.heroUrl ? `
<tr>
  <td class="hero" style="padding:0;">
    <img src="${safeUrl(f.heroUrl)}" width="600" alt="${esc(f.heroAlt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0;border-radius:16px 16px 0 0;">
  </td>
</tr>` : '';

    const stepsHtml = on.showSteps && steps.length ? `
<tr>
  <td class="px" style="padding:8px 48px 8px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="t" style="padding:0 0 14px;font-family:${H};font-size:18px;line-height:26px;font-weight:700;color:${v.text};">${esc(f.stepsTitle)}</td></tr>
      ${steps.map(st => `<tr>
        <td style="padding:0 0 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="44" valign="top" style="width:44px;padding:2px 14px 0 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                  <td align="center" valign="middle" width="32" height="32" style="width:32px;height:32px;border-radius:16px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:15px;font-weight:700;line-height:32px;mso-line-height-rule:exactly;">${st.n}</td>
                </tr></table>
              </td>
              <td valign="top" style="font-family:${B};">
                <div class="t" style="font-size:16px;line-height:24px;font-weight:700;color:${v.text};">${esc(st.title)}</div>
                <div class="m" style="font-size:15px;line-height:23px;color:${v.muted};">${esc(st.text)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`).join('\n      ')}
    </table>
  </td>
</tr>` : '';

    const noteHtml = on.showNote && f.noteText ? `
<tr>
  <td class="px" style="padding:8px 48px 40px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td class="line" style="border-top:1px solid #e2e8f0;padding:28px 0 0;font-family:${B};">
        <p class="t" style="margin:0 0 16px;font-size:15px;line-height:24px;color:${v.text};font-style:italic;">${escBr(f.noteText)}</p>
        <p class="t" style="margin:0;font-size:15px;line-height:22px;font-weight:700;color:${v.text};">${esc(f.noteName)}</p>
        <p class="m" style="margin:0;font-size:14px;line-height:20px;color:${v.muted};">${esc(f.noteRole)}</p>
      </td></tr>
    </table>
  </td>
</tr>` : '<tr><td style="padding:0 0 24px;font-size:0;line-height:0;">&nbsp;</td></tr>';

    const socialHtml = on.showSocial && socials.length ? `
<tr>
  <td align="center" style="padding:0 0 14px;font-family:${B};font-size:13px;line-height:20px;">
    ${socials.map(([label, u]) => `<a href="${safeUrl(u)}" target="_blank" style="color:${v.brand};font-weight:700;text-decoration:none;">${label}</a>`).join(' <span class="m" style="color:#94a3b8;">&nbsp;&middot;&nbsp;</span> ')}
  </td>
</tr>` : '';

    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${esc(f.subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>td,th,div,p,a,h1,h2,h3,span{font-family:Arial,Helvetica,sans-serif !important;}</style>
<![endif]-->
${googles.length ? `<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?${googles.map(g => `family=${g}`).join('&')}&display=swap" rel="stylesheet"><!--<![endif]-->\n` : ''}<style>
  /* ${this.name} v${this.version} · https://webdevpuneet.com/email-templates/${this.id}/ */
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;}
  body{margin:0 !important;padding:0 !important;width:100% !important;}
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important;}
  u + #body a{color:inherit;text-decoration:none;}
  @media screen and (max-width:620px){
    .container{width:100% !important;}
    .px{padding-left:24px !important;padding-right:24px !important;}
    .h1{font-size:28px !important;line-height:34px !important;}
    .btn{width:100% !important;}
  }
  @media (prefers-color-scheme: dark){
    .bg{background-color:${v.darkBg} !important;}
    .card{background-color:${v.darkCard} !important;}
    .t{color:${v.darkText} !important;}
    .m{color:${v.darkMuted} !important;}
    .line{border-color:#273049 !important;}
  }
  [data-ogsc] .bg{background-color:${v.darkBg} !important;}
  [data-ogsc] .card{background-color:${v.darkCard} !important;}
  [data-ogsc] .t{color:${v.darkText} !important;}
  [data-ogsc] .m{color:${v.darkMuted} !important;}
</style>
</head>
<body id="body" class="bg" style="margin:0;padding:0;width:100%;background-color:${v.bg};">
${preheaderHtml(f.preheader, v.bg)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg" style="background-color:${v.bg};">
  <tr>
    <td align="center" style="padding:32px 12px 40px;">
      <!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
        <tr>
          <td style="padding:0 8px 22px;">${header}</td>
        </tr>
        <tr>
          <td>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card" style="background-color:${v.card};border-radius:16px;">
${hero}
              <tr>
                <td class="px" style="padding:${hero ? 40 : 48}px 48px 8px;font-family:${B};">
                  ${f.eyebrow ? `<p style="margin:0 0 10px;font-family:${H};font-size:13px;line-height:18px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${v.brand};">${esc(f.eyebrow)}</p>` : ''}
                  <h1 class="h1 t" style="margin:0 0 16px;font-family:${H};font-size:32px;line-height:40px;font-weight:800;letter-spacing:-0.6px;color:${v.text};">${esc(f.headline)}</h1>
                  <p class="m" style="margin:0 0 28px;font-size:16px;line-height:26px;color:${v.muted};">${escBr(f.intro)}</p>
                  ${f.ctaText ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0 0 32px;">${buttonHtml({ text: f.ctaText, url: f.ctaUrl, bg: v.brand, color: v.btnText, font: H })}</td></tr></table>` : ''}
                </td>
              </tr>
${stepsHtml}
${noteHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${socialHtml}
              <tr>
                <td align="center" class="m" style="font-family:${B};font-size:12px;line-height:19px;color:${v.muted};">
                  ${f.reason ? `${esc(f.reason)}<br>` : ''}${escBr(f.address)}<br><br>
                  <a href="${safeUrl(f.unsubscribeUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Unsubscribe</a>${f.prefsUrl ? ` &nbsp;&middot;&nbsp; <a href="${safeUrl(f.prefsUrl)}" target="_blank" class="m" style="color:${v.muted};text-decoration:underline;">Email preferences</a>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>
`;
  },

  /** Plain-text version (multipart/alternative): what text-only clients and some filters read */
  text(s) {
    const f = s.fields, on = s.toggles;
    const lines = [];
    lines.push(f.brandName, '');
    if (f.eyebrow) lines.push(f.eyebrow.toUpperCase());
    lines.push(f.headline, '', wrapText(f.intro), '');
    if (f.ctaText) lines.push(`${f.ctaText}: ${safeUrl(f.ctaUrl)}`, '');
    if (on.showSteps) {
      const steps = [1, 2, 3].map(n => [f[`s${n}Title`], f[`s${n}Text`]]).filter(([a, b]) => a || b);
      if (steps.length) {
        lines.push(f.stepsTitle, '-'.repeat(Math.min(40, (f.stepsTitle || '').length || 10)));
        steps.forEach(([a, b], i) => lines.push(`${i + 1}. ${a}`, `   ${wrapText(b, 69).split('\n').join('\n   ')}`, ''));
      }
    }
    if (on.showNote && f.noteText) lines.push(wrapText(f.noteText), '', `${f.noteName}`, `${f.noteRole}`, '');
    if (on.showSocial) {
      const socials = [['X', f.xUrl], ['LinkedIn', f.linkedinUrl], ['Instagram', f.instagramUrl], ['YouTube', f.youtubeUrl]].filter(([, u]) => String(u || '').trim());
      if (socials.length) lines.push(socials.map(([l, u]) => `${l}: ${safeUrl(u)}`).join('\n'), '');
    }
    lines.push('---');
    if (f.reason) lines.push(wrapText(f.reason));
    lines.push(wrapText(f.address), `Unsubscribe: ${safeUrl(f.unsubscribeUrl)}`);
    if (f.prefsUrl) lines.push(`Email preferences: ${safeUrl(f.prefsUrl)}`);
    return `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
  },
};
