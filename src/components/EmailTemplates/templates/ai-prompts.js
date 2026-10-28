/* "Build with AI" prompt for an email template page, built from the template's own data (purpose, subject,
   preheader, content blocks, colours and fonts). Rendered by app/email-templates/[id]/page.js. */

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/\s*\n\s*/g, ' ').trim();
const fieldValue = (t, key) => plain(t.fields?.find(f => f.key === key)?.value);
const varValue = (t, key) => t.vars?.find(v => v.key === key)?.value;
const CATEGORY = {
  onboarding: { label: 'onboarding', tip: 'One primary action only, with short body text, so a new user knows exactly what to do next.' },
  transactional: { label: 'transactional', tip: 'Put the key facts first (order or account details, amounts, dates) in a clear summary, with no marketing clutter.' },
  ecommerce: { label: 'e-commerce', tip: 'Show products with an image, name and price in a grid that stacks on mobile, and make the button the most visible element.' },
  marketing: { label: 'marketing', tip: 'Lead with the offer in the first line, with one main button and one quiet secondary link.' },
  holidays: { label: 'holiday', tip: 'Keep the greeting warm and short, with the offer or message in a single block.' },
};
const SKIP_GROUP = /^(inbox|brand|footer|social)/i;

/** { paragraph, prompt } for an email template (`t` from EMAIL_TEMPLATES) */
export function emailAiPrompt(t) {
  const cat = CATEGORY[t.category] || { label: t.category, tip: 'Keep it to one clear message and one clear action.' };
  const blocks = (t.groups || []).map(g => g.label).filter(l => !SKIP_GROUP.test(l));
  const headline = fieldValue(t, 'headline');
  const cta = fieldValue(t, 'ctaText');
  const pre = fieldValue(t, 'preheader');
  const brand = varValue(t, 'brand');
  const colours = [['brand and button', brand], ['button text', varValue(t, 'btnText')], ['page background', varValue(t, 'bg')]].filter(([, v]) => v).map(([k, v]) => `${k} ${v}`).join(', ');
  const article = /^[aeiou]/i.test(cat.label) ? 'an' : 'a';
  const prompt = `Create a responsive HTML email: “${t.name}”, ${article} ${cat.label} email.

Purpose: ${t.description}

Inbox text:
- Subject line: “${plain(t.defaultSubject)}”${pre ? `\n- Preheader (hidden preview text): “${pre}”` : ''}

Content, top to bottom:
${blocks.length ? blocks.map(b => `- ${b}`).join('\n') : '- Header with logo, message, call to action, footer'}${headline ? `\n\nHeadline: “${headline}”.` : ''}${cta ? ` Main button: “${cta}”.` : ''}
${cat.tip}

Build it like a professional email developer:
- Table-based layout, 600px wide on desktop and fluid on mobile (width 100%, max-width 600px).
- Inline CSS on every element, with one small style block only for media queries and dark mode (prefers-color-scheme).
- A bulletproof, Outlook-safe call-to-action button (padded table cell with a VML fallback), never an image.
- Colours: ${colours || 'one brand colour, white button text, a soft grey page background'}. Web-safe font stack with a fallback after the brand font.
- Every image has alt text and explicit width and height. Use PNG icons, never SVG, because Gmail and Outlook drop them.
- Hidden preheader text, a plain-text version, and a legal footer with the postal address, the reason the person is receiving it and a working unsubscribe link.

Finish with a short checklist of what to test in Gmail, Outlook for Windows, Apple Mail, mobile and dark mode.`;
  const paragraph = `Give this prompt to an AI assistant to write your own version of the ${t.name} email: draft ten subject lines and preheaders, adapt the copy for a customer segment, translate it, convert it to MJML or React Email, or write the plain-text version. Then paste the result back into the editor above to check it in desktop, mobile and dark mode.`;
  return { paragraph, prompt };
}
