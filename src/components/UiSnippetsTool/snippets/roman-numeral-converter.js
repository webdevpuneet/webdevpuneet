const romanNumeralConverter = {
  id: 'roman-numeral-converter',
  title: 'Roman Numeral Converter',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Roman Numeral Converter</h2>

  <div class="panel">
    <label>Arabic number (1-3999)</label>
    <input type="text" id="arabic-input" spellcheck="false" value="1994" inputmode="numeric" />
    <div class="arrow">converts to</div>
    <div class="roman-output" id="roman-output"></div>
  </div>

  <div class="divider"><span>or convert the other way</span></div>

  <div class="panel">
    <label>Roman numeral</label>
    <input type="text" id="roman-input" spellcheck="false" placeholder="e.g. MCMXCIV" />
    <div class="arrow">converts to</div>
    <div class="arabic-output" id="arabic-output"></div>
  </div>

  <div class="breakdown" id="breakdown"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 28px 20px; }

.wrap { width: 100%; max-width: 420px; background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 24px; }
h2 { font-size: 17px; font-weight: 800; color: #1e293b; margin-bottom: 18px; }

.panel { margin-bottom: 6px; }
label { display: block; font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
input { width: 100%; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 16px; color: #1e293b; }
input:focus { outline: none; border-color: #6366f1; }
input.invalid { border-color: #dc2626; }

.arrow { text-align: center; font-size: 10.5px; color: #cbd5e1; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 8px 0; }

.roman-output, .arabic-output { text-align: center; font-size: 26px; font-weight: 800; color: #4338ca; min-height: 34px; letter-spacing: 0.04em; }
.arabic-output { color: #16a34a; }
.error-text { font-size: 13px; color: #dc2626; font-weight: 600; }

.divider { display: flex; align-items: center; gap: 10px; margin: 20px 0 16px; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.divider span { font-size: 11px; color: #94a3b8; font-weight: 600; white-space: nowrap; }

.breakdown { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; min-height: 20px; }
.chip { font-size: 11px; font-family: "SF Mono", Consolas, monospace; padding: 4px 8px; border-radius: 6px; background: #f1f5f9; color: #475569; font-weight: 700; }`,
  js: `const ROMAN_TABLE = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

const arabicInput = document.getElementById('arabic-input');
const romanOutput = document.getElementById('roman-output');
const romanInput = document.getElementById('roman-input');
const arabicOutput = document.getElementById('arabic-output');
const breakdown = document.getElementById('breakdown');

function toRoman(num) {
  if (num < 1 || num > 3999) return null;
  let result = '';
  let remaining = num;
  for (const [value, symbol] of ROMAN_TABLE) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(str) {
  const cleaned = str.trim().toUpperCase();
  if (!cleaned) return { error: null };
  if (!/^[MDCLXVI]+$/.test(cleaned)) return { error: 'Only the letters M, D, C, L, X, V, I are valid' };

  const values = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let total = 0;
  let prev = 0;
  const parts = [];
  for (let i = cleaned.length - 1; i >= 0; i--) {
    const value = values[cleaned[i]];
    if (value < prev) {
      total -= value;
      parts.unshift('-' + value);
    } else {
      total += value;
      parts.unshift('+' + value);
      prev = value;
    }
  }

  const roundTrip = toRoman(total);
  if (roundTrip !== cleaned) {
    return { error: 'Not a valid standard-form Roman numeral (unusual letter ordering)' };
  }

  return { value: total, parts };
}

function updateFromArabic() {
  const raw = arabicInput.value.trim();
  arabicInput.classList.remove('invalid');
  if (!raw) { romanOutput.innerHTML = ''; return; }

  const num = parseInt(raw, 10);
  if (!/^\\d+$/.test(raw) || Number.isNaN(num)) {
    arabicInput.classList.add('invalid');
    romanOutput.innerHTML = '<span class="error-text">Enter a whole number</span>';
    return;
  }
  const roman = toRoman(num);
  if (!roman) {
    arabicInput.classList.add('invalid');
    romanOutput.innerHTML = '<span class="error-text">Must be between 1 and 3999</span>';
    return;
  }
  romanOutput.textContent = roman;
}

function updateFromRoman() {
  const raw = romanInput.value;
  romanInput.classList.remove('invalid');
  breakdown.innerHTML = '';
  if (!raw.trim()) { arabicOutput.innerHTML = ''; return; }

  const result = fromRoman(raw);
  if (result.error) {
    romanInput.classList.add('invalid');
    arabicOutput.innerHTML = '<span class="error-text">' + result.error + '</span>';
    return;
  }
  arabicOutput.textContent = result.value;
  breakdown.innerHTML = result.parts.map(p => '<span class="chip">' + p + '</span>').join('');
}

arabicInput.addEventListener('input', updateFromArabic);
romanInput.addEventListener('input', updateFromRoman);

updateFromArabic();`,

  seo: {
    title: 'Roman Numeral Converter — Arabic to Roman & Back',
    description: 'Convert numbers to Roman numerals and Roman numerals back to numbers live, using the real subtractive-notation algorithm with validation of standard form. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Roman Numeral Converter — Arabic-to-Roman and Roman-to-Arabic with Subtractive Notation',
      description: `Roman numerals look simple until you have to convert a number like 1994 by hand and remember whether it is \`MCMXCIV\` or some other combination of M, D, C, L, X, V, and I — the subtractive notation rules (where a smaller symbol before a larger one means subtraction, like \`IV\` for 4) trip up even careful hand conversion. This snippet implements both directions with the actual greedy subtraction algorithm and a strict validity check, rather than a lookup table of pre-computed answers.

**Converting Arabic to Roman with a value/symbol table**

\`toRoman()\` walks a table of value/symbol pairs ordered from largest to smallest, including the six subtractive pairs (\`900 → CM\`, \`400 → CD\`, \`90 → XC\`, \`40 → XL\`, \`9 → IX\`, \`4 → IV\`) alongside the seven base symbols. For each pair, it appends the symbol and subtracts its value from the remaining number as many times as that value still fits — a classic greedy algorithm that works because Roman numeral values are specifically structured to make greedy selection always produce the correct, standard-form result. Numbers outside the valid range of 1 to 3999 (the largest number classical Roman numerals can represent without non-standard notation) return \`null\` rather than a wrong answer.

**Converting Roman to Arabic by scanning right to left**

\`fromRoman()\` takes the more interesting direction: converting text back into a number. It scans the cleaned, uppercased input from right to left, tracking the value of the previously seen symbol. If the current symbol's value is *less than* the previous one, it is subtracted (this is what makes \`IV\` mean 4 rather than \`I\` plus \`V\`); otherwise it is added, and becomes the new "previous" reference value. This right-to-left scan with a running comparison is the standard technique for decoding subtractive notation, and it correctly handles every valid Roman numeral without needing to special-case each of the six subtractive pairs individually.

**Validating standard form with a round-trip check**

Not every string of valid Roman letters is a *correctly formed* Roman numeral — \`IIII\` decodes arithmetically to 4 by naive addition, but standard form requires \`IV\`. Rather than writing a separate grammar-validation regex to catch every malformed variant, \`fromRoman()\` takes a simpler and more robust approach: after computing the numeric total, it calls \`toRoman()\` on that same total and compares the result against the original cleaned input. If they do not match exactly, the input was not in standard form, and a specific error is shown instead of a silently accepted but non-canonical answer. This round-trip validation technique — converting forward, then backward, and checking they agree — is a useful general pattern any time validating input directly would require re-implementing significant parts of the format's grammar rules.

**The additive/subtractive breakdown chips**

Below the Roman-to-Arabic result, each individual symbol's contribution is shown as a small chip labeled \`+1000\` or \`-100\`, built from the same right-to-left scan that computed the total. This turns an opaque final number into a visible step-by-step accounting of exactly how each letter in the input contributed — genuinely useful for anyone trying to understand *why* \`MCMXCIV\` equals 1994 rather than just being told that it does.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Enter a number to convert to Roman', text: 'Type any whole number from 1 to 3999 in the top field — the Roman numeral updates live below it.' },
        { title: 'Or enter a Roman numeral to convert to a number', text: 'Type letters M, D, C, L, X, V, I in the second field — the decoded number appears below it.' },
        { title: 'Read the breakdown chips', text: 'Each symbol\'s contribution (added or subtracted) is shown as a chip, explaining exactly how the total was computed.' },
        { title: 'Watch for validation errors', text: 'An out-of-range number, invalid characters, or non-standard Roman form (like IIII instead of IV) is flagged with a specific error message.' },
        { title: 'Try historically famous numbers', text: 'Try 1994 (MCMXCIV), 444 (CDXLIV), or 3999 (MMMCMXCIX) to see the subtractive notation rules in action.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real greedy subtraction algorithm for Arabic-to-Roman conversion, not a lookup table',
      'Right-to-left scanning algorithm correctly decodes subtractive notation (IV, IX, XL, etc.)',
      'Round-trip validation catches non-standard-form input like IIII instead of rejecting or silently accepting it',
      'Supports the full valid classical range of 1 to 3999',
      'Per-symbol breakdown chips show exactly how each letter contributed to the final total',
      'Live bidirectional conversion — both directions update as you type, independently',
      'Clear, specific error messages for out-of-range numbers, invalid letters, or malformed numerals',
      'Zero dependencies, pure vanilla JavaScript',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching Roman numeral rules', desc: 'Use the breakdown chips to visually explain why a number like 1994 becomes MCMXCIV, showing the additive and subtractive contribution of every letter.' },
      { icon: 'CODE', title: 'Verifying a homework or interview coding answer', desc: 'Roman numeral conversion is a classic coding-interview and coursework exercise — use this to check your own hand-written implementation against a working reference.' },
      { icon: 'DESIGN', title: 'Decoding numerals on clocks, monuments, and film credits', desc: 'Quickly decode a Roman numeral date or edition number seen on a clock face, a building cornerstone, or a movie copyright notice.' },
      { icon: 'APP', title: 'Formatting outline or chapter numbering', desc: 'Generate correct Roman numerals for book chapters, legal document sections, or formal event editions (like a Super Bowl number).' },
      { icon: 'FLOW', title: 'Validating Roman numeral input in a form', desc: 'Reference the validation logic here (regex character check plus round-trip standard-form check) when building input validation for a form field expecting Roman numerals.' },
    ],
    faqs: [
      { q: 'Why does the greedy algorithm work for Arabic-to-Roman conversion?', a: 'Roman numeral values are specifically structured (with the six subtractive pairs included in the lookup table) so that always taking the largest applicable value first produces the correct standard-form result. This is a genuine mathematical property of the value/symbol table, not a coincidence.' },
      { q: 'How does the converter handle subtractive notation like IV or IX?', a: 'fromRoman() scans the numeral from right to left while comparing each symbol\'s value to the one before it. When a symbol\'s value is less than the value already accumulated to its right, it is subtracted rather than added, correctly decoding pairs like IV (4) and IX (9).' },
      { q: 'What happens if I type IIII instead of IV?', a: 'IIII decodes arithmetically to 4, but it is not standard Roman numeral form. The tool detects this by converting the computed total back to Roman using toRoman() and comparing it to your original input — since IIII does not round-trip back to itself, it is flagged as non-standard form rather than silently accepted.' },
      { q: 'What is the maximum number this can convert?', a: '3999 (MMMCMXCIX), which is the largest value representable using only the standard seven Roman letters and subtractive notation without resorting to non-standard conventions like an overline for multiplication by 1000.' },
      { q: 'What do the +1000 / -100 style chips mean?', a: 'They show the individual contribution of each letter in your Roman numeral input, in the order they were processed. A positive chip means that value was added to the total; a negative chip means it was subtracted because a smaller-value symbol preceded a larger one, as in IV or CM.' },
      { q: 'Does it accept lowercase Roman numerals?', a: 'Yes. Input is automatically uppercased before validation and conversion, so both mcmxciv and MCMXCIV are treated identically.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why the round-trip validation trick (converting the decoded number back to Roman and comparing strings) is a more robust way to catch non-standard-form numerals like IIII than trying to write a single validating regex for every malformed case. It is also a good base to extend: ask for support for the vinculum (overline) notation used historically for numbers above 3999, a "show all forms from 1 to 20" reference table, or an input field that live-highlights each letter with a different color as you type to visualize the subtractive pairs.`,
      prompt: `Build a bidirectional Roman numeral converter in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- One text input for an Arabic number (1-3999) that converts to a Roman numeral live on every keystroke, using a real greedy algorithm over an ordered value/symbol table that includes the six subtractive pairs (900/CM, 400/CD, 90/XC, 40/XL, 9/IX, 4/IV) alongside the seven base symbols (M, D, C, L, X, V, I) — not a precomputed lookup table of full answers.
- A second, independent text input for a Roman numeral that converts back to an Arabic number live, by scanning the cleaned, uppercased input from right to left and subtracting a symbol's value whenever it is less than the value already accumulated to its right (correctly decoding subtractive pairs like IV and IX), otherwise adding it.
- Validate the Roman-to-Arabic direction two ways: first reject any character that isn't one of M, D, C, L, X, V, I; second, after computing the numeric total, convert that total back to Roman using the same forward algorithm and compare it against the original input — if they don't match exactly, show an error explaining the input isn't in standard Roman numeral form (this catches cases like IIII which arithmetically decodes to 4 but isn't the canonical way to write it).
- Reject Arabic numbers outside the valid 1-3999 range with a clear error message rather than producing an incorrect or empty result.
- Below the Roman-to-Arabic result, show a row of small chips, one per letter processed, each labeled with a plus or minus sign and the numeric value that letter contributed, so the total is explained step by step.`,
    },
  },
};

export default romanNumeralConverter;
