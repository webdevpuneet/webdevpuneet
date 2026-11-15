/* Hand-written SEO content for every website template, keyed by template id (three parts, merged here):
   about (markdown), checklist (what a site like this needs), faqs (specific to this kind of site) and,
   where a template has no home page title of its own, home: { title, description } for its multi-page home. */
import { WEBSITE_TEMPLATE_SEO_1 } from './seo-website-templates-1.js';
import { WEBSITE_TEMPLATE_SEO_2 } from './seo-website-templates-2.js';
import { WEBSITE_TEMPLATE_SEO_3 } from './seo-website-templates-3.js';
import { WEBSITE_TEMPLATE_SEO_4 } from './seo-website-templates-4.js';
import { WEBSITE_TEMPLATE_SEO_5 } from './seo-website-templates-5.js';
import { WEBSITE_TEMPLATE_SEO_6 } from './seo-website-templates-6.js';
import { WEBSITE_TEMPLATE_SEO_7 } from './seo-website-templates-7.js';
import { WEBSITE_TEMPLATE_SEO_8 } from './seo-website-templates-8.js';

export const WEBSITE_TEMPLATE_SEO = { ...WEBSITE_TEMPLATE_SEO_1, ...WEBSITE_TEMPLATE_SEO_2, ...WEBSITE_TEMPLATE_SEO_3, ...WEBSITE_TEMPLATE_SEO_4, ...WEBSITE_TEMPLATE_SEO_5, ...WEBSITE_TEMPLATE_SEO_6, ...WEBSITE_TEMPLATE_SEO_7, ...WEBSITE_TEMPLATE_SEO_8 };
