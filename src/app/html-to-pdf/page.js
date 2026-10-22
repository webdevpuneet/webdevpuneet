import HtmlToPdf from '@/components/HtmlToPdf';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: "HTML and Markdown to PDF Converter with Live Preview",
  description: "Convert HTML or Markdown to PDF in your browser with a live preview. Pick the font, paper size and orientation, then save a print-ready PDF. No upload needed.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-to-pdf/' },
  icons: { icon: '/icons/html-to-pdf.svg', shortcut: '/icons/html-to-pdf.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/html-to-pdf/',
    siteName: 'webdevpuneet.com',
    title: 'HTML & Markdown to PDF Converter — Free Live Preview, No Upload',
    description: 'Convert Markdown or HTML to a styled PDF in your browser. Live preview updates as you type. Choose font, paper size, and orientation. Files never leave your device.',
    images: [{ url: 'https://webdevpuneet.com/images/html-to-pdf.png', width: 1200, height: 630, alt: 'HTML Markdown to PDF Converter Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'HTML & Markdown to PDF Converter — Free, No Upload',
    description: 'Type Markdown or HTML on the left, see a live preview on the right, then download as PDF. Font, paper size, and orientation controls included.',
    images: ['https://webdevpuneet.com/images/html-to-pdf.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the HTML / Markdown to PDF converter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool works entirely in your browser. When you type Markdown, it is converted to HTML in real time using the open-source marked library. That HTML — along with your chosen font, font size, paper size, and orientation — is wrapped in a complete print-ready HTML document and shown in the preview iframe on the right. When you click Download PDF, a new window opens with the styled content and the browser\'s print dialog is triggered automatically. Choose "Save as PDF" (or "Microsoft Print to PDF" on Windows) to save the file.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my content uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Everything runs locally in your browser. Your Markdown or HTML text never leaves your device — it is parsed and rendered in memory, the print window is opened client-side, and the resulting PDF is saved directly to your computer by the browser. No data is transmitted to any server at any point.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Markdown syntax is supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool uses the marked library, which implements the CommonMark specification. All standard Markdown is supported: headings (# H1 through ###### H6), bold and italic text, inline code and fenced code blocks, ordered and unordered lists, blockquotes, horizontal rules, links, images, and tables using the GFM (GitHub Flavored Markdown) table extension. HTML can also be embedded directly in Markdown documents and will be passed through.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch between Markdown and HTML mode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Use the Markdown / HTML toggle in the toolbar. Switching from Markdown to HTML converts your current content to HTML so you can see and edit the raw markup. Switching back to Markdown resets the editor to the sample document, because there is no general-purpose HTML-to-Markdown converter in the browser. If you have important content, copy it out before switching modes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What paper sizes and orientations are available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can choose between A4 (210 × 297 mm), Letter (8.5 × 11 in), and Legal (8.5 × 14 in) paper sizes, and toggle between Portrait and Landscape orientation. These settings are passed to the CSS @page rule in the print document, so the browser honours them when printing to PDF. The margins are set to 20 mm by default, giving comfortable whitespace on all four sides.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which fonts can I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Three font families are available: Sans-serif (the default, using system UI fonts like Segoe UI on Windows and -apple-system on macOS), Serif (Georgia / Times New Roman for a traditional document look), and Monospace (Courier New for technical or code-heavy documents). Font size can be set from 11 px to 18 px. Because these are system fonts, they are available on all devices without any download.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I actually save the PDF file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click "Download PDF" in the toolbar. A print dialog opens in a new window showing the rendered content. In the destination selector, choose "Save as PDF" on Mac or Chrome, "Microsoft Print to PDF" on Windows, or your system\'s equivalent. Set your preferred file name and click Save. The PDF is created entirely by your browser\'s built-in print engine, so the output quality matches what you would get from printing any styled web page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the preview show exactly what the PDF will look like?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The preview is a live iframe rendering the same HTML and CSS that will be used for printing, so the typography, headings, tables, and code blocks should match closely. However, because the preview iframe does not apply @page margins (those only activate during printing), the page boundaries and final line breaks may differ slightly from the printed output. For a fully accurate proof, use the browser\'s print preview before saving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I include images in the document?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, in both modes. In Markdown, use the standard image syntax: ![alt text](https://example.com/image.jpg). In HTML mode, use a standard <img> tag. Images must be reachable as public URLs or data URIs — local file paths will not work because the print window is a separate browser context. Base64 data URIs are the most reliable way to embed images that are not hosted online.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the tool free? Do I need an account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Completely free. No account, no email address, no sign-up of any kind. Open the page and start typing. Because all processing happens in your browser, there are no server costs and therefore no usage limits or premium tier.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML / Markdown to PDF Converter',
  url: 'https://webdevpuneet.com/html-to-pdf/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based converter that turns Markdown or HTML into a downloadable PDF. Live split-pane preview, font and paper size controls, no upload required.',
  featureList: [
    '100% browser-based — content never leaves your device',
    'Markdown mode powered by the marked (CommonMark) parser',
    'HTML mode for full markup control',
    'Live split-pane preview updates as you type',
    'Convert Markdown to HTML with one click (mode toggle)',
    'Font family selector: Sans-serif, Serif, Monospace',
    'Font size selector: 11 px to 18 px',
    'Paper size selector: A4, Letter, Legal',
    'Portrait and landscape orientation toggle',
    'Print-quality CSS: headings, tables, code blocks, blockquotes all styled',
    'No watermark or branding added to output',
    'No account, sign-up, or email required',
  ],
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'HTML / Markdown to PDF Converter', item: 'https://webdevpuneet.com/html-to-pdf/' },
  ],
};


const about = `Every developer, writer, and analyst occasionally needs to turn a text document into a properly formatted PDF — whether for a report, a proposal, meeting notes, or technical documentation. The usual options involve pasting into Word, wrestling with formatting, or paying for an online converter that uploads your content to a server. This tool takes a different approach. Unlike most HTML-to-PDF converters, this tool runs fully in your browser — no data is uploaded, ensuring complete privacy for your documents and written content.\n\n**HTML / Markdown to PDF** is a split-pane editor that runs entirely in your browser. Type or paste **Markdown** on the left and watch a styled PDF preview update in real time on the right. If you prefer to write raw HTML, flip the mode toggle and get full control over markup. When you are happy with the output, click **Download PDF** — a print dialog opens and you save the file directly to your computer using your browser's built-in print-to-PDF engine. No file is ever transmitted to a server.\n\nThe Markdown parser is the open-source **marked** library (CommonMark-compliant), so all standard syntax is supported: headings, bold and italic text, lists, tables, code blocks, blockquotes, and inline HTML. The preview iframe uses the same CSS that will be applied when printing, so what you see is close to what you will get.\n\nA set of toolbar controls lets you adjust the output before downloading. Choose between **Sans-serif**, **Serif**, or **Monospace** font families, pick a font size from 11 px to 18 px, select **A4**, **Letter**, or **Legal** paper, and toggle **Portrait** or **Landscape** orientation. All these settings are applied via CSS \`@page\` rules so the browser's print engine honours them precisely.\n\nCommon use cases include writing quick technical reports in Markdown, converting meeting notes to a shareable PDF, producing formatted proposals from an HTML template, and generating documentation from content that already exists as HTML or Markdown in a code repository.`;

const features = [
  '100% client-side — Markdown and HTML never leave your browser',
  'Live split-pane preview updates instantly as you type',
  'Full CommonMark Markdown support via the marked library',
  'HTML mode gives complete control over markup and inline styles',
  'One-click Markdown-to-HTML conversion when switching modes',
  'Sans-serif, Serif, and Monospace font family options',
  'Six font size choices from 11 px to 18 px',
  'A4, Letter, and Legal paper sizes via CSS @page rule',
  'Portrait and landscape orientation toggle',
  'Print-quality base styles: headings, tables, code, blockquotes, lists',
  'No watermark, branding, or advertising added to output',
  'No account, sign-up, or API key required',
];

const howToUse = {
  items: [
    {
      title: 'Choose your input mode',
      text: 'Use the Markdown / HTML toggle in the toolbar to select how you want to write. Markdown mode (the default) is ideal for plain-text writing — headings, lists, bold, code blocks, and tables are written using simple syntax. HTML mode gives you full control if you already have markup or want to use inline styles.',
    },
    {
      title: 'Write or paste your content',
      text: 'Type directly in the left editor panel, or paste content from any source. The editor pre-fills with a sample document so you can see the supported formatting at a glance — select all and delete it to start from scratch. The preview on the right updates continuously as you type.',
    },
    {
      title: 'Choose font and size',
      text: 'Use the font family selector (Sans-serif, Serif, or Monospace) and the font size selector (11 px to 18 px) to match the typographic style of the document you need. The preview reflects both choices immediately so you can compare options before downloading.',
    },
    {
      title: 'Set paper size and orientation',
      text: 'Select A4 (international standard), Letter (North American standard), or Legal from the paper size dropdown. Click the Portrait / Landscape button to switch orientation. These settings are embedded in the document as a CSS @page rule and are applied precisely by the browser when printing.',
    },
    {
      title: 'Preview and fine-tune',
      text: 'Review the right-hand preview panel to check headings, table alignment, code block formatting, and overall spacing. Make any final edits in the left panel. Because the preview uses the same CSS as the print output, what you see here is representative of the downloaded PDF.',
    },
    {
      title: 'Download the PDF',
      text: 'Click "↓ Download PDF" in the toolbar. A new window opens showing your formatted content, and the browser\'s print dialog appears automatically. In the destination selector, choose "Save as PDF" (Mac / Chrome), "Microsoft Print to PDF" (Windows), or your system equivalent. Give the file a name and click Save.',
    },
  ],
};

const useCases = [
  {
    icon: '◉',
    title: 'Technical documentation',
    desc: 'Developers who write documentation in Markdown can paste it directly into the editor and download a formatted PDF for sharing with stakeholders who do not use a Markdown viewer. Code blocks, tables, and inline code render cleanly in a monospace font. Draft and preview the Markdown first in the [Markdown editor](/markdown-editor).',
  },
  {
    icon: '▦',
    title: 'Meeting notes and minutes',
    desc: 'Write meeting notes using Markdown headings and bullet points for speed, then download a clean PDF to distribute to attendees. The tool adds consistent typography and spacing so the output looks professional without any manual formatting. Convert existing HTML notes with [HTML to Markdown](/html-to-markdown) first if needed.',
  },
  {
    icon: '◑',
    title: 'Proposals and reports',
    desc: 'Structure a project proposal or status report as a Markdown document, use the Serif font for a traditional report look, and download on A4 or Letter paper to match company standards. Tables in Markdown become bordered, properly styled tables in the PDF.',
  },
  {
    icon: '△',
    title: 'Code documentation',
    desc: 'Technical write-ups that include fenced code blocks render with monochrome code formatting in the PDF. Switch to Monospace font for a technical aesthetic, or keep Sans-serif with code blocks styled in a light grey background to separate prose from code.',
  },
  {
    icon: '⚡',
    title: 'Email-ready formatted content',
    desc: 'Paste an HTML email template into HTML mode to preview how the structure will look as a printed document, then export as PDF for archival or for sending as an attachment to recipients who prefer a formatted file over raw HTML. Merge multiple exports into one document with the [PDF merger](https://fwdtools.com/pdf-merger/).',
  },
  {
    icon: '≡',
    title: 'README to PDF',
    desc: 'Many open-source projects include detailed README.md files with installation instructions, feature lists, and configuration tables. Paste the README content into Markdown mode and export a formatted PDF for inclusion in a technical portfolio or project handoff package.',
  },
];

const faqs = faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text }));

export default function HtmlToPdfPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={styles.toolSection}>
        <HtmlToPdf />
      </div>

      <IndexOnly><AdSlot slot="html-to-pdf-below-tool" />

      <SeoSection
        slug="html-to-pdf"
        title="Free HTML & Markdown to PDF Converter — Live Preview, No Upload"
        subtitle="Type Markdown or HTML on the left, preview the styled output on the right, then download as a print-quality PDF. Font, paper size, and orientation controls included."
        sections={[
          {
            type: '2col',
            left:  { type: 'text',     label: 'About this tool', text: about },
            right: { type: 'features', heading: 'Features',       items: features },
          },
          {
            type: 'steps',
            heading: 'How to Use',
            items: howToUse.items,
          },
          {
            type: 'cards',
            heading: 'Common Use Cases',
            columns: 3,
            items: useCases,
          },
          {
            type: 'faq',
            heading: 'Frequently Asked Questions',
            items: faqs,
          },
        ]}
      /></IndexOnly>

    </div>
  );
}
