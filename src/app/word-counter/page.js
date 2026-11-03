import WordCounterTool from '@/components/WordCounterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: "Word Counter: Count Words, Characters and Reading Time",
  description: "Count words, characters, sentences and paragraphs as you type, with reading time, Flesch readability score and keyword density. Free, private, no sign-up.",
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/word-counter/' },
  icons: { icon: '/icons/word-counter.svg', shortcut: '/icons/word-counter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/word-counter/',
    siteName: 'webdevpuneet.com',
    title: 'Word Counter Online — Count Words, Characters, Reading Time & More',
    description: 'Paste your text and instantly see word count, character count, reading time, Flesch readability score, keyword density, and text case converter. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/word-counter.png', width: 1200, height: 630, alt: 'Word Counter Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Word Counter Online — Count Words, Characters, Reading Time & More',
    description: 'Paste your text and instantly see word count, character count, reading time, Flesch readability score, and keyword density. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/word-counter.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I count words in my text online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste or type your text into the editor on the left. The word count, character count, sentence count, paragraph count, and all other statistics update live in the panel on the right — no button press required. The word counter uses the same tokenization logic as Microsoft Word and Google Docs: it counts sequences of letters and apostrophes separated by whitespace or punctuation, so contractions like "don\'t" and "it\'s" count as one word.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is reading time calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reading time is calculated by dividing the word count by 238 — the average silent reading speed for adults measured in multiple academic studies. Speaking time uses 130 words per minute, which reflects the average conversational speaking pace for presentations and podcasts. Both estimates are shown in minutes and seconds. For a 500-word blog post, the typical reading time is about 2 minutes and speaking time is about 3 minutes 51 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Flesch Reading Ease score and what does it mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Flesch Reading Ease score is a readability formula developed by Rudolf Flesch in 1948 that measures how easy a piece of English text is to read. The formula calculates: 206.835 − (1.015 × average sentence length in words) − (84.6 × average syllables per word). Scores range from 0 to 100. A score of 90–100 means the text is very easy (5th grade level), suitable for consumer-facing content. A score of 60–70 is considered "standard" — suitable for most audiences. A score below 30 is very hard, suitable for technical or legal writing. To improve your score, shorten sentences and use simpler words.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does keyword density work in this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The keyword density section shows the top 12 most frequently used meaningful words in your text, sorted by frequency. Common stop words (articles, prepositions, pronouns like "the", "a", "and", "in", "it") are automatically excluded so only content words are shown. Each keyword shows its raw count and its percentage of the total word count. The bar to the right of each keyword is scaled relative to the most frequent keyword — a full bar means that word appears most often. Use this to spot overused words, check keyword distribution for SEO, or identify the central topics of your writing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the text case converter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The case converter toolbar below the text editor applies transformations to your entire text instantly. "lowercase" converts every letter to lowercase. "UPPERCASE" converts every letter to uppercase. "Title Case" capitalizes the first letter of every word — useful for headings. "Sentence case" capitalizes only the first letter of each sentence. "camelCase" removes spaces and capitalizes each word boundary — useful for JavaScript variable names. "snake_case" replaces spaces with underscores and lowercases everything — used in Python and database naming. "kebab-case" replaces spaces with hyphens and lowercases everything — used in CSS class names and URLs. "Strip Spaces" collapses multiple spaces and blank lines. All transformations are immediately reversible using Ctrl+Z.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this word counter work for essays, blog posts, and college assignments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — this word counter is commonly used for essays, blog posts, articles, academic papers, college assignments, cover letters, and social media posts. Paste your essay draft to check the word count against a minimum requirement, or check whether a blog post is long enough to rank well in search engines (typically 1,500–2,500 words for competitive topics). The Flesch readability score helps you match your writing complexity to your target audience — academic writing typically scores 30–50 while blog posts and news articles typically target 60–70.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many words is a 5-minute read?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At an average reading speed of 238 words per minute, a 5-minute read is approximately 1,190 words. At 130 words per minute for speaking, a 5-minute speech is approximately 650 words. Common benchmarks: a 1-minute read is about 238 words, a 3-minute read is about 714 words, a 10-minute read is about 2,380 words, and a 1-hour read is about 14,280 words. The exact time varies by text complexity — dense technical writing may take 50% longer than simple prose for the same reader.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my text private when I use this online word counter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — all text analysis runs entirely in your browser using JavaScript. Your text is never sent to any server, never logged, and never stored anywhere outside your browser tab. This makes the tool safe for confidential documents, unpublished drafts, client work, proprietary content, and any text you would not want to share. Closing the tab permanently discards your text — there is no backend, no database, and no account system.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Word Counter Online',
  url: 'https://webdevpuneet.com/word-counter/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online word counter with live word count, character count, reading time, Flesch readability score, keyword density, and text case converter.',
  featureList: [
    'Live word count, character count, sentence and paragraph count',
    'Reading time and speaking time estimates',
    'Flesch Reading Ease readability score',
    'Keyword density — top 12 keywords ranked by frequency',
    'Text case converter — lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, kebab-case',
    '100% private — no text ever sent to any server',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Word Counter', item: 'https://webdevpuneet.com/word-counter/' },
  ],
};

const SEO = {
  slug: 'word-counter',
  title: 'Word Counter Online — Count Words, Characters, Reading Time & Readability',

  about: {
    title: 'Online Word Counter — Free Words, Characters, Reading Time, Readability & Keyword Density',
    description: 'You need to know how many words are in your text. Paste it here and the word count, character count, sentence count, and paragraph count update in real time as you type — no button press, no page reload. It works for any text: essays, blog posts, emails, scripts, captions, social media drafts, cover letters, or code comments.\n\nBeyond basic counting, this tool goes further than most word counters. **Reading time** is calculated at 238 words per minute — the widely cited average for adult silent reading — so you immediately know how long a blog post will take to read. **Speaking time** uses 130 words per minute, the average presentation pace, so you can plan speech or podcast content to fill a specific time slot.\n\nThe **Flesch Reading Ease** score tells you how difficult your text is to read. The formula — developed by Rudolf Flesch in 1948 and still used by Microsoft Word today — scores text from 0 (very hard) to 100 (very easy) based on average sentence length and average syllables per word. A score above 70 is suitable for most general audiences. Academic and legal writing typically scores 30–50. Blog posts and consumer content typically target 60–70.\n\nThe **keyword density** panel shows the top 12 most frequent content words in your text, filtered to exclude stop words like "the", "and", "is". This is useful for writers checking whether they are overusing a word, and for anyone optimizing content for search — you can see at a glance whether your target keyword appears enough times relative to total word count.\n\nThe **text case converter** applies transformations in one click: lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, kebab-case, and Strip Extra Spaces. Developers use this to format variable names, database fields, and CSS class names. Writers use it to fix capitalization in draft text imported from inconsistent sources.\n\nEverything runs 100% in your browser. Your text is never sent to any server, so it is safe for confidential documents, unpublished drafts, and proprietary content.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste or type your text into the editor',
        text: 'Type or paste any text into the large editor on the left side of the screen. All statistics in the panel on the right update live as you type — word count, character count, sentence count, paragraph count, line count, unique word count, average word length, and average sentence length all appear instantly without pressing any button. Click **Sample** in the header to load example text, **Paste** to pull from your clipboard, or **Clear** to reset the editor.',
      },
      {
        title: 'Check word count and character statistics',
        text: 'The **Counts** section at the top of the stats panel shows all core metrics: words, total characters, characters without spaces, sentences, paragraphs, lines, unique words, average word length, and average sentence length. The word counter uses letter-and-apostrophe tokenization — contractions like "don\'t" count as one word, matching the behavior of Microsoft Word and Google Docs.',
      },
      {
        title: 'Check reading time and speaking time estimates',
        text: 'Scroll down to the **Time Estimates** section. **Reading time** is calculated at 238 words per minute (the widely cited adult average for silent reading). **Speaking time** is calculated at 130 words per minute (average presentation pace). Both are shown in minutes and seconds. A 1,000-word blog post is about a 4-minute read and a 7-minute 42-second speech.',
      },
      {
        title: 'Review the Flesch readability score',
        text: 'The **Readability** section shows the Flesch Reading Ease score (0–100), a grade label (Very Easy, Easy, Standard, Difficult, etc.), and the corresponding school grade level. A color-coded progress bar visualizes the score. To improve readability, shorten sentences and replace long multi-syllable words with simpler alternatives. Consumer copy should target 60–80; technical writing typically scores 30–50.',
      },
      {
        title: 'Analyze keyword density and convert text case',
        text: 'The **Top Keywords** section shows the 12 most frequent content words with frequency counts, percentages, and relative frequency bars — stop words like "the", "and", "is" are excluded so only meaningful words appear. Below the editor, use the **case converter bar** to instantly transform the entire text: lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, kebab-case, Strip Spaces, and Reverse Text.',
      },
    ],
  },

  features: [
    'Live word count — updates as you type with no button press; counts words the same way Microsoft Word does using letter-and-apostrophe tokenization',
    'Character counter — shows total characters with spaces and total without spaces separately, matching the Twitter character limit definition',
    'Sentence, paragraph, and line counter — accurate multi-paragraph document metrics useful for essays, articles, and [structured writing](/diff-checker)',
    'Reading time estimate — calculated at 238 wpm (adult average), shown in minutes and seconds; essential for blog post planning and content marketing',
    'Speaking time estimate — calculated at 130 wpm (presentation pace); useful for speeches, videos, podcasts, and timed talks',
    'Flesch Reading Ease score — the industry-standard readability formula used by Microsoft Word, showing a 0–100 score with grade label and color-coded indicator',
    'Keyword density table — top 12 most-used content words with frequency count and percentage, stop words excluded; useful for SEO and spotting repeated phrases',
    'Text case converter — 7 transformations: lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, kebab-case; developers use this daily alongside [JSON formatting](/json-formatter)',
    'Unique word count and vocabulary statistics — average word length and average sentence length shown as part of the full text profile',
    '100% private — all analysis runs in your browser; your text never leaves your device, safe for confidential documents and unpublished drafts',
  ],

  useCases: [
    {
      icon: '✍',
      title: 'Check essay word count against academic requirements',
      desc: 'Paste your essay draft to check the word count against the minimum or maximum requirement set by your professor or institution. Common targets are 500 words (short assignment), 1,000 words (standard essay), 2,000 words (research paper), or 5,000 words (dissertation chapter). The character count shows whether a submission portal that uses character limits will accept your text. Check readability to ensure academic writing stays in the 30–50 Flesch range. For citation formatting, use our [JSON Formatter](/json-formatter) to clean structured bibliography data.',
    },
    {
      icon: '📝',
      title: 'Estimate reading time for a blog post or article',
      desc: 'Paste your blog post draft and check the reading time estimate to predict how long visitors will spend on your page. Most SEO-optimized blog posts target 1,500–2,500 words (6–10 minute read) for competitive topics. Medium, Substack, and LinkedIn articles show estimated reading time prominently — this tool calculates the same figure they use. Check keyword density to confirm your target keyword appears 1–2% of total words — the standard SEO density range. Combine with our [Meta Tag Generator](https://webdevpuneet.com/meta-tag-generator/) to write the page title and description.',
    },
    {
      icon: '🎤',
      title: 'Plan speech length and presentation timing',
      desc: 'Paste your speech or presentation script and check the speaking time estimate at 130 words per minute. A 5-minute talk needs about 650 words. A 10-minute talk needs about 1,300 words. A 20-minute TED-style talk is typically 2,600 words. The readability score helps you aim for clear, accessible language — presentations to general audiences should target a Flesch score of 60–70, which corresponds to 8th–9th grade reading level and is understood by virtually all adult native English speakers.',
    },
    {
      icon: '⌨',
      title: 'Convert text case for code — camelCase, snake_case, kebab-case',
      desc: 'Paste a list of names, labels, or field names and convert them to the case convention your codebase uses. "user full name" becomes "userFullName" in camelCase, "user_full_name" in snake_case (Python, PostgreSQL), or "user-full-name" in kebab-case (CSS, URL slugs). This avoids manual reformatting when generating variable names from a spreadsheet or design spec. For more developer tools, see our [Hash Generator](https://fwdtools.com/hash-generator/) and [Base64 Encoder](https://fwdtools.com/base64-encoder-decoder/).',
    },
    {
      icon: '📊',
      title: 'Analyze keyword density before publishing SEO content',
      desc: 'Paste your article and check the keyword density table to see whether your target keyword appears at the right frequency — SEO best practice is 1–2% keyword density for the primary term. If a word is missing from the list, it appears too infrequently to signal topical relevance to search engines. If a word dominates at above 4%, it may read as over-optimized and trigger spam filters. The table shows the top 12 content words so you can see the topic distribution at a glance and rewrite accordingly.',
    },
    {
      icon: '📖',
      title: 'Improve readability score for marketing and content writing',
      desc: 'Paste a marketing email, landing page, or help article and check the Flesch Reading Ease score. Consumer-facing copy — product descriptions, email newsletters, landing pages — should target 70–80 (easy, 6th–7th grade). User interface text should target 80–90. If your score is low, shorten sentences and replace multi-syllable words with simpler alternatives. The average sentence length stat shows immediately how much restructuring is needed. Use the [Diff Checker](/diff-checker) to compare your original and revised drafts side by side.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function WordCounterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><WordCounterTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Online Word Counter — Words, Characters, Reading Time & Readability" {...SEO} /></IndexOnly>

    </div>
  );
}
