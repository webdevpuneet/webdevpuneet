// Live demo pages for the Website Builder blog post (blog/blog-posts/tools/tools-blog7-wordpress.txt),
// written to demos/a1/43/. Every page is a real export from the builder engine (the same code the
// "Download ZIP" button runs), with its images copied next to it so the demos never depend on
// unreleased site images.
//   templates/<id>.html    a complete one-page website template
//   sections/<id>.html     one section, with room above it so it animates in as you scroll to it
//                          (blog iframes are short: the section must start below the fold)
//   church-site/           a multi-page site exactly as the ZIP export writes it
//   church-website.zip     the same, zipped
// Usage: node scripts/make-website-builder-blog-demos.mjs
import fs from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';
import { siteFromStarter, siteDocumentHtml, siteFiles } from '../src/components/SectionTemplates/templates/site.js';
import { sectionTemplateById, defaultSectionState } from '../src/components/SectionTemplates/templates/index.js';
import { documentHtml } from '../src/components/SectionTemplates/templates/render.js';

const OUT = path.resolve('demos/a1/43');
const IMG_DIR = path.resolve('public/images/section-templates');
const IMG_URL = /https:\/\/webdevpuneet\.com\/images\/section-templates\/([\w.-]+)/g;

/** Copy every section-templates image the html uses into <dir>/assets/ and point the html there */
function localize(html, dir, prefix = 'assets/') {
  fs.mkdirSync(path.join(dir, 'assets'), { recursive: true });
  return html.replace(IMG_URL, (m, file) => {
    const src = path.join(IMG_DIR, file);
    if (!fs.existsSync(src)) return m; // not a local image: keep the URL
    fs.copyFileSync(src, path.join(dir, 'assets', file));
    return `${prefix}${file}`;
  });
}

/* Room above and below a lone section: the intro fills the first screen (so entrance and scroll
   animations start below the fold at any iframe height) and the outro lets pinned sections finish. */
const ROOM_CSS = `<style>
.demo-room{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:100vh;padding:24px;box-sizing:border-box;text-align:center;font:600 15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;color:#64748b;background:#f8fafc}
.demo-room b{font-size:20px;color:#0f172a}
.demo-room small{max-width:34em}
.demo-room i{font-style:normal;font-size:26px;animation:demo-bob 1.6s ease-in-out infinite}
@keyframes demo-bob{50%{transform:translateY(8px)}}
@media (prefers-reduced-motion:reduce){.demo-room i{animation:none}}
</style>`;
const room = (title, text, end = false) => `<div class="demo-room">${end ? '' : '<i aria-hidden="true">↓</i>'}<b>${title}</b><small>${text}</small></div>`;

const write = (rel, content) => {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  console.log('✓', rel, `${(Buffer.byteLength(content) / 1024).toFixed(0)} KB`);
};

/* 1. Complete website templates (one page, motion on) */
const TEMPLATES = ['hotel', 'wedding', 'saas', 'restaurant', 'law-firm', 'podcast'];
for (const id of TEMPLATES) {
  const site = siteFromStarter(id);
  const html = siteDocumentHtml(site, site.pages[0].id, { imageSrc: () => '', clean: true, motion: true });
  write(`templates/${id}.html`, localize(html, path.join(OUT, 'templates')));
}

/* 2. Single sections, with room to scroll */
const SECTIONS = {
  'scroll-gallery': ['Horizontal Scroll Gallery', 'Keep scrolling: the section pins and the cards slide sideways.'],
  'scroll-story': ['Pinned Scroll Story', 'The image stays put while the steps scroll past and the picture changes.'],
  'scroll-stack': ['Stacking Cards', 'Each card pins and the next one slides over it.'],
  'scroll-path': ['Scroll Path Timeline', 'The line draws itself as you scroll and each step lights up.'],
  'image-background-hero': ['Hero With a Text Effect', 'The headline rises word by word as the section comes into view.'],
  'pricing-three-tier': ['Three-Tier Pricing', 'Fades in on scroll. Click Monthly / Yearly: the prices roll and the pill slides.'],
  'stats-counters': ['Animated Stats Counters', 'The numbers count up when the section scrolls into view.'],
  'features-bento': ['Bento Grid Features', 'The cards fade up one after another.'],
  'testimonials-marquee': ['Testimonial Marquee', 'Two rows of reviews drift in opposite directions. Hover a row to slow it to a stop.'],
  'faq-accordion': ['FAQ Accordion', 'Click a question: the answer opens smoothly. It is also FAQPage schema for Google.'],
  'cta-gradient-banner': ['Gradient CTA Banner', 'Move your mouse over it: a spotlight follows the cursor and the button is magnetic.'],
  'restaurant-menu': ['Restaurant Menu', 'A printed-menu look: dishes in two columns, dotted leaders to the price and tags like V or Chef’s pick.'],
  'class-timetable': ['Class Timetable', 'A weekly schedule table that turns into labelled cards on phones. For gyms, studios and schools.'],
};
for (const [id, [title, text]] of Object.entries(SECTIONS)) {
  const t = sectionTemplateById(id);
  if (!t) throw new Error(`no section ${id}`);
  let html = documentHtml(t, defaultSectionState(t), { clean: true, motion: true, title: `${title} section · free Website Sections` });
  html = html.replace('</head>', `${ROOM_CSS}\n</head>`)
    .replace(/<body([^>]*)>/, `<body$1>\n${room(title, `${text} Scroll down to see it.`)}`)
    .replace(/(\n<script|<\/body>)/, m => `\n${room('End of the demo', 'Made with the free Website Sections editor on webdevpuneet.com: edit it, then export HTML, React or Vue.', true)}${m}`);
  write(`sections/${id}.html`, localize(html, path.join(OUT, 'sections')));
}

/* 3. A multi-page website, exactly as Download ZIP writes it */
const church = siteFromStarter('church', { multi: true });
const siteDir = path.join(OUT, 'church-site');
fs.rmSync(siteDir, { recursive: true, force: true });
const zip = new JSZip();
const folder = zip.folder('church-website');
for (const f of siteFiles({ ...church, url: 'https://webdevpuneet.com/demos/a1/43/church-site/' }, { imageSrc: () => '' })) {
  const content = /\.(html|css)$/.test(f.path) ? localize(f.content, siteDir) : f.content;
  write(`church-site/${f.path}`, f.base64 ? Buffer.from(content, 'base64') : content);
  folder.file(f.path, content, f.base64 ? { base64: true } : undefined);
}
for (const img of fs.readdirSync(path.join(siteDir, 'assets'))) folder.file(`assets/${img}`, fs.readFileSync(path.join(siteDir, 'assets', img)));
fs.writeFileSync(path.join(OUT, 'church-website.zip'), await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
console.log('✓ church-website.zip');
