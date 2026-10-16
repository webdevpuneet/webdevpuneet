/* Registry of email templates. Each template lives in its own file with its name,
   version, category, tags, dates, fields and build()/text() functions. Plain JS so
   scripts/postbuild.js can import it for the sitemap and llms.txt. */
import welcome from './welcome.js';

export { EMAIL_CATEGORIES, emailCategoryById, FONT_STACKS, fontStackById } from './meta.js';

export const EMAIL_TEMPLATES = [welcome];
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
