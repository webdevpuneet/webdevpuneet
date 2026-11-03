import QrCodeGeneratorTool from '@/components/QrCodeGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: "QR Code Generator: Custom Colours, Logo, PNG and SVG",
  description: "Make custom QR codes for URLs, Wi-Fi, vCards and more. Choose dot styles, colours, gradients and a logo, then download as PNG or SVG. Free, no sign-up needed.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/qr-code-generator/' },
  icons: { icon: '/icons/qr-code-generator.svg', shortcut: '/icons/qr-code-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/qr-code-generator/',
    siteName: 'webdevpuneet.com',
    title: 'QR Code Generator — Custom Styles, Logo, PNG & SVG',
    description: 'Generate beautiful QR codes with custom dot styles, colors, gradients, and logo. 7 QR types. Download PNG or SVG. 100% free, no signup.',
    images: [{ url: 'https://webdevpuneet.com/images/qr-code-generator.png', width: 1200, height: 630, alt: 'QR Code Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'QR Code Generator — Custom Styles, Logo Embed, PNG & SVG',
    description: '7 QR types, 6 dot styles, gradient colors, logo upload. Download at any size. Free & browser-based.',
    images: ['https://webdevpuneet.com/images/qr-code-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a QR code and how does it work?',
      acceptedAnswer: { '@type': 'Answer', text: 'A QR (Quick Response) code is a two-dimensional barcode that encodes data — a URL, text, contact card, or WiFi credentials — as a matrix of black and white squares. A smartphone camera or QR reader app decodes it by reading the pattern of squares, which represent binary data. QR codes include three distinctive square "finder patterns" in the corners so scanners can detect their orientation regardless of angle. They also contain error correction data, allowing them to be read even when partially damaged or obscured.' },
    },
    {
      '@type': 'Question',
      name: 'What is error correction level and which should I choose?',
      acceptedAnswer: { '@type': 'Answer', text: 'Error correction encodes redundant data so a QR code can be read even if part of it is damaged or covered. There are four levels: L (7% recovery), M (15%), Q (25%), and H (30%). Use H if you are embedding a logo (which covers part of the code) — the extra redundancy compensates for the hidden pixels. Use L or M for simple URL codes with no logo to keep the QR code smaller and less dense. This tool defaults to H for maximum reliability.' },
    },
    {
      '@type': 'Question',
      name: 'Can I add a logo to my QR code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Upload any PNG, JPG, or SVG image as a logo in the Logo section. The logo is embedded at the center of the QR code. QR codes with logos require H error correction (30% recovery) to remain scannable, which this tool sets automatically. Keep the logo size at 25–30% of the QR code area for the best balance of visibility and scannability. The tool shows a live preview so you can verify it scans correctly.' },
    },
    {
      '@type': 'Question',
      name: 'What QR code types does this tool support?',
      acceptedAnswer: { '@type': 'Answer', text: 'Seven types: URL (web link that opens in a browser), Text (any plain text), WiFi (SSID, password, encryption — Android/iOS can auto-join the network by scanning), Email (opens a compose window with pre-filled recipient, subject, and body), SMS (opens a compose window with pre-filled number and message), vCard (contact card with name, phone, email, website, and organization), and Phone (initiates a phone call).' },
    },
    {
      '@type': 'Question',
      name: 'What download formats are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'PNG and SVG. PNG is a raster image — best for printing at a specific size. Choose the export size (256px to 2048px) before downloading. SVG is a vector format — infinitely scalable without quality loss, ideal for print materials, business cards, and merchandise. SVG files can also be edited in Illustrator, Figma, or Inkscape. Both formats are generated at full quality in your browser with no watermark.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a WiFi QR code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the WiFi tab in the header. Enter your network SSID (the network name), the password, and select the encryption type (WPA/WPA2 for most modern routers, WEP for older routers, or None for open networks). Toggle "Hidden" if your network is not broadcast. The QR code will contain the WiFi credentials — when someone scans it with their phone, it will offer to join the network automatically without typing a password.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use custom colors and gradients?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. In the Colors section, pick any foreground (dot) and background color using the color pickers. Enable "Gradient on dots" to apply a two-color linear or radial gradient across all the dots — this creates a modern, colorful QR code. Important: always ensure sufficient contrast between the dot color and background so scanners can read it. Dark dots on a white or light background is the most reliable combination.' },
    },
    {
      '@type': 'Question',
      name: 'What dot styles are available?',
      acceptedAnswer: { '@type': 'Answer', text: 'Six dot styles: Square (classic, most compatible), Dots (circular dots — modern and clean), Rounded (slightly rounded squares), Soft (extra-rounded, squircle-like), Classy (small squares with gaps between each dot), and Classy+ (classy with rounded corners). The Eye Style section lets you independently customize the outer finder pattern frame (Square, Round, or Circle) and the inner dot (Square or Dot).' },
    },
    {
      '@type': 'Question',
      name: 'Is this QR code generator completely free?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — completely free with no limits, no watermark, no login, and no subscription. All processing happens in your browser — nothing is uploaded to a server. You can generate unlimited QR codes and download them at any size (up to 2048×2048px) for free.' },
    },
    {
      '@type': 'Question',
      name: 'Do QR codes expire?',
      acceptedAnswer: { '@type': 'Answer', text: 'Static QR codes (generated by this tool) never expire. The data is encoded directly into the pattern of squares — there is no server involved that could go offline. However, if the URL you encoded changes or the website goes down, scanning the code will lead to a broken destination. The QR code itself will still scan and decode correctly; it just points to the original URL you entered.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'QR Code Generator',
  url: 'https://webdevpuneet.com/qr-code-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free QR code generator with 7 QR types, 6 dot styles, gradient colors, logo upload, eye customization, and PNG/SVG download up to 2048px.',
  featureList: [
    '7 QR code types: URL, Text, WiFi, Email, SMS, vCard, Phone',
    '6 dot styles: Square, Dots, Rounded, Soft, Classy, Classy+',
    'Independent eye customization: outer frame and inner dot styles',
    'Custom foreground and background colors with color picker',
    'Gradient dots with linear or radial gradient and two-color selection',
    'Logo/image upload with size control (10–40% of QR area)',
    'Error correction levels: L, M, Q, H',
    'Margin/quiet zone control',
    'Export PNG and SVG at up to 2048×2048px',
    '100% browser-based — no server, no watermark, no signup',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'QR Code Generator', item: 'https://webdevpuneet.com/qr-code-generator/' },
  ],
};

const SEO = {
  slug: 'qr-code-generator',
  title: 'QR Code Generator — Free Custom Styles, Logo & SVG Download',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Select the QR code type', text: 'Choose from the tabs at the top — URL, Text, WiFi, Email, SMS, vCard, or Phone. Fill in the content fields that appear. The QR code preview updates live as you type.' },
      { title: 'Customize the dot and eye styles', text: 'Pick a Dot Style — Square for the classic look, Dots for circular modules, Rounded, Soft, Classy, or Classy+. Use the Eye Style section to independently set the outer finder pattern frame and the inner dot shape for a distinctive look.' },
      { title: 'Set colors and gradient', text: 'In the Colors section, choose any foreground and background color using the color pickers. Enable "Gradient on dots" to apply a two-color linear or radial gradient across all modules for a modern branded look.' },
      { title: 'Upload a logo (optional)', text: 'Click "Upload logo" in the Logo section and choose a PNG, JPG, or SVG image. Adjust its size with the slider — keep it at 25–30% of the QR area for best scannability. Set Error Correction to H when using a logo for 30% data recovery.' },
      { title: 'Set margin and export size, then download', text: 'Use the Margin slider to control the quiet zone around the code. Set the Export Size slider to your desired resolution (up to 2048px). Click Download PNG for a raster image or Download SVG for an infinitely scalable vector file ideal for print.' },
    ],
  },
  about: {
    title: 'Generate a Custom QR Code — With Your Logo, Brand Colors, and SVG for Print',
    description: `You need a QR code for a business card, a restaurant menu, a product package, or a WiFi sign — but the free generators online only output a plain black-and-white square. This tool generates fully customized QR codes in your browser: pick dot styles, set brand colors, add a gradient, upload your logo, and download as SVG for print — no account, no watermark, no upload to any server.\n\nSeven content types cover the most common QR use cases. **URL** opens any web address on a phone browser — the most common type for marketing and packaging. **WiFi** encodes your network SSID and password so guests join with a single scan, no typing required — scan it with an iPhone or Android and it offers to auto-join the network. **vCard** embeds a digital business card with name, phone, email, and company that adds directly to the contact list on scan. **Email**, **SMS**, and **Phone** pre-fill compose windows or dialers to drive responses from print materials. **Text** encodes any plain string.\n\nFor visual customization, six dot styles replace the standard square modules with circular dots, rounded squares, soft squircles, or classy patterns with spacing. The eye style section lets you independently customize the outer finder pattern frame and the inner dot — mixing styles like square outer with circle inner creates a distinctive look that stays scannable. Add any foreground and background color, or enable gradient mode for a two-color linear or radial gradient across all dots.\n\nTo embed a logo, upload any PNG, JPG, or SVG image — the tool automatically sets H error correction (30% data recovery) to keep the code scannable with part of the pattern covered. Download as PNG up to 2048×2048px or as SVG for infinite-resolution print output. Static QR codes generated here never expire — the data is permanently encoded in the pattern with no server dependency.`,
  },
  features: [
    '7 QR code types: URL, Text, WiFi (auto-join), Email, SMS, vCard contact card, Phone call',
    '6 dot styles: Square, Dots (circles), Rounded, Soft (squircle), Classy, Classy+',
    'Independent eye (finder pattern) customization — outer frame and inner dot shapes',
    'Full color control: custom foreground and background colors with color pickers — explore palette ideas with our [Color Palette Generator](/color-palette-generator)',
    'Gradient dots — linear or radial two-color gradient across all modules; build a matching gradient for your page with our [Gradient Generator](/gradient-generator)',
    'Logo/image upload with adjustable size (10–40% of QR code area); convert your logo to Base64 first with our [Image to Base64](/image-to-base64) tool if needed',
    'Error correction levels L/M/Q/H — use H for logo-embedded codes',
    'Margin/quiet zone slider for print-ready spacing',
    'Download PNG up to 2048×2048px or SVG for infinite scalability',
    '100% browser-based — no server upload, no watermark, no account needed',
  ],
  useCases: [
    { icon: '◉', title: 'Create a branded QR code for a business card or brochure', desc: 'Customize dot style, colors, and logo, then download as SVG for print-quality output at any size. Matches your brand identity instead of the generic black-and-white default. Use our [Color Picker](/color-picker) to nail your exact brand hex codes before applying them to the QR design.' },
    { icon: '▤', title: 'Generate a WiFi QR code so guests can join without a password', desc: 'Enter your SSID, password, and encryption type. When guests scan it with an iPhone or Android, the phone offers to join the network automatically — ideal for cafes, offices, and hotels. Generate the network password first with our [Password Generator](/password-generator) for a strong, random WiFi credential.' },
    { icon: '⚡', title: 'Create a digital business card that adds a contact on scan', desc: 'Fill in name, phone, email, website, and company in the vCard tab. One scan adds the contact directly to the phone\'s address book — more reliable than sharing a paper card.' },
    { icon: '▦', title: 'Add a QR code to product packaging or labels', desc: 'Link to specs, manuals, warranty registration, or a landing page. Download as SVG for your print vendor — scales to any physical size without quality loss. If you need to shorten or encode the target URL first, use our [URL Encoder/Decoder](https://fwdtools.com/url-encoder-decoder/).' },
    { icon: '◑', title: 'Link a flyer or poster to an event registration page', desc: 'Embed your event logo in the QR code center for a branded look. Use H error correction to keep it scannable despite the logo coverage, then download PNG at 1024px+ for printing. Use our [Image Compressor](/image-compressor) to reduce the logo file size before uploading.' },
    { icon: '⇄', title: 'Pre-fill an email or SMS from a print piece', desc: 'Use the Email or SMS tab to encode a pre-filled compose window. Great for feedback surveys, promo responses, and support contacts on packaging or brochures.' },
  ],
  faqs: [
    { q: 'How do I create a QR code for a URL or website link?', a: 'Select the URL tab, type or paste your web address, and the QR code generates instantly in the preview. Customize colors, dot style, and logo, then download as PNG or SVG. No sign-up or account required.' },
    { q: 'How do I make a WiFi QR code so guests can join without a password?', a: 'Select the WiFi tab, enter your network name (SSID), password, and encryption type (WPA/WPA2 for most modern routers). When someone scans the QR code with an iPhone or Android, the phone prompts them to join the network automatically without typing the password.' },
    { q: 'Can I add my logo to the QR code?', a: 'Yes. Click Upload logo in the Logo section and choose any PNG, JPG, or SVG image. Keep the logo size at 25–30% of the QR code area for the best balance of visibility and scannability. The tool automatically uses H error correction (30% data recovery) to compensate for the pixels the logo covers.' },
    { q: 'What is error correction and which level should I choose?', a: 'Error correction encodes redundant data so a QR code stays readable even when part of it is damaged or covered. Level H (30% recovery) is required when embedding a logo. Level L or M is better for plain URL codes with no logo — lower redundancy means a less dense pattern that\'s easier to scan.' },
    { q: 'How do I download a QR code for printing?', a: 'Click Download SVG for a vector file that scales to any physical print size without quality loss — the best choice for business cards, packaging, and large-format printing. For PNG, set the Export Size to 1024px or 2048px before downloading for high-resolution output.' },
    { q: 'Do QR codes generated here expire?', a: 'No. Static QR codes never expire — the data is permanently encoded in the pattern of squares with no server dependency. If the URL you encoded goes offline or changes, the QR code itself still scans and decodes correctly; it just points to the original destination you entered.' },
    { q: 'Can I use custom colors and gradients on my QR code?', a: 'Yes. Pick any dot color and background color using the color pickers. Enable Gradient on dots to apply a two-color linear or radial gradient across all modules. Keep sufficient contrast between the dots and background — dark dots on a light background is the most reliable combination for all scanners.' },
    { q: 'Is this QR code generator free with no watermark?', a: 'Yes — completely free with no watermark, no usage limit, no login, and no sign-up. All processing runs in your browser. No QR code data is sent to any server.' },
  ],
};

export default function QrCodeGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><QrCodeGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
