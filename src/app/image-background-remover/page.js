import ImageBackgroundRemoverTool from '@/components/ImageBackgroundRemoverTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/image-background-remover.png';

export const metadata = {
  title: 'Image Background Remover — Free Transparent PNG & WebP',
  description: 'Remove image backgrounds in your browser with white, picked-color or magic-wand selection, tolerance and feather, then export a transparent PNG or WebP. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-background-remover/' },
  icons: { icon: '/icons/image-background-remover.svg', shortcut: '/icons/image-background-remover.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-background-remover/',
    siteName: 'webdevpuneet.com',
    title: 'Image Background Remover Online',
    description: 'Remove simple image backgrounds locally with white, picked-color, magic-wand, and edge-color modes, then export transparent PNG/WebP without uploading your file.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Image Background Remover Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image Background Remover Online',
    description: 'Remove image backgrounds locally with magic-wand selection and export transparent PNG/WebP.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does this background remover upload my image?', acceptedAnswer: { '@type': 'Answer', text: 'No. The image is loaded into browser memory and processed with Canvas. Nothing is uploaded to a server.' } },
    { '@type': 'Question', name: 'What images work best?', acceptedAnswer: { '@type': 'Answer', text: 'This tool works best on product photos, logos, screenshots, and images where the background touches the edges and has a fairly consistent color. Complex portraits, hair, and busy backgrounds may need AI segmentation or manual editing.' } },
    { '@type': 'Question', name: 'Can I export a transparent image?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Export as PNG for maximum compatibility or WebP for smaller files. Both formats preserve transparency.' } },
    { '@type': 'Question', name: 'How do tolerance and feather work?', acceptedAnswer: { '@type': 'Answer', text: 'Tolerance controls how different a pixel can be from the detected edge background color and still be removed. Feather softens the edge slightly so the cutout does not look too harsh.' } },
    { '@type': 'Question', name: 'How do I remove a white background from an image?', acceptedAnswer: { '@type': 'Answer', text: 'Use White / light background mode, then increase tolerance until the white or off-white background disappears. If the subject starts disappearing, lower tolerance and use a small edge feather value.' } },
    { '@type': 'Question', name: 'Can I use a magic wand selection like Photoshop?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Select Magic wand selection, then click a connected background area in the image. The tool samples that color and removes only the connected similar region. Increase tolerance to grow the selection or lower tolerance if it cuts into the subject.' } },
    { '@type': 'Question', name: 'Can I click a color in the image to remove it?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Magic wand selection when you want to remove one connected area. Use Picked color mode when you want to remove pixels close to the selected color across the image. You can also choose the target color with the color picker.' } },
    { '@type': 'Question', name: 'Why did part of my subject disappear?', acceptedAnswer: { '@type': 'Answer', text: 'That usually means the tolerance is too high or the subject contains colors very similar to the background. Lower tolerance, try a different picked color, or use a simpler source image with stronger contrast between subject and background.' } },
    { '@type': 'Question', name: 'Why is hair difficult to cut out?', acceptedAnswer: { '@type': 'Answer', text: 'Hair, fur, glass, smoke, and shadows contain many semi-transparent pixels and colors blended with the background. This local color-based remover is useful for simple backgrounds, but detailed portrait segmentation may require an AI cutout tool or manual masking.' } },
    { '@type': 'Question', name: 'Should I export PNG or WebP?', acceptedAnswer: { '@type': 'Answer', text: 'Use PNG when you need maximum compatibility or plan to edit the file again. Use WebP when you want a smaller transparent image for websites and know your target browsers support WebP.' } },
    { '@type': 'Question', name: 'Can I zoom in and pan to check the edge quality?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Scroll the mouse wheel to zoom in up to 800% — the view zooms toward the cursor so the area you are inspecting stays centred. Drag to pan around the image at any zoom level. Use the zoom buttons above the preview to step in or out in 25% increments, and click the percentage label to reset zoom and pan to the default view.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image Background Remover',
  url: 'https://webdevpuneet.com/image-background-remover/',
  image: OG_IMAGE,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and Canvas support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based image background remover with white/light mode, magic-wand connected selection, picked-color removal, edge-color mode, tolerance, edge feather, scroll-to-zoom, drag-to-pan, preview backgrounds, and transparent PNG/WebP export.',
  featureList: ['Local image processing', 'White and off-white background removal', 'Magic wand connected-area selection', 'Click image to pick a color to remove', 'Color picker for manual target color selection', 'Edge-connected background removal', 'Tolerance control', 'Edge feather control', 'Scroll-to-zoom up to 800% with cursor-centred zoom', 'Drag-to-pan at any zoom level', 'Checker/white/black/custom preview backgrounds', 'Before/after draggable divider', 'Transparent PNG and WebP export'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Image Background Remover', item: 'https://webdevpuneet.com/image-background-remover/' },
  ],
};

const SEO = {
  slug: 'image-background-remover',
  title: 'Image Background Remover Online - Make Transparent PNGs Locally',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload an image', text: 'Drop a PNG, JPEG, WebP, or screenshot into the tool. The image is decoded locally in your browser.' },
      { title: 'Choose the removal mode', text: 'Use White / light background for portraits, logos, and products on white or off-white backgrounds. Use Magic wand selection when you want to click one connected background area, similar to Photoshop. Use Picked color when you want to remove the selected color across the image. Use Auto edge color when the background is another solid color sampled from the image edges.' },
      { title: 'Use the magic wand', text: 'Select Magic wand selection, then click the connected background area you want to remove. The sampled color and click position become the selection seed. Increase tolerance to grow the selected region, or lower it if the subject starts disappearing.' },
      { title: 'Pick a color from the image', text: 'Select Picked color mode in the left panel, then click directly on the background color in the preview. The tool removes pixels close to that color across the image. You can also choose the target color manually with the color picker.' },
      { title: 'Adjust tolerance', text: 'Increase tolerance to remove more of the background. Lower it if parts of the subject start disappearing.' },
      { title: 'Soften the edge', text: 'Use Edge feather to slightly soften the cutout boundary, especially around product edges or logos.' },
      { title: 'Change the preview background', text: 'Preview the transparent result on checkerboard, white, black, transparent, or a custom color before exporting.' },
      { title: 'Zoom in and pan to inspect edges', text: 'Scroll the mouse wheel over the preview to zoom in up to 800% — the view scales toward your cursor so the area you want to inspect stays centred. Drag anywhere on the preview to pan at any zoom level. Use the +/− buttons above for 25% steps, and click the percentage label to reset zoom and position.' },
      { title: 'Compare before and after', text: 'Use Before / After to show the original image on the left and the transparent result on the right. Drag the divider to inspect edges and halos.' },
      { title: 'Download PNG or WebP', text: 'Export as PNG for broad compatibility or WebP for a smaller transparent image file.' },
    ],
  },
  about: {
    title: 'Remove Simple Image Backgrounds Without Uploading Your File',
    description: `You often do not need a heavy AI editor just to remove a white background from a product photo, make a logo transparent, or clean up a simple screenshot. This Image Background Remover is built for those fast local cutouts: product images on plain backgrounds, logos on white or solid colors, screenshots, scanned marks, app icons, badges, and simple graphics. Upload an image, adjust tolerance, preview transparency, and download a transparent PNG or WebP without sending the file to a remote server.

The tool has four removal modes. White / light background is the default because many profile images, ecommerce photos, logo exports, and document scans use white or off-white backgrounds. Magic wand selection works like a simple Photoshop-style wand: click one connected background area, and the tool removes nearby connected pixels with a similar color. Picked color lets you click directly on the image to sample the exact background color you want to remove across the image, or choose that color manually with the color picker. Auto edge color samples the image edges and removes connected pixels with a similar color, which works well for simple colored backgrounds.

The edge-connected approach matters. If a background color appears on the border of the image, the tool follows that connected region inward and removes matching pixels. That helps avoid deleting isolated subject details that happen to be a similar color. Picked color mode is intentionally more direct: it removes pixels close to the selected color across the image, which is useful for simple white backgrounds, flat-color logos, and scanned graphics.

Use the Tolerance slider to decide how aggressively similar colors are removed. A low tolerance is strict and preserves more of the subject. A high tolerance removes off-white pixels, gray compression artifacts, uneven lighting, and slight background shadows, but can cut into the subject if the colors are too similar. Use Edge feather to soften the boundary so the cutout looks less harsh on dark, colored, or patterned backgrounds. The checkerboard, white, black, transparent, and custom preview backgrounds help you catch halos before downloading.

After removing the background, scroll the mouse wheel over the preview to zoom in up to 800%. The view scales toward the cursor, so the edge you want to inspect stays centred as you zoom. Drag to pan around the image at any zoom level. Use the +/− buttons above the preview for 25% steps, or click the percentage label to reset zoom and pan position in one click. This makes it easy to spot leftover background fringe, jagged pixels along the cutout boundary, or places where tolerance clipped into the subject — all without downloading first.

This is not a cloud AI portrait segmentation tool. Hair, fur, transparent glass, shadows, smoke, and busy outdoor backgrounds are difficult for a color-based local algorithm because those edges contain blended semi-transparent pixels. For simple ecommerce shots, icons, logos, screenshots, and clean studio images, it is fast, private, and useful. After export, use [Image Editor](/image-editor) to crop or resize, [Relight Photo](/relight-photo) to add lighting, or [Image Compressor](/image-compressor) to reduce final file size.`,
  },
  features: [
    'Browser-only image processing - no upload',
    'White / light background mode for portraits, product shots, and logos',
    'Magic wand mode for removing one connected similar-color area',
    'Click the image to sample and remove a selected color',
    'Color picker for choosing the exact color to make transparent',
    'Auto edge color mode for simple colored backgrounds',
    'Edge-connected background removal to avoid deleting isolated subject colors',
    'Tolerance slider for stricter or looser removal',
    'Edge feather slider for softer cutout edges',
    'Scroll-to-zoom up to 800% with cursor-centred zoom point',
    'Drag-to-pan at any zoom level for precise edge inspection',
    'Zoom +/− buttons and click-to-reset percentage label',
    'Preview on checkerboard, transparent, white, black, or custom color',
    'Draggable before/after preview divider',
    'Replace image without refreshing the page',
    'Transparent PNG and WebP export',
  ],
  useCases: [
    { icon: '▣', title: 'Make product photos transparent', desc: 'Remove a plain white or off-white studio background and export a transparent PNG for ecommerce listings, catalogs, marketplace images, landing pages, and comparison tables.' },
    { icon: '◇', title: 'Remove white backgrounds from logos', desc: 'Turn logos, marks, badges, and scanned signatures on white backgrounds into transparent assets that can sit on colored sections, headers, presentations, and invoices.' },
    { icon: '◉', title: 'Click a background color to remove it', desc: 'Use Picked color mode when the background is not pure white. Click the image to sample the background color, then adjust tolerance until the unwanted color becomes transparent.' },
    { icon: '▤', title: 'Clean up screenshots and UI assets', desc: 'Remove flat backgrounds from simple UI screenshots, app icons, generated graphics, diagrams, and interface mockups before placing them on another design.' },
    { icon: '◐', title: 'Prepare headshots with simple backgrounds', desc: 'For portraits on white or light walls, use White / light background mode and a moderate tolerance. This works best when hair and clothing have clear contrast from the background.' },
    { icon: '⬚', title: 'Preview cutouts on real backgrounds', desc: 'Switch between checkerboard, white, black, transparent, and custom background colors to catch edge halos before downloading the transparent PNG or WebP.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: '/image-editor', label: 'Image Editor - crop, resize, rotate, and convert images' },
    { href: '/relight-photo', label: 'Relight Photo - add studio, neon, sunset, and product lighting' },
    { href: '/image-compressor', label: 'Image Compressor - reduce final PNG, JPEG, and WebP file sizes' },
    { href: 'https://webdevpuneet.com/image-to-base64/', label: 'Image to Base64 - embed transparent images in HTML or CSS' },
  ],
};

export default function ImageBackgroundRemoverPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageBackgroundRemoverTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
