/* Registry of email templates. Each template lives in its own file with its name,
   version, category, tags, dates, fields and build()/text() functions. Plain JS so
   scripts/postbuild.js can import it for the sitemap and llms.txt. */
import welcome from './welcome.js';
import verifyEmail from './verify-email.js';
import passwordReset from './password-reset.js';
import orderConfirmation from './order-confirmation.js';
import receipt from './receipt.js';
import newsletter from './newsletter.js';
import blackFridaySale from './black-friday-sale.js';

export { EMAIL_CATEGORIES, emailCategoryById, FONT_STACKS, fontStackById } from './meta.js';

export const EMAIL_TEMPLATES = [welcome, verifyEmail, passwordReset, orderConfirmation, receipt, newsletter, blackFridaySale];
export const emailTemplateById = id => EMAIL_TEMPLATES.find(t => t.id === id);

/** Default editor state for a template */
export function defaultEmailState(t) {
  return {
    fields: Object.fromEntries(t.fields.map(f => [f.key, f.value ?? ''])),
    toggles: Object.fromEntries(t.toggles.map(x => [x.key, x.value])),
    vars: Object.fromEntries(t.vars.map(x => [x.key, x.value])),
    fonts: { ...t.fonts },
  };
}
