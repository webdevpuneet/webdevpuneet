import DiffCheckerTool from '@/components/DiffCheckerTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Diff Checker Online Free — Compare Text Side by Side | webdevpuneet.com',
  description: 'Compare two texts or code files instantly — added, removed, and changed lines highlighted side by side. Split, unified, and inline modes. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/diff-checker/' },
  icons: { icon: '/icons/diff-checker.svg', shortcut: '/icons/diff-checker.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/diff-checker/', siteName: 'webdevpuneet.com', title: 'Diff Checker Online — Free, Compare Text, Code & Files Side by Side', description: 'Compare texts side-by-side with LCS diffing. Split, unified, and inline modes with character-level highlighting. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/diff-checker.png', width: 1200, height: 630, alt: 'Diff Checker Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Diff Checker Online — Free, Compare Text, Code & Files Side by Side', description: 'Compare texts side-by-side with LCS diffing. Split, unified, and inline character-level modes. Free, no sign-up.', images: ['https://webdevpuneet.com/images/diff-checker.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I compare two texts online and see what changed?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the original text into the left pane and the modified version into the right pane. The diff highlights automatically — additions in green, removals in red, unchanged lines in gray. Use Split view to see both texts side by side with changes aligned. Use Unified view for the standard +/- format. Use Inline mode to highlight the exact characters that changed within a line — useful for spotting a single word, number, or symbol that was edited.' } },
    { '@type': 'Question', name: 'How do I compare two code files or config files online?', acceptedAnswer: { '@type': 'Answer', text: 'Paste both versions of your code or config file content into the panes — the tool works with any plain text format: JavaScript, TypeScript, Python, CSS, HTML, JSON, YAML, SQL, Markdown, shell scripts, Nginx configs, Docker Compose files, Kubernetes manifests, and any other text. No file upload needed — just paste from your editor. Everything runs in your browser so your private code never touches any server.' } },
    { '@type': 'Question', name: 'How do I find a single character or word change in a long text?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to Inline mode. Without it, a line that differs by one word still shows as a full red removal and a full green addition — making the actual change hard to spot. Inline character-level mode highlights only the specific characters that changed within the line, leaving the identical parts showing normally. This makes it immediately obvious that only a number, a variable name, or a single word was edited, even in a long modified line.' } },
    { '@type': 'Question', name: 'Is my text private when I use an online diff checker?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — all diff computation runs entirely in your browser using JavaScript. Your text is never transmitted to any server. This makes the tool safe for proprietary source code, confidential documents, API keys in config files, database credentials, private keys, and any sensitive content. Closing the browser tab permanently discards everything you pasted — no backend logging, no storage.' } },
    { '@type': 'Question', name: 'Can I resolve merge conflicts using this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The merge pane lets you manually accept or discard individual change hunks from either side and edit the merged result directly to produce a final reconciled version. This works like resolving a merge conflict manually — you see the two diverged versions and decide which changes to keep from each side. Useful when git merge or rebase left conflicts you want to resolve outside the terminal.' } },
    { '@type': 'Question', name: 'How do I share a diff with my team or in a bug report?', acceptedAnswer: { '@type': 'Answer', text: 'Click the Share button to generate a URL that encodes both text panes. Send this link and anyone who opens it sees the exact same diff without needing to paste the content again — useful for code review comments, bug reports, and Slack messages. Click Export to download a standard unified .patch file compatible with git apply and other Unix patching tools.' } },
    { '@type': 'Question', name: 'How do I compare two JSON or API responses to find regressions?', acceptedAnswer: { '@type': 'Answer', text: 'Paste both JSON responses into the panes — use the JSON formatter first to sort keys and apply consistent indentation to both, so the diff only highlights genuine value changes rather than formatting noise. Then paste both formatted versions here. Use Inline mode to pinpoint changed field values within lines — a single changed number or string is immediately visible even in a large JSON payload.' } },
    { '@type': 'Question', name: 'Does this diff use the same algorithm as Git?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — this tool uses the LCS (Longest Common Subsequence) algorithm, which is the same fundamental approach used by Git, GNU diff, and virtually every professional diff tool. LCS finds the longest sequence of lines that appears in the same order in both texts, then marks everything outside that common sequence as added or removed. This produces minimal, accurate diffs that show only true differences.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Diff Checker Online',
  url: 'https://webdevpuneet.com/diff-checker/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online diff checker using LCS algorithm with split, unified, and inline character-level comparison modes.',
  featureList: ['LCS-based line diffing', 'Split/unified/inline view modes', 'Character-level highlighting', 'Line numbers', 'Diff statistics', 'Merge pane', '100% private browser-only'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Diff Checker', item: 'https://webdevpuneet.com/diff-checker/' },
  ],
};

const SEO = {
  slug: 'diff-checker',
  title: 'Diff Checker Online — Free, Compare Two Texts or Code Files Side by Side',

  about: {
    title: 'Compare Two Texts Online and See Exactly What Changed — Free, No Sign-Up',
    description: 'You have two versions of a document, a config file, a JSON response, or a block of code and you need to know what changed. Paste both here and the diff highlights additions in green, removals in red, and unchanged lines in gray — instantly, no button press.\n\nThree display modes cover every scenario. **Split view** shows the original on the left and the modified version on the right with changes aligned side by side — the way most developers prefer to read a code review. **Unified view** combines both into a single column with + and − prefixes — the standard format you see in `git diff` output and .patch files. **Inline mode** is the most powerful: it highlights the exact characters that changed within a line, not just the whole line. When a single word or number was edited, inline mode shows you precisely which characters without you having to read the entire line twice.\n\nThe tool uses the LCS (Longest Common Subsequence) algorithm — the same engine behind Git, GNU diff, and every professional diff tool. Internally it builds a dynamic-programming table sized to the line counts of both texts, where each cell records the length of the longest common subsequence up to that point, then backtracks through the table to reconstruct which lines were kept, added, or removed. The same LCS routine runs a second time at the character level inside a changed line pair to power inline mode\'s precise highlighting — it is not a separate, cruder algorithm, just the identical technique applied at finer granularity.\n\nBeyond comparison, the merge pane lets you manually accept or discard individual change hunks to produce a reconciled final version — useful for resolving conflicts between two diverged copies. Share a diff via URL (both panes are encoded in the link) or export a .patch file for `git apply`. The exporter groups nearby changed lines into hunks with three lines of surrounding context and writes standard `@@ -start,count +start,count @@` hunk headers, matching the unified diff format so the file applies cleanly with `git apply` or `patch`. Loading a `.patch` file back in does the reverse, splitting it into the original and modified text by reading the `-`, `+`, and context-line prefixes inside each hunk.\n\nYour work is never lost by accident: the current pair of texts auto-saves to a local draft 400ms after you stop typing, and a rolling history of your last eight comparisons auto-saves after 2 seconds of inactivity, both stored only in your browser\'s localStorage.\n\nAll computation runs 100% in your browser. Your text is never sent to any server — safe for proprietary code, confidential documents, and config files containing credentials.',
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste text into both panes',
        text: 'Paste the original version into the left pane (labeled **A / Original**) and the modified version into the right pane (labeled **B / Modified**). The diff highlights automatically in real time as you type or paste — green for additions, red for removals, gray for unchanged lines. No button press needed. Click **Load Sample** to see a demo diff with code changes.',
      },
      {
        title: 'Choose a display mode',
        text: 'Click **Split** in the toolbar for side-by-side view with changes aligned across both panes. Click **Unified** for the standard `+/-` format showing both texts in a single column — the same format as `git diff` output. Click **Inline** for character-level mode that highlights only the exact characters that changed within a line — essential for spotting single-word or single-number edits.',
      },
      {
        title: 'Control diff options',
        text: 'Use the checkboxes in the toolbar: **Ignore WS** to ignore whitespace differences, **Ignore Case** for case-insensitive comparison, **Show Same** to toggle display of unchanged lines (uncheck to hide them and only see changes), **Wrap Lines** to toggle word-wrap, **Sync Scroll** to synchronize scrolling between both panes.',
      },
      {
        title: 'Navigate between change hunks',
        text: 'Use the **↑ / ↓** hunk navigation arrows in the toolbar to jump between change blocks without manually scrolling through long texts. The counter shows the current hunk index — e.g. `2/5 changes`. Both panes scroll synchronously when Sync Scroll is enabled.',
      },
      {
        title: 'View statistics and use the minimap',
        text: 'The legend bar at the bottom of the diff shows: `+N added`, `−N removed`, `N same`, and `~N% similar`. The minimap between the two panes shows the distribution of changes across the entire document height — click any position to jump to that location.',
      },
      {
        title: 'Merge, export, or share the diff',
        text: 'Click **Merge** to open a merge pane that shows a combined view starting with all of the B-side (modified) changes — you can edit the merged result and click **Copy Merged** to copy the final text. Click **Export** to download a standard `.patch` file compatible with `git apply`. The history panel auto-saves diffs after 2 seconds of inactivity.',
      },
    ],
  },

  features: [
    'LCS (Longest Common Subsequence) algorithm — the same engine used by Git and GNU diff',
    'Split view — side-by-side comparison with aligned line numbers',
    'Unified view — combined +/- diff format compatible with patch files',
    'Inline mode — character-level highlighting of exact changed characters within lines',
    'Previous / Next hunk navigation — jump between change blocks without scrolling',
    'Diff statistics — added, removed, and unchanged line counts at a glance',
    'Merge pane — manually accept, discard, or edit individual change hunks',
    'Shareable diff URLs — encode both panes in a link for team sharing',
    'Export as .patch file — standard unified diff format compatible with git apply',
    '100% private — all computation runs in your browser, no text sent to any server; format JSON before diffing with our [JSON Formatter](/json-formatter) to eliminate whitespace noise',
  ],

  useCases: [
    {
      icon: '⟺',
      title: 'See exactly what changed in a pull request or hotfix',
      desc: 'Paste the before and after versions of a function, component, or config to read the changes outside of GitHub\'s PR diff UI. Split view shows both aligned side by side; inline mode highlights the exact variable names, arguments, or values that were edited — useful for reviewing a subtle change in a large function without scrolling through every line. Use our [HTML Formatter](/html-formatter) to normalize HTML templates before diffing.',
    },
    {
      icon: '◎',
      title: 'Find the changed words between two document drafts',
      desc: 'Compare two drafts of a contract, spec, blog post, or email to see which sentences were added, removed, or reworded. Inline character-level mode highlights only the changed words within a paragraph rather than flagging the entire paragraph as modified — essential for editorial review where most of a sentence stayed the same.',
    },
    {
      icon: '⚙',
      title: 'Spot configuration differences between staging and production',
      desc: 'Paste your nginx config, Docker Compose file, Kubernetes manifest, or .env file from two environments and instantly see which keys differ — no git blame, no version history needed. Catch unintended differences before a deployment causes a 500 error in production.',
    },
    {
      icon: '✓',
      title: 'Find regressions in API responses after a refactor',
      desc: 'Compare JSON responses from two environments or two API versions. Format and sort keys on both using our [JSON Formatter](/json-formatter) first, then paste here — the diff will show only genuine value changes, not formatting noise. Inline mode pinpoints a changed number or field value in a large payload in seconds.',
    },
    {
      icon: '▦',
      title: 'Verify a translation has the same keys as the source file',
      desc: 'Paste the original locale file and the translated version side by side to confirm every key is present, none were omitted, and no extra lines were added. The line count in the stats bar tells you immediately if the two files have different numbers of entries.',
    },
    {
      icon: '≡',
      title: 'Compare log output between two runs to find new errors',
      desc: 'Diff log files from consecutive application runs or different server instances to find errors, warnings, or stack traces that appeared after a deploy. Use unified view to scan the + additions quickly — new errors stand out as green-highlighted lines in the diff output. Use our [Regex Tester](https://fwdtools.com/regex-tester/) to extract specific error patterns from large log output before diffing.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function DiffCheckerPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><DiffCheckerTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Diff Checker Online — Compare Text, Code & Files Side by Side" {...SEO} /></IndexOnly>

    </div>
  );
}
