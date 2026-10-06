import ImageEditorTool from '@/components/ImageEditorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Online Image Editor — Resize, Crop, Compress, Convert',
  description: 'Edit images in your browser: resize to exact pixels, crop, rotate, compress, add text and convert formats. Social media presets included. Free, no upload.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-editor/' },
  icons: { icon: '/icons/image-editor.svg', shortcut: '/icons/image-editor.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-editor/',
    siteName: 'webdevpuneet.com',
    title: 'Image Editor Online — Free Resize, Crop, Compress & Convert Images',
    description: 'Edit images in your browser — resize, crop, rotate, compress, add text overlays, fill background, convert format. 100% private, nothing uploaded.',
    images: [{ url: 'https://webdevpuneet.com/images/image-editor.png', width: 1200, height: 630, alt: 'Free Image Editor Online — Resize, Crop, Compress & Convert' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image Editor Online — Free Resize, Crop, Compress & Convert Images',
    description: 'Resize, crop, rotate, compress, add text and watermarks, convert formats — all in your browser. No upload, no sign-up.',
    images: ['https://webdevpuneet.com/images/image-editor.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I resize an image to specific pixel dimensions online for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Open the Image Editor and upload your image by clicking the drop zone or dragging a file onto it. Go to the Resize tab. Enter your desired width and height in pixels, or select one of the presets such as Social Square (1080×1080), Twitter Post (1200×675), OG Image (1200×630), or Full HD (1920×1080). Enable the lock icon to maintain the original aspect ratio — changing width automatically recalculates height. Click the Download button to save the resized image. Everything runs in your browser, nothing is uploaded.' },
    },
    {
      '@type': 'Question',
      name: 'Can I crop an image to a specific aspect ratio like 16:9 or 1:1?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Go to the Crop tab and drag any of the 8 handles to adjust the crop selection. Under Aspect Ratio, choose from Free (unconstrained), 1:1 (square), 4:3, 16:9, 3:2, 9:16 (portrait), or 3:4 (portrait). When a fixed ratio is selected, dragging any handle maintains the locked proportions — the opposite handle moves to compensate. The rule-of-thirds grid lines help you compose the crop for visual balance. The crop is applied on top of any resize settings when you download.' },
    },
    {
      '@type': 'Question',
      name: 'How do I compress an image to a smaller file size without uploading it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Go to the Compress tab. Use the Quality slider (1–100%) to set the encode quality — lower values produce smaller files with reduced detail. Choose your output format: JPEG is best for photos, WebP gives 30–50% smaller files than JPEG, PNG is better for graphics with transparency. The estimated file size updates as you adjust quality. Click Download to save the compressed file. All compression runs entirely in your browser using the Canvas API — your images are never uploaded to any server.' },
    },
    {
      '@type': 'Question',
      name: 'Can I add text or a watermark to an image online for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Go to the Text tab. Type your text content, adjust font size, pick a color, set opacity (0–100%), and drag the X/Y position sliders to place it anywhere on the image. Toggle Bold for heavier weight and Outline to add a dark stroke around the text for readability on bright backgrounds. You can add multiple text layers — each appears as a separate item in the list, and you can click to re-select and edit any layer. Use the Watermark preset to insert a "© Watermark" entry at 40% opacity in the bottom-right corner.' },
    },
    {
      '@type': 'Question',
      name: 'Are my images uploaded to a server when I use this tool?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The Image Editor runs entirely in your browser using the Canvas API. Your images are read from disk into browser memory, processed locally, and downloaded directly to your device. No image data is ever transmitted to any server at any point. This makes the tool safe for confidential screenshots, proprietary designs, and personal photos. Unlike cloud photo editors, there are no file-size limits imposed by a server and no usage quotas.' },
    },
    {
      '@type': 'Question',
      name: 'What image formats can I convert to?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Image Editor can export your edited image as JPEG, PNG, or WebP. Select the output format in the Download bar at the bottom of the sidebar before clicking Download. JPEG is the most compatible format for photos. PNG is best for images with transparency. WebP produces smaller files (30–50% smaller than JPEG/PNG) and is supported by all modern browsers as of 2025. The format choice combines with the quality setting and all your editing changes in one download.' },
    },
    {
      '@type': 'Question',
      name: 'Can I rotate or flip an image online?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Go to the Rotate tab. Click Rotate 90° CW or Rotate 90° CCW to rotate in 90-degree increments — each click adds another 90 degrees. Toggle Flip H to mirror the image horizontally (left-right), or Flip V to mirror vertically (top-bottom). Flip states are independent of rotation and can be combined — for example, rotate 180° and flip horizontally. All rotation and flip changes are previewed instantly and applied when you download.' },
    },
    {
      '@type': 'Question',
      name: 'What are the social media size presets available?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Resize tab includes 10 social media presets: Social Square (1080×1080 — usable for Instagram, Facebook, LinkedIn), Instagram Post (1080×1350 — portrait format), Twitter/X Post (1200×675), Facebook Cover (851×315), LinkedIn Banner (1584×396), YouTube Thumbnail (1280×720), OG Image (1200×630 — for website link previews), Full HD (1920×1080), Favicon 32px (32×32), and Favicon 64px (64×64). Selecting a preset fills the width and height fields instantly — then click Download to save the resized image.' },
    },
    {
      '@type': 'Question',
      name: 'How do I fill a transparent or white background with a custom color?',
      acceptedAnswer: { '@type': 'Answer', text: 'Go to the BG Color tab. Enable the Background Color toggle. A color picker and 8 color swatches appear — click any swatch for common colors (white, black, red, green, blue, yellow, cyan, purple), or click the color picker to choose any custom color. The background fill is rendered below all image content and text overlays. This is useful for removing transparent backgrounds from PNGs, replacing white backgrounds, or preparing images for designs with specific brand background colors.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use this tool to resize images for a website or social media post?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — that is exactly what the social media presets are for. For a website link preview (OG image), select the OG Image preset (1200×630). For an Instagram post, select Instagram Post (1080×1350 portrait) or Social Square (1080×1080). For a Twitter/X post, select Twitter/X Post (1200×675). For a YouTube thumbnail, select YouTube Thumbnail (1280×720). Each preset fills in the exact pixel dimensions. You can also use the Compress tab to reduce file size before download, so the image loads fast when shared.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Editor Online',
  url: 'https://webdevpuneet.com/image-editor/',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online image editor. Resize to exact pixels or social media presets, crop with aspect ratio lock, rotate and flip, compress with quality control, add text overlays and watermarks, fill background color, and convert format — all in your browser. No upload required.',
  featureList: [
    'Resize to exact pixel dimensions with aspect ratio lock',
    '10 social media presets: Instagram, Twitter, OG Image, YouTube, LinkedIn, Favicon, Full HD',
    'Visual crop with 8 drag handles and rule-of-thirds grid',
    'Aspect ratio lock for crop: Free, 1:1, 4:3, 16:9, 3:2, 9:16, 3:4',
    'Rotate 90° CW / CCW, flip horizontal and vertical',
    'Compress with quality slider (1–100%) and estimated output file size',
    'Format conversion: JPEG, PNG, WebP',
    'Multiple text overlays: content, size, color, opacity, X/Y position, bold, outline',
    'Watermark preset at 40% opacity bottom-right',
    'Background color fill with color picker and 8 swatches',
    '100% browser-based — images never uploaded to any server',
    'Live canvas preview with checkerboard transparency indicator',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Image Editor Online', item: 'https://webdevpuneet.com/image-editor/' },
  ],
};

const SEO = {
  slug: 'image-editor',
  title: 'Image Editor Online — Free Resize, Crop, Rotate, Compress & Convert in Your Browser',
  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Upload your image',
        text: 'Click the drop zone or drag any JPEG, PNG, WebP, GIF, BMP, or AVIF file onto it. Your image loads instantly into the editor. Nothing is sent to a server — everything runs locally in your browser.',
      },
      {
        title: 'Resize to the dimensions you need',
        text: 'Go to the Resize tab. Type a custom width and height in pixels, or select a social media preset such as OG Image (1200×630), Instagram Post (1080×1350), YouTube Thumbnail (1280×720), or Favicon (32×32). Click the lock icon to maintain the original aspect ratio as you type.',
      },
      {
        title: 'Crop to the exact region you want',
        text: 'Switch to the Crop tab. Drag any of the 8 handles on the crop selection — corners and edges — to define the crop area. Choose an aspect ratio (Free, 1:1, 4:3, 16:9, 3:2, 9:16, or 3:4) to constrain the crop proportions. Rule-of-thirds grid lines help you compose the shot. The shaded area outside the crop box will be removed.',
      },
      {
        title: 'Rotate and flip',
        text: 'In the Rotate tab, click Rotate 90° CW or Rotate 90° CCW to turn the image in 90-degree steps. Toggle Flip H to mirror left-right, or Flip V to mirror top-bottom. Combine rotations and flips freely — the live preview updates immediately.',
      },
      {
        title: 'Compress and set output format',
        text: 'Go to the Compress tab. Use the Quality slider to balance file size and visual quality — lower values produce smaller files. The estimated output file size appears below the slider. Pick your output format in the Download bar: JPEG for photos, PNG for images needing transparency, or WebP for the smallest modern files.',
      },
      {
        title: 'Add text or a watermark',
        text: 'Open the Text tab. Type your text, choose font size, color, and opacity, and use the X/Y sliders to position it anywhere on the image. Enable Bold or Outline for readability. Click Add Text to commit it, then add more layers as needed. The Watermark button inserts a pre-configured "© Watermark" at 40% opacity in the bottom-right.',
      },
      {
        title: 'Fill background color (optional)',
        text: 'Go to the BG Color tab. Enable the toggle and pick a color from the swatches or use the color picker. The background fill appears behind all image content — useful for removing transparency from PNGs or adding a brand color behind an image.',
      },
      {
        title: 'Download your edited image',
        text: 'Select the output format (JPEG, PNG, or WebP) in the Download bar at the bottom of the sidebar. Click Download to save the final result. The download applies all your changes — resize, crop, rotation, compression, text, and background — in a single canvas render.',
      },
    ],
  },
  about: {
    title: 'Edit Images in Your Browser — Resize, Crop, Compress, Convert, and Overlay Text Without Uploading',
    description: `Most online image editors force you to upload your files to a cloud server. This tool is different — every operation runs entirely in your browser using the Canvas API. Your images never leave your device. There are no file-size limits, no usage caps, no account required, and no waiting for a server to process your changes. Resize, crop, rotate, flip, compress, convert format, add text overlays, add watermarks, and fill background colors — all in one tool, all private.

**Resize to exact pixels or social media presets.** Enter custom width and height, or select from 10 built-in presets: Social Square (1080×1080), Instagram Post (1080×1350 portrait), Twitter/X Post (1200×675), Facebook Cover (851×315), LinkedIn Banner (1584×396), YouTube Thumbnail (1280×720), OG Image (1200×630), Full HD (1920×1080), Favicon 32px, and Favicon 64px. Enable the aspect ratio lock to keep proportions intact when typing one dimension. These presets cover the exact pixel dimensions required by every major social platform — resize a photo for an Instagram story, a YouTube thumbnail, or a website link preview in seconds.

**Crop with precision.** The crop tool overlays 8 drag handles — one at each corner and one on each edge — over a live preview of your image. Drag any handle to set the crop region. Choose from 7 aspect ratio presets to constrain the crop: Free (unconstrained), 1:1 (square for Instagram), 4:3 (classic photo), 16:9 (widescreen), 3:2 (DSLR ratio), 9:16 (portrait/Reels), or 3:4 (portrait). Rule-of-thirds grid lines inside the crop box help you compose subjects following the photographic rule of thirds. The crop is pixel-accurate and applies as a source region on the canvas — no quality loss from multiple save-and-crop cycles.

**Compress and convert format.** The Quality slider (1–100%) controls the encode quality for the output format. Lower values produce smaller files at the cost of detail. An estimated file size indicator updates as you drag the slider so you know what to expect before downloading. Choose JPEG for maximum photo compatibility, PNG for lossless output with transparency support, or WebP for 30–50% smaller files than JPEG at comparable visual quality. WebP is supported by all modern browsers and is the recommended format for web images. For more advanced PNG compression and batch conversion, see our [Image Compressor](/image-compressor).

**Add text, captions, and watermarks.** The Text tab lets you add any number of independent text layers. For each layer, set the text content, font size, color, and opacity. Use the X/Y position sliders to place text anywhere — top-left title, bottom-right credit, or centered overlay. Enable Outline to add a dark stroke that makes text readable on both light and dark backgrounds. Bold and outline can be combined. The Watermark preset inserts "© Watermark" at 40% opacity, 14px, positioned bottom-right — ready to customize. All text layers render above the image content in the canvas pipeline.

**Fill backgrounds and prepare for design.** The BG Color tab adds a solid color fill behind your image — rendered before the image content so it shows through any transparent areas. Use this to convert PNG transparency to white (for JPEG export), add a brand color background behind a logo, or quickly test how an image looks on different backgrounds. Eight quick swatches cover white, black, and six common colors, with a full color picker for precise values.

This tool runs fully in your browser — no data is uploaded. It is safe for confidential screenshots, proprietary product images, and personal photos. Use it alongside our [Image Compressor](/image-compressor) for batch compression, [Image to SVG](/image-to-svg) for vectorization, or [Image to Base64](/image-to-base64) to embed images directly in CSS or HTML.`,
  },
  features: [
    'Resize to exact pixel dimensions — type custom W×H or select from 10 social media presets including OG Image, Instagram, YouTube Thumbnail, Favicon',
    'Aspect ratio lock — changing width auto-calculates height; unlock to set each dimension independently',
    'Visual crop with 8 drag handles — corners and edges — over a live preview; rule-of-thirds grid lines for composition',
    'Aspect ratio constraint for crop: Free, 1:1, 4:3, 16:9, 3:2, 9:16, 3:4',
    'Rotate 90° clockwise or counter-clockwise — click multiple times to reach 180° or 270°',
    'Flip horizontal (mirror left-right) and flip vertical (mirror top-bottom) — independent toggles',
    'Quality slider (1–100%) with estimated output file size for JPEG, PNG, and WebP',
    'Format conversion: download as JPEG, PNG, or WebP from any source format',
    'Multiple text overlay layers — content, font size, color, opacity (0–100%), X/Y position (%), bold, outline stroke',
    'Watermark preset — "© Watermark" at 40% opacity, bottom-right, with outline, one-click insert',
    'Background color fill with color picker and 8 swatches — renders behind image content',
    'Live canvas preview with checkerboard grid for transparency visibility',
    '100% browser-based Canvas API pipeline — images never uploaded to any server; runs fully in your browser — no data is uploaded',
  ],
  useCases: [
    { icon: '⤡', title: 'Resize images for social media in one click', desc: 'Select a preset — Instagram Post (1080×1350), YouTube Thumbnail (1280×720), OG Image (1200×630), Twitter Post (1200×675) — to set the exact pixel dimensions required by each platform. Enable aspect ratio lock or resize freely, then download.' },
    { icon: '◱', title: 'Crop a photo to a specific region', desc: 'Drag the 8 crop handles to select any region of your image. Lock to a 16:9, 1:1, or 3:4 aspect ratio for consistent output across a series of images. The rule-of-thirds grid helps you position subjects for visual balance.' },
    { icon: '↻', title: 'Fix a photo taken at the wrong orientation', desc: 'Click Rotate 90° CW or CCW to correct a landscape photo taken in portrait mode, or a portrait taken sideways. Combine with Flip H to mirror a selfie taken with a front camera.' },
    { icon: '▾', title: 'Compress a photo before uploading to a CMS or email', desc: 'Drag the quality slider to reduce file size while watching the estimated output size. Convert to WebP for 30–50% smaller files than JPEG at the same visual quality. Download compressed and ready to upload without any intermediate tool.' },
    { icon: 'T', title: 'Add a caption or watermark to protect your images', desc: 'Type a copyright notice or caption in the Text tab, position it in a corner using the X/Y sliders, and enable Outline so it reads clearly on any background. The Watermark preset sets everything up in one click for batch-style use.' },
    { icon: '◧', title: 'Remove transparent background from a PNG for JPEG export', desc: 'Enable BG Color and select white (or any brand color) to fill transparent areas. Then switch to JPEG output in the Download bar — the transparent areas are now filled rather than being converted to black, which JPEG would do by default.' },
  ],
  faqs: [
    { q: 'How do I resize an image to specific pixel dimensions online for free?', a: 'Upload your image, go to the Resize tab, and enter your target width and height in pixels. Enable the lock icon to maintain the original aspect ratio, or unlock it to set each dimension independently. You can also select from 10 social media presets. Click Download to save the resized image. Everything runs in your browser — nothing uploaded.' },
    { q: 'Can I crop an image to a 16:9 or 1:1 aspect ratio?', a: 'Yes. Go to the Crop tab and choose an aspect ratio preset: Free, 1:1, 4:3, 16:9, 3:2, 9:16, or 3:4. When a ratio is selected, dragging any handle maintains the locked proportions. Drag the crop box to reposition it. Rule-of-thirds lines help you compose the shot. The crop applies when you click Download.' },
    { q: 'How do I compress an image without uploading it?', a: 'Go to the Compress tab and drag the Quality slider (1–100%). The estimated output file size appears below the slider. Choose your format (JPEG, PNG, or WebP) in the Download bar and click Download. All compression runs in your browser using the Canvas API — no upload, no server, no file size limit.' },
    { q: 'Can I add text or a watermark to an image for free?', a: 'Yes. Go to the Text tab, type your text, set font size, color, opacity, and X/Y position. Enable Outline for readability on any background. Click Add Text to layer it over the image. Use the Watermark preset to insert "© Watermark" at 40% opacity in the bottom-right in one click. Add multiple text layers independently.' },
    { q: 'Are my images private? Is anything uploaded to a server?', a: 'No. The Image Editor runs entirely in your browser. Your images are read from disk into browser memory, processed with the Canvas API, and downloaded directly to your device. No image data is sent to any server at any point. Safe for confidential screenshots, proprietary designs, and personal photos.' },
    { q: 'What formats can I convert my image to?', a: 'You can download your edited image as JPEG, PNG, or WebP. Select the format in the Download bar before clicking Download. JPEG works everywhere and is best for photos. PNG preserves transparency. WebP is 30–50% smaller than JPEG at comparable quality and is supported by all modern browsers. For PNG-specific compression like TinyPNG, see our Image Compressor.' },
    { q: 'Can I rotate and flip an image online?', a: 'Yes. In the Rotate tab, click Rotate 90° CW or CCW to rotate in 90-degree increments. Toggle Flip H to mirror left-right, or Flip V to mirror top-bottom. Flip and rotation are independent — you can combine them, for example 90° CW + Flip H to get a specific mirror orientation.' },
    { q: 'How do I fill a transparent PNG background with a color?', a: 'Go to the BG Color tab and enable the toggle. Choose a color from the 8 swatches or use the color picker. The color fills behind all image content. This converts transparent areas to a solid color — useful before exporting as JPEG (which does not support transparency) or for placing a brand color behind a logo.' },
    { q: 'What social media image sizes are available as presets?', a: 'The Resize tab includes 10 presets: Social Square (1080×1080), Instagram Post (1080×1350), Twitter/X Post (1200×675), Facebook Cover (851×315), LinkedIn Banner (1584×396), YouTube Thumbnail (1280×720), OG Image (1200×630), Full HD (1920×1080), Favicon 32px, and Favicon 64px.' },
    { q: 'Can I use this image editor to make an OG image for my website?', a: 'Yes. Select the OG Image preset (1200×630) in the Resize tab. Add your text or title using the Text tab. Optionally fill a background color. Then download as JPEG or PNG. The resulting image can be referenced in your HTML meta property="og:image" tag for link previews on Twitter, LinkedIn, Slack, and Facebook.' },
  ],
  links: [
    { href: '/image-compressor', label: 'Image Compressor — batch PNG/JPEG/WebP compression with TinyPNG-style quantization' },
    { href: 'https://webdevpuneet.com/image-to-svg/', label: 'Image to SVG — vectorize raster images to scalable SVG paths' },
    { href: 'https://webdevpuneet.com/image-to-base64/', label: 'Image to Base64 — convert images to Data URI for embedding in CSS or HTML' },
    { href: '/favicon-generator', label: 'Favicon Generator — export all favicon sizes and site.webmanifest in one ZIP' },
    { href: '/og-image-generator', label: 'OG Image Generator — design custom 1200×630 Open Graph images for social sharing' },
  ],
};

export default function ImageEditorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageEditorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>


    </div>
  );
}
