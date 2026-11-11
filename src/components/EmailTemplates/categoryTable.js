import { EMAIL_TEMPLATES, EMAIL_CATEGORIES } from './templates/index.js';

/* One SeoSection `table` section listing every email template category: link, what it is for, how many templates and which
   ones. Used in the SEO content of the gallery page and of every category page (it replaces the row of category chips above
   the gallery, and keeps every category page linked from the page text). `skip` drops one category (the page you are on). */
export function emailCategoriesTable({ skip = null, heading = 'Email Templates for Every Stage of the Customer Journey', label = 'Browse by category' } = {}) {
  const cats = EMAIL_CATEGORIES.filter(c => c.id !== skip && EMAIL_TEMPLATES.some(t => t.category === c.id));
  return {
    type: 'table',
    label,
    heading,
    columns: ['Category', 'What it is for', 'Templates', 'Includes'],
    rows: cats.map(c => {
      const list = EMAIL_TEMPLATES.filter(t => t.category === c.id);
      return [
        `**[${c.label}](/email-templates/category/${c.id}/)**`,
        c.blurb,
        String(list.length),
        list.map(t => `[${t.name}](/email-templates/${t.id}/)`).join(', '),
      ];
    }),
  };
}
