const recipeServingScalerCard = {
  id: 'recipe-serving-scaler-card',
  title: 'Recipe Card with Serving Scaler',
  category: 'cards',
  html: `<div class="wrap">
  <div class="recipe-card">
    <div class="recipe-photo">
      <span class="recipe-tag">30 min</span>
    </div>
    <div class="recipe-body">
      <h2>Creamy Garlic Parmesan Pasta</h2>
      <p class="recipe-sub">A weeknight pasta with a silky garlic-parmesan sauce.</p>

      <div class="serving-row">
        <span class="serving-label">Servings</span>
        <div class="stepper">
          <button class="step-btn" id="dec" aria-label="Decrease servings">−</button>
          <span class="serving-count" id="count">4</span>
          <button class="step-btn" id="inc" aria-label="Increase servings">+</button>
        </div>
      </div>

      <ul class="ingredients" id="ingredients"></ul>

      <div class="nutrition">
        <div class="nut-item"><span class="nut-val" id="nutCal">560</span><span class="nut-label">kcal</span></div>
        <div class="nut-item"><span class="nut-val" id="nutProtein">22g</span><span class="nut-label">protein</span></div>
        <div class="nut-item"><span class="nut-val" id="nutCarbs">61g</span><span class="nut-label">carbs</span></div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.wrap { width: 100%; max-width: 380px; }
.recipe-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 18px 44px rgba(15,23,42,0.12); border: 1px solid #f1f5f9; }

.recipe-photo { height: 150px; background: linear-gradient(135deg, #fbbf24, #f97316 55%, #ea580c); position: relative; display: flex; align-items: flex-end; padding: 12px; }
.recipe-tag { background: rgba(15,23,42,0.55); color: #fff; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 999px; backdrop-filter: blur(4px); }

.recipe-body { padding: 20px 22px 22px; }
.recipe-body h2 { font-size: 18px; font-weight: 800; color: #0f172a; line-height: 1.3; }
.recipe-sub { font-size: 13px; color: #64748b; margin-top: 4px; margin-bottom: 16px; line-height: 1.5; }

.serving-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #f8fafc; border-radius: 12px; margin-bottom: 14px; }
.serving-label { font-size: 12.5px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.04em; }
.stepper { display: flex; align-items: center; gap: 12px; }
.step-btn { width: 28px; height: 28px; border-radius: 8px; border: none; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.12); color: #f97316; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.1s, background 0.12s; }
.step-btn:hover { background: #fff7ed; }
.step-btn:active { transform: scale(0.9); }
.serving-count { font-size: 16px; font-weight: 800; color: #0f172a; min-width: 18px; text-align: center; font-variant-numeric: tabular-nums; }

.ingredients { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
.ingredients li { display: flex; align-items: baseline; gap: 8px; font-size: 13.5px; color: #334155; padding-bottom: 9px; border-bottom: 1px dashed #f1f5f9; }
.ingredients li:last-child { border-bottom: none; padding-bottom: 0; }
.ing-qty { font-weight: 800; color: #ea580c; min-width: 58px; flex-shrink: 0; font-variant-numeric: tabular-nums; transition: color 0.15s; }
.ing-qty.pulse { color: #16a34a; }
.ing-name { color: #475569; }

.nutrition { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.nut-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.nut-val { font-size: 14px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; }
.nut-label { font-size: 10.5px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }`,
  js: `// Base quantities are all defined for BASE_SERVINGS — every other serving count
// is derived by scaling this array, never by editing text directly.
var BASE_SERVINGS = 4;
var INGREDIENTS = [
  { qty: 12, unit: 'oz', name: 'fettuccine pasta' },
  { qty: 3, unit: 'tbsp', name: 'butter' },
  { qty: 4, unit: 'cloves', name: 'garlic, minced' },
  { qty: 1, unit: 'cup', name: 'heavy cream' },
  { qty: 0.75, unit: 'cup', name: 'grated parmesan' },
  { qty: 0.5, unit: 'tsp', name: 'black pepper' },
  { qty: 2, unit: 'tbsp', name: 'chopped parsley' },
];
var BASE_NUTRITION = { cal: 560, protein: 22, carbs: 61 };

var servings = BASE_SERVINGS;
var MIN_SERVINGS = 1;
var MAX_SERVINGS = 12;

function formatQty(n) {
  // Round to a friendly fraction-like decimal: whole numbers stay whole,
  // otherwise show at most 2 decimal places with trailing zeros trimmed.
  var rounded = Math.round(n * 100) / 100;
  return rounded % 1 === 0 ? String(rounded) : rounded.toFixed(2).replace(/0+$/, '').replace(/\\.$/, '');
}

function render(animate) {
  var scale = servings / BASE_SERVINGS;
  document.getElementById('count').textContent = servings;

  var list = document.getElementById('ingredients');
  list.innerHTML = INGREDIENTS.map(function (ing) {
    var scaledQty = formatQty(ing.qty * scale);
    return '<li><span class="ing-qty">' + scaledQty + ' ' + ing.unit + '</span><span class="ing-name">' + ing.name + '</span></li>';
  }).join('');

  document.getElementById('nutCal').textContent = Math.round(BASE_NUTRITION.cal * scale);
  document.getElementById('nutProtein').textContent = Math.round(BASE_NUTRITION.protein * scale) + 'g';
  document.getElementById('nutCarbs').textContent = Math.round(BASE_NUTRITION.carbs * scale) + 'g';

  if (animate) {
    document.querySelectorAll('.ing-qty').forEach(function (el) {
      el.classList.add('pulse');
      setTimeout(function () { el.classList.remove('pulse'); }, 260);
    });
  }
}

document.getElementById('inc').addEventListener('click', function () {
  if (servings >= MAX_SERVINGS) return;
  servings++;
  render(true);
});
document.getElementById('dec').addEventListener('click', function () {
  if (servings <= MIN_SERVINGS) return;
  servings--;
  render(true);
});

render(false);`,
  seo: {
    title: 'Recipe Card with Serving Scaler — Free HTML CSS JS Snippet',
    description: 'A recipe card that recalculates every ingredient quantity and nutrition value live as you step the serving count up or down. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Recipe Card with Serving Scaler — Proportional Ingredient Math & Live Nutrition Recalculation',
      description: `Printed recipes are locked to whatever serving count the author happened to cook for, which means doubling a recipe for guests or halving it for a solo dinner requires doing the fraction math in your head over the sink. This card removes that friction: a plus/minus stepper next to "Servings" recalculates every single ingredient quantity — and the calorie, protein, and carb totals — the moment the count changes, all derived from one base data array instead of being retyped by hand.

**Base quantities, not base text**

The trick that makes this work is that \`INGREDIENTS\` never stores display strings like "12 oz" — it stores a plain \`qty\` number plus a \`unit\` and \`name\`, all defined for a fixed \`BASE_SERVINGS\` of 4. A \`scale\` factor of \`servings / BASE_SERVINGS\` is computed once per render, and every ingredient's displayed quantity is \`ing.qty * scale\`, formatted only at the last step. Because the source numbers are never touched, scaling up to 12 servings and back down to 1 produces exactly the same numbers you started with — no accumulated rounding drift from repeatedly editing displayed text.

**Friendly quantity formatting**

Multiplying 0.75 cups by 1.5 servings gives 1.125, which is not a number anyone wants to read at a glance. \`formatQty()\` rounds to two decimal places and trims a needless trailing zero or dangling decimal point, so the card shows "1.13" rather than "1.125" or "1.1250000000000002" (the kind of floating-point artifact that shows up if you multiply and display without any rounding step at all).

**Nutrition scales too, not just ingredients**

\`BASE_NUTRITION\` holds calorie, protein, and carb totals for the same base serving count, and they're scaled by the identical \`scale\` factor used for ingredients — so the nutrition panel at the bottom of the card always describes the batch currently shown above it, not the original 4-serving version. This matters for a card that might get screenshotted or printed at a scaled-up serving count; stale nutrition numbers next to correctly-scaled ingredients would be actively misleading.

**A pulse instead of a jump**

Every \`.ing-qty\` briefly gets a \`.pulse\` class (a quick color shift, cleared via \`setTimeout\`) whenever the servings change, so a viewer's eye is drawn to the fact that the numbers just updated rather than having them silently swap while attention is on the stepper buttons.

**Clamped stepper bounds**

\`MIN_SERVINGS\` and \`MAX_SERVINGS\` (1 and 12 in the demo) prevent the stepper from producing a zero, negative, or absurdly large serving count. In a real recipe app you'd likely tune the upper bound to whatever batch size your kitchen equipment or pot size can realistically handle — a stand mixer bowl or a stockpot has a hard physical ceiling that a UI limit should reflect.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click + or − on the servings stepper', text: 'Every ingredient quantity and the calorie/protein/carb totals recalculate instantly and pulse briefly to draw the eye.' },
        { title: 'Edit the base ingredients', text: 'Update the INGREDIENTS array — each item has a qty number (for BASE_SERVINGS), a unit string, and a name string.' },
        { title: 'Change the base serving count', text: 'Set BASE_SERVINGS to whatever count your original recipe quantities were written for; all scaling math is relative to it.' },
        { title: 'Adjust the min/max stepper range', text: 'Edit MIN_SERVINGS and MAX_SERVINGS to fit realistic batch sizes for your recipe.' },
        { title: 'Update the nutrition base values', text: 'Set BASE_NUTRITION.cal/protein/carbs to the totals for BASE_SERVINGS — they scale with the same factor as ingredients.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Plus/minus stepper recalculates every ingredient from one base data array, not by editing text',
      'Quantities scale by servings / BASE_SERVINGS so repeated up/down stepping never drifts',
      'formatQty() trims floating-point noise into a clean, human-readable decimal',
      'Nutrition panel (calories, protein, carbs) scales with the exact same factor as ingredients',
      'Brief pulse animation on every ingredient quantity when servings change',
      'Clamped MIN/MAX serving bounds prevent zero or unrealistically large batches',
      'font-variant-numeric: tabular-nums keeps scaling digits from jittering horizontally',
      'Pure vanilla JS with one render() function as the single source of DOM truth',
    ],
    useCases: [
      { icon: 'APP', title: 'Recipe and cooking apps', desc: 'The core use case — a recipe detail page where home cooks adjust batch size for however many people they are feeding.' },
      { icon: 'FLOW', title: 'Meal-prep and batch-cooking planners', desc: 'Scale a base recipe up to a week\'s worth of meal-prep portions without manual fraction math for every ingredient.' },
      { icon: 'FORM', title: 'Restaurant and catering back-of-house tools', desc: 'Scale a prep recipe from a per-plate quantity to a full catering order size, keeping ingredient ratios exact.' },
      { icon: 'LEARN', title: 'Learn proportional-scaling UI patterns', desc: 'A clean example of deriving every displayed number from one scale factor computed against a fixed base — the same technique applies to unit converters or dosage calculators.' },
      { icon: 'DESIGN', title: 'Print-ready recipe cards', desc: 'Let a user dial in the exact serving count before printing or exporting a shopping list, so quantities on paper match what they actually plan to cook.' },
      { icon: 'CODE', title: 'Grocery list generators', desc: 'Feed the scaled INGREDIENTS array straight into a shopping-list builder so the list always matches the currently selected serving count.' },
    ],
    faqs: [
      { q: 'Why store qty as a plain number instead of a formatted string like "3/4 cup"?', a: 'Storing a plain number lets scale multiplication (qty * scale) work correctly for any serving count. If quantities were stored as pre-formatted strings like "3/4 cup", scaling them would require parsing fractions out of text, which is far more error-prone than multiplying a number.' },
      { q: 'How does the card avoid showing ugly floating-point results?', a: 'formatQty() rounds to two decimal places with Math.round(n * 100) / 100, then strips a trailing zero or trailing decimal point with a regex, so 1.125 displays as 1.13 rather than a long floating-point decimal.' },
      { q: 'Does the nutrition panel scale automatically too?', a: 'Yes — BASE_NUTRITION values are multiplied by the same scale factor (servings / BASE_SERVINGS) used for ingredients, inside the same render() call, so nutrition and ingredients always describe the same batch size.' },
      { q: 'How do I support fractional units like cups and teaspoons more precisely?', a: 'The current formatting shows decimals rather than fractions (e.g. 0.5 rather than 1/2). To show fractions, add a small decimal-to-fraction lookup (0.25 → "1/4", 0.5 → "1/2", 0.75 → "3/4") in formatQty() before falling back to a decimal for values that do not match a common fraction.' },
      { q: 'Can I set a maximum batch size the stepper cannot exceed?', a: 'Yes — MAX_SERVINGS already clamps the increment button; the click handler returns early once servings reaches it. Lower or raise the constant to match a realistic limit for your recipe or equipment.' },
      { q: 'How would I use this in React?', a: 'Keep servings in useState(BASE_SERVINGS), compute scale with useMemo, and map INGREDIENTS to <li> elements using the scaled quantity inline — the same formatQty logic ports directly into the render function.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why ingredient quantities are stored as base numbers and scaled on every render, rather than being edited directly when the stepper changes — and what would break if the code multiplied the currently-displayed number instead of always scaling from the original base value. The same assistant can help optimize it, for instance suggesting a proper fraction-formatting helper so 0.5 cup reads as "1/2 cup" instead of a decimal. It's also useful for extending the card: ask it to add a unit-system toggle between imperial and metric, wire the scaled ingredient list into a "add to shopping list" button, or persist the last-selected serving count in localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "recipe card with a serving-size scaler" in plain HTML, CSS, and JavaScript — no framework, no library.

Requirements:
- Store the ingredient list as a plain JavaScript array of objects, each with a base quantity number, a unit string, and a name string, all defined for one fixed base serving count constant — never store quantities as pre-formatted text.
- A plus/minus stepper control that increases or decreases a current-servings number within a sensible clamped minimum and maximum range (do not allow it to go to zero or below, or above a realistic upper bound).
- Every time the stepper changes, recompute a single scale factor (current servings divided by the base serving count) and use it to derive every ingredient's displayed quantity fresh from its original base quantity — never mutate or accumulate changes onto a previously displayed number, so scaling up and back down always returns to the exact original values.
- Round and format the scaled quantities so they never show long floating-point artifacts (like 1.1250000000000002) — round to at most two decimal places and strip an unnecessary trailing zero or decimal point.
- Include a small nutrition summary (at least calories, protein, and carbs) that is defined for the same base serving count and scales using the identical scale factor as the ingredients, in the same update.
- Briefly animate (a short color pulse is sufficient) each ingredient quantity whenever it changes, so the update is noticeable rather than silent.`,
    },
  },
};

export default recipeServingScalerCard;
