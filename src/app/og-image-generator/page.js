import OgImageGenerator from '@/components/OgImageGenerator';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'OG Image Generator — Free Open Graph Image Maker, 1200×630',
  description: 'Free OG image generator: 14 templates, Google Fonts, live X, LinkedIn & WhatsApp previews, batch ZIP export and Next.js code. Runs in your browser, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/og-image-generator/' },
  icons: { icon: '/icons/og-image-generator.svg', shortcut: '/icons/og-image-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/og-image-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Free OG Image Generator — 14 Templates, Batch & Next.js Code',
    description: 'Design 1200×630 Open Graph images with 14 templates, real fonts and live previews for X, Facebook, LinkedIn, Slack and WhatsApp. Batch export to ZIP. Free.',
    images: [{ url: 'https://webdevpuneet.com/images/og-image-generator.png', width: 1200, height: 630, alt: 'OG Image Generator — Open Graph image maker with social previews' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Free OG Image Generator — 14 Templates, Batch & Next.js Code',
    description: '1200×630 Open Graph images with 14 templates, Google Fonts, live social previews, batch ZIP export and Next.js code. Free, in your browser.',
    images: ['https://webdevpuneet.com/images/og-image-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What size should an Open Graph image be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use 1200×630 pixels (a 1.91:1 ratio). Facebook, LinkedIn, Slack, Discord and iMessage all show that shape, and X shows it in its large "summary_large_image" card. This generator also has a 1200×600 preset for X\'s 2:1 card and a 1200×1200 square for places that show a square thumbnail. Keep the file under 5 MB, which every major platform accepts. PNG keeps text sharpest. JPEG is much smaller when you use a photo background. WebP is smaller still, but not every platform reads it, so PNG or JPEG is the safe choice for og:image.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make an OG image with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pick one of the 14 templates (each thumbnail shows your own text and colours), then type a label, title and description. Wrap a word in *asterisks* to colour it with the accent. Choose fonts, a palette or your own colours, and optionally add a logo, an author photo, a background photo or a pattern. The checks under the preview warn you about low contrast, text that had to shrink or was cut off, and files that are too big. Open the Social previews tab to see the card on X, Facebook, LinkedIn, Slack, Discord, WhatsApp and iMessage, then click Download.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add the og:image tag to my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload the image to your site or CDN, then add the meta tags to your page\'s <head>. The Code & meta tags tab writes them for you: og:title, og:description, og:image with its width, height and type, og:image:alt, and the matching twitter:card tags. Change the og:image URL to wherever you uploaded the file. In Next.js you can set metadata.openGraph.images, or add an opengraph-image.tsx file (the tool generates a starter). In WordPress, SEO plugins such as Yoast or Rank Math have a field for the social image.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I create OG images for many blog posts at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Open the Batch tab and write one post per line as "Title | Description | Label", or upload a CSV with columns such as title, description, label, author, date and site. Every row is drawn with your current template, colours, fonts and logo, and all the images download together as one ZIP file, numbered and named after each title. Up to 200 images per batch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which templates are included?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fourteen layouts: Clean (accent bar on top), Side Bar (accent bar on the left), Centered, Bold (oversized title with soft shapes), Split (brand panel plus content), Blog Post (site name on top, category pill, author with photo), Floating Card, Minimal, Quote, Product Launch (logo in a glowing ring), Docs, Event (date block), Framed and Diagonal. Every template works with every palette, font, background style and size preset, and long text shrinks to fit automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my old OG image still show when I share a link?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Platforms cache link previews. For Facebook, open the Sharing Debugger (developers.facebook.com/tools/debug) and click "Scrape Again". For LinkedIn, run the URL through the Post Inspector (linkedin.com/post-inspector). X no longer offers a card preview tool, so the easiest fix there and in chat apps is to change the image URL, for example by renaming the file or adding ?v=2. If no image appears at all, check that the og:image URL is a full https:// address that loads without logging in and that the tag is in the server-rendered HTML, not added later by JavaScript.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do the safe zones show?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Turn on Safe zones above the preview to see three guides that are never exported. The pink dashed box is the comfortable margin: keep text inside it so nothing feels cramped or gets clipped by rounded corners. The blue band shows the centre square that compact previews (WhatsApp, some chat apps and small cards) crop to. The dark box in the bottom-left corner is where X lays the site\'s domain over the image, so avoid putting important text there.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can it generate Next.js opengraph-image code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Code & meta tags tab writes an app/opengraph-image.tsx file for the Next.js App Router that uses next/og to render your title, label, description, site name, colours, background and Google Fonts. It is a starter rather than a pixel-exact copy: template decorations and uploaded images aren\'t included. Use it when you want every page to get its own image automatically, and download the PNG when you want the exact design.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it free, and are my images uploaded anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is free with no account, no watermark and no limit. Everything is drawn in your browser with the HTML Canvas API, so your text, logo and photos are never uploaded. The only outside request is for the Google Fonts you pick. Your latest design is saved in your browser so it is still there when you come back, and Undo/Redo (Ctrl+Z / Ctrl+Shift+Z) covers every change.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'OG Image Generator',
  url: 'https://webdevpuneet.com/og-image-generator/',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based Open Graph image generator with 14 templates, Google Fonts, live social previews, safe-zone guides, batch ZIP export and Next.js opengraph-image code.',
  featureList: [
    '14 templates with live thumbnails of your own design',
    '1200×630, 1200×600 (X) and 1200×1200 square size presets',
    'Live link previews for X, Facebook, LinkedIn, Slack, Discord, WhatsApp and iMessage',
    'Safe-zone guides for margins, square crops and the X domain label',
    'Titles shrink to fit automatically; *asterisks* colour words with the accent',
    '12 Google Fonts plus system fonts, chosen separately for headings and body text',
    'Solid, gradient and mesh backgrounds, photo backgrounds with overlay and blur, and patterns',
    'Logo, author name, date line and author photo',
    'Contrast, text-fit and file-size checks',
    'Download PNG, JPEG or WebP with a live file size; copy to clipboard',
    'Batch export to ZIP from a list or CSV',
    'Meta tag and Next.js opengraph-image.tsx code generator',
    'Autosave, undo and redo; 100% in the browser',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'OG Image Generator', item: 'https://webdevpuneet.com/og-image-generator/' },
  ],
};

const SEO = {
  slug: 'og-image-generator',
  title: 'OG Image Generator — Free Open Graph Image Maker With Social Previews',

  about: {
    title: 'OG Image Generator — Design, Check and Export Open Graph Images in One Place',
    description: 'Every link you share shows a preview card, and the image is the part people notice first. This generator builds that image, shows you exactly how it will look on each platform, and gives you the code to publish it, all in your browser.\n\n**Start from 14 templates.** Clean, Side Bar, Centered, Bold, Split, Blog Post, Floating Card, Minimal, Quote, Product Launch, Docs, Event, Framed and Diagonal. The thumbnails are drawn with your own title and colours, so you compare real options rather than placeholders.\n\n**Text that always fits.** Titles shrink step by step until the whole block fits, and anything still too long is cut cleanly with an ellipsis. Nothing ever runs into the footer. Wrap a word in *asterisks* and it is drawn in your accent colour. Add a short label above the title (a category, "New", or a date for the Event template), and an author name, date line and round photo for blog posts.\n\n**Real typography and backgrounds.** Pick from 12 Google Fonts, including Inter, Poppins, Space Grotesk, Playfair Display and JetBrains Mono, separately for headings and body text. Each font is loaded before drawing, so the image shows the font you chose. Backgrounds can be solid, a gradient at any angle, or a soft mesh. You can also add a photo with a colour overlay and blur, plus a dot, grid, line or grain pattern. Twelve palettes and a Shuffle button give you a starting point.\n\n**See it the way people will.** The Social previews tab places your image in realistic X, Facebook, LinkedIn, Slack, Discord, WhatsApp and iMessage cards, including WhatsApp\'s square crop and the domain label X draws over the image. Safe-zone guides show the same areas on the canvas itself. Built-in checks flag low text contrast (using the WCAG ratio), titles that had to shrink, cut-off text, and files over the 5 MB platform limit.\n\n**Export the way you publish.** Download PNG, JPEG or WebP at 1200×630, 1200×600 for X, or 1200×1200 square, with the file size shown before you save, or copy the image to the clipboard. The Batch tab turns a list or CSV of titles into a ZIP with one image per row. The Code & meta tags tab writes the og: and twitter: tags, plus a Next.js opengraph-image.tsx starter that renders your design with next/og.\n\nEverything runs on the HTML Canvas API in your browser. Your design is saved locally and every change can be undone.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a template', text: 'Click any of the 14 thumbnails. They redraw with your current text, colours and fonts, so you can see the real result before switching. Change the size preset under **Export** if you need X\'s 2:1 card or a square image; every template adapts.' },
      { title: 'Write the text', text: 'Fill in the **Label** (optional, e.g. "Tutorial" or "OCT 24"), **Title** and **Description**. Wrap words in *asterisks* to colour them with the accent. Add your **Site name**, and for articles an **Author**, an **Author line** such as "Oct 16 · 5 min read", and an author photo. Already have the page live? Paste its HTML into **Fill from a page\'s HTML** to copy its title, description and site name across.' },
      { title: 'Style it', text: 'Pick heading and body fonts, set the maximum title size (it still shrinks to fit), then choose a palette or set your own background, second, text and accent colours. Switch the background between Solid, Gradient and Mesh, or add a pattern or a photo with an overlay and blur. Upload your logo and set its size. The badge next to **Colours** shows the text contrast ratio.' },
      { title: 'Check it', text: 'Read the checks under the preview, turn on **Safe zones** to see crop areas, and open **Social previews** to see the card on X, Facebook, LinkedIn, Slack, Discord, WhatsApp and iMessage.' },
      { title: 'Export and publish', text: 'Pick PNG, JPEG or WebP and click **Download**, or **Copy image**. For many pages at once, use the **Batch** tab to get a ZIP. Then open **Code & meta tags**, copy the og: and twitter: tags into your page\'s head (or the Next.js file), and point og:image at your uploaded image. Check the result with the [Meta Tag Generator](/meta-tag-generator/).' },
    ],
  },

  features: [
    '14 templates: Clean, Side Bar, Centered, Bold, Split, Blog Post, Floating Card, Minimal, Quote, Product Launch, Docs, Event, Framed and Diagonal, each with a live thumbnail of your design',
    'Size presets: 1200×630 Open Graph, 1200×600 for X\'s large card, and 1200×1200 square',
    'Live link previews for X, Facebook, LinkedIn, Slack, Discord, WhatsApp (square crop) and iMessage',
    'Safe-zone guides for the text margin, the centre-square crop and the X domain label',
    'Auto-fitting titles that shrink to fit and cut cleanly with an ellipsis, so text never overlaps the footer',
    'Accent highlights: wrap words in *asterisks* to colour them',
    'Label, author name, author line and round author photo for blog-style cards',
    '12 Google Fonts plus system fonts, set separately for headings and body, loaded before drawing',
    'Solid, angled gradient and mesh backgrounds; photo backgrounds with overlay and blur; dot, grid, line and grain patterns',
    '12 palettes and a Shuffle button; colour pickers with hex input that ignore half-typed values',
    'Logo upload that keeps the logo\'s shape, with a size slider',
    'Checks for WCAG text contrast, shrunk or cut-off text, long titles and files over 5 MB',
    'Download PNG, JPEG or WebP with quality control and a live file size; copy to clipboard (works in Safari)',
    'Batch export: a list or CSV of titles becomes a ZIP of images in your design',
    'Code tab: og: and twitter: meta tags plus a Next.js opengraph-image.tsx starter',
    'Autosave in your browser, undo and redo, and no uploads: everything is drawn on the HTML Canvas',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Blog posts and articles',
      desc: 'Use the Blog Post template with a category label, the post title and an author line such as "Oct 16 · 6 min read". Set your fonts and colours once, then use the Batch tab to make an image for every post from a CSV export of your titles. Copy the meta tags from the Code tab, or check them with the [Meta Tag Generator](/meta-tag-generator/).',
    },
    {
      icon: '⚡',
      title: 'Product launches and release notes',
      desc: 'Product Launch puts your logo in a glowing ring next to a "New" label and the headline. Try a mesh background in your brand colours, and use the Social previews tab to see how the announcement looks on X and LinkedIn before you post.',
    },
    {
      icon: '▦',
      title: 'Developer docs and open-source projects',
      desc: 'The Docs template, a JetBrains Mono or Space Grotesk heading and a grid pattern give documentation pages a technical look. Next.js projects can paste the generated opengraph-image.tsx so every docs page renders its own card automatically.',
    },
    {
      icon: '△',
      title: 'Events, webinars and campaigns',
      desc: 'Put the date ("OCT 24") in the label and the Event template turns it into a bold date block beside the title. Use the square preset for WhatsApp and Instagram shares, and the safe-zone guides to keep the date out of the crop.',
    },
    {
      icon: '◉',
      title: 'Brand and portfolio sites',
      desc: 'Split gives your logo and brand colour a full panel, and Floating Card or Framed give every page a consistent, recognisable look. Your design is saved in your browser, so it is ready the next time you need an image.',
    },
    {
      icon: '≡',
      title: 'Newsletters, podcasts and quotes',
      desc: 'The Quote template turns a pull-quote or guest line into a shareable card, with the author photo and name underneath. For newsletters, use the issue title with a consistent palette so readers recognise your shares in the feed.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function OgImageGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><OgImageGenerator /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free OG Image Generator — Design, Preview and Export Open Graph Images" {...SEO} /></IndexOnly>

    </div>
  );
}
