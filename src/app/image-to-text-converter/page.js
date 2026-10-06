import ImageToTextTool from '@/components/ImageToTextTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Image to Text Converter — Free Online OCR, 16 Languages',
  description: 'Extract text from images with free online OCR. Paste, upload or drop a JPEG, PNG or WebP and get editable text in 16 languages. 100% private, nothing uploaded.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/image-to-text-converter/' },
  icons: { icon: '/icons/image-to-text-converter.svg', shortcut: '/icons/image-to-text-converter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/image-to-text-converter/',
    siteName: 'webdevpuneet.com',
    title: 'Image to Text Converter — Free Online OCR Tool',
    description: 'Extract text from any image in your browser. Upload a photo, screenshot, or scanned document and get editable text instantly. 16 languages, no sign-up, 100% private.',
    images: [{ url: 'https://webdevpuneet.com/images/image-to-text-converter.png', width: 1200, height: 630, alt: 'Image to Text Converter — Free Online OCR' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Image to Text Converter — Free Online OCR Tool',
    description: 'Extract text from any image in seconds. Paste, upload or drop a JPEG, PNG or WebP. 16 languages, 100% private, no sign-up.',
    images: ['https://webdevpuneet.com/images/image-to-text-converter.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does this image to text converter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool uses Tesseract.js — a WebAssembly build of Google\'s open-source Tesseract OCR engine — to analyse your image entirely inside your browser. When you click "Extract Text", the engine loads once (cached for future use), scans the image pixel by pixel, identifies character shapes, and outputs the recognised text. No image data is ever sent to any server. The entire process runs locally in your browser tab, making it completely private and secure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats does the OCR tool support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The image to text converter supports JPEG (JPG), PNG, WebP, BMP, GIF, and TIFF image formats. You can upload a file, drag and drop an image directly from your desktop or another browser tab, or paste a screenshot directly from your clipboard using Ctrl+V (Windows/Linux) or Cmd+V (Mac). For best results, use PNG or high-quality JPEG files with a resolution of at least 150 DPI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the first recognition take longer than expected?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On the very first use, the tool needs to download the Tesseract OCR engine core (~2 MB) and the language data file for your selected language (~10 MB for English) from the jsDelivr CDN. This download happens only once — the files are cached by your browser. After the first recognition, all subsequent uses are significantly faster because the engine and language data are already stored locally. You will see a progress bar showing "Loading language data…" during this initial setup.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the OCR text recognition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tesseract OCR is highly accurate for printed, typed, and computer-generated text in standard fonts — typically achieving 95–99% accuracy on clean images. Accuracy drops for: handwritten text (where it may only be 50–80% reliable), very small fonts below 12pt, low-contrast images, heavy image compression artefacts, and unusual or decorative fonts. The tool shows a confidence percentage after each recognition so you can immediately see how reliable the output is. For low-confidence results, try increasing the image resolution or contrast before re-running.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which languages does this OCR tool support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool supports 16 languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Chinese (Traditional), Japanese, Korean, Arabic, Hindi, Dutch, Polish, and Turkish. Select the language matching your image before clicking "Extract Text" — using the wrong language will significantly reduce accuracy. For images containing multiple languages, use the language that covers the majority of the text.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my image uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — your image never leaves your device. The entire OCR process runs locally inside your browser using WebAssembly technology. The only network request is the one-time download of the Tesseract engine and language data file from a CDN, which happens when you first use the tool. Your image, and the text extracted from it, are never transmitted to any server, never logged, and never stored anywhere. This makes the tool safe for confidential documents, ID cards, private notes, and any sensitive content.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I extract text from a screenshot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — extracting text from screenshots is one of the most popular uses of this tool. Take a screenshot (Windows: Win+Shift+S or PrtSc; Mac: Cmd+Shift+4), then either paste it directly into the tool using Ctrl+V / Cmd+V, or save it and upload the file. Screenshots typically contain clean, high-contrast text at standard screen resolutions (72–220 DPI) which Tesseract OCR handles very well, usually achieving over 95% accuracy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this tool convert handwriting to text?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool can recognize some handwriting, but accuracy varies significantly depending on how clear and consistent the handwriting is. Printed-style handwriting (neat, separated letters) achieves better results than cursive or joined-up writing. Tesseract OCR was primarily trained on printed text, so for best handwriting recognition results, use a high-resolution photo with good lighting and minimal background noise. Expect 50–80% accuracy for typical handwriting, compared to 95–99% for printed text.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Image to Text Converter',
  url: 'https://webdevpuneet.com/image-to-text-converter/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and WebAssembly',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online OCR tool that converts images to editable text using Tesseract.js. Supports JPEG, PNG, WebP and 16 languages. Runs 100% in your browser — no uploads, no sign-up.',
  featureList: [
    'Extract text from JPEG, PNG, WebP, BMP, GIF, and TIFF images',
    'Drag and drop, file upload, or clipboard paste (Ctrl+V)',
    '16 languages including English, Spanish, French, German, Chinese, Japanese, Arabic',
    'Real-time recognition progress bar',
    'OCR confidence score',
    'Editable output — clean up the text before copying',
    'Copy to clipboard and download as .txt file',
    '100% private — all processing in your browser, no server uploads',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Image to Text Converter', item: 'https://webdevpuneet.com/image-to-text-converter/' },
  ],
};

const SEO = {
  slug: 'image-to-text-converter',
  title: 'Image to Text Converter — Free Online OCR Tool',

  about: {
    title: 'Online Image to Text Converter — Free OCR Tool for JPEG, PNG, Screenshots & More',
    description: 'You have an image with text in it — a screenshot, a scanned document, a photo of a printed page, a picture of a whiteboard — and you need that text in an editable format. This tool does exactly that. Upload or paste any image and the text inside it is extracted in seconds, ready to copy, edit, or download.\n\nThe tool is powered by **Tesseract.js**, a WebAssembly port of Google\'s Tesseract OCR (Optical Character Recognition) engine — the most widely used open-source OCR library in the world. The entire recognition process runs inside your browser using WebAssembly technology. Your image is never sent to any server. Nothing is uploaded, logged, or stored anywhere outside your browser tab.\n\nOCR accuracy depends on image quality. For printed and typed text in standard fonts, Tesseract achieves **95–99% accuracy** on clean, high-resolution images. A confidence score is shown after every recognition so you know immediately how reliable the output is. If the score is low, try a higher-resolution version of the image or improve the contrast.\n\n**Language support** covers 16 languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified and Traditional), Japanese, Korean, Arabic, Hindi, Dutch, Polish, and Turkish. Select the matching language before running recognition — using the wrong language is the most common cause of poor results.\n\n**Getting images into the tool** is flexible. You can upload a file from your computer, drag and drop an image directly from your desktop or file explorer, or paste a screenshot straight from your clipboard with Ctrl+V (Windows) or Cmd+V (Mac). The paste shortcut makes it especially fast to extract text from screenshots — take the screenshot, switch to this tab, press Ctrl+V, and click Extract Text.\n\nThe extracted text appears in an editable text area. You can clean up any OCR errors before copying — useful when the source image has low contrast or unusual fonts. Then copy the text to your clipboard in one click or download it as a .txt file.\n\nOn first use, Tesseract downloads the language data file (~10 MB for English) from a CDN. This download happens once and is cached by your browser — all subsequent uses are fast. A progress bar shows the loading and recognition stages so you always know what is happening.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Load your image', text: 'Get your image into the tool using whichever method is fastest. Click the upload area to open a file picker — JPEG, PNG, WebP, BMP, GIF, and TIFF are all accepted. Drag an image file directly from your desktop or file explorer and drop it on the left panel. Or press Ctrl+V (Windows/Linux) or Cmd+V (Mac) anywhere on the page to paste a screenshot or copied image directly from your clipboard. The clipboard paste method is the fastest for screenshots — take the screenshot, switch to this tab, and press Ctrl+V.' },
      { title: 'Select the language', text: 'Before running recognition, set the language of the text in your image using the Language dropdown at the top. English is selected by default. Supported languages: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese (Simplified), Chinese (Traditional), Japanese, Korean, Arabic, Hindi, Dutch, Polish, and Turkish. Using the wrong language is the most common cause of garbled output — always match the language to the source image.' },
      { title: 'Click Extract Text and watch the progress bar', text: 'Click the Extract Text button to begin recognition. A progress bar overlays the image and shows each stage: "Loading OCR engine…" (5–20%), "Loading language data…" (30–50%), then "Recognizing text…" (55–99%). On the very first use, the tool downloads the Tesseract engine core (~2 MB) and your selected language data file (~10 MB for English) from the jsDelivr CDN. This one-time download takes 5–15 seconds on a typical connection. Once cached, all subsequent runs are significantly faster — the engine and language data are stored in your browser.' },
      { title: 'Check the confidence score', text: 'When recognition completes, the extracted text appears in the right panel and a confidence percentage badge appears below the image. Green means high confidence (80%+) — the output is likely accurate. Yellow (55–79%) means moderate confidence — worth a quick review, especially for unusual fonts or slightly blurry images. Red (below 55%) means low confidence — try a higher-resolution version of the image or improve the contrast and re-run. Tesseract achieves 95–99% accuracy on clean printed text at 150 DPI or higher.' },
      { title: 'Edit the output if needed', text: 'The extracted text in the right panel is a fully editable text area — click anywhere and type to correct OCR errors before copying. This is especially useful when the source image has low contrast, a decorative font, or JPEG compression artifacts that caused a few characters to be misread. Cleaning up the text here takes seconds and ensures your final copy is accurate.' },
      { title: 'Copy or download the result', text: 'Click Copy to copy all extracted text to your clipboard in one click, or click Download .txt to save it as a plain text file — the filename is derived from the original image filename. Use the copied text directly in a document, spreadsheet, email, or code editor. For the .txt download, the file is created entirely in your browser — no data is sent to any server at any point.' },
    ],
  },

  features: [
    'Drag & drop, file upload, and clipboard paste (Ctrl+V) — three ways to get your image in without friction',
    'Powered by Tesseract.js — the WebAssembly build of Google\'s Tesseract, the world\'s most accurate open-source OCR engine',
    '16 languages supported: English, Spanish, French, German, Italian, Portuguese, Russian, Chinese Simplified & Traditional, Japanese, Korean, Arabic, Hindi, Dutch, Polish, Turkish',
    'OCR confidence score — colour-coded green/yellow/red indicator shows reliability of the extracted text so you know when to double-check',
    'Real-time progress bar — shows each stage (loading engine, loading language data, recognizing text) with a percentage counter',
    'Editable output — the extracted text is in a live text area you can correct before copying, unlike read-only tools',
    'Copy to clipboard and download as .txt — one-click export in both formats; filename derived from the original image name',
    '100% private — WebAssembly OCR runs entirely in your browser; your image never leaves your device, making it safe for sensitive documents and confidential content',
    'Image preview with file info — shows filename, pixel dimensions, and file size in the info bar below the image',
    'Screenshot-optimised — paste directly from clipboard; screenshots at standard screen resolution achieve 95%+ accuracy on typical UI text',
  ],

  useCases: [
    {
      icon: '◉',
      title: 'Extract text from screenshots',
      desc: 'Take a screenshot of an error message, a terms-and-conditions page, a chat window, or any on-screen text. Paste it directly into the tool (Ctrl+V) and get the text in seconds — no more retyping. This is the fastest way to quote text from a PDF viewer, video subtitle, or locked document. Once extracted, run it through the [Word Counter](https://fwdtools.com/word-counter) to check length or the [Diff Checker](/diff-checker) to compare versions.',
    },
    {
      icon: '▦',
      title: 'Digitise scanned documents and printed pages',
      desc: 'Photograph a printed letter, invoice, contract, or book page with your phone and transfer the photo to your computer. Upload it here to convert the scanned image to searchable, editable text. Useful for archiving physical documents, extracting data from paper forms, and digitising notes written on printed templates. For high-volume scanning, a camera shot at 150 DPI or higher gives the best accuracy.',
    },
    {
      icon: '◑',
      title: 'Copy text from images you cannot select',
      desc: 'Many PDFs, e-books, presentations, and web pages contain text rendered as images rather than actual text nodes — meaning you cannot select or copy the text normally. Upload a screenshot or export of the page here and extract the text instantly. Works for locked PDFs, image-based blog posts, infographics with captions, and watermarked documents.',
    },
    {
      icon: '△',
      title: 'Extract foreign-language text for translation',
      desc: 'Photograph a street sign, menu, product label, or document in Spanish, French, German, Japanese, Korean, Arabic, Chinese, or other supported languages. Set the matching language in the dropdown, extract the text, then paste it into Google Translate or DeepL. Far faster than manually typing out foreign characters, especially for non-Latin scripts like Arabic, Chinese, and Japanese.',
    },
    {
      icon: '⚡',
      title: 'Pull data from screenshots and exported reports',
      desc: 'Business analytics dashboards, CRM screenshots, exported reports, and data tables are often shared as images. Extract the tabular data into text, then restructure it in a spreadsheet or convert it using the [CSV to JSON Converter](https://fwdtools.com/csv-json-converter). Useful for analysts who receive data as image attachments and need to work with the underlying numbers.',
    },
    {
      icon: '✍',
      title: 'Convert whiteboard photos and handwritten notes',
      desc: 'Photograph a whiteboard after a meeting, brainstorming session, or lecture. Upload the photo and extract the text to share with teammates who were not present, or to archive decisions made during the session. Best results come from whiteboards with dark markers on a white background and even lighting. Combine with the [Diff Checker](/diff-checker) to track what changed between whiteboard revisions.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function ImageToTextConverterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ImageToTextTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Online Image to Text Converter — OCR Tool for Any Image" {...SEO} /></IndexOnly>

    </div>
  );
}
