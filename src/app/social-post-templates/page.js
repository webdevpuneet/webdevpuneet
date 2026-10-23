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
  description: `${TEMPLATES.length} free social post templates for Instagram, Facebook, X, LinkedIn and Pinterest. Edit in your browser, then export PNG, MP4 video, PDF carousels or HTML.`,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_URL },
  icons: { icon: '/icons/social-post-templates.svg', shortcut: '/icons/social-post-templates.svg' },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'webdevpuneet.com',
    title: 'Free Social Post Templates for Instagram, Facebook & X',
    description: 'Free HTML social media post templates: quotes, launches, sales, holidays, events, carousels and Stories. Edit online, download PNG or MP4, or copy the code.',
    locale: 'en_US',
    images: OG_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Free Social Post Templates for Instagram, Facebook & X',
    description: 'Free HTML social media post templates. Edit online, download every post size as PNG, MP4 or PDF, or copy the code. No sign-up.',
    images: [OG_IMAGES[0].url],
  },
  keywords: ['social media post templates', 'instagram post templates', 'free instagram templates', 'html social media templates', 'instagram story templates', 'canva alternative'],
};

const faqs = [
  { q: 'What are social post templates useful for?', a: 'They let you publish good-looking posts without a designer or design software: quotes and tips, product launches, sales and Black Friday promos, holiday greetings, events and webinars, customer testimonials, carousels and Stories. Pick a template, change the text, photos and colours, and download an image or short video sized for Instagram, Facebook, X, LinkedIn or Pinterest in a minute or two.' },
  { q: 'How are these templates different from Canva templates?', a: 'Canva-style templates give you an image inside their editor. These are real HTML and CSS: you can download the image, but you can also copy the code, download a .html file or fork it into My Code and reuse it on a website, in an email or in your own system. They are also free with no account or watermark, run entirely in your browser (photos are never uploaded), export every post size from one design, and shrink long text automatically so it never overflows.' },
  { q: 'Can I save my designs and move them to another computer?', a: 'Yes. Save keeps a design under a name in My designs, Save as makes a copy, and the My designs tab lets you search, reopen, rename and delete them. Saved designs also appear live at the top of this gallery. They are stored in your browser\'s IndexedDB, and the Import / Export tab downloads one backup file with your designs, photos, uploaded fonts and brand kit that you can import in any browser.' },
  { q: 'Can I make a video or a LinkedIn carousel?', a: 'Yes. "Animated video" in the Export menu records the post as an MP4 (WebM in browsers without MP4 recording) where text and photos animate in and then hold. Pick Rise, Fade or Pop and a length of 4, 6 or 8 seconds; the Story size suits Reels and Stories. Carousel slides can be exported as a PDF, which LinkedIn shows as a swipeable document post.' },
  { q: 'Can I create many posts at once?', a: 'Yes. Bulk create takes a CSV of quotes, tips or products, fills one post per row from the template, and downloads them all as a ZIP of images.' },
  { q: 'Why use HTML templates instead of image templates?', a: 'HTML is editable, versionable and automatable. Developers can render posts from a CMS or spreadsheet with a headless browser, keep templates in Git, change brand colours with CSS variables, and reuse the same design on the web. Each template is versioned, and the exported HTML file records which version you used.' },
  { q: 'What sizes do the templates export?', a: `Every template exports in ${SIZES.length} sizes: ${SIZES.map(z => `${z.label} ${z.w}×${z.h} (${z.short}, ${z.note})`).join('; ')}. Switch sizes in the editor and the layout adapts, or use "All sizes (ZIP)" to download all of them at once. Instagram recommends 4:5 portrait for feed posts, so that is the default.` },
  { q: 'Can I use the HTML on my own website or system?', a: 'Yes. The Export menu has Copy HTML and Download .html, which give you a single self-contained file: the markup, all the CSS inline, and links to the Google Fonts it uses. Uploaded photos can be embedded in the file or left out. Open it in any browser, edit it in your code editor, render it with your own screenshot tool, or drop it into a CMS or email builder.' },
  { q: 'Are my photos uploaded to a server?', a: 'No. Photos are resized and kept in your browser, and the image export is drawn locally on an HTML canvas. Nothing you type or upload leaves your device. The only outside requests are for the Google Fonts the template uses. Your edits autosave in your browser per template, so they are still there when you come back.' },
  { q: 'Can I change the fonts and colours?', a: 'Yes. Each template exposes its colours (background, text, accent and more) with colour pickers and hex input, plus 12 one-click palettes. Heading and body fonts can be any Google Font, searchable by name and category, or a font file you upload yourself. Select words to make them bold, italic, underlined or highlighted in the accent colour, and save your colours, logo and fonts as a brand kit to apply to any design. Long text shrinks automatically to fit the layout.' },
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
    description: `A library of ${TEMPLATES.length} social media post templates built with plain HTML and CSS. Unlike image-only template sites, every design here is real code. Edit it in the browser and download a finished image, or copy the HTML and use it in your own system.\n\n**${TEMPLATE_CATEGORIES.length} categories.** ${TEMPLATE_CATEGORIES.map(c => `**${c.label}**: ${c.blurb.charAt(0).toLowerCase()}${c.blurb.slice(1)}`).join(' ')}\n\n**One design, every post size.** Each template is laid out in relative units, so the same design works as a 1080×1350 Instagram portrait post, a 1080×1080 square, a 1080×1920 Story, a 1600×900 landscape post for X and Facebook, a 1200×627 LinkedIn image and a 1000×1500 Pinterest pin. Story layouts keep text out of the areas covered by Instagram’s buttons, and grid guides show how a portrait post is cropped on your profile.\n\n**Edit in place.** Click any text in the preview to change it, select words to make them bold, italic, underlined or highlighted, click a photo area to upload your own image, pick a palette or exact colours, and choose any Google Font or upload your own. Align text and move it to the top, middle or bottom. Long headlines shrink to fit instead of overflowing, and quality checks flag low contrast, tiny text and blurry photos.\n\n**See it where it will be posted.** Mock-ups show the post inside an Instagram feed, a Story, X and LinkedIn, so you can judge it at real size before publishing.\n\n**Save, reuse and work in bulk.** Save designs with Save or Save as, search them in My designs, and find them live at the top of this gallery. Everything is kept in your browser's IndexedDB, and one backup file moves your designs, photos, fonts and brand kit to another computer. Bulk create turns a CSV into a ZIP of finished posts.\n\n**Export the way you work.** From the Export menu, download a PNG or JPEG at full resolution, every size at once as a ZIP, an animated MP4 for Reels and Stories, a carousel as a PDF for LinkedIn, or a self-contained HTML file with inline CSS and Google Fonts links.`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a template', text: `Browse the gallery or filter by category (${TEMPLATE_CATEGORIES.map(c => c.label).join(', ')}) and open a template.` },
      { title: 'Choose the post size', text: 'Portrait 4:5 is the Instagram feed default. Switch to Square, Story / Reel, Landscape, LinkedIn or Pinterest, and the layout adapts.' },
      { title: 'Edit text, photos, colours and fonts', text: 'Click text in the preview or use the fields on the left. Format words, upload photos and logos, apply a palette or your brand kit, and pick any Google Font.' },
      { title: 'Check and save', text: 'Preview it in a platform mock-up, fix anything the quality checks flag, and **Save** it to My designs so you can come back to it.' },
      { title: 'Export', text: 'Open **Export** for PNG or JPEG, **All sizes (ZIP)**, an animated MP4, a carousel PDF, or **Copy HTML** to take the template into your own website, app or design system.' },
      { title: 'Read the full guide', text: 'Want a deeper walkthrough of designing, animating and exporting posts for Instagram, LinkedIn, X and Pinterest? Read the [free social media post templates guide](https://webdevpuneet.com/blog/free-social-media-post-templates-in-html-design-animate-and-export-posts-for-instagram-linkedin-x-and-pinterest/).' },
    ],
  },
  features: [
    `${TEMPLATES.length} templates in ${TEMPLATE_CATEGORIES.length} categories, including holiday posts for Halloween, Thanksgiving, Christmas and New Year`,
    'Six post sizes: Instagram portrait 1080×1350, square 1080×1080, Story 1080×1920, landscape 1600×900, LinkedIn 1200×627 and Pinterest pin 1000×1500',
    'Platform mock-ups: preview the post inside an Instagram feed, a Story, X and LinkedIn',
    'Animated video export (MP4) for Reels and Stories: Rise, Fade or Pop, 4 to 8 seconds',
    'Layout options: align text left, centre or right and move it to the top, middle or bottom',
    'Bold, italic, underline and accent highlights from a selection toolbar',
    'Carousel export as a PDF for LinkedIn document posts',
    'Bulk create: turn a CSV of quotes, tips or products into a ZIP of finished posts',
    'My designs: Save, Save as, rename and search your designs, shown live in the gallery',
    'Import / Export: one backup file with your designs, photos, fonts and brand kit',
    'Brand kit: save your colours, logo and fonts and apply them when you choose',
    'Quality checks for low contrast, tiny text, Story safe zones and blurry photos',
    'In-place editing: click text or photo areas directly in the preview',
    'Photo and logo uploads that never leave your browser',
    'Colour pickers with hex input, plus 12 palettes',
    'Every Google Font, searchable by name and category, plus your own uploaded fonts',
    'Automatic text fitting so long headlines never overflow',
    'Story safe-zone and Instagram grid-crop guides',
    'Export menu: full-resolution PNG or JPEG, every size as a ZIP, or a self-contained HTML file',
    'Edits autosave per template in your browser (IndexedDB)',
    'Works on phones: edit text in the preview and open controls from a bottom sheet',
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
      <AdSlot related={false} />
      <IndexOnly>
        <SeoSection slug="social-post-templates" title="Social Post Templates — Free HTML Designs for Instagram, Facebook & X" subtitle={`${TEMPLATES.length} templates · ${TEMPLATE_CATEGORIES.length} categories · ${SIZES.length} post sizes · PNG, JPEG, MP4, PDF & HTML`} sections={SECTIONS} />
      </IndexOnly>
    </div>
  );
}
