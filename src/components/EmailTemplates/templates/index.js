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
import abandonedCart from './abandoned-cart.js';
import shippingConfirmation from './shipping-confirmation.js';
import lastChanceSale from './last-chance-sale.js';
import holidayGiftGuide from './holiday-gift-guide.js';
import holidayGreetings from './holiday-greetings.js';
import reviewRequest from './review-request.js';
import magicLink from './magic-link.js';
import trialEnding from './trial-ending.js';
import productUpdate from './product-update.js';
import webinarInvitation from './webinar-invitation.js';

export { EMAIL_CATEGORIES, emailCategoryById, FONT_STACKS, fontStackById } from './meta.js';

export const EMAIL_TEMPLATES = [
  welcome, trialEnding,
  verifyEmail, passwordReset, magicLink, receipt,
  abandonedCart, orderConfirmation, shippingConfirmation, reviewRequest,
  newsletter, productUpdate, webinarInvitation, blackFridaySale, lastChanceSale,
  holidayGiftGuide, holidayGreetings,
];
export const emailTemplateById = id => EMAIL_TEMPLATES.find(t => t.id === id);

/* How close two categories are (0-3): the same category first, then the ones people use
   alongside it. Account flows (onboarding <-> transactional) sit closest; a store's
   receipts and its sales emails come next; seasonal emails sit next to marketing. */
const CATEGORY_AFFINITY = {
  onboarding:    { onboarding: 3, transactional: 2, marketing: 1, ecommerce: 1, holidays: 0 },
  transactional: { transactional: 3, onboarding: 2, ecommerce: 2, marketing: 1, holidays: 0 },
  ecommerce:     { ecommerce: 3, transactional: 2, marketing: 2, holidays: 1, onboarding: 0 },
  marketing:     { marketing: 3, holidays: 2, ecommerce: 2, onboarding: 1, transactional: 0 },
  holidays:      { holidays: 3, marketing: 2, ecommerce: 2, onboarding: 0, transactional: 0 },
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
    platform: '', // merge-tag syntax for exports ('' = plain {{tokens}})
    blocks: [], // extra sections added by the user (see BLOCK_TYPES in shell.js)
    previewText: '', // optional inbox preview text (preheader); empty = none in the email
  };
}
