/* Shared helpers for email templates. Plain JS (no React) so the build scripts can
   import the registry. Email HTML rules this file enforces for every template:
   tables for layout, inline styles, absolute https image URLs, and safe font
   fallbacks (Outlook on Windows ignores web fonts and flexbox/grid entirely). */

export const EMAIL_CATEGORIES = [
  { id: 'onboarding',    label: 'Onboarding & Lifecycle', blurb: 'Welcome, trial-ending, birthday, win-back, NPS survey and cancellation emails that turn sign-ups into loyal customers.' },
  { id: 'transactional', label: 'Transactional',          blurb: 'Account and billing emails people wait for: verification, password reset, magic links, security alerts, receipts and reminders.' },
  { id: 'ecommerce',     label: 'E-commerce',             blurb: 'Store emails from cart to doorstep: abandoned cart, back in stock, order and shipping confirmations, refunds and review requests.' },
  { id: 'marketing',     label: 'Marketing',              blurb: 'Newsletters, product updates, sales, last-chance reminders, webinar invitations and referral emails.' },
  { id: 'holidays',      label: 'Holidays & Seasonal',    blurb: 'Holiday gift guides and season’s greetings for Christmas, the holidays and the New Year.' },
];
export const emailCategoryById = id => EMAIL_CATEGORIES.find(c => c.id === id);

// Web fonts only load in Apple Mail and iOS Mail; everything else uses the fallbacks.
export const FONT_STACKS = [
  { id: 'system',   label: 'System sans (no download)', stack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" },
  { id: 'inter',    label: 'Inter → Arial',           stack: "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif", google: 'Inter:wght@400;600;700;800' },
  { id: 'poppins',  label: 'Poppins → Arial',         stack: "Poppins, 'Segoe UI', Helvetica, Arial, sans-serif", google: 'Poppins:wght@400;600;700;800' },
  { id: 'dmsans',   label: 'DM Sans → Arial',         stack: "'DM Sans', 'Segoe UI', Helvetica, Arial, sans-serif", google: 'DM+Sans:wght@400;600;700;800' },
  { id: 'georgia',  label: 'Georgia (serif, no download)', stack: "Georgia, 'Times New Roman', Times, serif" },
  { id: 'playfair', label: 'Playfair Display → Georgia', stack: "'Playfair Display', Georgia, 'Times New Roman', serif", google: 'Playfair+Display:wght@600;700;800' },
];
/* Any Google Font as 'g:<Family>|<weights in hundreds>|<cat>' (same ids as src/lib/fonts.js),
   with an Arial, Georgia or Courier fallback for Gmail and Outlook */
const EMAIL_FALLBACK = { e: "Georgia, 'Times New Roman', serif", m: "'Courier New', Courier, monospace" };
export function fontStackById(id) {
  if (typeof id === 'string' && id.startsWith('g:')) {
    const [family, weights = '4', cat = 's'] = id.slice(2).split('|');
    const all = [...weights].map(d => Number(d) * 100);
    const ws = all.filter(w => w >= 400 && w <= 800); // the weights emails use, to keep the download small
    return {
      id,
      label: family,
      stack: `'${family.replace(/'/g, '')}', ${EMAIL_FALLBACK[cat] || "'Segoe UI', Helvetica, Arial, sans-serif"}`,
      google: `${family.replace(/ /g, '+')}:wght@${(ws.length ? ws : all).join(';')}`,
    };
  }
  return FONT_STACKS.find(f => f.id === id) || FONT_STACKS[0];
}

/* Escapes text for HTML (attributes, <title>, the preheader) */
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Text content may use a little inline HTML: <b> <strong> <i> <em> <u> <br> and <a href="…">.
   Everything is escaped first and only those tags are turned back on (links through
   safeUrl), and unclosed tags are closed, so typed HTML can't break the email. */
const INLINE_TAGS = ['b', 'strong', 'i', 'em', 'u'];
const unesc = s => s.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
function balanceInline(html) {
  const stack = [];
  const out = html.replace(/<(\/?)(b|strong|i|em|u|a)\b[^>]*>/g, (m, slash, tag) => {
    if (!slash) { stack.push(tag); return m; }
    const at = stack.lastIndexOf(tag);
    if (at === -1) return ''; // a stray closing tag
    return stack.splice(at).reverse().map(x => `</${x}>`).join('');
  });
  return out + stack.reverse().map(x => `</${x}>`).join('');
}
export function rich(s) {
  let out = esc(s);
  out = out.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  out = out.replace(/&lt;a\s+href=(?:&quot;|')(.*?)(?:&quot;|')\s*&gt;/gi,
    (m, href) => `<a href="${safeUrl(unesc(href)).replace(/&/g, '&amp;')}" target="_blank" style="color:inherit;text-decoration:underline;">`);
  out = out.replace(/&lt;\/a&gt;/gi, '</a>');
  out = out.replace(/&lt;(\/?)(b|strong|i|em|u)&gt;/gi, (m, slash, tag) => `<${slash}${tag.toLowerCase()}>`);
  return balanceInline(out);
}
/* Rich text where newlines also become <br> */
export const escBr = s => rich(String(s ?? '').replace(/\r?\n/g, '<br>'));

/* Plain-text version of rich text: tags removed, links kept as "label (url)" */
export function stripRich(s) {
  return String(s ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a\s+href=["']([^"']*)["']\s*>([\s\S]*?)<\/a>/gi, (m, href, label) => (label.trim() && label.trim() !== href ? `${label} (${href})` : href))
    .replace(new RegExp(`</?(${INLINE_TAGS.join('|')}|a)\\b[^>]*>`, 'gi'), '');
}

/* Only http(s), mailto and tel links (and # as a placeholder) make it into the email */
export function safeUrl(u) {
  const v = String(u ?? '').trim();
  if (!v) return '#';
  if (/^(https?:|mailto:|tel:|#|blob:)/i.test(v)) return v.replace(/"/g, '%22');
  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(v)) return v; // uploads embedded for My Code
  if (/^images\/[\w.-]+$/.test(v)) return v; // uploaded images next to the email in the ZIP download
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(v)) return `https://${v.replace(/"/g, '%22')}`; // "webdevpuneet.com/x" -> https://
  return '#';
}

/* Preheader filler: keeps Gmail and Apple Mail from pulling body text into the inbox preview */
export const PREHEADER_FILL = '&#8199;&#65279;&#847; '.repeat(45);

/* Builds the hidden preheader block */
export function preheaderHtml(text, bg) {
  if (!String(text ?? '').trim()) return ''; // no preheader: inboxes show the email's opening text
  return `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;color:${bg};">${esc(stripRich(text))}${PREHEADER_FILL}</div>`;
}

/* Bulletproof button: VML round rect for Outlook on Windows, a styled link everywhere else */
export function buttonHtml({ text, url, bg, color, font, width = 240, height = 50, radius = 10, attrs = '' }) {
  const href = safeUrl(url);
  const arc = Math.round((radius / height) * 100);
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arc}%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${color};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${esc(stripRich(text))}</center>
</v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a${attrs} href="${href}" target="_blank" class="btn" style="background-color:${bg};border-radius:${radius}px;color:${color};display:inline-block;font-family:${font};font-size:16px;font-weight:700;line-height:${height}px;text-align:center;text-decoration:none;min-width:${width}px;max-width:100%;padding:0 24px;box-sizing:border-box;-webkit-text-size-adjust:none;mso-hide:all;">${esc(stripRich(text))}</a><!--<![endif]-->`;
}

/* Turns an email into a plain-text version: shared helper for templates */
export function wrapText(str, width = 72) {
  return String(str ?? '').split('\n').map(line => {
    const out = [];
    let cur = '';
    for (const word of line.split(' ')) {
      if ((cur + ' ' + word).trim().length > width && cur) { out.push(cur); cur = word; }
      else cur = cur ? `${cur} ${word}` : word;
    }
    out.push(cur);
    return out.join('\n');
  }).join('\n');
}

/* Preview helper: images on this site's domain load from the local server while editing */
export function previewImages(html, origin) {
  return origin ? html.replace(/https:\/\/webdevpuneet\.com\/images\//g, `${origin}/images/`) : html;
}

/* Preview helper: force the dark-mode media query on, to preview dark mode in any browser */
export function forceDark(html) {
  return html.replace(/@media \(prefers-color-scheme: ?dark\)/g, '@media all').replace(/<body /, '<body data-ogsc ');
}

/* ── Merge tags ──────────────────────────────────────────────────────────────────
   Templates use universal tokens ({{first_name}} …). The editor shows them as sample
   values; Copy HTML / downloads turn them into the chosen platform's own syntax, and
   placeholder unsubscribe / preferences links into the platform's tags. */
export const MERGE_TAGS = [
  { key: 'first_name', label: 'First name', sample: 'Jordan' },
  { key: 'last_name', label: 'Last name', sample: 'Lee' },
  { key: 'email', label: 'Email', sample: 'jordan@example.com' },
];
export const MERGE_PLATFORMS = [
  { id: '', label: 'Plain tokens', note: 'Keeps {{first_name}} style tokens to replace in your own code.' },
  { id: 'mailchimp', label: 'Mailchimp', tags: { first_name: '*|FNAME|*', last_name: '*|LNAME|*', email: '*|EMAIL|*' }, unsubscribe: '*|UNSUB|*', prefs: '*|UPDATE_PROFILE|*' },
  { id: 'klaviyo', label: 'Klaviyo', tags: { first_name: "{{ first_name|default:'there' }}", last_name: '{{ last_name }}', email: '{{ email }}' }, unsubscribe: '{% unsubscribe_url %}', prefs: '{% manage_preferences_url %}' },
  { id: 'hubspot', label: 'HubSpot', tags: { first_name: '{{ contact.firstname }}', last_name: '{{ contact.lastname }}', email: '{{ contact.email }}' }, unsubscribe: '{{ unsubscribe_link_all }}', prefs: '{{ unsubscribe_link }}' },
  { id: 'brevo', label: 'Brevo', tags: { first_name: '{{ contact.FIRSTNAME }}', last_name: '{{ contact.LASTNAME }}', email: '{{ contact.EMAIL }}' }, unsubscribe: '{{ unsubscribe }}', prefs: '{{ update_profile }}' },
];
export const mergePlatform = id => MERGE_PLATFORMS.find(p => p.id === id) || MERGE_PLATFORMS[0];
/* Stand-in links the export swaps for the platform's unsubscribe / preferences tags */
export const MERGE_URLS = { unsubscribeUrl: 'https://merge.tag/unsubscribe', prefsUrl: 'https://merge.tag/preferences' };
const TOKEN_RE = /\{\{\s*(first_name|last_name|email)\s*\}\}/g;

/** Export: tokens and stand-in links -> the platform's syntax (plain tokens when none) */
export function applyMergeTags(str, platformId) {
  const p = mergePlatform(platformId);
  let out = String(str ?? '');
  if (p.tags) out = out.replace(TOKEN_RE, (m, k) => p.tags[k] || m);
  if (p.unsubscribe) out = out.split(MERGE_URLS.unsubscribeUrl).join(p.unsubscribe);
  if (p.prefs) out = out.split(MERGE_URLS.prefsUrl).join(p.prefs);
  return out;
}
/** Preview: tokens shown as sample values in a soft chip (kept as tokens when edited in place) */
export function sampleMergeTags(html) {
  const chip = (m, k) => {
    const t = MERGE_TAGS.find(x => x.key === k);
    return `<span data-merge="${k}" contenteditable="false" title="Merge tag: ${t ? t.label : k}" style="background:rgba(99,102,241,.14);border-radius:3px;padding:0 2px;">${t ? t.sample : k}</span>`;
  };
  // Only in text between tags (never inside attributes such as alt="…"); not in <title>
  return String(html ?? '')
    .replace(/(<title>[\s\S]*?<\/title>)|>([^<]+)</g, (m, title, txt) => (title ? title.replace(TOKEN_RE, (x, k) => MERGE_TAGS.find(y => y.key === k)?.sample || k) : `>${txt.replace(TOKEN_RE, chip)}<`))
    .replace(/(alt|title)="([^"]*)"/g, (m, attr, v) => `${attr}="${v.replace(TOKEN_RE, (x, k) => MERGE_TAGS.find(y => y.key === k)?.sample || k)}"`);
}
/** Gallery cards, previews and captured images: tokens shown as plain sample values */
export function sampleMergePlain(html) {
  return String(html ?? '').replace(TOKEN_RE, (m, k) => MERGE_TAGS.find(x => x.key === k)?.sample || k);
}
