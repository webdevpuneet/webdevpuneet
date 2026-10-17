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

/* How close two categories are (0-3): the same category first, then the ones people use
   alongside it. Account flows (onboarding <-> transactional) sit closest; a store's
   receipts and its sales emails come next. */
const CATEGORY_AFFINITY = {
  onboarding:    { onboarding: 3, transactional: 2, marketing: 1 },
  transactional: { transactional: 3, onboarding: 2, marketing: 1 },
  marketing:     { marketing: 3, onboarding: 2, transactional: 1 },
};
// Tags every template shares say nothing about the topic
const GENERIC_TAGS = new Set(['dark-mode', 'responsive', 'transactional', 'marketing']);

/** Other templates ranked by similarity: category affinity first, then shared topic tags. */
export function relatedEmailTemplates(t, limit = Infinity) {
  const tags = new Set(t.tags.filter(x => !GENERIC_TAGS.has(x)));
  const aff = CATEGORY_AFFINITY[t.category] || {};
  return EMAIL_TEMPLATES
    .filter(x => x.id !== t.id)
    .map((x, i) => ({ x, i, score: (aff[x.category] || 0) * 10 + x.tags.filter(tag => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, limit)
    .map(r => r.x);
}

/** Default editor state for a template */
export function defaultEmailState(t) {
  return {
    fields: Object.fromEntries(t.fields.map(f => [f.key, f.value ?? ''])),
    toggles: Object.fromEntries(t.toggles.map(x => [x.key, x.value])),
    vars: Object.fromEntries(t.vars.map(x => [x.key, x.value])),
    fonts: { ...t.fonts },
  };
}
