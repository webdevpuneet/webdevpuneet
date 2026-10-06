import SvgToPng from '@/components/SvgToPng';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SVG to PNG Converter — Free Online SVG to PNG | webdevpuneet.com',
  description: 'Convert SVG to PNG online — upload a file or paste SVG code, set size and scale up to 4x, pick a background, and download. Free, browser-based.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/svg-to-png/' },
  icons: { icon: '/icons/svg-to-png.svg', shortcut: '/icons/svg-to-png.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/svg-to-png/',
    siteName: 'webdevpuneet.com',
    title: 'SVG to PNG Converter — Free Online SVG to PNG',
    description: 'Convert SVG to PNG instantly. Upload file or paste SVG code. Custom size, 1×–4× scale, transparent or custom background. Download PNG free.',
    images: [{ url: 'https://webdevpuneet.com/images/svg-to-png.png', width: 1200, height: 630, alt: 'SVG to PNG Converter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SVG to PNG Converter — Free Online SVG to PNG',
    description: 'Convert SVG to PNG free. Upload or paste SVG code. Custom size, 1×–4× scale, transparent or custom background. No sign-up.',
    images: ['https://webdevpuneet.com/images/svg-to-png.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert SVG to PNG online for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your SVG file by clicking the drop zone or dragging and dropping it. Alternatively, switch to the "Paste Code" tab and paste your SVG markup directly. The tool automatically detects the SVG\'s native dimensions and converts it immediately. Choose a scale (1×, 2×, 3×, or 4×) and a background (transparent, white, black, or custom color). Click "Download PNG" to save the file, or "Copy Image" to copy it to your clipboard. All conversion happens in your browser — no file is sent to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert SVG to PNG with a transparent background?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select "Transparent" in the Background options (it is the default). When you download the PNG, the areas that were transparent in the SVG will remain transparent in the output file. The checkered pattern in the preview area represents transparency — this is a standard visual convention and does not appear in the actual PNG file. Note that JPEG format does not support transparency — use PNG if you need a transparent background.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does 2× and 4× scale mean for SVG to PNG conversion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The scale multiplier sets the output PNG resolution relative to the SVG\'s native dimensions. If your SVG is 100×100px, 1× produces a 100×100 PNG, 2× produces 200×200, 3× produces 300×300, and 4× produces 400×400. Higher scales are used for: high-DPI/Retina displays (2× is standard for @2x assets), print output (300 DPI typically requires 3×–4× over screen resolution), and social media images that need a minimum pixel size. The output dimensions update automatically when you change the scale — you can also type custom width and height values directly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert SVG code (not a file) to PNG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — switch to the "Paste Code" tab and paste your SVG markup directly into the text area. The SVG is parsed and converted immediately as you type. This is useful when you have SVG code copied from a CSS file, a design tool, an icon library, or generated programmatically. The SVG must start with an <svg> tag and include either a viewBox attribute or explicit width and height attributes so the tool can determine the native dimensions. If neither is present, a default 512×512 canvas is used.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert an SVG icon to a specific PNG size like 512×512 or 1024×1024?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your SVG or paste the SVG code. Then manually enter the desired width and height in the Output size fields. Type "512" in the width field — if aspect ratio lock is on (🔒), the height adjusts automatically to maintain the SVG\'s proportions. For square icons from a square SVG, both dimensions will be 512. Click "Re-convert" to render the PNG at the new size. Common sizes: 512×512 for macOS app icons, 1024×1024 for iOS app store, 192×192 for PWA icons, and 32×32 for favicons. For favicon generation specifically, use our [Favicon Generator](/favicon-generator/).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my SVG look different after converting to PNG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Several factors can cause differences between SVG and PNG rendering: (1) External fonts — SVGs that reference Google Fonts or system fonts by name may use a fallback font in the canvas renderer if the font is not available. Embed fonts as base64 in the SVG or convert text to paths in your design tool before converting. (2) External resources — SVGs that reference external images or CSS files via URLs may not load those resources during browser-based conversion. (3) CSS effects — complex CSS animations, filters, or pseudo-elements may render differently on a canvas. (4) Missing xmlns — the SVG must include xmlns="http://www.w3.org/2000/svg" to be parsed correctly. If differences persist, try converting in a browser that supports the features your SVG uses.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum size I can convert SVG to PNG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool supports output dimensions up to 8192×8192 pixels, set manually in the width and height fields. Practical limits depend on your browser\'s memory — modern browsers can handle 4096×4096 comfortably, 8192×8192 may be slow on low-memory devices. For very large output, consider using 2× scale with a base SVG designed at half the target resolution rather than extreme scale multipliers. The output PNG file size scales with the pixel count — a 4096×4096 PNG is typically 5–15 MB depending on content complexity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this SVG to PNG converter work offline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — once the page is loaded, all conversion runs entirely in your browser using the HTML Canvas API and the browser\'s built-in SVG renderer. No SVG file or code is sent to any server. The tool works offline after the initial page load, making it safe for converting confidential icons, proprietary illustrations, brand assets, and unreleased design files.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG to PNG Converter',
  url: 'https://webdevpuneet.com/svg-to-png/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based SVG to PNG converter. Upload SVG file or paste SVG code. Set scale (1×–4×), custom dimensions, and background color. Download PNG or copy to clipboard instantly.',
  featureList: [
    'Upload SVG file via drag-and-drop or file picker',
    'Paste SVG code directly in the editor',
    'Scale selector — 1×, 2×, 3×, 4× with auto dimension update',
    'Custom width and height with aspect ratio lock',
    'Background options — transparent, white, black, or custom color',
    'Auto-converts on load; Re-convert button for manual refresh',
    'Download PNG — full resolution, no watermark',
    'Copy image to clipboard via Clipboard API',
    'SVG vs PNG file size comparison',
    '100% browser-based — HTML Canvas API, no server, works offline',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SVG to PNG Converter', item: 'https://webdevpuneet.com/svg-to-png/' },
  ],
};

const SEO = {
  slug: 'svg-to-png',
  title: 'SVG to PNG Converter — Free Online SVG to PNG with Custom Size & Transparent Background',

  about: {
    title: 'SVG to PNG Converter — Free, Convert SVG Files and Code to PNG with Custom Size, Scale & Background',
    description: 'Drop an SVG file or paste SVG markup and download a full-resolution PNG in seconds — no account, no watermark, no upload limit. The converter uses the browser\'s native SVG renderer and the HTML Canvas API to produce pixel-perfect output at any resolution.\n\nSVG is a vector format — it scales infinitely without pixelation. PNG is a raster format — it has a fixed pixel grid. This tool bridges the two: it wraps your SVG markup in a Blob, loads that Blob URL into an `Image` object so the browser\'s own SVG engine rasterizes it, draws that image onto an off-screen `<canvas>` sized to your target width and height, then reads the canvas back out with `toBlob(\'image/png\')`. The result is exactly what the browser would render, which means gradients, masks, blend modes, filters, and complex paths all convert correctly — there is no separate SVG-to-raster library involved, just the same renderer your browser already uses to display SVGs on a page.\n\nThe **scale selector** (1×, 2×, 3×, 4×) multiplies the SVG\'s detected native dimensions, which are read from its `width`/`height` attributes or, failing that, its `viewBox`. A 100×100 SVG at 2× produces a 200×200 PNG — the standard `@2x` asset for Retina/HiDPI screens. Use 4× for print-quality output. The **custom size inputs** let you type any target width and height up to 8192×8192, and the **aspect ratio lock** recalculates the other dimension automatically using the SVG\'s original ratio whenever you edit one field.\n\n**Background options** matter because canvas rasterization has no transparency by default unless you leave it alone: **Transparent** skips the fill step entirely so the SVG\'s own alpha channel comes through in the PNG. **White** and **Black** paint a `fillRect` behind the artwork before drawing. **Custom** opens a color picker and hex input for any fill.\n\nThe tool accepts either an uploaded `.svg` file via drag-and-drop, or raw markup pasted into a code editor — handy for SVG copied from CSS, icon libraries, or a design tool export. Conversion re-runs automatically whenever the source changes, and a manual Re-convert button re-renders after you tweak scale, size, or background. Everything happens client-side; no file or markup is ever transmitted to a server.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Load your SVG — file or code', text: 'Drag an SVG file onto the upload area or click it to open a file picker. Alternatively, switch to the Paste Code tab and paste raw SVG markup directly into the text editor — useful for SVG code copied from a CSS file, an icon library, browser DevTools, or a design tool export. The tool automatically parses width, height, and viewBox attributes to detect the SVG\'s native dimensions. Conversion begins immediately as soon as the SVG is loaded.' },
      { title: 'Set the output scale', text: 'Use the scale selector to choose 1×, 2×, 3×, or 4×. The scale multiplies the SVG\'s native dimensions: a 100×100 SVG at 2× produces a 200×200 PNG, and at 4× produces a 400×400 PNG. Use 2× for standard @2x Retina/HiDPI assets. Use 4× for print-quality output at 300 DPI (when your base SVG is designed at 75 DPI screen resolution). The output width and height fields update automatically when you change the scale.' },
      { title: 'Set exact dimensions if needed', text: 'Type precise pixel values directly in the Width and Height input fields to override the scale-calculated dimensions. This is useful for platform-specific sizes: 512×512 for macOS app icons, 1024×1024 for iOS App Store, 192×192 for PWA icons, 1200×630 for OG images, or 32×32 for favicons. Toggle the aspect ratio lock (🔒) to keep proportions when you change one dimension — the other adjusts automatically. For favicon packages across all sizes, use the dedicated [Favicon Generator](/favicon-generator/) instead.' },
      { title: 'Choose a background color', text: 'Select Transparent to preserve SVG transparency in the output PNG — the checkered pattern in the preview represents transparency and does not appear in the downloaded file. Select White or Black to fill the canvas with a solid color before drawing. Select Custom to open a color picker and hex input for any background color — useful when the PNG needs to sit on a specific colored surface and you want the background pre-filled. The PNG preview on the right updates after each change.' },
      { title: 'Download or copy the PNG', text: 'Click Download PNG to save the full-resolution file to your computer — the filename is based on the original SVG filename where available. Click Copy Image to copy the rendered PNG directly to your clipboard via the Clipboard API — paste it into Figma, Sketch, Google Slides, an email, or a chat. The file size comparison strip below the preview shows the SVG source size vs the output PNG size for reference.' },
      { title: 'Re-convert after settings changes', text: 'The tool converts automatically when you load a new SVG. If you change dimensions, scale, or background color after the initial load, click Re-convert to render a fresh PNG at the new settings. This manual trigger prevents excessive rendering when you are typing in the dimension fields. All conversion runs entirely in your browser using the HTML Canvas API — no SVG or PNG data is sent to any server.' },
    ],
  },

  features: [
    'Upload SVG via drag-and-drop or file picker — auto-detects native width and height from SVG width/height/viewBox attributes',
    'Paste SVG code — switch to code tab and paste raw SVG markup for inline SVGs, icon library code, and programmatically generated vectors',
    'Scale selector — 1×, 2×, 3×, 4× multiplies native SVG dimensions; 2× for @2x Retina assets, 4× for print-quality output',
    'Custom dimensions — type exact pixel values up to 8192×8192; aspect ratio lock keeps proportions when changing one dimension',
    'Background options — Transparent (preserves SVG alpha), White, Black, or Custom color with color picker and hex input',
    'Auto-convert on load — PNG renders immediately; Re-convert button for manual refresh after settings change',
    'Download PNG — full resolution, no watermark, filename based on original SVG file name',
    'Copy image to clipboard — one-click via Clipboard API; file size comparison shows SVG source vs output PNG size',
    '100% browser-based — HTML Canvas API + browser SVG renderer; no files sent to server; works offline after page load',
  ],

  useCases: [
    {
      icon: '◉',
      title: 'Convert SVG icons to PNG for app development',
      desc: 'Export SVG icons at multiple resolutions for iOS and Android apps. Use 2× for xhdpi/Retina assets, 4× for xxxhdpi. Type exact target sizes (192×192 for PWA, 1024×1024 for iOS App Store) in the custom dimension fields. For favicon packages across all sizes, use our dedicated [Favicon Generator](/favicon-generator/).',
    },
    {
      icon: '▦',
      title: 'Convert SVG logo to PNG for platforms that don\'t support SVG',
      desc: 'WordPress, Shopify, Facebook, Twitter, and LinkedIn all require raster images. Upload your SVG logo, set the target size, choose transparent or white background, and download. For email signatures: 200–300px wide with a white background. For social media profiles: 400×400 with transparent background.',
    },
    {
      icon: '◑',
      title: 'Convert SVG illustrations to high-resolution PNG for print',
      desc: 'Print production requires 300 DPI minimum. For a 4" × 4" area at 300 DPI, enter 1200 in the width field — aspect ratio lock adjusts height automatically. For full-bleed A4 (210mm × 297mm at 300 DPI), type 2480×3508 directly. SVG\'s vector nature means conversion at any size produces sharp, clean edges.',
    },
    {
      icon: '△',
      title: 'Generate Open Graph images from SVG templates',
      desc: 'Design OG images as SVG templates in Figma or Inkscape, then convert to the 1200×630 PNG required for og:image meta tags. Enter 1200 width and 630 height in the custom dimension fields. Use the [OG Image Generator](/og-image-generator/) to build OG images from scratch without an existing SVG.',
    },
    {
      icon: '⚡',
      title: 'Extract PNG from inline SVG or CSS SVG code',
      desc: 'Copy SVG markup embedded in CSS data URIs or HTML, switch to Paste Code, and paste directly. The tool renders the SVG at your specified size and exports to PNG — useful for SVG sprites, CSS-generated icons, or elements inspected from a website with browser DevTools. Pair with our [Image to SVG](/image-to-svg) tool for the reverse conversion.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function SvgToPngPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SvgToPng /></div>
      <AdSlot />
      <IndexOnly><SeoSection heading="Free SVG to PNG Converter — Custom Size, Scale & Transparent Background" {...SEO} /></IndexOnly>

    </div>
  );
}
