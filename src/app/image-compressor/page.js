import ImageCompressorTool from '@/components/ImageCompressorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Image Compressor — Bulk Compress PNG, JPEG, WebP, AVIF',
  description: 'Bulk compress and convert images in your browser — PNG, JPEG, WebP and AVIF with a live before/after slider and social presets. Free and nothing is uploaded.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-compressor/' },
  icons: { icon: '/icons/image-compressor.svg', shortcut: '/icons/image-compressor.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-compressor/',
    siteName: 'webdevpuneet.com',
    title: 'Image Compressor + Converter — PNG, JPEG, WebP, AVIF Free',
    description: 'Compress and convert images in your browser — PNG like TinyPNG, WebP, AVIF, JPEG. Live split-slider preview, remembered settings, social media presets, batch processing. 100% free and client-side.',
    images: [{ url: 'https://webdevpuneet.com/images/image-compressor.png', width: 1200, height: 630, alt: 'Image Compressor + Converter — PNG, JPEG, WebP, AVIF Free' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image Compressor + Converter — PNG, JPEG, WebP, AVIF Free',
    description: 'Compress and convert images in your browser. PNG like TinyPNG, WebP, AVIF. Social media presets, live before/after preview, batch download. 100% free.',
    images: ['https://webdevpuneet.com/images/image-compressor.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert PNG to WebP or AVIF online for free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Drop your PNG onto the upload zone, select WebP or AVIF under "Convert To", and click the download button. The conversion happens entirely in your browser — no upload, no account, no file size limit. A blue conversion badge (PNG→WEBP or PNG→AVIF) appears next to each file confirming the output format. You can batch-convert multiple images at once by dropping them all at the same time.' },
    },
    {
      '@type': 'Question',
      name: 'What is AVIF and how does it compare to WebP?',
      acceptedAnswer: { '@type': 'Answer', text: 'AVIF (AV1 Image File Format) is a next-generation image format developed from the AV1 video codec. At the same visual quality, AVIF files are typically 30–50% smaller than WebP and 60–80% smaller than JPEG. It supports lossy and lossless compression, transparency, and HDR color. Browser support as of 2025: Chrome 85+, Firefox 93+, Safari 16+, Edge 121+. If you need to support older browsers, WebP is the safer choice.' },
    },
    {
      '@type': 'Question',
      name: 'How does PNG compression work — and is it the same as TinyPNG?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — this tool uses the same palette quantization technique that TinyPNG uses. A 32-bit PNG contains up to 16.7 million colors. By analyzing your image and reducing it to the best 256 colors (or fewer), the file can be encoded as an 8-bit indexed PNG — 50–80% smaller while looking nearly identical. This is done entirely in your browser using the UPNG library. No image data is ever sent to a server. TinyPNG does the same thing on their servers using pngquant; this tool brings that capability to your browser for free.' },
    },
    {
      '@type': 'Question',
      name: 'What quality setting should I use for PNG compression?',
      acceptedAnswer: { '@type': 'Answer', text: 'For PNG palette quantization, quality maps to max color count: quality 100 = 256 colors (highest quality, least compression), quality 80 = ~205 colors (recommended — nearly indistinguishable from the original), quality 50 = ~128 colors (noticeable on photos but fine for icons and graphics), quality 25 = ~64 colors (heavy compression, best for simple flat graphics). Use the live split-slider to compare the original and compressed versions at different quality levels — find the lowest quality that still looks acceptable for your use case.' },
    },
    {
      '@type': 'Question',
      name: 'How much can palette quantization reduce a PNG file size?',
      acceptedAnswer: { '@type': 'Answer', text: 'Palette quantization typically reduces PNG file size by 50–80%. A 500 KB PNG screenshot can often compress to 80–150 KB at quality 80 with no visible difference. Screenshots, UI graphics, icons, and flat-color illustrations compress the most because they already use limited colors. Complex photos with millions of distinct colors compress less — for photos, converting to WebP or JPEG is usually more effective. The reduction percentage depends heavily on the image content and the max color count you choose.' },
    },
    {
      '@type': 'Question',
      name: 'Does PNG compression with palette quantization preserve transparency?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. PNG palette quantization (the technique used here and by TinyPNG) fully preserves transparency. The alpha channel is included in the color palette — each palette entry stores RGBA values, not just RGB. Logos, icons, and UI elements with transparent backgrounds are handled correctly, and the transparency is maintained in the compressed output file. This makes palette-quantized PNG ideal for web graphics that need transparency, as an alternative to 32-bit PNG or WebP.' },
    },
    {
      '@type': 'Question',
      name: 'Why is WebP better than JPEG and PNG for compression?',
      acceptedAnswer: { '@type': 'Answer', text: 'WebP is a modern image format developed by Google that uses more advanced compression algorithms than JPEG or PNG. For the same visual quality, WebP files are typically 25–35% smaller than JPEG and 50–70% smaller than lossless PNG. WebP supports both lossy and lossless compression, plus transparency — making it a near-universal replacement for JPEG and PNG. As of 2025, WebP is supported by all modern browsers. For PNGs with transparency that must stay in PNG format, palette quantization (as used by TinyPNG) is your best option.' },
    },
    {
      '@type': 'Question',
      name: 'What quality setting should I use for JPEG and WebP?',
      acceptedAnswer: { '@type': 'Answer', text: 'For JPEG and WebP, quality 75–85% produces visually near-identical results to the original at 30–50% smaller file size. For product photos and hero images where fine detail matters, use 80–90%. For thumbnails, icons, and background images, 60–75% is usually fine. For WebP specifically, you can often use a lower quality setting than JPEG and still match the perceptual quality — try 70% WebP against 85% JPEG and compare with the split-slider. Always use the live comparison to find the lowest quality that looks acceptable.' },
    },
    {
      '@type': 'Question',
      name: 'Is my image data safe? Is anything uploaded to a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'Your images never leave your device. All compression — including PNG palette quantization, JPEG re-encoding, WebP conversion, and resizing — happens entirely in your browser using JavaScript. No image data is sent to any server at any point. This makes the tool safe for confidential, copyrighted, or sensitive images. Unlike TinyPNG and similar tools, there is no upload step, no usage limit, and no file size cap. You can also use it offline once the page has loaded.' },
    },
    {
      '@type': 'Question',
      name: 'Can I compress multiple images at once?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Drag multiple files onto the upload zone, or use the file picker with multi-select. All images are processed in parallel using the same global settings. Each image shows its before/after file sizes and compression percentage in the file list. Click any image to see its split-slider before/after comparison. Use Download All to save every compressed image at once. There are no per-session or per-file limits — compress as many images as you need.' },
    },
    {
      '@type': 'Question',
      name: 'Does resizing images help with compression?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — resizing often reduces file size more than quality reduction alone. A 4000×3000 photo downscaled to 1920×1440 reduces the pixel count by ~77%, which directly translates to a smaller encoded file regardless of format. Use Max Width (e.g. 1920px) for web images that will never display wider than a monitor. Use Scale % to uniformly reduce all uploaded images by a fixed percentage. Resize is applied before compression, so both effects stack for maximum file size reduction.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between lossy and lossless PNG compression?',
      acceptedAnswer: { '@type': 'Answer', text: 'Standard PNG is a lossless format — recompressing a PNG as another PNG (as the browser Canvas API does by default) achieves very little size reduction because no data is discarded. Palette quantization (used by TinyPNG and this tool) is a form of lossy PNG compression — it reduces the number of colors from up to 16.7 million down to 256 or fewer, permanently discarding color information that is rarely visible to the human eye. The result is an indexed PNG that is dramatically smaller while looking nearly identical. For photos, WebP or JPEG lossy compression is usually more effective than PNG quantization.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Compressor + Converter',
  url: 'https://webdevpuneet.com/image-compressor/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free bulk image compressor and converter. Drop multiple images at once — compress PNG like TinyPNG, convert to WebP, AVIF, or JPEG in parallel, then Download All. Live split-slider before/after comparison, social media presets, quality slider, resize options. 100% client-side — no uploads, no limits.',
  featureList: [
    'PNG palette quantization — same compression technique as TinyPNG, 100% in-browser',
    'Convert to WebP — 30–70% smaller than JPEG/PNG at equivalent quality',
    'Convert to AVIF — cutting-edge format, 30–50% smaller than WebP',
    'Convert to JPEG — universal compatibility for photos and email',
    'Live split-slider before/after comparison for every image',
    'Autosaved browser settings for output format, quality, resize mode, and resize dimensions',
    'Quality slider (1–100) controls color palette for PNG, encode quality for JPEG/WebP/AVIF',
    'Resize: Scale %, Max Width, Max Height, or Fit W×H with aspect-ratio lock',
    'Social media presets: OG Image, Instagram, Twitter Header, LinkedIn Cover, Favicon, Full HD',
    'Conversion badge — shows PNG→WEBP, JPEG→AVIF etc. in file list',
    'Batch processing — drop multiple images, all processed in parallel',
    'Per-image stats: before/after size, dimensions, reduction % badge',
    'Download individual files or Download All at once',
    'Ctrl+V clipboard paste for screenshots',
    '100% client-side — no image data uploaded, no file size limits',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Image Compressor + Converter', item: 'https://webdevpuneet.com/image-compressor/' },
  ],
};

const SEO = {
  slug: 'image-compressor',
  title: 'Bulk Image Compressor + Converter Online Free — PNG, JPEG, WebP, AVIF in Your Browser',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload your images', text: 'Drop one or more image files onto the upload zone, or click it to open a file picker. You can also press Ctrl+V to paste a screenshot directly from your clipboard. Supported input formats include PNG, JPEG, WebP, GIF, BMP, and AVIF. Drop an entire folder at once to batch-process everything in parallel — there is no per-session or per-file limit.' },
      { title: 'Select an output format', text: 'Under "Convert To", pick your target format. WebP gives the best all-round compression — 30–70% smaller than JPEG/PNG for most content. AVIF is the next-generation option: 30–50% smaller than WebP (supported in Chrome, Firefox, and Safari 16+). PNG mode uses palette quantization — the same technique as TinyPNG — for 50–80% size reduction while preserving transparency. JPEG is best for photos needing universal compatibility. Original keeps the source format and only applies quality or resize settings. A blue badge (e.g., PNG→WEBP) appears next to each file in the list when format conversion is active.' },
      { title: 'Adjust the quality slider', text: 'Use the Quality slider (1–100%) to control the output. For PNG, quality controls the color palette size: quality 80 gives ~205 colors — visually indistinguishable from the original for most images. For WebP and AVIF, quality 75–85 gives near-identical results at 30–50% smaller file size. For JPEG, quality 80–90 is recommended for product photos, 65–75 for thumbnails. Watch the live split-slider preview update as you drag.' },
      { title: 'Drag the split-slider to compare', text: 'The preview pane shows a before/after split view. Drag the handle left and right to compare the original (left side) against the compressed or converted output (right side). The stats strip below the preview shows the before/after file sizes, bytes saved, reduction percentage, and output dimensions so you can verify quality at a glance.' },
      { title: 'Apply resize options if needed', text: 'In the Resize section, choose Scale % to reduce all images proportionally, Max Width to cap horizontal resolution, Max Height to cap vertical resolution, or Fit W×H to scale to exact dimensions with aspect ratio locked. Click Fit W×H to reveal social media presets: OG Image (1200×630), Instagram (1080×1080), Twitter Header (1500×500), LinkedIn Cover (1584×396), Favicon (32×32), and Full HD (1920×1080). Resize is applied before compression so both effects stack for maximum size reduction.' },
      { title: 'Download individual files or all at once', text: 'Click the download arrow on any file row to save that single image. Click Download All in the header to save every processed file in one click with no ZIP step. Settings — output format, quality, resize mode, and dimensions — are automatically saved to your browser so they are remembered the next time you visit the tool.' },
    ],
  },
  about: {
    title: 'Bulk Compress & Convert Images Without Uploading — PNG, JPEG, WebP, AVIF, All in Your Browser',
    description: `You need to compress 30 product images before uploading them to your store, convert an entire Figma export folder from PNG to WebP, or shrink a batch of screenshots before attaching them to a report — and you don't want to upload them to a third-party server or hit TinyPNG's monthly limit. Drop all your files here at once. This tool is a bulk image compressor and converter: every file is processed in parallel inside your browser with no uploads, no account, and no limits. Everything runs fully in your browser — no data is uploaded to any server.\n\n**Bulk compression in one pass.** Drop an entire folder of images — PNG, JPEG, WebP, GIF, BMP, AVIF — and all files compress simultaneously using the same shared settings. PNG files reduce 50–80% using palette quantization, the same technique as TinyPNG. WebP conversion cuts JPEG and PNG sizes by 30–70%. AVIF goes further — 30–50% smaller than WebP at the same visual quality. Once processing is done, click Download All to save every file in one go. There is no per-session limit, no per-file size cap, and no monthly quota.\n\nAll format conversion and compression — PNG quantization, JPEG re-encoding, WebP encoding, AVIF encoding, and resizing — runs directly in your browser using the Canvas API and the UPNG JavaScript library. The conversion badge in the file list shows the exact transformation (e.g., PNG→WEBP, JPEG→AVIF) so you always know what output format each file will download in. The live split-slider lets you drag a divider across the preview to compare the original and converted version side by side — making it easy to verify quality before committing to a bulk download. Social media presets under Fit W×H handle common size requirements in one click: OG Image (1200×630), Instagram square (1080×1080), Twitter Header (1500×500), LinkedIn Cover (1584×396), Favicon (32×32), and Full HD (1920×1080).`,
  },
  features: [
    'PNG palette quantization — same compression technique as TinyPNG, 50–80% size reduction, transparency preserved, runs 100% in-browser',
    'Convert to WebP — 30–70% smaller than JPEG/PNG at equivalent visual quality; convert images to SVG with our [Image to SVG](/image-to-svg) converter',
    'Convert to AVIF — next-generation format, 30–50% smaller than WebP, supported in Chrome, Firefox, and Safari 16+',
    'Convert to JPEG — universal format for photos needing maximum compatibility',
    'Live split-slider before/after comparison — drag to see original vs compressed output side by side with per-image stats',
    'Social media presets — one-click Fit W×H for OG Image, Instagram, Twitter Header, LinkedIn Cover, Favicon, Full HD',
    'Resize options: Scale %, Max Width, Max Height, Fit W×H — resize applied before compression for maximum size reduction',
    'Bulk processing — drop 50+ images at once, all compressed in parallel with Download All; embed images in CSS with our [Image to Base64](/image-to-base64) converter',
    'Autosaved settings — remembers output format, quality, resize mode, and dimensions in localStorage across sessions',
    '100% client-side — no uploads, no server, no file size limits, Ctrl+V clipboard paste for screenshots',
  ],
  useCases: [
    { icon: '▦', title: 'Bulk compress images before uploading to a website or store', desc: 'Drop an entire product image folder, select WebP and quality 80, and click Download All — every image compressed and converted in parallel with no upload, no limit, and no monthly quota. Works for 5 images or 500.' },
    { icon: '⇄', title: 'Convert PNG and JPEG to WebP or AVIF for web performance', desc: 'Convert a folder of PNG screenshots and JPEG photos to WebP for 60–70% size reduction, or to AVIF for even smaller files. Drop them all at once, select the output format, and download — ready for your CDN or repo commit. Need inline images? Convert the output with [image to Base64](/image-to-base64).' },
    { icon: '⚡', title: 'Compress PNG without TinyPNG\'s upload limit or cost', desc: 'Uses the same palette quantization technique as TinyPNG — 50–80% size reduction, transparency preserved, no upload, no account, no monthly limit. Runs entirely in your browser using JavaScript.' },
    { icon: '◑', title: 'Resize and convert images for social media in one step', desc: 'Select a social media preset (OG Image, Instagram, Twitter Header) to scale to the exact target dimensions, then convert to WebP in one pass. Download all optimized images ready to upload.' },
    { icon: '◉', title: 'Shrink screenshots and exports before sharing', desc: 'Compress a 2 MB PNG screenshot to under 200 KB without visible quality loss — or convert an entire Figma export folder to WebP and download all converted files at once, ready to commit or deploy.' },
  ],
  faqs: [
    { q: 'Can I compress multiple images at once — bulk image compression?', a: 'Yes — this is a bulk image compressor. Drop an entire folder of images (PNG, JPEG, WebP, GIF, BMP, AVIF) onto the upload zone or use multi-select in the file picker. All files are compressed in parallel using the same shared settings — format, quality, and resize mode apply to every image in the batch. When done, click Download All to save every compressed file at once. There are no limits on how many images you can process per session.' },
    { q: 'How do I convert PNG to WebP or AVIF online for free?', a: 'Drop your PNG onto the upload zone, select WebP or AVIF under "Convert To", and click the download button. The conversion happens entirely in your browser — no upload, no account, no file size limit. A blue conversion badge (PNG→WEBP or PNG→AVIF) appears next to each file confirming the output format. You can batch-convert multiple images at once by dropping them all at the same time.' },
    { q: 'What is AVIF and is it better than WebP?', a: 'AVIF (AV1 Image File Format) is a next-generation image format developed from the AV1 video codec. At the same visual quality, AVIF files are typically 30–50% smaller than WebP and 60–80% smaller than JPEG. It supports lossy and lossless compression, transparency (alpha channel), and HDR color. Browser support as of 2025: Chrome 85+, Firefox 93+, Safari 16+, Edge 121+. If you need to support older browsers, WebP is the safer choice.' },
    { q: 'Is there a free TinyPNG alternative that doesn\'t require uploading my images?', a: 'Yes — this tool uses the same PNG palette quantization technique as TinyPNG, but runs 100% in your browser. Your images never leave your device, there are no monthly usage limits, no per-file size caps, and no account required. TinyPNG sends your images to their servers; this tool does the same compression locally using JavaScript.' },
    { q: 'How do I resize an image to a specific size for social media?', a: 'Under the Resize section, select "Fit W×H" to reveal social media presets. Click OG Image (1200×630), Instagram (1080×1080), Twitter Header (1500×500), LinkedIn Cover (1584×396), Favicon (32×32), or Full HD (1920×1080) to set the target dimensions. You can also type custom dimensions. All presets scale to fit within the target size while maintaining your original aspect ratio.' },
    { q: 'Does PNG compression preserve transparency?', a: 'Yes. Palette quantization fully supports the alpha channel — logos, icons, and graphics with transparent backgrounds compress correctly and maintain transparency in the output. WebP and AVIF also preserve transparency. Only JPEG does not support transparency — converting a transparent PNG to JPEG fills the transparent areas with white.' },
    { q: 'What quality setting should I use for WebP and AVIF?', a: 'For WebP, quality 75–85% produces near-identical visual quality at 30–50% smaller file size. For AVIF, quality 60–75% often gives comparable perceptual quality to WebP at 85% — AVIF\'s more advanced compression means you can use a lower number and still get a great result. Use the live split-slider to compare the original and output at your chosen quality before downloading.' },
    { q: 'Are my images sent to a server?', a: 'No. All format conversion and compression — PNG quantization, JPEG re-encoding, WebP conversion, AVIF conversion, and resizing — runs entirely in your browser using JavaScript. No image data is transmitted to any server at any point. Safe for confidential, copyrighted, or sensitive images. The browser only remembers compression settings such as format, quality, resize mode, dimensions, and comparison slider position in localStorage; uploaded image files and generated compressed blobs are not saved.' },
    { q: 'How much smaller will my images be after converting to WebP or AVIF?', a: 'WebP: typically 30–70% smaller than JPEG/PNG at equivalent quality. AVIF: 30–50% smaller than WebP, making it 60–80% smaller than JPEG. A 500 KB JPEG photo commonly compresses to 120–200 KB as WebP and 80–140 KB as AVIF at quality 75. The exact reduction depends on image content — photos compress more than flat-color graphics.' },
    { q: 'How do I convert multiple images at once?', a: 'Drag multiple files onto the upload zone, or use the file picker with multi-select. All images are converted and compressed in parallel with the same global settings. Each image shows a conversion badge (e.g., PNG→WEBP) and before/after file sizes. Click Download All to save every converted image at once.' },
    { q: 'Will resizing an image help reduce file size?', a: 'Yes — often more than quality reduction alone. A 4000px wide image scaled to 1920px reduces pixel count by ~77%, which directly reduces encoded file size regardless of format. Use Max Width (e.g. 1920px) for images that will never display wider than a monitor, or use Fit W×H with a social media preset to target exact dimensions. Resize is applied before compression, so both effects stack.' },
  ],
};

export default function ImageCompressorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageCompressorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
