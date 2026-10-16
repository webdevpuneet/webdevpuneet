import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { TemplateGalleryPage } from '@/components/SocialPostTemplates';
import { TEMPLATES, TEMPLATE_CATEGORIES, SIZES } from '@/components/SocialPostTemplates/templates/index.js';
import { TEMPLATE_DIFFERENT } from '@/components/SocialPostTemplates/templates/seo-why.js';
import { CATEGORY_SEO } from '@/components/SocialPostTemplates/templates/seo-categories.js';
import { previewIds } from '@/components/SocialPostTemplates/assets';
import styles from '../tool-page.module.css';

const PAGE_URL = 'https://webdevpuneet.com/social-post-templates/';
// Hand-made social share image for the gallery page (public/images/social-post-templates.png)
const OG_IMAGES = [{ url: 'https://webdevpuneet.com/images/social-post-templates.png', width: 1200, height: 630, alt: 'Free social post templates for Instagram, Facebook and X' }];

export const metadata = {
  title: 'Free Social Post Templates for Instagram, Facebook & X',
  description: '20 free social post templates for Instagram, Facebook and X. Edit text, photos and colours in your browser, download every post size as PNG or copy the HTML.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/social-post-templates.svg', shortcut: '/icons/social-post-templates.svg' },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'webdevpuneet.com',
    title: 'Free Social Post Templates for Instagram, Facebook & X',
    description: 'Free HTML social media post templates: quotes, launches, sales, events, testimonials, carousels and Stories. Edit online, download PNG or copy the code.',
    locale: 'en_US',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Free Social Post Templates for Instagram, Facebook & X',
    description: 'Free HTML social media post templates. Edit online, download every post size as PNG or copy the code. No sign-up.',
    images: [OG_IMAGES[0].url],
  },
  keywords: ['social media post templates', 'instagram post templates', 'free instagram templates', 'html social media templates', 'instagram story templates', 'canva alternative'],
};

const faqs = [
  { q: 'What are social post templates useful for?', a: 'They let you publish good-looking posts without a designer or design software: quotes and tips, product launches, sales and Black Friday promos, events and webinars, customer testimonials, carousels and Stories. Pick a template, change the text, photos and colours, and download an image sized for Instagram, Facebook or X in a minute or two.' },
  { q: 'How are these templates different from Canva templates?', a: 'Canva-style templates give you an image inside their editor. These are real HTML and CSS: you can download the image, but you can also copy the code, download a .html file or fork it into My Code and reuse it on a website, in an email or in your own system. They are also free with no account or watermark, run entirely in your browser (photos are never uploaded), export every post size from one design, and shrink long text automatically so it never overflows.' },
  { q: 'Why use HTML templates instead of image templates?', a: 'HTML is editable, versionable and automatable. Developers can render posts from a CMS or spreadsheet with a headless browser, keep templates in Git, change brand colours with CSS variables, and reuse the same design on the web. Each template here has a version number, and the exported file records which version you used.' },
  { q: 'What sizes do the templates export?', a: `Every template exports in ${SIZES.length} sizes: ${SIZES.map(z => `${z.label} ${z.w}×${z.h} (${z.short}, ${z.note})`).join('; ')}. Switch sizes in the editor and the layout adapts, or use "All sizes (ZIP)" to download all of them at once. Instagram recommends 4:5 portrait for feed posts, so that is the default.` },
  { q: 'Can I use the HTML on my own website or system?', a: 'Yes. Every template has Copy HTML and Download .html buttons that give you a single self-contained file: the markup, all the CSS inline, and links to the Google Fonts it uses. Uploaded photos can be embedded in the file or left out. Open it in any browser, edit it in your code editor, render it with your own screenshot tool, or drop it into a CMS or email builder.' },
  { q: 'Are my photos uploaded to a server?', a: 'No. Photos are resized and kept in your browser, and the image export is drawn locally on an HTML canvas. Nothing you type or upload leaves your device. The only outside requests are for the Google Fonts the template uses. Your edits are saved in your browser per template, so they are still there when you come back.' },
  { q: 'Can I change the fonts and colours?', a: 'Yes. Each template exposes its colours (background, text, accent and more) with colour pickers and hex input, plus 12 one-click palettes. Heading and body fonts can be switched between 12 Google Fonts and system fonts. Long text shrinks automatically to fit the layout, and wrapping a word in *asterisks* colours it with the accent.' },
  { q: 'Do the templates work for Instagram Stories?', a: 'Yes. Choose the Story / Reel size (1080×1920) and the layouts add extra padding at the top and bottom so text stays clear of the profile bar and the reply field. Turn on "Story safe zones" to see those areas while you edit. The Stories category has templates designed Story-first, like polls and link-in-bio prompts.' },
  { q: 'Is it free for commercial use?', a: 'Yes. The templates are free to use for personal and commercial posts, with no watermark and no sign-up. Photos, logos and text you add are your own responsibility, so make sure you have the rights to the images you upload.' },
];

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Social Post Templates',
  url: PAGE_URL,
  description: metadata.description,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: TEMPLATES.length,
    itemListElement: TEMPLATES.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, url: `${PAGE_URL}${t.id}/` })),
  },
};
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Social Post Templates', item: PAGE_URL },
  ],
};

const SEO = {
  about: {
    title: 'Free Social Post Templates You Can Edit, Download or Copy as HTML',
    description: `A library of ${TEMPLATES.length} social media post templates built with plain HTML and CSS. Unlike image-only template sites, every design here is real code. Edit it in the browser and download a finished image, or copy the HTML and use it in your own system.\n\n**${TEMPLATE_CATEGORIES.length} categories.** ${TEMPLATE_CATEGORIES.map(c => `**${c.label}**: ${c.blurb.charAt(0).toLowerCase()}${c.blurb.slice(1)}`).join(' ')}\n\n**One design, every post size.** Each template is laid out in relative units, so the same design works as a 1080×1350 Instagram portrait post, a 1080×1080 square, a 1080×1920 Story and a 1600×900 landscape post for X and Facebook. Story layouts keep text out of the areas covered by Instagram’s buttons, and grid guides show how a portrait post is cropped on your profile.\n\n**Edit in place.** Click any text in the preview to change it, click a photo area to upload your own image, pick a palette or exact colours, and switch fonts. Long headlines shrink to fit instead of overflowing. Every change is saved in your browser.\n\n**Export the way you work.** Download a PNG or JPEG at full resolution, grab every size at once as a ZIP, or copy a self-contained HTML file with inline CSS and Google Fonts links. Each template has a name, a version number and an update date, so you can tell when a design changes.`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a template', text: 'Browse the gallery or filter by category (Quotes & Tips, Announcements, Promo & Sales, Events, Social Proof, Carousel Slides, Stories) and open a template.' },
      { title: 'Choose the post size', text: 'Portrait 4:5 is the Instagram feed default. Switch to Square, Story / Reel or Landscape, and the layout adapts.' },
      { title: 'Edit text, photos, colours and fonts', text: 'Click text in the preview or use the fields on the left. Upload photos and logos, apply a palette or set exact colours, and switch the heading and body fonts.' },
      { title: 'Download or copy the code', text: 'Download the PNG or JPEG, use **All sizes (ZIP)** for every format at once, or **Copy HTML** to take the template into your own website, app or design system.' },
    ],
  },
  features: [
    `${TEMPLATES.length} templates in ${TEMPLATE_CATEGORIES.length} categories, each with its own name, version and update date`,
    'Four post sizes: Instagram portrait 1080×1350, square 1080×1080, Story 1080×1920 and landscape 1600×900',
    'In-place editing: click text or photo areas directly in the preview',
    'Photo and logo uploads that never leave your browser',
    'Colour pickers with hex input, plus 12 palettes',
    '12 Google Fonts plus system fonts for headings and body text',
    'Automatic text fitting so long headlines never overflow',
    'Story safe-zone and Instagram grid-crop guides',
    'Full-resolution PNG or JPEG download, or every size as a ZIP',
    'Copy or download a self-contained HTML file with inline CSS',
    'Edits autosave per template in your browser',
    'Free for commercial use, with no sign-up and no watermark',
  ],
  useCases: [
    { icon: '◑', title: 'Small businesses and shops', desc: 'Sale badges, product spotlights and holiday promos you can update in seconds, sized for both the Instagram feed and Stories.' },
    { icon: '⚡', title: 'Startups and SaaS teams', desc: 'Launch, milestone, hiring and "we’re live" posts that match your brand colours and fonts, with HTML your developers can reuse.' },
    { icon: '▦', title: 'Creators and educators', desc: 'Tip, fact, code-tip and carousel templates for consistent educational series that get saved and shared.' },
    { icon: '△', title: 'Developers', desc: 'Take the HTML into your own pipeline: render posts with Puppeteer or Playwright, generate them from a CMS, or turn them into components.' },
  ],
};

// Explicit sections so "how it's different" and the category guide sit between About and How to Use
const SECTIONS = [
  { type: 'features', label: "What's included", heading: 'Features', items: SEO.features },
  { type: 'text', label: 'About these templates', heading: SEO.about.title, text: SEO.about.description, quickFacts: false },
  { type: 'cards', label: 'How it’s different', heading: 'How These Templates Differ From Canva-Style Ones', columns: 3, items: TEMPLATE_DIFFERENT },
  {
    type: 'text',
    label: 'Browse by category',
    heading: 'Template Categories',
    text: TEMPLATE_CATEGORIES.map(c => {
      const list = TEMPLATES.filter(t => t.category === c.id);
      return `**[${CATEGORY_SEO[c.id]?.h1 || c.label}](/social-post-templates/category/${c.id}/)** (${list.length}): ${c.blurb} Includes ${list.map(t => `[${t.name}](/social-post-templates/${t.id}/)`).join(', ')}.`;
    }).join('\n\n'),
    quickFacts: false,
    boxed: true,
  },
  { type: 'steps', label: 'Step by step', heading: 'How to Use', items: SEO.howToUse.items },
  { type: 'cards', label: 'Real-world uses', heading: 'Who Uses Social Post Templates', columns: 3, items: SEO.useCases },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: faqs },
];

export default function SocialPostTemplatesPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={`${styles.toolSection} ${styles.toolSectionGallery}`}><TemplateGalleryPage previews={previewIds()} /></div>
      <IndexOnly>
        <AdSlot />
        <SeoSection slug="social-post-templates" title="Social Post Templates — Free HTML Designs for Instagram, Facebook & X" subtitle={`${TEMPLATES.length} templates · ${TEMPLATE_CATEGORIES.length} categories · 4 post sizes · PNG, JPEG & HTML`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
