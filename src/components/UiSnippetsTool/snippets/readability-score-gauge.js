const readabilityScoreGauge = {
  id: 'readability-score-gauge',
  title: 'Readability Score Gauge',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="rsg-wrap">
  <header class="rsg-head"><h1>Readability check</h1><p>Edit the text below — the gauge recalculates a real Flesch Reading Ease score as you type.</p></header>
  <div class="rsg-grid">
    <div class="rsg-gauge-col">
      <svg class="rsg-svg" viewBox="0 0 200 120" aria-hidden="true">
        <path class="rsg-track" d="M20 100 A80 80 0 0 1 180 100" />
        <path class="rsg-arc" id="rsgArc" d="M20 100 A80 80 0 0 1 180 100" />
      </svg>
      <div class="rsg-score" id="rsgScore">–</div>
      <div class="rsg-label" id="rsgLabel">Type to analyze</div>
      <div class="rsg-stats" id="rsgStats"></div>
    </div>
    <div class="rsg-text-col">
      <textarea class="rsg-textarea" id="rsgTextarea" spellcheck="false">Every city has one hour when it forgets to be loud. In this town it arrives just after six, when the shops dim their signs and the last bus sighs away from the corner stop. For a few minutes the street belongs to nobody in particular.</textarea>
      <div class="rsg-scale">
        <span class="rsg-dot rsg-dot--hard"></span> 0–29 very hard
        <span class="rsg-dot rsg-dot--mid"></span> 30–59 fairly hard
        <span class="rsg-dot rsg-dot--easy"></span> 60–100 easy
      </div>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}
.rsg-wrap{max-width:820px;margin:0 auto;padding:48px 24px}
.rsg-head{margin-bottom:32px}
.rsg-head h1{font-size:clamp(26px,5vw,36px);letter-spacing:-.02em;margin-bottom:8px}
.rsg-head p{color:#9aa0b8;font-size:14.5px;line-height:1.6;max-width:520px}
.rsg-grid{display:grid;grid-template-columns:220px 1fr;gap:28px}
@media (max-width:640px){.rsg-grid{grid-template-columns:1fr}}
.rsg-gauge-col{background:#12141f;border:1px solid #232a3d;border-radius:16px;padding:20px;display:flex;flex-direction:column;align-items:center;text-align:center}
.rsg-svg{width:100%;max-width:180px}
.rsg-track{fill:none;stroke:#1e2230;stroke-width:14;stroke-linecap:round}
.rsg-arc{fill:none;stroke:#34d399;stroke-width:14;stroke-linecap:round;stroke-dasharray:251.2;stroke-dashoffset:251.2;transition:stroke-dashoffset .4s ease,stroke .4s ease}
.rsg-score{font-size:38px;font-weight:800;letter-spacing:-.02em;margin-top:-8px}
.rsg-label{font-size:12.5px;font-weight:600;color:#9aa0b8;margin-top:2px}
.rsg-stats{margin-top:16px;font-size:11.5px;color:#7d84a0;line-height:1.8;text-align:left;width:100%;border-top:1px solid #232a3d;padding-top:12px}
.rsg-stats span{color:#e6e8f5;font-weight:700}
.rsg-text-col{display:flex;flex-direction:column;gap:10px}
.rsg-textarea{width:100%;min-height:220px;resize:vertical;background:#12141f;border:1px solid #232a3d;border-radius:14px;padding:16px;color:#e6e8f5;font:15px/1.7 system-ui,-apple-system,sans-serif;outline:none}
.rsg-textarea:focus{border-color:#38bdf8}
.rsg-scale{font-size:11.5px;color:#7d84a0;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.rsg-dot{width:9px;height:9px;border-radius:50%;display:inline-block;margin-left:10px}
.rsg-dot:first-child{margin-left:0}
.rsg-dot--hard{background:#f87171}
.rsg-dot--mid{background:#fbbf24}
.rsg-dot--easy{background:#34d399}`,

  js: `const textarea = document.getElementById('rsgTextarea');
const arc = document.getElementById('rsgArc');
const scoreEl = document.getElementById('rsgScore');
const labelEl = document.getElementById('rsgLabel');
const statsEl = document.getElementById('rsgStats');

const ARC_LENGTH = 251.2; // matches the SVG path's real geometric length (a 80-radius semicircle)

// A compact syllable estimator: counts vowel-group transitions per word,
// then applies the standard English heuristics (silent trailing "e",
// "le" endings still counting, and a floor of one syllable per word).
// It won't be perfect on every word, but it tracks well enough in aggregate
// for a live-typing readability estimate — the same approach most
// lightweight readability tools use instead of a full pronunciation dictionary.
function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyze(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const sentenceParts = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentences = Math.max(1, sentenceParts.length);

  const words = trimmed.split(/\\s+/).filter(w => /[a-zA-Z]/.test(w));
  const wordCount = Math.max(1, words.length);

  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  // The real Flesch Reading Ease formula — same one used by Word, Hemingway,
  // and most SEO readability plugins: higher scores mean easier text.
  const score = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);
  const clamped = Math.max(0, Math.min(100, score));

  return {
    score: clamped,
    words: wordCount,
    sentences,
    syllables,
    avgWordsPerSentence: wordCount / sentences,
  };
}

function bandFor(score) {
  if (score >= 60) return { color: '#34d399', label: 'Easy to read' };
  if (score >= 30) return { color: '#fbbf24', label: 'Fairly hard to read' };
  return { color: '#f87171', label: 'Very hard to read' };
}

function render() {
  const stats = analyze(textarea.value);
  if (!stats) {
    arc.style.strokeDashoffset = ARC_LENGTH;
    scoreEl.textContent = '–';
    labelEl.textContent = 'Type to analyze';
    statsEl.innerHTML = '';
    return;
  }

  const { score, words, sentences, syllables, avgWordsPerSentence } = stats;
  const band = bandFor(score);

  // Map the 0-100 score directly onto how much of the semicircle arc is drawn.
  const offset = ARC_LENGTH * (1 - score / 100);
  arc.style.strokeDashoffset = offset;
  arc.style.stroke = band.color;

  scoreEl.textContent = Math.round(score);
  scoreEl.style.color = band.color;
  labelEl.textContent = band.label;

  statsEl.innerHTML =
    '<span>' + words + '</span> words · <span>' + sentences + '</span> sentences · <span>' + syllables + '</span> syllables<br>' +
    '<span>' + avgWordsPerSentence.toFixed(1) + '</span> words per sentence on average';
}

textarea.addEventListener('input', render);
render();`,

  seo: {
    title: 'Readability Score Gauge — Free Live Flesch Reading Ease Meter',
    description: `A gauge that scores any pasted text with the real Flesch Reading Ease formula, recalculating live as you type — with a full breakdown of words, sentences, and syllables. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Readability Score Gauge — A Live, Real Flesch Reading Ease Meter',
      description: `Most "readability score" widgets either hardcode a fake number or hide the formula entirely. This snippet computes a genuine Flesch Reading Ease score from whatever text is typed into it, live, and shows every input the formula actually uses — word count, sentence count, syllable count, and the resulting average sentence length — so the score is legible, not a black box.

**The real formula, not an approximation of one**

The score comes from \`206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)\` — the same Flesch Reading Ease formula used by Microsoft Word's readability statistics, the Hemingway Editor, and most SEO content-scoring plugins. Higher scores mean easier text: 60–100 reads as plain English, 30–59 needs a more attentive reader, and below 30 is dense, technical writing. The formula rewards two things independently — shorter sentences and shorter (fewer-syllable) words — which is why a single long, polysyllabic sentence can drag the score down even in an otherwise simple paragraph.

**Estimating syllables without a dictionary**

There's no built-in browser API for counting English syllables, so \`countSyllables()\` uses a compact heuristic: it counts transitions into vowel groups, strips a silent trailing "e", and floors every word at one syllable. It won't get every irregular word exactly right, but across a real paragraph the small per-word errors average out, which is exactly the tradeoff lightweight readability tools make instead of shipping a full pronunciation dictionary.

**Sentence and word counting, done carefully**

Sentences are split on \`.\`, \`!\`, and \`?\` and filtered for non-empty fragments, with a floor of one sentence so a fragment with no terminal punctuation doesn't divide by zero. Words are split on whitespace and filtered to those containing at least one letter, so stray punctuation or numbers alone don't inflate the count. Both counts are shown directly beneath the gauge, alongside the derived average words-per-sentence — the single number most responsible for a score swinging up or down.

**The arc as a direct read of the score**

The gauge is a single SVG semicircle path with a known, fixed length; the visible \`stroke-dashoffset\` is set to \`ARC_LENGTH * (1 - score / 100)\`, so the filled portion of the arc is a direct, linear read of the 0–100 score — no separate mapping table to keep in sync. The arc's color and the label beneath the number both key off the same three score bands (via \`bandFor()\`), so a glance at color alone tells you which zone the text falls in.

**Customizing it**

Swap in a different readability formula (Gunning Fog, SMOG, Coleman-Liau) by replacing the one calculation inside \`analyze()\` — every other piece (the gauge arc, the band coloring, the stat breakdown) is formula-agnostic. Pair it with an [SEO score meter](/ui-snippets/seo-score-meter/) for a fuller content-quality panel, or a [circular char counter](/ui-snippets/circular-char-counter/) for a simpler companion stat.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A gauge and a pre-filled textarea render with a live score.` },
      { title: 'Edit the text', text: `The gauge, score, and stat breakdown recalculate on every keystroke.` },
      { title: 'Try a long, dense sentence', text: `Watch the score drop and the arc shrink toward the red band.` },
      { title: 'Try short, plain sentences', text: `The score climbs back toward the green band.` },
      { title: 'Read the stat line', text: `See exactly how many words, sentences, and syllables drove the score.` },
      { title: 'Swap the formula', text: `Replace the calculation in analyze() with a different readability metric.` },
    ] },
    features: [
      { title: 'Real Flesch formula', text: `The actual published equation, not a fake or hardcoded score.` },
      { title: 'Live recalculation', text: `Updates on every keystroke via a single input listener.` },
      { title: 'Transparent breakdown', text: `Shows word, sentence, and syllable counts behind the score.` },
      { title: 'Heuristic syllable counting', text: `No dictionary dependency, works entirely client-side.` },
      { title: 'Color-banded arc', text: `Green/amber/red bands map directly to score ranges.` },
      { title: 'Linear SVG mapping', text: `Arc fill is a direct, single-formula read of the 0-100 score.` },
      { title: 'Divide-by-zero safe', text: `Floors sentence and word counts so empty input never crashes.` },
      { title: 'Zero dependencies', text: `Pure vanilla JS, no external API or library.` },
    ],
    useCases: [
      { title: 'Blog and CMS editors', text: 'Show a live Flesch score alongside an [SEO score meter](/ui-snippets/seo-score-meter/), recalculated on every keystroke from the real published formula.' },
      { title: 'Email and newsletter tools', text: 'Flag copy that reads too densely before it is sent, with the word, sentence and syllable counts shown behind the score.' },
      { title: 'Documentation platforms', text: 'Encourage simpler phrasing in technical docs, using a client-side heuristic syllable counter with no dictionary dependency.' },
      { title: 'Marketing copy review', text: 'Check landing-page copy against a target reading level before launch, and see exactly which input moved the score.' },
      { title: 'Educational writing tools', text: 'Give students an objective, explainable measure of their writing, since the formula and every input are visible rather than hidden.' },
    ],
    faqs: [
      { q: 'Is this a real readability formula or just a mock score?', a: `It's the real, published Flesch Reading Ease formula — 206.835 minus 1.015 times the average words per sentence, minus 84.6 times the average syllables per word — the same formula built into Microsoft Word's readability statistics and used by tools like the Hemingway Editor. It is not a hardcoded or randomized number.` },
      { q: 'How accurate is the syllable counting?', a: `It uses a vowel-group heuristic (counting transitions into runs of vowels, adjusting for silent trailing "e") rather than a full pronunciation dictionary, so individual irregular words can be off by one syllable. Across a real paragraph those small errors tend to cancel out, which is the same tradeoff most lightweight, dependency-free readability tools make.` },
      { q: 'What do the score ranges actually mean?', a: `60-100 corresponds to text a general audience finds easy to read (short sentences, short words); 30-59 is fairly difficult, typical of more formal or technical writing; below 30 is very difficult, dense academic or legal-style prose. The gauge's color bands (green, amber, red) map directly to these three ranges.` },
      { q: 'Why floor sentences and words at 1 instead of allowing 0?', a: `The formula divides by both sentence count and word count, so a genuine zero in either denominator would produce Infinity or NaN. Flooring both at 1 keeps the calculation defined for edge cases like a single word with no terminal punctuation, without meaningfully distorting the score for any real paragraph of text.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move analyze() and bandFor() into pure utility functions (they take a string and return plain data, with no DOM access), then call them from your framework's input-change handler or a debounced watcher, and bind the returned score/band to the arc's stroke-dashoffset and stroke color via state instead of direct DOM writes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the Flesch Reading Ease formula weighs sentence length against word length, and why a heuristic vowel-group syllable counter is an acceptable tradeoff compared to a full pronunciation dictionary for a live-typing tool. It's also useful for extending the demo — ask it to add a second gauge for a different formula like Gunning Fog or SMOG so the two scores can be compared side by side, highlight the longest sentence in the textarea as the biggest contributor to a low score, or add a color-coded per-sentence breakdown. Use the conversation to understand exactly which levers (sentence length vs. word complexity) move the score before you decide which one to optimize in your own writing.`,
      prompt: `Build a "readability score gauge" in plain HTML, CSS, and JavaScript — no external libraries or CDNs — that computes a real Flesch Reading Ease score from user-typed text and updates live.

Requirements:
- An SVG semicircle gauge (a track arc plus a colored fill arc using stroke-dasharray/stroke-dashoffset) whose filled portion maps linearly to a 0-100 score, plus a large numeric score display and a text label describing the current band (easy/fairly hard/very hard).
- A textarea pre-filled with a short sample paragraph, wired to an input event listener that recalculates everything on every keystroke.
- Implement the actual Flesch Reading Ease formula: 206.835 - 1.015 * (word count / sentence count) - 84.6 * (syllable count / word count), clamped to the 0-100 range.
- Implement sentence counting by splitting on ./!/? and filtering empty fragments (floored at 1 to avoid divide-by-zero), word counting by splitting on whitespace and filtering to tokens containing at least one letter (floored at 1), and a syllable-counting heuristic that counts vowel-group transitions per word with adjustments for a silent trailing "e" (no external dictionary or API).
- Color the gauge arc and a text label based on three score bands: 60-100 green/easy, 30-59 amber/fairly hard, below 30 red/very hard.
- Display a stat breakdown below or beside the gauge showing the actual word count, sentence count, syllable count, and average words per sentence used to compute the current score, so the formula's inputs are visible rather than hidden behind the number.
- Handle empty input gracefully (show a neutral placeholder state rather than a score of 0 or a crash).`,
    },
  },
};

export default readabilityScoreGauge;
