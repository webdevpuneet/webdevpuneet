import { esc, escBr, safeUrl, wrapText, rich, stripRich } from './meta.js';
import { inboxFields, brandFields, footerFields, DEFAULT_VARS, ctx, emailShell, textFooter, cleanText, buttonRow } from './shell.js';

const MEMBERS = [1, 2, 3, 4];
const TINTS = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'];
const initials = s => String(stripRich(s) || '').replace(/\{\{[^}]*\}\}/g, '').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase() || '?';
const members = f => MEMBERS.map(n => [f[`member${n}`], n]).filter(([x]) => String(x || '').trim());

export default {
  id: 'team-invitation',
  name: 'Team Invitation Email',
  version: '1.0.0',
  category: 'onboarding',
  tags: ['team-invitation', 'workspace-invite', 'invite-user', 'collaboration', 'saas', 'b2b', 'onboarding', 'dark-mode'],
  created: '2026-11-03',
  updated: '2026-11-03',
  seoTitle: 'Team Invitation Email Template — Free Workspace Invite HTML',
  seoDescription: 'Free team invitation email template: who invited you, the workspace and role, teammate avatars, an Accept button, link expiry and a not-expecting-it note.',
  description: 'A workspace invite for SaaS and B2B tools that answers "who sent this and is it safe?": the inviter’s initials and name, an optional personal message, a workspace card with its initials tile, your role and a row of teammate avatars with "+N more", an "Accept invitation" button, when the link expires and what to do if you weren’t expecting it.',

  groups: [
    { id: 'inbox', label: 'Inbox' },
    { id: 'brand', label: 'Brand & header' },
    { id: 'main', label: 'Invitation & button' },
    { id: 'workspace', label: 'Workspace card' },
    { id: 'team', label: 'Teammates', toggle: 'showTeam' },
    { id: 'footer', label: 'Footer' },
  ],
  fields: [
    ...inboxFields('Maya Chen invited you to join Northwind Studio on Acme', 'Accept to see the team’s projects, boards and files. The invite link works for 7 days.', 'Maya Chen via Acme'),
    ...brandFields(),
    { key: 'inviter', group: 'main', label: 'Invited by (name)', type: 'text', value: 'Maya Chen' },
    { key: 'inviterEmail', group: 'main', label: 'Inviter’s email', type: 'text', value: 'maya@northwind.studio' },
    { key: 'headline', group: 'main', label: 'Headline', type: 'text', value: 'Maya invited you to join Northwind Studio' },
    { key: 'message', group: 'main', label: 'Personal message (optional)', type: 'textarea', value: 'Hey {{first_name}}! We’re moving the spring campaign into Acme. Jump in when you can, the brief is pinned in #launch.' },
    { key: 'wsInitials', group: 'workspace', label: 'Workspace initials', type: 'text', value: 'NS' },
    { key: 'wsName', group: 'workspace', label: 'Workspace name', type: 'text', value: 'Northwind Studio' },
    { key: 'wsUrl', group: 'workspace', label: 'Workspace address (shown as text)', type: 'text', value: 'northwind.acme.app' },
    { key: 'role', group: 'workspace', label: 'Your role', type: 'text', value: 'Editor' },
    { key: 'roleNote', group: 'workspace', label: 'What the role can do', type: 'text', value: 'Create and edit projects, comment and upload files' },
    { key: 'member1', group: 'team', label: 'Teammate 1', type: 'text', value: 'Maya Chen' },
    { key: 'member2', group: 'team', label: 'Teammate 2', type: 'text', value: 'Leo Park' },
    { key: 'member3', group: 'team', label: 'Teammate 3', type: 'text', value: 'Priya Nair' },
    { key: 'member4', group: 'team', label: 'Teammate 4', type: 'text', value: 'Tom Okoro' },
    { key: 'moreCount', group: 'team', label: 'Others (number, optional)', type: 'text', value: '9' },
    { key: 'ctaText', group: 'main', label: 'Button text', type: 'text', value: 'Accept invitation' },
    { key: 'ctaUrl', group: 'main', label: 'Invite link', type: 'url', value: 'https://webdevpuneet.com/invite/7f3k9q' },
    { key: 'expiry', group: 'main', label: 'Expiry note', type: 'text', value: 'This invitation expires in 7 days (on November 10).' },
    { key: 'note', group: 'main', label: 'Not expecting it? note', type: 'textarea', value: 'Not expecting this? You can ignore the email: nobody gets access to anything unless you accept. If it looks suspicious, forward it to security@webdevpuneet.com.' },
    ...footerFields({ reason: 'You’re receiving this because Maya Chen invited {{email}} to a workspace on Acme.' }),
  ],
  toggles: [{ key: 'showTeam', label: 'Teammates', value: true }],
  vars: DEFAULT_VARS('#4f46e5'),
  fonts: { heading: 'inter', body: 'system' },

  build(s, opts = {}) {
    const c = ctx(this, s, opts);
    const { f, v, on, H, B, A } = c;
    const team = members(f);
    const more = parseInt(String(f.moreCount || '').replace(/\D/g, ''), 10) || 0;
    const avatar = (name, i, size = 34, key) => `<td style="padding:0 4px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="${size}" height="${size}"${key ? A(key) : ''} title="${esc(stripRich(name))}" style="width:${size}px;height:${size}px;border-radius:${size / 2}px;background:${TINTS[i % TINTS.length]};color:#ffffff;font-family:${B};font-size:${Math.round(size * 0.36)}px;line-height:${size}px;font-weight:800;mso-line-height-rule:exactly;">${esc(initials(name))}</td></tr></table></td>`;
    const card = `
              <tr>
                <td class="px" style="padding:44px 48px 0;font-family:${B};">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td valign="middle" style="padding:0 12px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="48" height="48" style="width:48px;height:48px;border-radius:24px;background:${v.brand};color:${v.btnText};font-family:${H};font-size:17px;line-height:48px;font-weight:800;mso-line-height-rule:exactly;">${esc(initials(f.inviter))}</td></tr></table></td>
                    <td valign="middle" style="font-family:${B};font-size:14px;line-height:20px;">
                      <span class="t"${A('inviter')} style="font-weight:700;color:${v.text};">${rich(f.inviter)}</span><br>
                      <span class="m"${A('inviterEmail')} style="color:${v.muted};">${rich(f.inviterEmail)}</span>
                    </td>
                  </tr></table>
                  <div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>
                  <h1 class="h1 t"${A('headline')} style="margin:0 0 16px;font-family:${H};font-size:28px;line-height:36px;font-weight:800;letter-spacing:-0.5px;color:${v.text};">${rich(f.headline)}</h1>
                  ${f.message ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="m"${A('message')} style="padding:4px 0 4px 16px;border-left:3px solid ${v.brand};font-family:${B};font-size:16px;line-height:25px;font-style:italic;color:${v.muted};">&ldquo;${escBr(f.message)}&rdquo;</td></tr></table>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:26px 48px 0;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="soft" style="border-collapse:separate;background:#f5f6ff;border:1px solid #e0e3fb;border-radius:14px;">
                    <tr><td style="padding:20px 22px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                        <td width="56" valign="top" style="padding:0 14px 0 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" valign="middle" width="52" height="52"${A('wsInitials')} style="width:52px;height:52px;border-radius:12px;background:#0f172a;color:#ffffff;font-family:${H};font-size:18px;line-height:52px;font-weight:800;mso-line-height-rule:exactly;">${rich(f.wsInitials)}</td></tr></table></td>
                        <td valign="top" style="font-family:${B};">
                          <p class="t"${A('wsName')} style="margin:0;font-family:${H};font-size:18px;line-height:24px;font-weight:800;color:${v.text};">${rich(f.wsName)}</p>
                          ${f.wsUrl ? `<p class="m"${A('wsUrl')} style="margin:2px 0 0;font-size:13px;line-height:19px;color:${v.muted};">${rich(f.wsUrl)}</p>` : ''}
                          ${f.role ? `<p style="margin:10px 0 0;font-size:13px;line-height:19px;"><span${A('role')} style="display:inline-block;padding:2px 10px;border-radius:99px;background:${v.brand};color:${v.btnText};font-weight:700;">${rich(f.role)}</span>${f.roleNote ? ` <span class="m"${A('roleNote')} style="color:${v.muted};">&nbsp;${rich(f.roleNote)}</span>` : ''}</p>` : ''}
                        </td>
                      </tr></table>
                      ${on.showTeam && team.length ? `<div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="padding:16px 0 0;border-top:1px solid #e0e3fb;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                          ${team.map(([name, n], i) => avatar(name, i, 34, `member${n}`)).join('')}
                          ${more ? `<td valign="middle" class="m"${A('moreCount')} style="padding:0 0 0 8px;font-family:${B};font-size:13px;line-height:18px;color:${v.muted};">+${more} more already here</td>` : ''}
                        </tr></table>
                      </td></tr></table>` : ''}
                    </td></tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:28px 48px 8px;font-family:${B};">
                  ${buttonRow(c, 'ctaText', f.ctaText, f.ctaUrl, { pad: '0 0 14px', width: 240 })}
                  ${f.expiry ? `<p class="m"${A('expiry')} style="margin:0 0 24px;font-size:14px;line-height:21px;color:${v.muted};">${rich(f.expiry)}</p>` : ''}
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:0 48px 40px;font-family:${B};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="line" style="border-top:1px solid #e2e8f0;padding:20px 0 0;">
                    <p class="m" style="margin:0 0 6px;font-size:13px;line-height:19px;color:${v.muted};">Button not working? Paste this link into your browser:</p>
                    <p style="margin:0 0 14px;font-size:13px;line-height:19px;word-break:break-all;"><a href="${safeUrl(f.ctaUrl)}" target="_blank" style="color:${v.brand};text-decoration:underline;">${rich(f.ctaUrl)}</a></p>
                    ${f.note ? `<p class="m"${A('note')} style="margin:0;font-size:14px;line-height:22px;color:${v.muted};">${escBr(f.note)}</p>` : ''}
                  </td></tr></table>
                </td>
              </tr>`;
    return emailShell(c, { card });
  },

  text(s) {
    const f = s.fields, on = s.toggles;
    const out = [f.brandName, '', f.headline, ''];
    if (f.inviter) out.push(`From: ${f.inviter}${f.inviterEmail ? ` <${f.inviterEmail}>` : ''}`, '');
    if (f.message) out.push(`"${wrapText(stripRich(f.message))}"`, '');
    out.push(`Workspace: ${f.wsName}${f.wsUrl ? ` (${f.wsUrl})` : ''}`);
    if (f.role) out.push(`Your role: ${f.role}${f.roleNote ? ` - ${f.roleNote}` : ''}`);
    if (on.showTeam) {
      const team = members(f).map(([x]) => x);
      if (team.length) out.push(`Team: ${team.join(', ')}${f.moreCount ? ` and ${f.moreCount} more` : ''}`);
    }
    out.push('', `${f.ctaText}: ${safeUrl(f.ctaUrl)}`);
    if (f.expiry) out.push(f.expiry);
    out.push('');
    if (f.note) out.push(wrapText(f.note), '');
    out.push(textFooter(f));
    return cleanText(out);
  },
};
