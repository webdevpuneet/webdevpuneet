const textStatisticsAnalyzer = {
  id: 'text-statistics-analyzer',
  title: 'Text Statistics Analyzer',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Text Statistics Analyzer</h2>

  <textarea id="text-input" placeholder="Paste or type text here...">The quick brown fox jumps over the lazy dog. It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.

Writing clearly means writing simply. Short sentences read faster than long ones.</textarea>

  <div class="stats-grid" id="stats-grid"></div>

  <div class="freq-section">
    <h3>Most frequent words</h3>
    <div class="freq-list" id="freq-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 680px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

#text-input {
  width: 100%; min-height: 140px; resize: vertical; padding: 14px 16px;
  border: 1.5px solid #e2e8f0; border-radius: 12px; font-size: 14px; line-height: 1.7;
  font-family: inherit; color: #1e293b; background: #fff;
}
#text-input:focus { outline: none; border-color: #6366f1; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin: 18px 0; }
.stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; }
.stat-card .val { font-size: 22px; font-weight: 800; color: #6366f1; line-height: 1.2; }
.stat-card .lbl { font-size: 11px; font-weight: 700; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.03em; }

.freq-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; }
.freq-section h3 { font-size: 12.5px; font-weight: 800; color: #475569; margin-bottom: 10px; }
.freq-list { display: flex; flex-direction: column; gap: 6px; }
.freq-row { display: flex; align-items: center; gap: 10px; }
.freq-word { font-size: 12.5px; font-weight: 700; color: #1e293b; width: 100px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.freq-bar-wrap { flex: 1; background: #f1f5f9; border-radius: 4px; height: 10px; overflow: hidden; }
.freq-bar { height: 100%; background: linear-gradient(90deg, #818cf8, #6366f1); border-radius: 4px; }
.freq-count { font-size: 11.5px; color: #94a3b8; font-weight: 700; width: 26px; text-align: right; flex-shrink: 0; }
.freq-empty { font-size: 12.5px; color: #94a3b8; }`,
  js: `const STOP_WORDS = new Set(['the','a','an','of','it','was','is','and','to','in','on','for','with','that','this','as','at','by','be','are','were','or','but','not']);

const textInput = document.getElementById('text-input');
const statsGrid = document.getElementById('stats-grid');
const freqList = document.getElementById('freq-list');

function analyze(text) {
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\\s/g, '').length;

  const words = (text.match(/[A-Za-z0-9']+/g) || []);
  const wordCount = words.length;

  const sentences = (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  const paragraphs = text.split(/\\n\\s*\\n/).map((p) => p.trim()).filter(Boolean);
  const paragraphCount = Math.max(paragraphs.length, text.trim() ? 1 : 0);

  const avgWordLength = wordCount ? (words.reduce((sum, w) => sum + w.length, 0) / wordCount) : 0;
  const avgWordsPerSentence = sentenceCount ? (wordCount / sentenceCount) : 0;

  const readingMinutes = wordCount / 200;
  const speakingMinutes = wordCount / 130;

  return {
    charsWithSpaces, charsNoSpaces, wordCount, sentenceCount, paragraphCount,
    avgWordLength, avgWordsPerSentence, readingMinutes, speakingMinutes, words,
  };
}

function formatTime(minutes) {
  if (minutes < 1) {
    const seconds = Math.max(1, Math.round(minutes * 60));
    return seconds + 's';
  }
  const whole = Math.floor(minutes);
  const secs = Math.round((minutes - whole) * 60);
  return whole + 'm' + (secs ? ' ' + secs + 's' : '');
}

function wordFrequency(words) {
  const counts = new Map();
  words.forEach((w) => {
    const key = w.toLowerCase();
    if (STOP_WORDS.has(key)) return;
    if (key.length < 2) return;
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
}

function render() {
  const text = textInput.value;
  const stats = analyze(text);

  const cards = [
    [stats.wordCount, 'Words'],
    [stats.charsWithSpaces, 'Characters'],
    [stats.charsNoSpaces, 'Chars (no spaces)'],
    [stats.sentenceCount, 'Sentences'],
    [stats.paragraphCount, 'Paragraphs'],
    [stats.avgWordLength.toFixed(1), 'Avg word length'],
    [stats.avgWordsPerSentence.toFixed(1), 'Words / sentence'],
    [formatTime(stats.readingMinutes), 'Reading time'],
    [formatTime(stats.speakingMinutes), 'Speaking time'],
  ];

  statsGrid.innerHTML = cards.map(([val, lbl]) =>
    '<div class="stat-card"><div class="val">' + val + '</div><div class="lbl">' + lbl + '</div></div>'
  ).join('');

  const freq = wordFrequency(stats.words);
  if (freq.length === 0) {
    freqList.innerHTML = '<div class="freq-empty">No repeated meaningful words yet.</div>';
    return;
  }
  const maxCount = freq[0][1];
  freqList.innerHTML = freq.map(([word, count]) =>
    '<div class="freq-row">' +
      '<div class="freq-word">' + word + '</div>' +
      '<div class="freq-bar-wrap"><div class="freq-bar" style="width:' + Math.round((count / maxCount) * 100) + '%"></div></div>' +
      '<div class="freq-count">' + count + '</div>' +
    '</div>'
  ).join('');
}

textInput.addEventListener('input', render);
render();`,

  seo: {
    title: 'Text Statistics Analyzer — Free HTML CSS JS Snippet',
    description: 'Count words, characters, sentences and paragraphs, estimate reading and speaking time, and surface the most frequent words in any text. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Text Statistics Analyzer — Word Count, Reading Time & Word Frequency, Computed Live',
      description: `Word processors bury character and word counts behind a menu, and most standalone "word counter" tools stop there. This snippet computes a fuller picture of a piece of text — word, character, sentence, and paragraph counts, average sentence length, estimated reading and speaking time, and the most frequent non-trivial words — entirely with regular expressions and array operations, updating on every keystroke.

**Counting words without miscounting punctuation**

Rather than splitting on whitespace (which would count a lone hyphen or ellipsis as a word), the tool matches the text against \`/[A-Za-z0-9']+/g\` — a sequence of letters, digits, or apostrophes. This correctly counts \`don't\` as one word rather than two, while punctuation-only fragments and stray symbols are never counted, which is closer to how a human would count words by hand than a naive whitespace split.

**Detecting sentence boundaries with a fallback for the last sentence**

Sentence counting matches runs of non-terminator characters followed by one or more \`.\`, \`!\`, or \`?\` characters, with a second alternative in the same pattern (\`[^.!?]+$\`) to catch trailing text that never received a closing punctuation mark. Without that fallback, a piece of text ending mid-thought without a period would silently lose its last sentence from the count — a small detail that matters most for text still being drafted, which is exactly when a live word-count tool gets used.

**Splitting paragraphs on blank lines, not just newlines**

Paragraphs are detected by splitting on \`/\\n\\s*\\n/\` — one or more blank lines — rather than every single newline, since a single line break inside a paragraph (a soft wrap) should not itself start a new paragraph. Each resulting chunk is trimmed and empty chunks are discarded, so trailing blank lines at the end of the text do not inflate the count.

**Estimating reading and speaking time from established rates**

Reading time uses 200 words per minute, a commonly cited average adult silent-reading speed; speaking time uses roughly 130 words per minute, closer to a natural conversational speaking pace. Both are simple divisions of the word count by these rates, then formatted by \`formatTime()\` into a compact "Xm Ys" string, or just seconds for anything under a minute — useful for sanity-checking whether a video script or presentation script actually fits its intended time slot.

**Building a stop-word-filtered frequency list**

\`wordFrequency()\` lowercases every word, skips a small built-in list of common English stop words (\`the\`, \`a\`, \`of\`, \`and\`, and similar) along with single-character tokens, and tallies the rest in a \`Map\`. The resulting entries are sorted by count descending and the top eight are rendered as horizontal bars scaled relative to the most frequent word — surfacing the words a piece of writing actually leans on, rather than being dominated by function words that appear in every English sentence regardless of topic.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste or type your text', text: 'Every statistic recalculates live as you type — no submit button or delay.' },
        { title: 'Read the stat cards', text: 'Word count, character counts (with and without spaces), sentence count, and paragraph count are all shown at a glance.' },
        { title: 'Check average word and sentence length', text: 'Useful as a rough readability signal — very high averages often mean a passage is dense or overly long-winded.' },
        { title: 'Check estimated reading and speaking time', text: 'Reading time assumes ~200 words per minute; speaking time assumes ~130 words per minute, closer to natural speech pace.' },
        { title: 'Scan the most frequent words', text: 'Common English stop words are filtered out automatically so the bars reflect the text\'s actual recurring topics or themes.' },
      ],
    },
    features: [
      'Live word, character (with/without spaces), sentence, and paragraph counts',
      'Word matching that correctly handles contractions like don\'t as a single word',
      'Sentence detection with a fallback for trailing text with no closing punctuation',
      'Paragraph detection based on blank-line breaks rather than every line wrap',
      'Average word length and average words-per-sentence as quick readability signals',
      'Estimated reading time (~200 wpm) and speaking time (~130 wpm), compactly formatted',
      'Stop-word-filtered frequency list of the 8 most common meaningful words with proportional bars',
      'Updates on every keystroke with zero dependencies',
    ],
    useCases: [
      { icon: 'CODE', title: 'Checking copy length before a character-limited post', desc: 'Watch the live word and character counts while drafting a tweet, meta description, or SMS message to stay within a hard limit.' },
      { icon: 'LEARN', title: 'Teaching basic writing and readability signals', desc: 'Show how average words-per-sentence and word length shift as a passage is edited for clarity, alongside the [readability score gauge](/ui-snippets/readability-score-gauge/).' },
      { icon: 'FLOW', title: 'Timing a script or presentation', desc: 'Paste a video script or speech draft and use the speaking-time estimate to check it fits an allotted time slot before rehearsing.' },
      { icon: 'DESIGN', title: 'Spotting overused words while editing', desc: 'Use the frequency list to catch a word repeated too often in a paragraph or essay draft before a final pass.' },
      { icon: 'APP', title: 'Content and blog editing workflows', desc: 'Pair with a [markdown live preview](/ui-snippets/markdown-live-preview/) tool in a lightweight in-browser writing workspace.' },
    ],
    faqs: [
      { q: 'How is word count calculated?', a: 'The text is matched against a regular expression capturing runs of letters, digits, and apostrophes. This treats a contraction like "don\'t" as one word and ignores standalone punctuation, which is closer to a natural word count than simply splitting on whitespace.' },
      { q: 'Why might sentence count seem slightly off for unusual text?', a: 'Sentences are detected by matching text between terminating punctuation marks (period, exclamation point, question mark), with a fallback that also counts trailing text with no closing punctuation. Abbreviations like "Dr." or decimal numbers can occasionally be miscounted as sentence boundaries, since the tool uses pattern matching rather than true natural-language sentence segmentation.' },
      { q: 'What reading and speaking speeds does it assume?', a: 'Reading time assumes roughly 200 words per minute, a commonly cited average adult silent-reading pace. Speaking time assumes roughly 130 words per minute, closer to a natural conversational speaking rate. Both are configurable by editing the divisor constants in the JS panel.' },
      { q: 'Why are some words missing from the frequency list?', a: 'Common English stop words (the, a, of, and, and similar function words) and single-character tokens are deliberately filtered out so the list highlights a text\'s actual recurring topics rather than being dominated by grammatical filler words present in almost any English sentence.' },
      { q: 'How are paragraphs counted?', a: 'The text is split on one or more blank lines (a run of whitespace containing at least two newlines), not on every single line break, so a soft-wrapped line within one paragraph does not get counted as starting a new paragraph.' },
      { q: 'Is my text sent anywhere?', a: 'No. All counting and analysis happens locally in the browser using plain JavaScript string and array methods — nothing is transmitted over the network.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain why the sentence-detection regular expression needs a fallback alternative for trailing text with no closing punctuation, and how it might misfire on abbreviations like "Dr." or "e.g." It is also a good base to extend: ask for a real readability formula like Flesch-Kincaid grade level using syllable estimation, a customizable stop-word list, or per-paragraph statistics instead of only whole-document totals.`,
      prompt: `Build a client-side text statistics analyzer in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where typed or pasted text is analyzed live on every input event.
- Count words using a regular expression that matches runs of letters, digits, and apostrophes (so contractions count as one word), not a plain whitespace split.
- Count characters with and without whitespace.
- Count sentences by matching runs of non-terminator characters followed by one or more of . ! ?, including a fallback that still counts trailing text with no closing punctuation mark.
- Count paragraphs by splitting on blank-line breaks (one or more empty lines), not every single line break, trimming and discarding empty resulting chunks.
- Compute and display average word length and average words per sentence.
- Estimate reading time using roughly 200 words per minute and speaking time using roughly 130 words per minute, formatted compactly as minutes and seconds (or just seconds under a minute).
- Build a "most frequent words" list: lowercase every matched word, exclude a small built-in set of common English stop words and single-character tokens, tally occurrences, and render the top 8 as horizontal bars scaled relative to the most frequent word's count.
- No external libraries — implement everything with plain JavaScript regular expressions and array methods.`,
    },
  },
};

export default textStatisticsAnalyzer;
