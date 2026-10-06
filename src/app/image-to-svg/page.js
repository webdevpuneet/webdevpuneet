import ImageToSvgTool from '@/components/ImageToSvgTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Image to SVG Converter Online — PNG, JPG, WebP to Vector Free | webdevpuneet.com',
  description: 'Convert PNG, JPG, WebP, GIF, or BMP to SVG vector graphics in your browser. Color, grayscale, and B&W tracing with live preview. Free, 100% client-side.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-to-svg/' },
  icons: { icon: '/icons/image-to-svg.svg', shortcut: '/icons/image-to-svg.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-to-svg/',
    siteName: 'webdevpuneet.com',
    title: 'Image to SVG Converter — PNG, JPG, WebP to Vector Free',
    description: 'Upload any raster image and get a clean SVG vector with full control: source blur, stroke width, corner snap, noise filter, output softness, sharpen, and drop shadow. Before/after compare slider. No upload, no server.',
    images: [{ url: 'https://webdevpuneet.com/images/image-to-svg.png', width: 1200, height: 630, alt: 'Image to SVG Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image to SVG Converter — Free Online PNG/JPG Vectorizer',
    description: 'Convert images to SVG with pre-trace blur, stroke, noise filter, corner snap, plus output softness, sharpen and drop shadow effects. Compare slider. Free & browser-only.',
    images: ['https://webdevpuneet.com/images/image-to-svg.png'],
  },
};

const seoData = {
  slug: 'image-to-svg',
  title: 'Image to SVG Converter — Free, Vectorize PNG, JPG & WebP with Advanced Editing Controls',

  about: {
    title: 'Vectorize Any PNG or JPEG to SVG in Your Browser — Logo, Icon, Sketch, Illustration Presets',
    description: `You have a PNG logo and need a scalable SVG — or you want to trace a scanned sketch into clean vector paths without paying for Illustrator or uploading files to a third-party service. Upload here and get a clean SVG with a before/after comparison. Everything runs in your browser via imagetracerjs; your image never leaves your device.\n\nThe tracing engine reads the source into an HTML Canvas \`ImageData\` buffer (downscaling anything wider than 1200px first to keep processing fast), quantizes the pixels into a limited color palette, walks the resulting color-region boundaries, and fits smooth Bézier curves to generate path data. Grayscale mode converts every pixel to its luminance value before tracing; Black & White mode thresholds that same luminance calculation against a single cutoff you control, so a pixel becomes pure black or pure white with nothing in between. You control **Color, Grayscale, or Black & White** mode, color count (2–32), smoothing, and detail level. Four Quick Presets — **Logo** (8 colors, corner snap on), **Icon** (4 colors, maximum smoothing), **Sketch** (B&W, threshold-based), **Illustration** (24 colors, source blur 1) — configure everything at once for the most common use cases.\n\nTwo control groups give you precise output quality. **Pre-Trace controls** modify the source pixel data before any path is drawn, so changing them re-runs the trace from scratch: Source Blur smooths JPEG compression artifacts and scanner noise before tracing so the algorithm sees fewer, more organic curves instead of jagged pixel edges; Stroke Width adds outlines to every path for an illustrated style; Line Noise Filter suppresses single-pixel speckles that would otherwise trace as hundreds of tiny disconnected shapes; and Corner Snap detects near-90° corners and forces them to exact right angles, which matters for logo and UI geometry. **SVG Effects**, by contrast, are post-processing filters injected directly into the output markup without re-tracing anything: Output Softness adds a \`feGaussianBlur\`, Sharpen adds a \`feConvolveMatrix\` edge-enhancement kernel, and Drop Shadow adds a \`feDropShadow\` with adjustable blur and X/Y offset — all wrapped in a single filtered group so the effects are baked into the downloaded SVG and travel with the file wherever it's opened, in Figma, Illustrator, or a browser.`,
  },

  features: [
    'Client-side vectorization using imagetracerjs — no file upload, no server, images stay on your device; compress the source first with our [Image Compressor](/image-compressor/)',
    '3 color modes: full Color (2–32 colors), Grayscale (luminance-based), Black & White (threshold + smoothing)',
    'Pre-trace controls: Source Blur (0–5) smooths JPEG noise before tracing; Stroke Width (0–5px) adds outlines; Line Noise Filter removes speckle artifacts; Corner Snap forces exact right angles',
    'SVG Effects embedded in the downloaded file: Output Softness feGaussianBlur, Sharpen feConvolveMatrix, Drop Shadow feDropShadow with adjustable blur and offset',
    '4 Quick Presets — Logo (8 colors, corner snap), Icon (4 colors, max smoothing), Sketch (B&W), Illustration (24 colors, source blur) — one-click optimal settings',
    'Before/after Compare slider — drag a divider to compare the original raster and the traced SVG side by side',
    'Preview background toggle: checkerboard, white, black, or transparent — evaluate transparency on any background',
    'SVG Code tab — inspect and copy raw SVG markup; animate the result with our [SVG Animation Generator](/svg-animation-generator)',
    'Download SVG and Copy SVG Code — effects fully baked into the downloaded file',
    '100% browser-based — Ctrl+V clipboard paste supported; works offline after page load',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Upload your image', text: 'Drag your image onto the drop zone, click to open a file picker, or press Ctrl+V to paste from clipboard. PNG, JPEG, WebP, GIF, and BMP are supported up to 10 MB. Images wider than 1200px are automatically downscaled before tracing to keep processing fast. Tracing begins automatically as soon as the image loads.' },
      { title: 'Apply a Quick Preset', text: 'Start with a preset before touching any individual slider. Click **Logo** for a clean 8-color smooth trace with corner snap on — best for brand logos with flat colors. Click **Icon** for an ultra-smooth 4-color result. Click **Sketch** for high-contrast black and white line art from drawings and sketches. Click **Illustration** for a detailed 24-color trace with source blur 1 for richer artwork. Each preset sets all tracing parameters at once. You can fine-tune any slider afterwards.' },
      { title: 'Choose your color mode and adjust tracing controls', text: 'Select **Color** mode for logos and illustrations with distinct flat areas, then drag the Colors slider (2–32 colors) to match your brand palette. Select **Grayscale** for monochrome artwork with tonal depth. Select **B & W** for ink drawings and single-color logos, then use the Threshold slider (0–255) to control which luminance values become black versus white. Adjust Smoothing toward "Smooth" for fewer anchor points and cleaner curves, or toward "Sharp" for precise fine lines. Adjust Detail toward "Simplified" to remove compression artifacts, or toward "Max detail" to capture every stroke.' },
      { title: 'Configure Pre-Trace controls', text: 'Pre-Trace controls modify the source image before any path is drawn and trigger a full re-trace when changed. Enable **Source Blur** (0–5) to smooth JPEG noise and halftone patterns before tracing — this produces organically curved paths with fewer anchor points. Increase **Stroke Width** (0–5px) to add outline strokes to every traced path for an illustrated style. Toggle **Line Noise Filter** on to automatically remove single-pixel speckle artifacts from JPEG compression or scanner noise. Toggle **Corner Snap** on to force near-90° angles to exact right angles — critical for logos and UI graphics.' },
      { title: 'Apply SVG Effects (instant, no re-trace)', text: 'SVG Effects inject filter elements into the output SVG without re-tracing — they update instantly. Use **Output Softness** (0–8) to add a feGaussianBlur for a smooth glow or soft-focus aesthetic. Enable **Sharpen** to apply a feConvolveMatrix edge-enhancement kernel. Enable **Drop Shadow** and adjust its Blur, X offset, and Y offset sub-sliders to add a feDropShadow. All effects are fully embedded in the downloaded SVG file.' },
      { title: 'Compare, then download or copy', text: 'Switch to the **Compare** tab to drag a split-slider across the canvas and compare the original image against the traced SVG side by side. Toggle the background between Checker, White, Black, and None to evaluate transparency and edge quality. When satisfied, click **Download SVG** to save the file with all effects baked in, or **Copy SVG** to paste the markup directly into HTML, Figma, Inkscape, or a React component.' },
    ],
  },

  useCases: [
    {
      icon: '◑',
      title: 'Convert a PNG logo to SVG so it stays sharp on retina displays and in print',
      desc: 'Use the Logo preset — 8 colors, corner snap on, line noise filter on. Source Blur at 1–2 smooths JPEG compression artifacts without blurring letter forms. The result is a clean vector that scales perfectly from a favicon to a billboard.',
    },
    {
      icon: '✏',
      title: 'Trace a scanned sketch or ink drawing into clean vector line art',
      desc: 'Use the Sketch preset with B&W mode and adjust the Threshold slider to control which tones become black lines versus white space. Enable Line Noise Filter to strip scan noise. Use the Compare slider to verify line quality before downloading.',
    },
    {
      icon: '△',
      title: 'Vectorize an illustration or icon for use in HTML and React',
      desc: 'Use the Icon preset for ultra-smooth 4-color shapes. Add Stroke Width 1–2px for an outlined style. Enable Drop Shadow with a small offset for a baked-in depth effect. Copy the SVG code directly into a React component or paste inline in HTML. Browse ready-made animated icons in our [Animated SVG Icons](/animated-svg-icons) library.',
    },
    {
      icon: '✦',
      title: 'Create a stylized, soft-focus decorative SVG from a photo or texture',
      desc: 'Apply the Illustration preset at 24 colors with Source Blur 2–3 and Output Softness 4–6 for a dreamy watercolor look. The feGaussianBlur filter is embedded in the downloaded file, so the effect persists in Figma, Illustrator, and HTML.',
    },
    {
      icon: '⬡',
      title: 'Prepare artwork for large-format printing where rasters pixelate',
      desc: 'Print shops need infinitely scalable vector files — not rasters that blur when scaled up. Use Source Blur 1–2 to suppress compression noise from the source, then download a clean SVG. Acceptable quality for most flat-color artwork and logos.',
    },
    {
      icon: '▦',
      title: 'Reduce SVG complexity for a faster-loading inline icon',
      desc: 'Reduce Colors to 4–8, increase Smoothing toward "Smooth", and enable Line Noise Filter to omit tiny speckle paths. The metadata panel shows the resulting file size. A simple icon can often be traced to under 5 KB for inline use.',
    },
  ],

  faqs: [
    {
      q: 'What types of images convert to SVG best?',
      a: 'Image-to-SVG conversion works best for flat-color graphics with clear defined edges: logos, icons, illustrations, cartoons, line art, clip art, charts, diagrams, and QR codes. These have a limited number of distinct color regions that trace as clean paths. Photographic images with millions of colors produce very large, complex SVG files. For photos, use Black & White mode with high Smoothing and Source Blur to create a stylized graphic rather than a literal trace.',
    },
    {
      q: 'Is my image uploaded to a server?',
      a: 'No. Everything processes entirely inside your browser using JavaScript and the HTML5 Canvas API. Your images are never sent to any server, never stored, and never logged. When you close or refresh the tab, the image and SVG are gone permanently. There are no privacy concerns with sensitive imagery, confidential logos, or internal design files.',
    },
    {
      q: 'What does Source Blur do and when should I use it?',
      a: 'Source Blur applies a Gaussian blur to the pixel data of the source image before any path tracing begins. This reduces high-frequency detail — JPEG compression artifacts, halftone dot patterns, scanner noise, and fine textures — so the tracing algorithm sees smooth color gradients instead of noisy pixel edges. The result is SVG paths with fewer anchor points and more organic, flowing curves. Use Source Blur at 1–2 for JPEG logos and scanned artwork; go higher (3–5) to deliberately abstract and stylize highly detailed images. Because this modifies the input data, it triggers a full re-trace.',
    },
    {
      q: 'What does Stroke Width do?',
      a: 'Stroke Width adds an outline stroke to every traced path in the SVG at the specified pixel width. With Stroke Width at 0 (the default), all paths are filled shapes only — no outlines. Increasing Stroke Width to 1–2px creates a traditional illustrated or cartoon-like look with visible outlines separating color regions. Higher values (3–5px) produce a bold, woodcut-style aesthetic. The stroke color matches each path\'s fill color, so adjacent regions with different colors will appear outlined in their own colors. Because stroke is a tracing parameter, changing it triggers a re-trace.',
    },
    {
      q: 'What does Line Noise Filter do?',
      a: 'Line Noise Filter enables the tracer\'s built-in speckle suppression. When active, it ignores single-pixel isolated regions that typically result from JPEG compression block artifacts, anti-aliased edges, or scan noise. Without it, these speckles trace as hundreds of tiny disconnected paths that inflate file size and create visual noise. Enabling Line Noise Filter keeps the SVG clean and compact without requiring you to manually increase the Detail (path omit) slider. It is automatically enabled in the Logo, Icon, and Illustration presets.',
    },
    {
      q: 'What does Corner Snap do?',
      a: 'Corner Snap (rightangleenhance in the tracing engine) detects path corners that are close to 90 degrees and snaps them to exact right angles. Real-world logos, icons, and UI graphics almost always contain intentionally perpendicular edges — but image compression and anti-aliasing introduce slight deviations from exact 90°. Without Corner Snap, these near-right-angle corners trace as slightly curved or angled paths. With it enabled, they snap to precise geometric corners, producing cleaner, more accurate SVGs for architectural, typographic, and technical graphic content.',
    },
    {
      q: 'What does Output Softness do — and does it affect the downloaded SVG?',
      a: 'Output Softness injects a feGaussianBlur SVG filter element into the SVG code and wraps all paths in a filtered group. The blur is applied to the rendered SVG, not to the path data itself, so the mathematical path shapes remain unchanged. At low values (0.5–2) it subtly blurs jagged micro-edges left by tracing, producing a smoother visual result. At higher values (4–8) it creates a dreamy soft-focus or glow aesthetic. Yes — the filter is fully embedded in the downloaded file, so the effect is preserved everywhere the SVG is used: HTML, CSS background, Figma, Illustrator, or a React component.',
    },
    {
      q: 'How does the Sharpen effect work?',
      a: 'Sharpen injects a feConvolveMatrix SVG filter using a 3×3 sharpening kernel (center weight +5, edge weights −1). This increases contrast along path edges, making the traced shapes appear crisper and more defined — especially useful when the source image was slightly blurry or out of focus. Note that Sharpen and Output Softness can be combined: Sharpen runs first to enhance edges, then Softness blurs the result — which can produce a stylized "soft but defined" look depending on the values used.',
    },
    {
      q: 'How do I use the Drop Shadow effect?',
      a: 'Enable the Drop Shadow toggle to reveal three sub-sliders: Blur controls how soft or hard the shadow edge is (0 = hard drop shadow, 10 = very diffuse). X offset shifts the shadow horizontally (positive = right, negative = left). Y offset shifts the shadow vertically (positive = down, negative = up). The effect uses an SVG feDropShadow filter at 55% opacity, which works on the entire SVG as a unit. It is baked into the downloaded SVG file — paste the code into any HTML page or design tool and the shadow renders automatically.',
    },
    {
      q: 'What are the Quick Presets and what do they change?',
      a: 'Quick Presets are one-click configurations that set all tracing parameters simultaneously for common use cases. Logo sets 8 colors, smoothing 2.5, corner snap on, and line filter on — ideal for brand logos with flat colors and clean geometry. Icon sets 4 colors and smoothing 4 for the cleanest, most simplified vector shapes. Sketch sets Black & White mode, threshold 140, smoothing 0.5, and line filter off — preserving maximum line detail from drawings and sketches. Illustration sets 24 colors, smoothing 1, source blur 1, and line filter on — for rich detailed artwork. After applying a preset you can adjust any individual slider to fine-tune without affecting the others.',
    },
    {
      q: 'How does the Compare slider work?',
      a: 'Clicking the Compare tab reveals a split-view panel with your original raster image on the right and the traced SVG result on the left. A draggable handle sits in the middle — drag it left to reveal more of the SVG result, drag it right to reveal more of the original image. This lets you inspect trace quality region by region: check whether fine details were captured, whether colors are accurate, and whether the effects like softness or drop shadow look right. The background toggle (Checker, White, Black, None) applies to the Compare view as well, so you can check transparency on any background.',
    },
    {
      q: 'Why is the SVG file so large?',
      a: 'SVG size scales with complexity — more color regions and more detail means more path data. To reduce size: lower the Colors slider, increase Smoothing, increase the Detail threshold, enable Line Noise Filter, or choose Black & White mode. Enabling Source Blur before tracing also reduces path complexity significantly because it smooths the pixel data so fewer, simpler curves are needed to trace each region. A logo with 4 flat colors typically produces a 10–50 KB SVG; a photographic image at 32 colors can produce megabytes.',
    },
    {
      q: 'Can I edit the SVG after downloading?',
      a: 'Yes — SVG is an open XML format. Open the downloaded file in Inkscape (free), Adobe Illustrator, Affinity Designer, or Figma. Any embedded SVG filter effects (Output Softness, Sharpen, Drop Shadow) appear as filter elements inside a defs block and can be edited or removed. You can ungroup paths, change fill colors, simplify anchor points, and combine the traced artwork with other design elements. The SVG also works as inline SVG in HTML and can be styled further with CSS.',
    },
    {
      q: 'Does this tool work on mobile browsers?',
      a: 'Yes — the tool runs entirely in the browser and works on modern mobile browsers including Chrome for Android and Safari for iOS. File upload is supported via the file picker. Note that very large images and complex SVG effects may process slowly on mobile due to limited CPU performance; for best mobile results use images under 500 KB and avoid Source Blur values above 2.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image to SVG Converter',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based image vectorizer. Converts PNG, JPEG, WebP, GIF, BMP to SVG with source blur, stroke width, line noise filter, corner snap, output softness, sharpen, and drop shadow effects. Quick presets, before/after compare slider. 100% client-side.',
  featureList: seoData.features.join(', '),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Image to SVG Converter', item: 'https://webdevpuneet.com/image-to-svg/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seoData.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function ImageToSvgPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className={styles.toolSection}><ImageToSvgTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
