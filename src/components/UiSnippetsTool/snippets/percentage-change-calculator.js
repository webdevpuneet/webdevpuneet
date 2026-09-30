const percentageChangeCalculator = {
  id: 'percentage-change-calculator',
  title: 'Percentage Change Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Percentage Calculator</h2>

  <div class="tabs">
    <button class="tab active" data-tab="change">% Change</button>
    <button class="tab" data-tab="of">X% of Y</button>
    <button class="tab" data-tab="whatpercent">X is what % of Y</button>
  </div>

  <div class="panel active" id="panel-change">
    <div class="row">
      <div class="field"><label>Old value</label><input type="number" id="c-old" value="80" /></div>
      <div class="field"><label>New value</label><input type="number" id="c-new" value="100" /></div>
    </div>
    <div class="result" id="c-result"></div>
  </div>

  <div class="panel" id="panel-of">
    <div class="row">
      <div class="field"><label>Percentage</label><input type="number" id="o-pct" value="15" /></div>
      <div class="field"><label>of value</label><input type="number" id="o-val" value="240" /></div>
    </div>
    <div class="result" id="o-result"></div>
  </div>

  <div class="panel" id="panel-whatpercent">
    <div class="row">
      <div class="field"><label>Value X</label><input type="number" id="w-x" value="45" /></div>
      <div class="field"><label>of value Y</label><input type="number" id="w-y" value="180" /></div>
    </div>
    <div class="result" id="w-result"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 480px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.tabs { display: flex; gap: 4px; background: #e2e8f0; border-radius: 10px; padding: 4px; margin-bottom: 18px; }
.tab { flex: 1; padding: 8px 4px; border: none; background: none; border-radius: 8px; font-size: 11.5px; font-weight: 700; color: #64748b; cursor: pointer; }
.tab.active { background: #fff; color: #1e293b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

.panel { display: none; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
.panel.active { display: block; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field label { display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
.field input {
  width: 100%; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 15px; font-family: "SF Mono", Consolas, monospace; color: #1e293b;
}
.field input:focus { outline: none; border-color: #6366f1; }

.result { margin-top: 16px; padding: 16px; border-radius: 10px; background: #eef2ff; text-align: center; }
.result .big { font-size: 28px; font-weight: 800; color: #4338ca; }
.result .sub { font-size: 12px; color: #64748b; margin-top: 4px; }
.result.negative .big { color: #dc2626; }
.result.positive .big { color: #16a34a; }`,
  js: `function fmt(n) {
  if (!isFinite(n)) return '—';
  const rounded = Math.round(n * 100) / 100;
  return rounded.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const cOld = document.getElementById('c-old');
const cNew = document.getElementById('c-new');
const cResult = document.getElementById('c-result');

function renderChange() {
  const oldV = parseFloat(cOld.value);
  const newV = parseFloat(cNew.value);
  if (isNaN(oldV) || isNaN(newV) || oldV === 0) {
    cResult.className = 'result';
    cResult.innerHTML = '<div class="big">—</div><div class="sub">Old value cannot be zero</div>';
    return;
  }
  const diff = newV - oldV;
  const pct = (diff / Math.abs(oldV)) * 100;
  cResult.className = 'result ' + (pct > 0 ? 'positive' : pct < 0 ? 'negative' : '');
  cResult.innerHTML =
    '<div class="big">' + (pct > 0 ? '+' : '') + fmt(pct) + '%</div>' +
    '<div class="sub">' + fmt(oldV) + ' \\u2192 ' + fmt(newV) + ' (' + (diff > 0 ? '+' : '') + fmt(diff) + ')</div>';
}

const oPct = document.getElementById('o-pct');
const oVal = document.getElementById('o-val');
const oResult = document.getElementById('o-result');

function renderOf() {
  const pct = parseFloat(oPct.value);
  const val = parseFloat(oVal.value);
  if (isNaN(pct) || isNaN(val)) {
    oResult.className = 'result';
    oResult.innerHTML = '<div class="big">—</div><div class="sub">Enter both values</div>';
    return;
  }
  const result = (pct / 100) * val;
  oResult.className = 'result';
  oResult.innerHTML =
    '<div class="big">' + fmt(result) + '</div>' +
    '<div class="sub">' + fmt(pct) + '% of ' + fmt(val) + '</div>';
}

const wX = document.getElementById('w-x');
const wY = document.getElementById('w-y');
const wResult = document.getElementById('w-result');

function renderWhatPercent() {
  const x = parseFloat(wX.value);
  const y = parseFloat(wY.value);
  if (isNaN(x) || isNaN(y) || y === 0) {
    wResult.className = 'result';
    wResult.innerHTML = '<div class="big">—</div><div class="sub">Y cannot be zero</div>';
    return;
  }
  const result = (x / y) * 100;
  wResult.className = 'result';
  wResult.innerHTML =
    '<div class="big">' + fmt(result) + '%</div>' +
    '<div class="sub">' + fmt(x) + ' is ' + fmt(result) + '% of ' + fmt(y) + '</div>';
}

[cOld, cNew].forEach((el) => el.addEventListener('input', renderChange));
[oPct, oVal].forEach((el) => el.addEventListener('input', renderOf));
[wX, wY].forEach((el) => el.addEventListener('input', renderWhatPercent));

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

renderChange();
renderOf();
renderWhatPercent();`,

  seo: {
    title: 'Percentage Change Calculator — Free HTML CSS JS Snippet',
    description: 'Calculate percentage increase or decrease between two numbers, find X% of Y, or find what percent X is of Y, all in one live three-mode calculator. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Percentage Change Calculator — % Increase/Decrease, X% of Y & "X is What % of Y", Live',
      description: `Percentage math has exactly three shapes that come up constantly — how much did something change by, what is a percentage of a number, and what percentage does one number represent of another — and each one uses a subtly different formula that is easy to mix up under pressure. This snippet implements all three as separate live-calculating tabs so the right formula is always applied to the right question.

**Percentage change: signed, and divided by the absolute old value**

The percentage-change formula is \`((new - old) / |old|) * 100\`. Dividing by the *absolute value* of the old number, not the raw old number, matters when the old value is negative — without the absolute value, going from -50 to -25 would compute as a negative percentage change even though the number actually improved (moved closer to zero, or increased). The result keeps its sign: a positive percentage clearly indicates growth, a negative one indicates decline, and the result card's color (green for positive, red for negative) reinforces the direction at a glance without having to parse the sign character.

**Why old value cannot be zero**

Percentage change is mathematically undefined when the old value is zero — going from 0 to any nonzero number is not a finite percentage increase, it is a change from nothing to something. Rather than displaying \`Infinity%\` or \`NaN\`, the calculator explicitly detects a zero old value and shows a clear message instead, which is more honest than a technically-correct-but-meaningless number.

**X% of Y: the simplest and most common percentage question**

This is just \`(percentage / 100) * value\` — used constantly for tips, discounts, and taxes — implemented as its own tab so it never has to be derived by mentally inverting the change formula.

**X is what % of Y: the inverse relationship**

This tab answers a different question from the other two: given two absolute numbers, what percentage does the first represent of the second, computed as \`(x / y) * 100\`. It is easy to reach for the percentage-change formula here by mistake, but that formula measures *change* between two states of the same thing, while this one measures *proportion* between two different quantities — the calculator keeps them as clearly separate tools so the wrong formula is never applied to the wrong question by habit.

**Locale-aware number formatting throughout**

Every result passes through \`fmt()\`, which rounds to two decimal places and formats using \`toLocaleString()\` — so a large result like 12345.6 renders with the browser's locale-appropriate thousands separator (\`12,345.6\` in most English locales) rather than as an unformatted raw number, making every result immediately easier to read at a glance.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Choose the right tab for your question', text: '"% Change" for growth/decline between two numbers, "X% of Y" for a straight percentage of a value, "X is what % of Y" for a proportion between two numbers.' },
        { title: 'Enter the two numbers', text: 'Results update live as you type — no calculate button required.' },
        { title: 'Read the result and direction', text: 'In the % Change tab, a green result means an increase and a red result means a decrease, with the raw difference shown underneath.' },
        { title: 'Watch for the zero-old-value message', text: 'Percentage change from zero is mathematically undefined, so the calculator shows a clear explanation instead of Infinity or NaN.' },
        { title: 'Switch tabs to check a different kind of percentage question', text: 'All three tabs stay independently populated, so you can flip back and forth without losing your inputs.' },
      ],
    },
    features: [
      'Three independent, tab-switched calculators covering every common percentage question',
      'Percentage change formula correctly divides by the absolute old value, handling negative starting numbers correctly',
      'Signed, color-coded result (green for increase, red for decrease) for the change calculator',
      'Explicit, honest handling of undefined cases (old value or denominator of zero) instead of showing Infinity or NaN',
      'Locale-aware number formatting via toLocaleString for readable large results',
      'Live recalculation on every keystroke across all three tabs',
      'Each tab keeps its own state, so switching tabs never loses previously entered values',
      'Zero dependencies — pure arithmetic and DOM updates',
    ],
    useCases: [
      { icon: 'APP', title: 'Analyzing revenue, traffic or metric growth', desc: 'Compare last month\'s number to this month\'s using the % Change tab to get a clean, signed growth or decline percentage for a report.' },
      { icon: 'CODE', title: 'Calculating a discount, tip, or tax amount', desc: 'Use the "X% of Y" tab for straightforward percentage-of-a-value math without reaching for a phone calculator.' },
      { icon: 'LEARN', title: 'Teaching the difference between change and proportion', desc: 'Show why "percentage change" and "what percent is X of Y" are different formulas that answer different questions, a common point of confusion.' },
      { icon: 'FLOW', title: 'Grading or scoring calculations', desc: 'Use "X is what % of Y" to quickly convert a raw score out of a total into a percentage.' },
      { icon: 'DASH', title: 'Quick reference during financial planning', desc: 'Check how a price, budget line, or investment value has moved between two points in time without opening a spreadsheet.' },
    ],
    faqs: [
      { q: 'What formula does the % Change tab use?', a: 'It computes ((new value minus old value) divided by the absolute value of the old value) times 100. Using the absolute value of the old number keeps the result meaningful even when the old value itself is negative.' },
      { q: 'Why does the % Change tab show an error when the old value is zero?', a: 'Percentage change from zero is mathematically undefined, since you would be dividing by zero. Rather than displaying Infinity or NaN, the calculator explicitly detects this case and shows a clear message.' },
      { q: 'What is the difference between "X% of Y" and "X is what % of Y"?', a: '"X% of Y" starts with a known percentage and a known value and finds the resulting amount, like calculating a 15% tip on a $240 bill. "X is what % of Y" starts with two known amounts and finds what percentage relationship they have, like finding what percent 45 is of 180. They are inverse operations answering different questions.' },
      { q: 'Does a negative result in the % Change tab mean I made an error?', a: 'No — a negative result correctly indicates a decrease from the old value to the new value, and is intentionally shown in red as a visual cue. A positive, green result indicates an increase.' },
      { q: 'How are large numbers formatted in the results?', a: 'Every result is rounded to two decimal places and passed through toLocaleString(), which adds locale-appropriate thousands separators (like commas in most English locales) to make larger numbers easier to read at a glance.' },
      { q: 'Can I use negative numbers in any of the three calculators?', a: 'Yes, all three fields accept negative numbers where mathematically meaningful. The % Change tab in particular is specifically designed to handle a negative old value correctly by dividing by its absolute value rather than the signed value.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why the percentage-change formula divides by the absolute value of the old number rather than the raw old number, and walk through what would go wrong with a negative starting value if that absolute value were omitted. It is also a good base to extend: ask for a "percentage point difference" mode (the raw difference between two percentages, as opposed to a percentage change of a percentage), a compound percentage-change chain calculator for multiple sequential changes, or a shareable URL that encodes the current tab and inputs as query parameters.`,
      prompt: `Build a client-side percentage calculator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A tabbed interface with three independent calculators: "% Change" (percentage increase or decrease between an old and new value), "X% of Y" (a percentage of a value), and "X is what % of Y" (what percentage one number represents of another).
- Each tab has its own two number inputs and recalculates live on every input event, independently of the other tabs, so switching tabs never loses previously entered values.
- The % Change calculator must compute ((new value - old value) / absolute value of old value) * 100, correctly handling a negative old value, and must show a clear explanatory message instead of a numeric result (never Infinity or NaN) when the old value is zero.
- The % Change result must be visually color-coded: a distinct color for a positive (increase) result and a different distinct color for a negative (decrease) result, along with the raw numeric difference shown underneath.
- The "X% of Y" calculator computes (percentage / 100) * value.
- The "X is what % of Y" calculator computes (X / Y) * 100, with a clear message instead of a numeric result when Y is zero.
- Format every numeric result using toLocaleString with a maximum of 2 decimal places so large results include locale-appropriate thousands separators.`,
    },
  },
};

export default percentageChangeCalculator;
