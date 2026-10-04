import ImageToBase64Tool from '@/components/ImageToBase64Tool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Image to Base64 Converter — Free PNG, JPEG, SVG, WebP, GIF | webdevpuneet.com',
  description: 'Convert any image to Base64 online — get a Data URI, HTML img tag, CSS background, or raw string from PNG, JPG, WebP, GIF, or SVG. Free, browser-only.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-to-base64/' },
  icons: { icon: '/icons/image-to-base64.svg', shortcut: '/icons/image-to-base64.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-to-base64/',
    siteName: 'webdevpuneet.com',
    title: 'Image to Base64 Converter — PNG, JPEG, SVG, WebP, GIF',
    description: 'Drag, drop, or paste any image and instantly get the Base64 Data URI, HTML img tag, CSS background-image snippet, and more. Format conversion and quality control included.',
    images: [{ url: 'https://webdevpuneet.com/images/image-to-base64.png', width: 1200, height: 630, alt: 'Image to Base64 Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image to Base64 Converter — PNG, JPEG, SVG, WebP Online',
    description: 'Convert images to Base64 Data URIs, HTML img tags, CSS snippets, and more. Drag & drop, clipboard paste, format conversion. Free and browser-only.',
    images: ['https://webdevpuneet.com/images/image-to-base64.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Base64 encoding and why is it used for images?',
      acceptedAnswer: { '@type': 'Answer', text: 'Base64 is a binary-to-text encoding scheme that represents binary data (like an image file) as a string of ASCII characters. Images are binary files — they contain raw bytes that cannot be safely embedded in text-based formats like HTML, CSS, or JSON. Base64 encodes every 3 bytes of binary data into 4 ASCII characters, making it safe to embed anywhere text is expected. In web development, Base64-encoded images are used as Data URIs (data:image/png;base64,...) to inline images directly into HTML or CSS without an extra HTTP request.' },
    },
    {
      '@type': 'Question',
      name: 'What is a Data URI and how does it work?',
      acceptedAnswer: { '@type': 'Answer', text: 'A Data URI (also called Data URL) is a URI scheme that embeds file data inline rather than linking to an external file. The format is: data:[mediatype];base64,[data]. For example: data:image/png;base64,iVBORw0KGgo... You can use a Data URI anywhere a URL is expected — in an HTML img src attribute, a CSS background-image url(), or even a link href. The browser decodes and renders it without making an HTTP request. This is useful for small images like icons, logos, and inline SVGs that would otherwise require separate network requests.' },
    },
    {
      '@type': 'Question',
      name: 'Why does Base64 make images larger?',
      acceptedAnswer: { '@type': 'Answer', text: 'Base64 encodes 3 bytes into 4 ASCII characters — a 33% size increase. A 10 KB PNG becomes approximately 13.3 KB as a Base64 string. This overhead is why Base64 encoding is recommended only for small images (icons, avatars, logos under 5–10 KB). For large images, the size increase combined with the loss of browser caching (the image is re-sent with every HTML/CSS request) makes Base64 a poor choice. Use external image files for large images and Base64 for small, frequently-used ones.' },
    },
    {
      '@type': 'Question',
      name: 'When should I use Base64 images vs external image files?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use Base64 (Data URI) for: small icons and logos under 5 KB, images used in CSS-only components where no external file is desirable, SVG icons embedded inline for theming, email HTML where external images may be blocked, and critical above-the-fold images to eliminate render-blocking HTTP requests. Use external image files for: large photos and illustrations, images used across multiple pages (external files benefit from browser caching), and any image over 10 KB where the 33% Base64 overhead noticeably increases transfer size.' },
    },
    {
      '@type': 'Question',
      name: 'What is SVG URL-encoding and when is it better than Base64?',
      acceptedAnswer: { '@type': 'Answer', text: 'SVG files are plain XML text. Instead of Base64-encoding them (which makes them opaque binary strings), you can URL-encode the SVG text and embed it as a data: URI directly: url("data:image/svg+xml,<svg...>"). This keeps the SVG human-readable in your CSS, allows GZIP to compress it much more effectively (text compresses far better than Base64), and produces a smaller result than Base64 encoding for most SVGs. URL-encoded SVGs are preferred for CSS icon systems and design tokens. This tool outputs both formats so you can choose.' },
    },
    {
      '@type': 'Question',
      name: 'Can I convert between image formats (PNG, JPEG, WebP)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The tool uses the browser Canvas API to redraw your image and export it as a different format. You can convert any input image (PNG, JPEG, GIF, WebP, BMP) to JPEG, PNG, or WebP output. JPEG conversion has a quality slider (10–100%) that controls the lossy compression level. WebP also supports quality control. PNG is always lossless. Note that converting to JPEG flattens transparency (fills with white), since JPEG does not support an alpha channel.' },
    },
    {
      '@type': 'Question',
      name: 'Is my image uploaded to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Everything happens 100% in your browser. When you upload or paste an image, it is read by the FileReader API and converted to Base64 entirely client-side using JavaScript. No image data is ever sent to any server. This makes the tool safe for converting sensitive, proprietary, or confidential images — your files never leave your machine.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use the Base64 string in CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Copy the CSS background-image row from this tool and paste it directly into your stylesheet: .icon { background-image: url("data:image/png;base64,..."); background-size: contain; background-repeat: no-repeat; }. For the content: property (used with pseudo-elements in some frameworks), copy the CSS content row. For SVG icons, use the SVG URL-encoded output instead of Base64 — it is smaller and compresses better with GZIP.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image to Base64 Converter',
  url: 'https://webdevpuneet.com/image-to-base64/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online image to Base64 converter. Upload PNG, JPEG, WebP, GIF, SVG, or BMP and get a Data URI, HTML img tag, CSS background-image, raw Base64 string, and SVG URL-encoded output. Format conversion with quality control. 100% client-side.',
  featureList: [
    'Drag & drop image upload — any image format',
    'Ctrl+V clipboard paste — paste screenshots directly',
    'Six output formats: Data URI, HTML img, CSS background-image, CSS content, Raw Base64, SVG URL-encoded',
    'Format conversion: Original / JPEG / PNG / WebP via Canvas API',
    'JPEG and WebP quality slider (10–100%)',
    'Image metadata: dimensions, MIME type, original size, Base64 size, overhead %',
    'One-click copy for each output format',
    '100% client-side — no image data is uploaded',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Image to Base64 Converter', item: 'https://webdevpuneet.com/image-to-base64/' },
  ],
};

const SEO = {
  slug: 'image-to-base64',
  title: 'Image to Base64 Converter Online — PNG, JPEG, SVG, WebP, GIF',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload your image', text: 'Drag an image file onto the drop zone on the left, or click it to open a file picker. You can also press Ctrl+V anywhere on the page to paste a screenshot or copied image directly from your clipboard. Supported formats include PNG, JPEG, WebP, GIF, SVG, BMP, and ICO.' },
      { title: 'Review the metadata panel', text: 'Once uploaded, the panel below the image preview shows your image dimensions, MIME type, original file size, the resulting Base64 string size, and the overhead percentage. Base64 always adds approximately 33% to the original file size — use this panel to decide whether inlining the image is worth the trade-off.' },
      { title: 'Optionally convert the format first', text: 'Click the JPEG, PNG, or WebP tab in the "Convert to" section to re-encode the image to a different format before generating the Base64. For JPEG and WebP, a quality slider (10–100%) controls the compression level — lower quality produces a smaller Base64 string. This is useful for shrinking a large PNG to a smaller WebP before inlining it.' },
      { title: 'Copy your preferred output format', text: 'The right panel shows six ready-to-use outputs: Data URI (for img src and CSS url()), HTML img tag (ready-to-paste markup), CSS background-image, CSS content (for pseudo-elements), Raw Base64 (the bare string only), and SVG URL-encoded (for SVG files only — smaller and more GZIP-friendly than Base64). Click any row to copy it — a green checkmark confirms the copy.' },
      { title: 'Use the output in your project', text: 'Paste the Data URI directly into an HTML img src attribute, a CSS background-image url() property, or a JSON payload. For SVG images, prefer the SVG URL-encoded row over Base64 — it produces a smaller, human-readable, and more GZIP-compressible data URI that works in all modern browsers.' },
    ],
  },
  about: {
    title: 'Convert Any Image to a Base64 Data URI — Get HTML, CSS, and Raw String Outputs Instantly',
    description: `You need a small icon embedded in your CSS without an extra HTTP request, or you're building an HTML email and external images keep getting blocked by email clients. Drag the image here and copy the ready-to-use output — Data URI, HTML \`<img>\` tag, CSS \`background-image\`, or raw Base64 string — in one click. Everything runs entirely in your browser — no image data is ever uploaded to any server, making it safe for proprietary, confidential, or sensitive images.\n\nBase64 encodes binary image data as ASCII text so it can be embedded anywhere text is accepted — in HTML attributes, CSS \`url()\`, JSON, or JavaScript string literals. The output is a Data URI like \`data:image/png;base64,iVBORw0KGgo...\` that browsers render without a network request. **Six output formats** cover every web development use case: **Data URI** for direct embedding in any URL context, **HTML img tag** for ready-to-paste markup, **CSS background-image** for stylesheet use, **CSS content** for pseudo-element icons, **Raw Base64** for manual or programmatic use, and **SVG URL-encoded** — which is smaller and more GZIP-friendly than Base64 for SVG files because the SVG markup remains as readable text.\n\nOptional **format conversion** via the Canvas API lets you re-encode to JPEG, PNG, or WebP before generating the Base64. This is especially useful when you have a large PNG and want to shrink it to WebP first — dramatically reducing the Base64 string length before inlining. A quality slider (10–100%) controls lossy compression for JPEG and WebP output. The **metadata panel** shows original file size, Base64 string size, and the overhead percentage so you can make an informed decision about whether inlining makes sense for your specific image. Base64 always adds approximately 33% overhead — for images under 5 KB the trade-off is usually worthwhile; for larger images, an external file with HTTP caching is generally more efficient.`,
  },
  features: [
    'Drag & drop or click to upload — PNG, JPEG, WebP, GIF, SVG, BMP, ICO supported',
    'Ctrl+V clipboard paste — paste screenshots, copied images, or anything in your clipboard',
    'Six ready-to-use output formats: Data URI, HTML img, CSS background-image, CSS content, Raw Base64, SVG URL-encoded',
    'Canvas-based format conversion — convert to JPEG, PNG, or WebP before encoding; compress images first with our [Image Compressor](https://fwdtools.com/image-compressor/)',
    'JPEG and WebP quality slider — control compression (10–100%) to tune Base64 output size',
    'Metadata panel — shows dimensions, MIME type, original size, Base64 size, and overhead %',
    'SVG URL-encoding — produces smaller, GZIP-friendly SVG data URIs instead of Base64; convert raster images to SVG with our [Image to SVG](/image-to-svg) converter',
    '100% client-side — your images are never uploaded to any server; decode Base64 strings with our [Base64 Encoder / Decoder](https://fwdtools.com/base64-encoder-decoder/)',
  ],
  useCases: [
    { icon: '◑', title: 'Inline a small icon in CSS without an extra HTTP request', desc: 'Embed icons and logos under 5 KB as Base64 Data URIs in your stylesheet. The image is bundled with the CSS — no separate image file needed, no extra round-trip for the icon.' },
    { icon: '△', title: 'Fix blocked images in HTML emails by inlining them as Base64', desc: 'Many email clients block external image URLs, but inline Base64 images always render. Convert your logo or product image to a Data URI and paste it directly into the <img src=""> attribute of your email HTML.' },
    { icon: '⚡', title: 'Eliminate an HTTP request for a critical above-the-fold image', desc: 'Inlining a small hero logo or icon as Base64 in the HTML removes a render-blocking network request. Useful for LCP optimization when the image is small enough that the 33% size overhead doesn\'t outweigh the request savings.' },
    { icon: '▦', title: 'Build a CSS SVG icon system with URL-encoded data URIs', desc: 'SVG files are XML text — URL-encoding them into CSS custom properties produces smaller, GZIP-friendly output compared to Base64. Use the SVG URL-encoded row for icon systems that need to ship as pure CSS.' },
    { icon: '⇄', title: 'Convert a PNG to WebP or JPEG before inlining to reduce size', desc: 'Use the format conversion tabs to re-encode your image to WebP or JPEG before generating the Base64. Adjust the quality slider to find the smallest size that still looks acceptable, then copy the output.' },
    { icon: '⬡', title: 'Bundle image assets directly into a JavaScript component library', desc: 'Embed image assets as Base64 strings in component source files so the library ships with all assets included — no separate image hosting, no broken image paths after npm install. Convert any hex or raw string with our [Base64 Encoder / Decoder](https://fwdtools.com/base64-encoder-decoder/).' },
  ],
  faqs: [
    { q: 'What is Base64 encoding and why use it for images?', a: 'Base64 encodes binary image data as ASCII text so it can be embedded safely in HTML, CSS, or JSON. The output is a Data URI like data:image/png;base64,... that browsers render without an HTTP request. Best for small images under 5–10 KB.' },
    { q: 'What is a Data URI?', a: `A Data URI embeds file content inline using the scheme: data:[mediatype];base64,[data]. Use it anywhere a URL is accepted — img src, CSS url(), link href. The browser decodes and renders it locally without a network request.` },
    { q: 'Why does Base64 make images 33% larger?', a: 'Base64 encodes 3 bytes as 4 ASCII characters — inherently a 33% size increase. A 10 KB PNG becomes ~13.3 KB as Base64. Use Base64 only for small images; for large ones, external files with caching are more efficient.' },
    { q: 'When should I use Base64 vs external image files?', a: 'Use Base64 for: icons under 5 KB, email HTML images, critical above-the-fold assets. Use external files for: large photos, images reused across pages (they benefit from browser caching), and anything over ~10 KB.' },
    { q: 'What is SVG URL-encoding and when is it better than Base64?', a: 'SVG is XML text — URL-encoding it keeps it readable and GZIP-compressible: url("data:image/svg+xml,<svg...>"). This is smaller and more efficient than Base64 for SVGs. Use this for CSS icon systems and design tokens.' },
    { q: 'Can I convert image formats before encoding?', a: 'Yes — use the Convert to tabs to switch between JPEG, PNG, or WebP. JPEG and WebP support a quality slider (10–100%). JPEG conversion fills transparency with white since JPEG has no alpha channel.' },
    { q: 'Is my image sent to a server?', a: 'No. Everything runs 100% in your browser using the FileReader and Canvas APIs. No image data is ever uploaded. Safe for confidential or proprietary images.' },
    { q: 'How do I use Base64 in CSS?', a: 'Copy the CSS background-image row: .icon { background-image: url("data:image/png;base64,..."); }. For SVG icons, use the SVG URL-encoded row instead — it produces smaller, more GZIP-friendly output.' },
  ],
};

export default function ImageToBase64Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageToBase64Tool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
