/* Shared helpers for email templates. Plain JS (no React) so the build scripts can
   import the registry. Email HTML rules this file enforces for every template:
   tables for layout, inline styles, absolute https image URLs, and safe font
   fallbacks (Outlook on Windows ignores web fonts and flexbox/grid entirely). */

export const EMAIL_CATEGORIES = [
  { id: 'onboarding',    label: 'Welcome & Onboarding', blurb: 'Welcome emails and onboarding steps that turn sign-ups into active users.' },
  { id: 'transactional', label: 'Transactional',        blurb: 'Receipts, password resets, verifications and shipping updates.' },
  { id: 'marketing',     label: 'Marketing',            blurb: 'Newsletters, launches, sales and event invitations.' },
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

/* Escapes text for HTML; newlines become <br> */
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const escBr = s => esc(s).replace(/\r?\n/g, '<br>');

/* Only http(s), mailto and tel links (and # as a placeholder) make it into the email */
export function safeUrl(u) {
  const v = String(u ?? '').trim();
  if (!v) return '#';
  if (/^(https?:|mailto:|tel:|#|blob:)/i.test(v)) return v.replace(/"/g, '%22');
  if (/^data:image\/(png|jpe?g|gif|webp);base64,/i.test(v)) return v; // uploads embedded for My Code
  if (/^images\/[\w.-]+$/.test(v)) return v; // uploaded images next to the email in the ZIP download
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(v)) return `https://${v.replace(/"/g, '%22')}`; // "yoursite.com/x" -> https://
  return '#';
}

/* Preheader filler: keeps Gmail and Apple Mail from pulling body text into the inbox preview */
export const PREHEADER_FILL = '&#8199;&#65279;&#847; '.repeat(45);

/* Builds the hidden preheader block */
export function preheaderHtml(text, bg) {
  return `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;color:${bg};">${esc(text)}${PREHEADER_FILL}</div>`;
}

/* Bulletproof button: VML round rect for Outlook on Windows, a styled link everywhere else */
export function buttonHtml({ text, url, bg, color, font, width = 240, height = 50, radius = 10, attrs = '' }) {
  const href = safeUrl(url);
  const arc = Math.round((radius / height) * 100);
  return `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arc}%" stroke="f" fillcolor="${bg}">
<w:anchorlock/>
<center style="color:${color};font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${esc(text)}</center>
</v:roundrect>
<![endif]--><!--[if !mso]><!-- --><a${attrs} href="${href}" target="_blank" class="btn" style="background-color:${bg};border-radius:${radius}px;color:${color};display:inline-block;font-family:${font};font-size:16px;font-weight:700;line-height:${height}px;text-align:center;text-decoration:none;width:${width}px;-webkit-text-size-adjust:none;mso-hide:all;">${esc(text)}</a><!--<![endif]-->`;
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
