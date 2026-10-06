import RelightPhotoTool from '@/components/RelightPhotoTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/relight-photo.png';

export const metadata = {
  title: 'Relight Photo Online — Studio, Neon & Product Lighting',
  description: 'Add draggable studio, neon, sunset and product lights to any photo in your browser. Before/after preview and PNG, JPEG or WebP export. Free, no upload needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/relight-photo/' },
  icons: { icon: '/icons/relight-photo.svg', shortcut: '/icons/relight-photo.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/relight-photo/',
    siteName: 'webdevpuneet.com',
    title: 'Relight Photo Online - Add Creative Lighting',
    description: 'Free — Upload a photo and add draggable studio, neon, sunset, product, or dramatic lights locally in your browser.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Relight Photo Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Relight Photo Online - Add Creative Lighting',
    description: 'Add draggable photo lights, adjust ambient brightness and shadows, then export locally. No upload.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Are my photos uploaded when I use the relight photo tool?', acceptedAnswer: { '@type': 'Answer', text: 'No. The image is loaded into your browser and processed with Canvas. The photo is not uploaded to a server, and the export is generated locally on your device.' } },
    { '@type': 'Question', name: 'Is this an AI relighting tool?', acceptedAnswer: { '@type': 'Answer', text: 'This version is a browser-based creative relighting editor. It uses draggable light sources, radial light masks, screen blending, ambient dimming, and vignette shadows. It does not use cloud AI or estimate a true 3D depth map.' } },
    { '@type': 'Question', name: 'Can I replace the photo after editing the lights?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use Replace Photo after an image is loaded. The new photo is loaded locally and the current light setup is kept, so you can test the same lighting preset or custom lights on another image.' } },
    { '@type': 'Question', name: 'Can I export the relit photo?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. After adding lights and choosing a preset, click Download to export the final relit photo as PNG, JPEG, or WebP. The before/after divider is only for preview and is not included in the export.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Relight Photo',
  url: 'https://webdevpuneet.com/relight-photo/',
  image: OG_IMAGE,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and Canvas support',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based photo relighting tool with draggable lights, presets, before/after preview, and local export.',
  featureList: ['Local image upload', 'Replace photo without losing the current lighting setup', 'Draggable light sources', 'Studio, neon, sunset, product, and dramatic presets', 'Ambient brightness control', 'Vignette shadow control', 'Per-light color, intensity, and radius controls', 'Draggable before/after preview divider', 'PNG, JPEG, and WebP export'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Relight Photo', item: 'https://webdevpuneet.com/relight-photo/' },
  ],
};

const SEO = {
  slug: 'relight-photo',
  title: 'Relight Photo Online - Add Studio, Neon, Sunset and Product Lighting',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload a photo', text: 'Drop a JPEG, PNG, WebP, or screenshot into the tool. The image is decoded in your browser and never uploaded.' },
      { title: 'Choose a lighting preset', text: 'Start from Studio, Neon, Sunset, Product, or Dramatic. Each preset sets ambient brightness, shadow strength, light color, and light position.' },
      { title: 'Drag lights on the image', text: 'Drag directly on the canvas to move the selected light. Click a light marker to select it, then adjust its color, intensity, and radius from the side panel.' },
      { title: 'Tune the scene', text: 'Use Ambient to darken or brighten the base photo, and Vignette to add darker edges around the image for a more focused lighting effect.' },
      { title: 'Preview before and after', text: 'Use the Before / After button to split the preview between the original photo and the relit result. Drag the divider left or right to inspect details.' },
      { title: 'Replace the photo if needed', text: 'Click Replace Photo to load another image while keeping your current lighting setup. This is useful when testing the same studio, neon, or product lighting style across multiple photos.' },
      { title: 'Download the final image', text: 'Choose PNG, JPEG, or WebP, set quality for lossy formats, and download the relit photo. The export contains the final relit image, not the comparison divider.' },
    ],
  },
  about: {
    title: 'Add Creative Lighting to Photos Without Uploading Them',
    description: `You have a photo that looks flat, under-lit, or too plain for a thumbnail, product listing, blog post, or social graphic. Relight Photo gives you a fast way to add creative lighting without opening a heavy photo editor. Upload a photo, place soft light sources over the image, pick colors, adjust intensity, and export the result without sending the image to a server.

The tool uses Canvas blending to simulate light. Each draggable light creates a soft radial glow blended with the image, while ambient dimming and vignette controls help shape the mood. Use a warm key light for portraits, cyan and pink lights for a neon look, a large orange sunset light for outdoor edits, or a clean top light for product photos. Because every light is movable, you can quickly try top-left, side, rim, and backlight-style compositions before exporting.

Use **Before / After** to compare the original against the relit result, then drag the comparison divider to inspect faces, product edges, backgrounds, and color shifts. If you want to test the same lighting on another image, click **Replace Photo**. The new image loads locally and the current light setup remains in place, which is useful for repeated product shots, profile images, or a consistent thumbnail style.

Each light is drawn as a radial gradient with three color stops — full intensity at the center, fading through a mid stop, down to fully transparent at the edge — composited with Canvas's \`screen\` blend mode rather than a normal overlay. Screen mode can only ever brighten what's underneath, never darken it, which mirrors how real light behaves: adding a second lamp to a room never makes anything darker, and the same constraint keeps overlapping lights from producing muddy or oversaturated patches where their glows meet. Ambient dimming works the opposite way, in \`multiply\` mode with a near-black fill — multiply can only darken, so it is the correct blend for "less overall light" the same way screen is correct for "more light in one spot." The vignette control is a separate multiply pass with its own radial gradient, shaped so the center of the frame is left untouched and only the edges darken, which is what gives a relit photo the falloff of a real lens rather than a flat brightness slider. The before/after comparison isn't a CSS clip-path trick over one canvas — it renders the unlit and relit versions onto two separate offscreen canvases, then clips and draws the relit one on top of the original at exactly the divider position, so dragging the handle is really swapping in a differently-clipped second frame every time.

This is intentionally local-first. It does not require an account, cloud API, or GPU server. It also does not claim to reconstruct real scene depth like a depth-aware AI relighting system. For many web, social, blog, and product-image use cases, fast creative relighting is enough: improve a flat image, create a dramatic thumbnail, add a colored glow, test lighting direction, or prepare an image before using [Image Editor](/image-editor) for cropping and resizing or [Image Compressor](/image-compressor) for final file-size reduction.`,
  },
  features: [
    'Local image upload - photo data stays in the browser',
    'Replace Photo button - load a new image while keeping the current light setup',
    'Draggable light markers on the canvas',
    'Preset lighting setups: Studio, Neon, Sunset, Product, Dramatic',
    'Add up to five custom lights',
    'Per-light color picker, intensity slider, and radius slider',
    'Ambient brightness control for global scene mood',
    'Vignette shadow control for darker edges',
    'Before/after split preview with draggable divider',
    'Export as PNG, JPEG, or WebP',
  ],
  useCases: [
    { icon: '◐', title: 'Add a studio key light to a portrait', desc: 'Place a warm key light near the face, add a cooler fill light from the opposite side, and reduce ambient brightness for a focused portrait look. Use the before/after divider to check whether skin tones still look natural.' },
    { icon: '✦', title: 'Create neon thumbnail lighting', desc: 'Use cyan and pink lights on opposite sides to give screenshots, profile images, or thumbnails a colorful neon edge. This works well for YouTube thumbnails, profile images, and launch graphics. Cut the subject out first with the [image background remover](/image-background-remover).' },
    { icon: '☀', title: 'Fake a sunset glow', desc: 'Use the Sunset preset to add a large warm light from one corner with a subtle cool fill on the other side. Increase vignette when the background feels too bright.' },
    { icon: '▣', title: 'Improve simple product photos', desc: 'Use Product mode for a cleaner top light and small rim light that helps objects stand out from the background. Replace the photo to test the same lighting across multiple product shots.' },
    { icon: '▤', title: 'Prepare images for blog and social cards', desc: 'Relight a flat image, download it, then use the Image Editor to crop to 1200x630 or 1080x1080. Compress the final export before uploading to your CMS.' },
    { icon: '◌', title: 'Test color mood before doing detailed editing', desc: 'Quickly try warm, cool, magenta, cyan, or dramatic lighting directions before committing to a more advanced edit in design software.' },
  ],
  faqs: [
    { q: 'Does this tool upload my photo?', a: 'No. Your image is loaded into browser memory and processed with Canvas. The final export is created locally.' },
    { q: 'Is this the same as depth-aware AI relighting?', a: 'No. This is a fast creative lighting editor. It uses draggable light masks and blend modes, not a cloud AI model or 3D normal map.' },
    { q: 'How do I replace the photo?', a: 'After a photo is loaded, click Replace Photo in the header and choose another image. The new photo replaces the current image, but your current lights, ambient setting, vignette, and export format stay in place.' },
    { q: 'How many lights can I add?', a: 'You can add up to five lights. Each light has its own color, intensity, radius, and position.' },
    { q: 'Which export formats are supported?', a: 'You can download PNG, JPEG, or WebP. JPEG and WebP include a quality slider.' },
    { q: 'Can I compare the original and edited image?', a: 'Yes. The Before / After button shows a split preview, and the divider can be dragged left or right. The divider is only for preview and does not appear in the downloaded file.' },
    { q: 'What is the best workflow for web images?', a: 'Relight the photo first, export the result, crop or resize it with Image Editor, then reduce file size with Image Compressor before uploading to a website or CMS.' },
  ],
  links: [
    { href: '/image-editor', label: 'Image Editor - resize, crop, rotate, compress, and convert images' },
    { href: '/image-compressor', label: 'Image Compressor - reduce JPEG, PNG, and WebP file size locally' },
    { href: 'https://webdevpuneet.com/css-filter-generator/', label: 'CSS Filter Generator - create brightness, contrast, blur, and drop-shadow filters' },
    { href: '/og-image-generator', label: 'OG Image Generator - create 1200x630 images for social sharing' },
  ],
};

export default function RelightPhotoPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><RelightPhotoTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
