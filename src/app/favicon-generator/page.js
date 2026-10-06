import FaviconGeneratorTool from '@/components/FaviconGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Favicon Generator — All Sizes, ICO & WebManifest, Free',
  description: 'Generate all favicon sizes from any image: 16–512px PNGs, favicon.ico, Apple Touch Icon, Android Chrome icons and site.webmanifest. Shape and padding options.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/favicon-generator/' },
  icons: { icon: '/icons/favicon-generator.svg', shortcut: '/icons/favicon-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/favicon-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Favicon Generator — All Sizes, ICO + WebManifest, Free Online',
    description: 'Upload any image and instantly get all favicon sizes: 16–512px PNGs, favicon.ico (16/32/48), Apple Touch Icon, Android Chrome icons, and site.webmanifest. Rounded, circle or square shapes.',
    images: [{ url: 'https://webdevpuneet.com/images/favicon-generator.png', width: 1200, height: 800, alt: 'Favicon Generator — All Sizes, ICO & WebManifest Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Favicon Generator — All Sizes + ICO + WebManifest Free',
    description: 'Generate all favicon sizes from any image. ICO, PNGs, Apple Touch, Android Chrome, site.webmanifest — download as ZIP. Free & no sign-up.',
    images: ['https://webdevpuneet.com/images/favicon-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What favicon sizes do I need for a complete website setup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A complete favicon setup requires: favicon.ico (multi-size: 16×16, 32×32, 48×48) for classic browser support, favicon-16x16.png and favicon-32x32.png for modern browsers, apple-touch-icon.png (180×180) for iOS home screen bookmarks, android-chrome-192x192.png and android-chrome-512x512.png for Android PWAs and Chrome. This tool generates all of these plus a site.webmanifest in one click.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a favicon.ico file and why do I need it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'favicon.ico is the original browser tab icon format, introduced in Internet Explorer 5. It can contain multiple image sizes (16, 32, 48px) in a single file so the browser picks the best resolution. Modern browsers also read PNG favicons via <link> tags, but favicon.ico in the root of your domain provides a universal fallback — including for older browsers, RSS readers, and desktop shortcuts. This tool generates a proper multi-size favicon.ico using embedded PNG streams.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is site.webmanifest and do I need it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'site.webmanifest (or manifest.json) is a JSON file that describes your web app for Progressive Web App (PWA) features — including the icons shown when a user adds your site to their home screen on Android. It specifies app name, theme color, display mode, and icon paths. You need it if you want Android users to see your icon correctly or if you are building a PWA. This tool generates a ready-to-use webmanifest with the 192×192 and 512×512 Android icons already wired up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats can I upload?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can upload PNG, JPEG, WebP, SVG, and GIF images. PNG with a transparent background is recommended for the best results — the tool will handle transparency correctly when generating PNG favicons. For ICO output, JPEG sources are automatically composited onto a white background. SVG images are rasterized at the target size, so they stay sharp at all resolutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Fit and Crop mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fit mode (letterbox) preserves the full image within the square canvas — if your image is not square, empty space is filled with the background color or left transparent. This ensures nothing is cropped out. Crop mode center-crops the image to fill the entire square without any padding. Use Fit for logos with important edges, and Crop for photos or images where the subject is centered.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add the HTML link tags for favicons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click the HTML tab in the tool to get the ready-to-paste <link> tags. Place them inside the <head> section of your HTML document. The snippet includes: a universal favicon.ico reference, PNG favicons for 16 and 32px, the Apple Touch Icon for iOS, and a manifest reference for Android PWA support. Copy the snippet and paste it before the closing </head> tag.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a transparent background for my favicon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Check the "Transparent" option in the Background section and all generated PNG files will preserve transparency. Note that favicon.ico also supports transparency when using PNG streams (this tool uses that approach). However, some operating systems and browsers may render transparent favicons with a white or dark fill behind them depending on the current theme — so test your favicon in both light and dark browser modes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the rounded and circle shape options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The shape option clips your image into the selected shape before rendering all sizes. Square produces a standard square favicon — the most universally compatible option. Rounded clips the image with rounded corners (20% border radius) — popular for app icons that mimic iOS/Android launcher styles. Circle clips the image into a perfect circle — useful for profile-style logos or avatars. All PNG and ICO files in the download package use the selected shape.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool upload my image to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This favicon generator runs entirely in your browser using the Canvas API. Your image never leaves your device — it is processed in JavaScript locally and the generated files are created client-side. The ZIP download is also assembled in-browser without any server round-trip. This means it works offline after the page has loaded and is completely private.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the Padding option do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Padding slider (0–25%) adds whitespace between the edge of the favicon canvas and your image. For example, 10% padding on a 512×512 favicon leaves 51px of space on each side, shrinking the visible image area. This is useful if your logo has elements very close to the edges, or if you want to give your favicon a bit of breathing room inside a colored background circle.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Favicon Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate all favicon sizes from any image. Creates PNG files (16–512px), favicon.ico, Apple Touch Icon, Android Chrome icons, and site.webmanifest. Fully client-side.',
  url: 'https://webdevpuneet.com/favicon-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Favicon Generator', item: 'https://webdevpuneet.com/favicon-generator/' },
  ],
};

const seoData = {
  slug: 'favicon-generator',
  title: 'Favicon Generator — All Sizes, ICO, WebManifest, Free Online',
  about: {
    title: 'Generate All Favicon Sizes From Your Logo — ICO, PNG, Apple Touch Icon, and WebManifest in One ZIP',
    description: `You just launched a site and the browser tab shows a blank page icon. Or you only have a favicon.ico but Safari is showing a blurry 16px version on iOS home screen. Or you need the exact 180×180 Apple Touch Icon size that appears when visitors bookmark your page from iPhone. Upload your logo here and get every size and format in one ZIP — no guessing which sizes you need or how to build an ICO file. Everything runs fully in your browser — no data is uploaded to any server.\n\nA complete favicon setup requires multiple files for different contexts: \`favicon.ico\` (multi-size 16/32/48px) for the browser tab and classic browser fallbacks, \`favicon-16x16.png\` and \`favicon-32x32.png\` for modern browsers, \`apple-touch-icon.png\` (180×180) for iOS bookmarks and home screen icons, \`android-chrome-192x192.png\` and \`android-chrome-512x512.png\` for Android PWA installation, and \`site.webmanifest\` to wire them up for Progressive Web App support. This tool generates all of them at once from a single upload — then you copy the HTML snippet from the HTML tab and paste it into your \`<head>\`. Done.\n\nUpload any image — PNG with transparency, JPEG, WebP, SVG, or GIF. Choose **Square**, **Rounded** (20% border-radius clip), or **Circle** shape to match your app icon style. Set a background color or keep it transparent for logos that need to sit on any surface. Adjust padding from 0 to 25% for breathing room around the icon at small sizes. Toggle **Fit** mode to letterbox the full image without cropping, or **Crop** to center-crop it to fill the square. The live preview table shows every generated size before you download — check how the icon looks at 16px specifically, because that is where most logos lose legibility.\n\nUnder the hood, each size is rendered onto its own \`<canvas>\` element using the Canvas 2D API: the shape is applied first as a clip path (a circular arc for Circle, a manually drawn rounded rectangle path for Rounded, since \`roundRect\` isn't universally supported), then the source image is drawn inside the clipped region at the size dictated by Fit or Crop math, and finally exported as a PNG blob. The \`favicon.ico\` file is not a converted PNG — it's assembled byte-by-byte in JavaScript following the real ICO binary format: a 6-byte header, one 16-byte directory entry per embedded size, and then the raw PNG data for the 16, 32, and 48px images appended back to back, which is why modern favicon.ico files can contain full-color PNG streams instead of legacy bitmap data. The ZIP download is built the same way — a hand-rolled ZIP writer computes a CRC32 checksum for every file, writes local file headers and a central directory per the ZIP spec, and stores files uncompressed, all without a compression library, so the entire package is assembled and streamed to disk without a server round-trip. Download the complete ZIP with one click, including all 8 PNGs, the ICO file, and the site.webmanifest.`,
  },
  features: [
    '8 PNG sizes — 16, 32, 48, 64, 96, 180, 192, 512px generated in parallel from a single upload',
    'favicon.ico — multi-size ICO file (16/32/48px) built using embedded PNG streams with custom CRC32',
    'site.webmanifest — ready-to-use PWA manifest with 192×192 and 512×512 icons pre-wired',
    'HTML snippet tab — ready-to-paste `<link>` tags for all sizes including apple-touch-icon and manifest',
    'Three shape modes — Square (universal compatibility), Rounded (20% radius, app icon style), Circle (avatar/logo)',
    'Transparent background — preserve alpha channel across all PNG and ICO output files',
    'Background color picker and padding slider (0–25%) — add breathing room around the icon at small sizes',
    'Fit vs Crop — letterbox (show full image) or center-crop to fill the square canvas',
    'Download ZIP — all PNGs + ICO + manifest assembled client-side; or download any single size individually',
    '100% client-side — Canvas API, no uploads, works offline; compress the source PNG first with our [Image Compressor](/image-compressor)',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload your image', text: 'Drag and drop your logo or icon image onto the upload area, or click Browse file to open a file picker. PNG files with a transparent background work best and give the cleanest results across all sizes — transparency is preserved in both the PNG outputs and the ICO file. SVG files are fully supported and rasterize crisply at every size. JPEG, WebP, and GIF files are also accepted.' },
      { title: 'Choose a shape', text: 'Select one of three clip shapes that will be applied to all generated sizes. Square is the most universally compatible — standard rectangular favicon used across all browsers. Rounded applies a 20% border-radius clip mask, matching the app icon style used on iOS and Android — a popular choice for modern web apps. Circle clips the image into a perfect circle — ideal for profile-style avatars or logos designed to live inside a circle. The shape mask applies to all PNG files and to the ICO file.' },
      { title: 'Set background and padding', text: 'If your image has transparent areas, check the Transparent toggle to preserve alpha across all outputs. Or click the background color picker to fill transparent areas with a solid color — useful when the logo was designed for a specific background. Use the Padding slider (0–25%) to add whitespace between the image and the favicon edge — logos that touch the edge of the canvas often look better with 5–10% padding at small sizes. Choose Fit mode (letterbox) to show the complete image without cropping, or Crop to center-crop the image and fill the entire square canvas.' },
      { title: 'Preview all sizes and download', text: 'The tool shows a live preview of every generated size in a table: 16px (browser tab), 32px (taskbar and browser toolbar), 48px, 64px, 96px, 180px (Apple Touch Icon), 192px (Android Chrome), and 512px (Android Chrome splash). Check how the icon looks at 16px specifically — if it looks blurry or indistinct, try a simpler version of your logo. Click the ↓ button on any row to download just that individual size. Click Download ZIP to save a favicon-package.zip containing all 8 PNGs, the favicon.ico, and the site.webmanifest in one click — assembled entirely in your browser without any server request.' },
      { title: 'Copy the HTML link tags', text: 'Click the HTML tab to see the complete ready-to-paste <link> snippet. It includes the favicon.ico reference, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, and the manifest link. Copy the snippet and paste it into the <head> section of your HTML before the closing </head> tag. Place all the downloaded favicon files in your website root directory — the same folder as your index.html — so the relative paths in the HTML snippet resolve correctly. Check the Manifest tab to review the site.webmanifest JSON before deploying.' },
    ],
  },
  useCases: [
    { icon: '⚡', title: 'Fix a missing or blurry favicon on a new website', desc: 'Upload your logo and download the complete favicon package in under a minute. All sizes, all formats, ready to drop into your project root and wire up with the included HTML snippet.' },
    { icon: '◉', title: 'Generate all sizes for a PWA or mobile web app', desc: 'Get the android-chrome-192x192.png, android-chrome-512x512.png, and site.webmanifest required for PWA installability on Android and desktop Chrome — all pre-configured and ready to deploy.' },
    { icon: '◑', title: 'Create an Apple Touch Icon at the correct 180×180 size', desc: 'iOS and iPadOS use apple-touch-icon.png at 180×180 for home screen bookmarks. This tool generates it at the exact required size with your shape and background settings applied.' },
    { icon: '▦', title: 'Hand off a complete favicon set to a client', desc: 'Generate the full package from the client\'s brand logo — rounded, circle, or square shape with any background color — and include the ready-to-paste HTML snippet. No manual resizing in Photoshop or online SaaS tool required. Define the brand colors with our [Color Palette Generator](/color-palette-generator).' },
    { icon: '⇄', title: 'Create a rounded or circle favicon to match your app icon style', desc: 'iOS and Android launcher icons use rounded corners or circles. Choose the Rounded (20% radius) or Circle shape to match your native app\'s icon shape and maintain visual consistency across web and mobile.' },
    { icon: '▤', title: 'Test favicon appearance before deploying', desc: 'Preview all eight sizes in the tool before downloading. The live preview shows how the icon will look at 16px (browser tab), 32px (taskbar), and 180px (iOS home screen) — catch blurry or clipped icons before they go live. Add SEO meta tags for the page with our [Meta Tag Generator](https://fwdtools.com/meta-tag-generator).' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function FaviconGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <FaviconGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
