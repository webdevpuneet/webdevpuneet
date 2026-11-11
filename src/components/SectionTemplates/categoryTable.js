import { SECTION_TEMPLATES, SECTION_CATEGORIES } from './templates/index.js';

/* One SeoSection `table` section listing every section category: link, what it is for, how many sections and which ones.
   Used in the SEO content of the gallery page and of every category page (it replaces the row of category chips above the
   gallery, and keeps every category page linked from the page text). `skip` drops one category (the page you are on). */
export function sectionCategoriesTable({ skip = null, heading = 'Sections for Every Part of a Website', label = 'Browse by category' } = {}) {
  const cats = SECTION_CATEGORIES.filter(c => !c.noPage && c.id !== skip && SECTION_TEMPLATES.some(t => t.category === c.id && !t.draft));
  return {
    type: 'table',
    label,
    heading,
    columns: ['Category', 'What it is for', 'Sections', 'Includes'],
    rows: cats.map(c => {
      const list = SECTION_TEMPLATES.filter(t => t.category === c.id && !t.draft);
      return [
        `**[${c.label}](/website-section-templates/category/${c.id}/)**`,
        c.blurb,
        String(list.length),
        list.map(t => `[${t.name}](/website-section-templates/${t.id}/)`).join(', '),
      ];
    }),
  };
}
