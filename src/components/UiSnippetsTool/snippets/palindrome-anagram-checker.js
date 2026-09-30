const palindromeAnagramChecker = {
  id: 'palindrome-anagram-checker',
  title: 'Palindrome & Anagram Checker',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Palindrome &amp; Anagram Checker</h2>

  <div class="tabs">
    <button class="tab active" data-tab="palindrome">Palindrome</button>
    <button class="tab" data-tab="anagram">Anagram</button>
  </div>

  <div class="panel active" id="panel-palindrome">
    <label>Text</label>
    <input type="text" id="pal-input" value="A man, a plan, a canal: Panama" spellcheck="false" />
    <div class="result" id="pal-result"></div>
    <div class="visual" id="pal-visual"></div>
  </div>

  <div class="panel" id="panel-anagram">
    <label>Word or phrase A</label>
    <input type="text" id="ana-a" value="listen" spellcheck="false" />
    <label>Word or phrase B</label>
    <input type="text" id="ana-b" value="silent" spellcheck="false" />
    <div class="result" id="ana-result"></div>
    <div class="letters-row" id="letters-row"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 560px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.tabs { display: flex; gap: 4px; background: #e2e8f0; border-radius: 10px; padding: 4px; margin-bottom: 18px; }
.tab { flex: 1; padding: 8px; border: none; background: none; border-radius: 8px; font-size: 12.5px; font-weight: 700; color: #64748b; cursor: pointer; }
.tab.active { background: #fff; color: #1e293b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

.panel { display: none; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
.panel.active { display: block; }

label { display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin: 12px 0 6px; }
label:first-child { margin-top: 0; }
input[type="text"] {
  width: 100%; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: inherit; color: #1e293b;
}
input[type="text"]:focus { outline: none; border-color: #6366f1; }

.result { margin-top: 14px; padding: 12px 14px; border-radius: 10px; font-size: 13.5px; font-weight: 700; background: #f1f5f9; color: #475569; }
.result.pass { background: rgba(34,197,94,0.1); color: #16a34a; }
.result.fail { background: rgba(239,68,68,0.1); color: #dc2626; }

.visual { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; }
.visual span { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 6px; font-family: "SF Mono", Consolas, monospace; font-size: 12px; font-weight: 700; background: #f1f5f9; color: #475569; }
.visual span.match { background: #dcfce7; color: #16a34a; }

.letters-row { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 4px; }
.letters-row .chip { font-family: "SF Mono", Consolas, monospace; font-size: 11.5px; font-weight: 700; padding: 4px 8px; border-radius: 6px; background: #f1f5f9; color: #475569; }
.letters-row .chip.extra { background: rgba(239,68,68,0.12); color: #dc2626; }`,
  js: `function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function checkPalindrome(str) {
  const clean = normalize(str);
  const reversed = clean.split('').reverse().join('');
  return { clean, isPalindrome: clean.length > 0 && clean === reversed };
}

function letterCounts(str) {
  const counts = new Map();
  str.split('').forEach((ch) => counts.set(ch, (counts.get(ch) || 0) + 1));
  return counts;
}

function checkAnagram(a, b) {
  const cleanA = normalize(a);
  const cleanB = normalize(b);
  const countsA = letterCounts(cleanA);
  const countsB = letterCounts(cleanB);

  const allKeys = new Set([...countsA.keys(), ...countsB.keys()]);
  const diffs = [];
  allKeys.forEach((key) => {
    const inA = countsA.get(key) || 0;
    const inB = countsB.get(key) || 0;
    if (inA !== inB) diffs.push({ letter: key, inA, inB });
  });

  return {
    cleanA, cleanB,
    isAnagram: cleanA.length > 0 && cleanB.length > 0 && diffs.length === 0,
    diffs,
  };
}

const palInput = document.getElementById('pal-input');
const palResult = document.getElementById('pal-result');
const palVisual = document.getElementById('pal-visual');

function renderPalindrome() {
  const { clean, isPalindrome } = checkPalindrome(palInput.value);
  if (!clean) {
    palResult.className = 'result';
    palResult.textContent = 'Enter some text to check.';
    palVisual.innerHTML = '';
    return;
  }
  palResult.className = 'result ' + (isPalindrome ? 'pass' : 'fail');
  palResult.textContent = isPalindrome
    ? '"' + clean + '" is a palindrome — reads the same forwards and backwards.'
    : '"' + clean + '" is NOT a palindrome.';

  const n = clean.length;
  palVisual.innerHTML = clean.split('').map((ch, i) => {
    const mirrorMatches = clean[i] === clean[n - 1 - i];
    return '<span class="' + (mirrorMatches ? 'match' : '') + '">' + ch + '</span>';
  }).join('');
}

palInput.addEventListener('input', renderPalindrome);

const anaA = document.getElementById('ana-a');
const anaB = document.getElementById('ana-b');
const anaResult = document.getElementById('ana-result');
const lettersRow = document.getElementById('letters-row');

function renderAnagram() {
  const { cleanA, cleanB, isAnagram, diffs } = checkAnagram(anaA.value, anaB.value);
  if (!cleanA || !cleanB) {
    anaResult.className = 'result';
    anaResult.textContent = 'Enter both words or phrases to compare.';
    lettersRow.innerHTML = '';
    return;
  }
  anaResult.className = 'result ' + (isAnagram ? 'pass' : 'fail');
  anaResult.textContent = isAnagram
    ? '"' + anaA.value.trim() + '" and "' + anaB.value.trim() + '" are anagrams of each other.'
    : '"' + anaA.value.trim() + '" and "' + anaB.value.trim() + '" are NOT anagrams.';

  if (diffs.length === 0) {
    lettersRow.innerHTML = cleanA.split('').sort().map((ch) => '<span class="chip">' + ch + '</span>').join('');
  } else {
    lettersRow.innerHTML = diffs.map((d) =>
      '<span class="chip extra">' + d.letter + ': ' + d.inA + ' vs ' + d.inB + '</span>'
    ).join('');
  }
}

anaA.addEventListener('input', renderAnagram);
anaB.addEventListener('input', renderAnagram);

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

renderPalindrome();
renderAnagram();`,

  seo: {
    title: 'Palindrome & Anagram Checker — Free HTML CSS JS Snippet',
    description: 'Check if text reads the same backwards with a mirrored letter visualization, or if two words are anagrams with a letter-count diff. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Palindrome & Anagram Checker — Normalized Comparison with a Mirror & Letter-Diff Visualization',
      description: `A palindrome check and an anagram check are both, at their core, comparisons of normalized letter sequences — but naive string comparisons trip on spacing, punctuation, and capitalization. "A man, a plan, a canal: Panama" is a genuine palindrome once you ignore spaces, commas, and case, but a plain \`str === str.split('').reverse().join('')\` check on the raw string fails immediately. This snippet normalizes correctly for both checks and visualizes exactly why the result came out the way it did.

**Normalizing before comparing**

Both tools share one \`normalize()\` function: lowercase the string, then strip everything that is not a letter or digit using \`/[^a-z0-9]/g\`. This single normalization step is what makes "A man, a plan, a canal: Panama" collapse to \`amanaplanacanalpanama\` — a string that genuinely does read the same forwards and backwards — instead of failing on the spaces and punctuation that a human reader mentally ignores anyway.

**The palindrome check and its mirror visualization**

\`checkPalindrome()\` reverses the normalized string with \`split('').reverse().join('')\` and compares it against the original. Rather than only reporting true or false, the visual panel renders every character of the normalized string as its own tile, and independently checks whether each character matches its mirror position (\`clean[i] === clean[n-1-i]\`) — so even a near-miss palindrome visibly shows exactly which letters break the symmetry and where, rather than leaving you to manually count from both ends to find the mismatch.

**Anagram checking via letter frequency, not sorted strings**

The classic approach to checking anagrams is sorting both strings' characters and comparing the sorted results — this snippet instead builds a frequency \`Map\` for each normalized input via \`letterCounts()\`, counting how many times every character appears. Two strings are anagrams exactly when every letter that appears in either string appears the same number of times in both — checked by unioning the key sets of both maps with a \`Set\` and comparing counts for every key that appears in either.

**Surfacing exactly which letters differ**

When two inputs are not anagrams, most checkers just say "no." This one goes further: for every letter where the counts in A and B differ, it records the letter and both counts, then renders each as a chip like \`s: 2 vs 1\` — pinpointing precisely which letter is over- or under-represented in which input, which is far more useful for debugging a near-miss ("did I mistype one letter?") than a flat pass/fail.

**Two independent, tab-switched tools sharing one normalization rule**

The palindrome and anagram checkers are visually separated into tabs but deliberately reuse the exact same \`normalize()\` logic, so a phrase treated as case-insensitive and punctuation-stripped in one tool behaves identically in the other — there is only one definition of "the meaningful characters in this text" across the whole snippet.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Switch between Palindrome and Anagram tabs', text: 'Each tool lives in its own tab with independent inputs and results.' },
        { title: 'Type a phrase to check for palindrome', text: 'Spaces, punctuation, and capitalization are ignored automatically — the check runs live as you type.' },
        { title: 'Read the mirror visualization', text: 'Each letter is shown as a tile; green tiles indicate that position matches its mirror position from the other end of the string.' },
        { title: 'Enter two words or phrases to compare', text: 'The anagram tab checks whether both inputs use exactly the same letters the same number of times.' },
        { title: 'Check the letter chips', text: 'A full match shows every normalized letter sorted alphabetically; a mismatch shows exactly which letters differ and by how much.' },
      ],
    },
    features: [
      'Shared normalization (lowercase, strip non-alphanumeric characters) used identically by both tools',
      'Palindrome check correctly handles spacing, punctuation and capitalization, e.g. "A man, a plan, a canal: Panama"',
      'Per-character mirror visualization showing exactly which positions match or break symmetry',
      'Anagram check via letter-frequency Map comparison rather than sorted-string comparison',
      'Precise letter-count diff chips pinpointing exactly which letters and how many are mismatched',
      'Tab-based UI switching between the two independent tools',
      'Live evaluation on every keystroke for both tools',
      'Zero dependencies — pure string, array, and Map operations',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching string normalization and comparison logic', desc: 'Demonstrate why a naive raw-string reverse-and-compare check fails on real palindromic phrases, and why the frequency-map approach to anagrams generalizes better than sorting.' },
      { icon: 'CODE', title: 'Interview and coding-practice reference', desc: 'A working, readable reference implementation of two classic string-algorithm interview questions, useful to study or extend.' },
      { icon: 'APP', title: 'Word game and puzzle utilities', desc: 'Verify anagram-based puzzle answers or palindrome word-game entries instantly without writing throwaway console code.' },
      { icon: 'FLOW', title: 'Debugging a near-miss anagram', desc: 'When two strings almost match, the letter-diff chips immediately show which single letter is over- or under-represented, instead of a flat pass/fail leaving you to guess.' },
      { icon: 'DESIGN', title: 'Small embeddable widget for a puzzle or trivia site', desc: 'Drop into a word-puzzle or trivia page as a self-contained checker widget requiring no backend.' },
    ],
    faqs: [
      { q: 'Does the palindrome checker ignore spaces and punctuation?', a: 'Yes. Both the input text and its reversed form are normalized first — lowercased and stripped of every character that is not a letter or digit — so a phrase like "A man, a plan, a canal: Panama" is correctly recognized as a palindrome.' },
      { q: 'How does the anagram checker work internally?', a: 'It builds a frequency map counting how many times each character appears in each normalized input, then compares those counts for every letter that appears in either string. Two strings are anagrams only if every shared and unshared letter has exactly matching counts on both sides.' },
      { q: 'Why use a frequency map instead of sorting both strings and comparing?', a: 'Both approaches correctly detect anagrams, but the frequency-map approach also makes it straightforward to report exactly which letters differ and by how much when the check fails, which a sorted-string comparison does not directly expose.' },
      { q: 'What counts as a "letter" for these checks?', a: 'Only ASCII letters and digits after lowercasing; spaces, punctuation, and any other symbol are stripped out entirely before either check runs, matching how palindromes and anagrams are conventionally judged in word games.' },
      { q: 'What does a green tile in the mirror visualization mean?', a: 'It means that character\'s position in the normalized string matches the character at its mirrored position counting from the other end — for a full palindrome, every tile is green; for a near-miss, only the tiles that break symmetry are left uncolored.' },
      { q: 'Does it handle numbers, like checking if "12321" is a palindrome?', a: 'Yes. Normalization keeps digits alongside letters, so a numeric palindrome like "12321" or a mixed string like "A1B22B1A" is checked correctly using the same logic as a pure-text phrase.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain why the anagram checker compares letter-frequency maps rather than sorting both strings, and how that approach makes it easy to report exactly which letters differ. It is also a good base to extend: ask for Unicode-aware normalization that handles accented characters (café vs cafe), a "longest palindromic substring" mode for a larger block of text, or an anagram-solver mode that finds real dictionary words matching a given letter set.`,
      prompt: `Build a client-side palindrome and anagram checker in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A tabbed interface switching between a "Palindrome" tool and an "Anagram" tool.
- Both tools must share one normalization function: lowercase the input and strip every character that is not a letter or digit, so spacing, punctuation, and capitalization never affect either result.
- The palindrome tool checks live on every input event whether the normalized text equals its own reverse, and separately renders every normalized character as an individual tile, visually highlighting (e.g. a different background color) each tile whose position matches its mirrored position from the opposite end of the string, even when the overall phrase is not a full palindrome.
- The anagram tool takes two separate text inputs and checks live whether their normalized forms are anagrams of each other by building a letter-frequency count (a map from character to occurrence count) for each input and comparing counts for every letter appearing in either input — do not use a sorted-string-equality approach.
- When the two inputs are not anagrams, display exactly which letters differ and their count in each input (e.g. "s: 2 vs 1"), not just a pass/fail result.
- When they are anagrams, display the shared normalized letters as a sorted list of chips.
- No external libraries — pure JavaScript string, array, and Map operations only.`,
    },
  },
};

export default palindromeAnagramChecker;
