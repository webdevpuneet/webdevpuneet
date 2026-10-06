import OgImageGenerator from '@/components/OgImageGenerator';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'OG Image Generator — Free 1200×630 Open Graph Maker',
  description: 'Make 1200×630 Open Graph images for social sharing: 5 templates with custom title, colors, font and logo upload. Download a PNG free. No sign-up, no upload.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/og-image-generator/' },
  icons: { icon: '/icons/og-image-generator.svg', shortcut: '/icons/og-image-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/og-image-generator/',
    siteName: 'webdevpuneet.com',
    title: 'OG Image Generator — Free Open Graph Preview Card Builder',
    description: 'Generate 1200×630 Open Graph images for Twitter, Facebook, LinkedIn, and Slack. 5 templates, custom colors, fonts, and logo upload. Download PNG free.',
    images: [{ url: 'https://webdevpuneet.com/images/og-image-generator.png', width: 1200, height: 630, alt: 'OG Image Generator — Open Graph Preview Card Builder' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'OG Image Generator — Free Open Graph Preview Card Builder',
    description: 'Generate 1200×630 OG images for social media. 5 templates, custom colors, font, logo. Download PNG free. No sign-up.',
    images: ['https://webdevpuneet.com/images/og-image-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an Open Graph image and what size should it be?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An Open Graph (OG) image is the preview image that appears when a URL is shared on social media platforms like Twitter/X, Facebook, LinkedIn, Slack, and WhatsApp. It is specified in the page\'s HTML using the meta tag <meta property="og:image" content="https://example.com/og.png" />. The recommended size is 1200×630 pixels with a 1.91:1 aspect ratio. Twitter recommends a minimum of 600×314px for a "summary_large_image" card, but 1200×630 is the universally accepted standard. The file should be under 8MB for Twitter and under 5MB for Facebook. PNG and JPEG are both supported — PNG is preferred for text-heavy images because it preserves sharp edges better than JPEG compression.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I create an Open Graph image for my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this OG image generator: select a template (Clean, Dark, Gradient, Bold, or Split), then fill in your title, description, and site name. Choose your background color, accent color, and text color using the color pickers. Optionally upload your logo or icon. The live preview updates instantly on the right. When satisfied, click "Download PNG" to save the 1200×630 image to your computer. Upload it to your server or CDN, then add the og:image meta tag to your page\'s HTML head pointing to the uploaded URL. Repeat the process for each page that needs a unique preview image.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add an og:image to my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After generating and downloading your OG image, upload it to your web server or a CDN (Cloudflare, AWS S3, Cloudinary). Then add these meta tags to the <head> section of your HTML: <meta property="og:image" content="https://yoursite.com/og-image.png" /> and <meta property="og:image:width" content="1200" /> and <meta property="og:image:height" content="630" />. For Twitter specifically, also add <meta name="twitter:card" content="summary_large_image" /> and <meta name="twitter:image" content="https://yoursite.com/og-image.png" />. In Next.js, use the metadata.openGraph.images array. In WordPress, plugins like Yoast SEO or RankMath handle the og:image tag automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the 5 OG image templates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clean: Light/custom background with a colored accent bar across the top, title left-aligned, description below, site name bottom-left. Professional and versatile — works for blogs, SaaS products, and documentation. Dark: Dark background with a colored left accent bar. High contrast, modern — popular for developer tools and tech products. Gradient: Two-color diagonal gradient background with centered text. Eye-catching and bold — works well for marketing pages, product launches, and events. Bold: Solid background with subtle circular accent shapes, oversized 900-weight title. Punchy and minimal — great for landing pages and single-message announcements. Split: Accent-colored left panel (site name + logo) and content right panel (title + description). Structured two-column layout — good for branded content with a recognizable icon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my OG image not showing on Twitter or Facebook?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Social platforms cache OG images aggressively. If you updated an image but the old one still appears: for Twitter/X, use the Twitter Card Validator (cards-dev.twitter.com/validator) to force a cache refresh. For Facebook, use the Facebook Sharing Debugger (developers.facebook.com/tools/debug) and click "Scrape Again". For LinkedIn, use the Post Inspector (linkedin.com/post-inspector). If the image never appeared, check that the og:image URL is publicly accessible (not behind authentication or localhost), the URL returns a 200 status, and the image is under the size limit. Also verify the meta tag is in the <head> and is not added after JavaScript hydration.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this OG image generator for Twitter cards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — the 1200×630 size generated by this tool is the recommended size for Twitter\'s "summary_large_image" card type, which displays a large preview image above the tweet. Twitter also accepts the standard og:image tag and will use it for its card if no twitter:image tag is present. For a Twitter summary card (small square thumbnail), a 1:1 image is recommended instead — the 1200×630 image will be cropped. Use the "summary_large_image" card type in your meta tags for the best result with the images generated here.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should every page on my website have a unique OG image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ideally yes, but a tiered approach is practical. High-priority pages (homepage, blog posts, product pages, landing pages) benefit most from unique OG images because they are likely to be shared. These pages get the highest return from a distinctive image that shows the page title and context. Supporting pages (about, contact, terms) can share a single branded OG image. For blogs with many posts, generate one image per post using this tool — blog posts are the most frequently shared content type and a compelling preview significantly improves click-through rate from social feeds. Increase engagement by 2–5× by using custom images over the default site-wide fallback.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this OG image generator free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely free, no account required, no watermark, no usage limits. Generate as many OG images as you need, download them as full 1200×630 PNG files, and use them on any website. All generation runs in your browser using the HTML Canvas API — no images are sent to any server, so your content is private. The tool works offline once the page has loaded.',
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
  description: 'Free browser-based Open Graph image generator. Create 1200×630 OG preview cards with 5 templates, custom colors, font, and logo upload. Download PNG instantly.',
  featureList: [
    '5 templates — Clean, Dark, Gradient, Bold, Split',
    '1200×630px output — standard OG image size for all platforms',
    'Custom title, description, and site name',
    'Color pickers for background, accent, and text colors',
    'Gradient mode with two-color linear gradient background',
    '4 font families — sans-serif, serif, monospace, impact',
    'Logo / icon upload with live placement on canvas',
    'Download as PNG — no watermark, no account required',
    'Copy image to clipboard in one click',
    '100% browser-based — HTML Canvas API, no server, works offline',
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
  title: 'OG Image Generator — Free Open Graph Preview Card Builder for Social Media',

  about: {
    title: 'OG Image Generator — Free, Create 1200×630 Open Graph Preview Cards for Twitter, Facebook & LinkedIn',
    description: 'Every link you share on social media shows a preview card — a title, description, and image. That image is your Open Graph (OG) image. When it\'s missing or generic, click-through rates drop. When it\'s branded and relevant, shares convert. This generator lets you build a polished 1200×630 OG image in under a minute, with no design software and no account.\n\nChoose from **five templates** built for different use cases. **Clean** gives you a professional light-background layout with an accent color bar — the safest choice for any website. **Dark** uses a dark background with a colored left accent bar — popular for developer tools, SaaS dashboards, and tech products. **Gradient** creates a two-color diagonal gradient background with centered text — bold and attention-grabbing for product launches, events, and marketing pages. **Bold** uses oversized 900-weight typography with subtle background shapes — great for minimal one-message announcements. **Split** divides the card into a colored left panel (your brand/logo) and a content right panel — structured and instantly branded.\n\nCustomize everything: **title** (the main headline), **description** (the supporting text), **site name or URL**, **background color**, **accent color**, **text color**, and **font family** (sans-serif, serif, monospace, or impact). The **gradient template** adds a second color for the gradient end. Upload your **logo or icon** and it appears in the corner or panel depending on the template.\n\nThe **live preview** scales the full 1200×630 canvas to fit your screen — what you see is exactly what you get. Click **Download PNG** for a full-resolution file ready to upload to your server or CDN. Click **Copy Image** to copy directly to your clipboard using the Clipboard API\'s \`ClipboardItem\`, with an automatic fallback to a regular download if the browser or a non-HTTPS context blocks clipboard image writes.\n\nEach template is its own canvas-drawing routine rather than one shared layout with color swaps — Split, for instance, fills two rectangles for the left and right panels and centers the site name and logo within the left panel\'s own coordinate space, while Gradient centers all text with \`ctx.textAlign = \'center\'\` and builds the background from \`createLinearGradient\` across the full diagonal. Long titles and descriptions never overflow or get clipped: a word-wrapping routine measures each candidate line with \`ctx.measureText\` against the template\'s available content width and only breaks to a new line once the next word would exceed it, and a separate line-counting pass runs first so the block of text can be vertically centered as a whole before a single pixel is drawn — this is why a two-word title and a four-line title both end up centered in the same card rather than one sitting oddly high or low.\n\nEverything renders in your browser using the HTML Canvas API. No images are sent to any server.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Select a template', text: 'Choose one of the five templates from the selector at the top: **Clean** — light background with a horizontal accent bar, title left-aligned, best for blogs and documentation sites. **Dark** — dark background with a vertical left accent bar, popular for developer tools and SaaS products. **Gradient** — two-color diagonal gradient filling the canvas with centered text, best for product launches and marketing pages. **Bold** — solid background with large 900-weight title text and subtle circular accent shapes, good for single-message announcements. **Split** — a colored left panel holding your brand name and logo, and a white/light right panel with the title and description, great for branded content.' },
      { title: 'Fill in your content', text: 'Type your page title in the Title field — this becomes the main headline. Keep it under 60 characters for best display on Twitter and LinkedIn cards. Add a Description (the supporting one-liner under the title) — 100–150 characters work best. Fill in your Site Name or URL in the site name field — this typically appears in smaller text at the bottom or side of the card. These three fields are the minimum needed to generate a useful preview card.' },
      { title: 'Set your colors and font', text: 'Click the Background Color picker to set the card background — or for the Gradient template, set both gradient Start and End colors. Click the Accent Color picker to set the color used for bars, borders, and decorative shapes. Click the Text Color picker to control the headline and body text color. Choose a Font Family from the dropdown: sans-serif (clean/modern), serif (editorial/traditional), monospace (code/technical), or Impact (bold/display). All changes update the live preview instantly — no click required.' },
      { title: 'Upload a logo or icon', text: 'Click Upload image to add your logo or icon to the card. The logo is placed in the appropriate position for the selected template — bottom-left corner for Clean, in the left panel for Split, centered for other templates. Any image format (PNG, JPEG, WebP, SVG rendered as raster) is accepted. Use a square logo or icon for best results. The logo dimensions adapt to the template layout automatically.' },
      { title: 'Download the PNG and deploy it', text: 'When the live preview looks right, click Download PNG to save the 1200×630 image to your computer. Click Copy Image to copy the rendered canvas directly to your clipboard — paste it into Figma, Notion, Google Slides, or a chat thread. Upload the downloaded PNG to your web server or CDN (Cloudflare, AWS S3, Cloudinary), then add the og:image meta tag to your page\'s HTML <head> pointing to the hosted URL: <meta property="og:image" content="https://yoursite.com/og.png" />. Use the [Meta Tag Generator](https://fwdtools.com/meta-tag-generator) to generate the complete set of og: and twitter: tags at the same time.' },
    ],
  },

  features: [
    '5 templates — Clean (light + accent bar), Dark (dark bg + left accent), Gradient (two-color bg + centered text), Bold (oversized title + accent shapes), Split (colored left panel + content right)',
    '1200×630 px output — the universally accepted OG image standard for Twitter, Facebook, LinkedIn, Slack, WhatsApp, and iMessage link previews',
    'Custom title, description, and site name with automatic text wrapping on the canvas at any content length',
    'Color pickers with hex input for background, accent, and text colors — all with instant live preview on the canvas',
    'Gradient template — two color pickers for gradient start and end; rendered as a diagonal linear gradient across the full canvas',
    'Four font families — sans-serif (Inter/Arial), serif (Georgia), monospace (Courier New), and Impact for display-heavy layouts',
    'Logo / icon upload — accepts any image format; drawn in the appropriate position for the selected template',
    'Download as PNG — full 1200×630 resolution, no watermark, no account, unlimited downloads',
    'Copy image to clipboard — uses the Clipboard API for direct paste into design tools, Slack, or email',
    '100% browser-based — uses HTML Canvas API; no images or content sent to any server; works offline once loaded',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Create OG preview images for blog posts and articles',
      desc: 'Generate a unique OG image for each blog post using the Clean or Bold template. Use the post title as the card title and a one-line summary as the description. Set your brand colors and add your logo. Posts with custom OG images consistently outperform those with generic site-wide images in social feed click-through rates. Use the [Meta Tag Generator](https://fwdtools.com/meta-tag-generator) to write the full set of meta tags at the same time.',
    },
    {
      icon: '⚡',
      title: 'Generate product launch and landing page preview cards',
      desc: 'For a product launch, the OG image is the first thing people see when the announcement is shared. Use the Gradient or Bold template with strong brand colors and a compelling short title. The Split template works well for established brands — left panel shows the logo prominently, right panel shows the product name and tagline. Test with the Twitter Card Validator before launch.',
    },
    {
      icon: '▦',
      title: 'Create OG images for developer tools and documentation',
      desc: 'Developer-facing tools and documentation benefit from the Dark template — it signals a technical product and stands out in feeds dominated by light cards. Use a monospace font for code-adjacent products. Documentation pages rarely get unique OG images — generating one per major section significantly improves clicks from Stack Overflow answers and GitHub READMEs.',
    },
    {
      icon: '△',
      title: 'Build social share images for marketing campaigns',
      desc: 'Campaign landing pages, event registrations, and webinar signup pages need OG images that communicate urgency and value. The Gradient template with vibrant colors creates visual impact in a feed. Generate a set of variations by changing the gradient colors and compare — the preview updates instantly. Combine with the [Meta Tag Generator](https://fwdtools.com/meta-tag-generator) to set og:title, og:description, and og:image together.',
    },
    {
      icon: '◉',
      title: 'Create branded OG images for company pages and portfolios',
      desc: 'Use the Split template for company or personal portfolio sites — the left panel carries your logo and brand color, the right panel shows the page title and description. This creates a consistent branded look across all shared pages. For portfolios, the Bold template with a dark background and your name as the title makes a strong impression in social feeds.',
    },
    {
      icon: '≡',
      title: 'Generate OG images for newsletters and Substack posts',
      desc: 'Newsletter issues shared on social media benefit from consistent OG branding. Use the Clean or Dark template with your newsletter\'s colors and issue title. For Substack, generate the image and upload it as the post\'s cover image — Substack uses it as the og:image. For email newsletter archives on a custom domain, add the og:image meta tag to ensure proper previews when issues are shared.',
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
      <SeoSection heading="Free OG Image Generator — Create Open Graph Preview Cards for Social Media" {...SEO} /></IndexOnly>

    </div>
  );
}
