const bmiCalculator = {
  id: 'bmi-calculator',
  title: 'BMI Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <div class="card">
    <h2 class="heading">BMI Calculator</h2>
    <div class="unit-toggle">
      <button class="unit-btn active" onclick="setUnit(this,'metric')">Metric</button>
      <button class="unit-btn" onclick="setUnit(this,'imperial')">Imperial</button>
    </div>
    <div class="fields">
      <div class="field">
        <label class="label">Height</label>
        <div class="metric-h">
          <div class="input-wrap"><input class="input" id="cm" type="number" value="175" oninput="calc()"><span class="suffix">cm</span></div>
        </div>
        <div class="imperial-h" style="display:none">
          <div class="input-wrap"><input class="input" id="ft" type="number" value="5" oninput="calc()"><span class="suffix">ft</span></div>
          <div class="input-wrap"><input class="input" id="in" type="number" value="9" oninput="calc()"><span class="suffix">in</span></div>
        </div>
      </div>
      <div class="field">
        <label class="label">Weight</label>
        <div class="input-wrap"><input class="input" id="weight" type="number" value="70" oninput="calc()"><span class="suffix" id="wUnit">kg</span></div>
      </div>
    </div>
    <div class="result">
      <div class="gauge">
        <div class="gauge-track">
          <div class="gauge-fill" id="gaugeFill"></div>
          <div class="gauge-marker" id="marker"></div>
        </div>
        <div class="gauge-labels">
          <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
        </div>
      </div>
      <div class="score">
        <span class="score-num" id="bmiVal">22.9</span>
        <span class="score-cat" id="bmiCat">Normal weight</span>
      </div>
      <div class="advice" id="advice">Your weight is in the healthy range for your height. Keep it up!</div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f0fdfa; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 420px; }
.card { background: #fff; border-radius: 22px; box-shadow: 0 10px 40px rgba(13,148,136,0.1); padding: 28px; }
.heading { font-size: 19px; font-weight: 800; color: #134e4a; margin-bottom: 18px; }
.unit-toggle { display: flex; background: #f1f5f9; border-radius: 12px; padding: 4px; margin-bottom: 22px; }
.unit-btn { flex: 1; padding: 9px 0; border: none; background: none; border-radius: 9px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.15s; }
.unit-btn.active { background: #fff; color: #0d9488; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.fields { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
.field { display: flex; flex-direction: column; }
.label { font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 8px; }
.metric-h, .imperial-h { display: flex; gap: 10px; }
.imperial-h .input-wrap { flex: 1; }
.input-wrap { display: flex; align-items: center; border: 1.5px solid #e2e8f0; border-radius: 12px; overflow: hidden; transition: border-color 0.15s; flex: 1; }
.input-wrap:focus-within { border-color: #0d9488; }
.input { flex: 1; border: none; outline: none; padding: 13px 14px; font-size: 17px; font-weight: 700; color: #134e4a; width: 100%; }
.suffix { padding: 0 14px 0 4px; font-size: 14px; font-weight: 700; color: #94a3b8; }
.result { border-top: 1px solid #f1f5f9; padding-top: 22px; }
.gauge { margin-bottom: 20px; }
.gauge-track { position: relative; height: 10px; border-radius: 5px; background: linear-gradient(90deg,#60a5fa 0%,#60a5fa 18%,#34d399 18%,#34d399 50%,#fbbf24 50%,#fbbf24 70%,#f87171 70%,#f87171 100%); margin-bottom: 8px; }
.gauge-marker { position: absolute; top: 50%; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 3px solid #134e4a; transform: translate(-50%,-50%); transition: left 0.4s cubic-bezier(0.34,1.56,0.64,1); box-shadow: 0 2px 6px rgba(0,0,0,0.2); left: 45%; }
.gauge-fill { display: none; }
.gauge-labels { display: flex; justify-content: space-between; font-size: 10px; color: #94a3b8; font-weight: 600; }
.score { display: flex; flex-direction: column; align-items: center; margin-bottom: 16px; }
.score-num { font-size: 48px; font-weight: 900; color: #134e4a; line-height: 1; font-variant-numeric: tabular-nums; }
.score-cat { font-size: 15px; font-weight: 700; margin-top: 6px; }
.score-cat.under { color: #2563eb; }
.score-cat.normal { color: #059669; }
.score-cat.over { color: #d97706; }
.score-cat.obese { color: #dc2626; }
.advice { font-size: 13px; color: #64748b; text-align: center; line-height: 1.6; background: #f8fafc; border-radius: 12px; padding: 12px 16px; }`,
  js: `var unit = 'metric';

function calc() {
  var weight = parseFloat(document.getElementById('weight').value) || 0;
  var hM;
  if (unit === 'metric') {
    hM = (parseFloat(document.getElementById('cm').value) || 0) / 100;
  } else {
    var ft = parseFloat(document.getElementById('ft').value) || 0;
    var inch = parseFloat(document.getElementById('in').value) || 0;
    hM = (ft * 12 + inch) * 0.0254;
    weight = weight * 0.453592;
  }

  if (hM <= 0 || weight <= 0) return;
  var bmi = weight / (hM * hM);

  var cat, cls, advice, pos;
  if (bmi < 18.5) {
    cat = 'Underweight'; cls = 'under';
    advice = 'You may benefit from gaining a little weight. Consider speaking with a healthcare provider.';
    pos = (bmi / 18.5) * 18;
  } else if (bmi < 25) {
    cat = 'Normal weight'; cls = 'normal';
    advice = 'Your weight is in the healthy range for your height. Keep it up!';
    pos = 18 + ((bmi - 18.5) / 6.5) * 32;
  } else if (bmi < 30) {
    cat = 'Overweight'; cls = 'over';
    advice = 'A small amount of weight loss could move you into the healthy range.';
    pos = 50 + ((bmi - 25) / 5) * 20;
  } else {
    cat = 'Obese'; cls = 'obese';
    advice = 'Consider a plan with a healthcare provider to reduce health risks.';
    pos = Math.min(98, 70 + ((bmi - 30) / 10) * 30);
  }

  document.getElementById('bmiVal').textContent = bmi.toFixed(1);
  var catEl = document.getElementById('bmiCat');
  catEl.textContent = cat;
  catEl.className = 'score-cat ' + cls;
  document.getElementById('advice').textContent = advice;
  document.getElementById('marker').style.left = Math.max(2, Math.min(98, pos)) + '%';
}

function setUnit(btn, u) {
  if (u === unit) return;
  unit = u;
  document.querySelectorAll('.unit-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.querySelector('.metric-h').style.display = u === 'metric' ? 'flex' : 'none';
  document.querySelector('.imperial-h').style.display = u === 'imperial' ? 'flex' : 'none';
  document.getElementById('wUnit').textContent = u === 'metric' ? 'kg' : 'lb';
  var w = document.getElementById('weight');
  w.value = u === 'imperial' ? Math.round(parseFloat(w.value) / 0.453592) : Math.round(parseFloat(w.value) * 0.453592);
  calc();
}

calc();`,
  seo: {
    title: 'BMI Calculator — Free HTML CSS JS Snippet',
    description: 'Body mass index calculator with metric/imperial toggle, animated category gauge, and health advice. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'BMI Calculator — Metric/Imperial Toggle, Category Gauge & Health Advice',
      description: `A BMI (body mass index) calculator is a staple health and fitness widget with consistently high search demand — built like the finance-focused [mortgage](/ui-snippets/mortgage-calculator/) and [tip](/ui-snippets/tip-calculator/) calculators. This snippet provides a polished BMI calculator with a metric/imperial unit toggle, height and weight inputs that adapt to the selected unit system, a colour-coded category gauge with an animated marker, a large BMI score, the WHO weight category, and a tailored advice message.\n\n**The BMI formula and unit conversion**\n\nBMI is weight in kilograms divided by height in metres squared: BMI = kg / m². The calculator always computes in metric internally. When imperial mode is active, it converts feet and inches to metres (total inches × 0.0254) and pounds to kilograms (lb × 0.453592) before applying the formula. This single-internal-unit approach avoids maintaining two separate formulas and keeps the category thresholds identical across unit systems.\n\n**The unit toggle and value conversion**\n\nsetUnit() switches between metric and imperial — a two-option [segmented control](/ui-snippets/segmented-control/) — by toggling which height input group is visible (a single cm field versus separate ft and in fields) and updating the weight suffix label. Critically, it also converts the existing weight value so the number stays physically equivalent when switching — 70 kg becomes roughly 154 lb rather than being read as 70 lb. This preserves the user\'s entry instead of silently changing their data.\n\n**The category gauge**\n\nThe gauge track is a single CSS linear-gradient with hard colour stops at the WHO BMI boundaries: blue for underweight (under 18.5), green for normal (18.5–25), amber for overweight (25–30), and red for obese (30+). The marker\'s horizontal position is calculated within each category band so it lands proportionally — a BMI of 21.75 sits halfway through the green zone. The marker animates with a spring-like cubic-bezier easing for a satisfying settle.\n\n**Category logic and advice**\n\nThe four WHO categories drive both the colour class on the score label and a context-appropriate advice message. The advice is intentionally non-alarming and points users toward healthcare providers for the underweight and obese ranges rather than making specific medical claims — an important consideration for any health-related tool that must avoid giving prescriptive medical advice.\n\n**Accessibility and edge cases**\n\nThe calc() function guards against zero or negative height and weight to prevent NaN or Infinity in the display. The marker position is clamped between 2% and 98% so it never overflows the gauge track at extreme values. BMI displays to one decimal place via toFixed(1), the standard precision for the metric.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Choose your unit system', text: 'Toggle between Metric (cm, kg) and Imperial (ft/in, lb). Your existing weight value converts automatically so you do not have to re-enter it.' },
      { title: 'Enter your height', text: 'In metric, type your height in centimetres. In imperial, enter feet and inches in the two separate fields.' },
      { title: 'Enter your weight', text: 'Type your weight in the unit shown (kg or lb). The BMI recalculates instantly as you type.' },
      { title: 'Read your BMI and category', text: 'The large number is your BMI. The coloured label shows your WHO weight category, and the gauge marker animates to your position on the scale.' },
      { title: 'Review the advice', text: 'A short, non-prescriptive message gives general guidance based on your category. For any health decisions, consult a healthcare provider.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useState for unit, height, and weight. Click "Vue" for a Vue 3 SFC with a computed BMI property.' },
    ]},
    features: ['BMI = kg/m² with automatic imperial-to-metric conversion','Metric/imperial toggle that converts the existing weight value on switch','WHO category thresholds: underweight, normal, overweight, obese','CSS linear-gradient gauge with hard colour stops at category boundaries','Animated marker with spring cubic-bezier easing','Context-appropriate, non-prescriptive advice per category','Zero/negative input guards prevent NaN and Infinity','Marker position clamped to 2–98% so it never overflows the track'],
    useCases: [
      { icon: 'APP', title: 'Health and fitness app onboarding metric', desc: 'Capture height and weight during fitness app sign-up and show the user their starting BMI. Store the values to track BMI changes over time and chart progress. The unit toggle respects regional preferences without forcing users to convert in their head.' },
      { icon: 'CHART', title: 'Wellness landing page lead magnet', desc: 'BMI calculators draw consistent organic search traffic. Use it as a free tool on a nutrition coaching or gym landing page, then follow the result with a tailored CTA — a meal plan for the overweight range, a strength program for the normal range — to convert visitors into leads.' },
      { icon: 'FLOW', title: 'Telehealth intake and patient screening form', desc: 'Embed in a patient intake flow to compute BMI as part of the medical history. Pass the value to the provider dashboard. Because the tool avoids prescriptive claims, it fits within the informational scope appropriate for pre-consultation screening.' },
      { icon: 'CODE', title: 'Extend with body fat, BMR, and ideal weight', desc: 'Add age and sex inputs to compute BMR (basal metabolic rate) via the Mifflin-St Jeor equation, estimate body fat percentage, or show an ideal weight range for the user\'s height. The same unit-conversion layer feeds all of these derived metrics.' },
      { icon: 'LEARN', title: 'Study unit conversion and gauge visualisation', desc: 'The snippet is a clean example of normalising mixed-unit input to a single internal system, mapping a continuous value onto a banded colour scale, and positioning an animated marker proportionally within bands. These patterns apply to any scored or rated metric — credit scores, air quality indices, performance grades.' },
      { icon: 'DESIGN', title: 'Insurance or corporate wellness self-assessment', desc: 'Include in a corporate wellness portal or insurance health questionnaire as a self-service check. Aggregate anonymised results to report population health trends, while each employee sees only their own private result computed entirely in the browser.' },
      { icon: 'CODE', title: 'Related: Cascading Select', desc: 'See the [Cascading Select](/ui-snippets/cascading-select/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is BMI calculated and what do the categories mean?', a: 'BMI is body weight in kilograms divided by height in metres squared (kg/m²). The World Health Organisation categories are: underweight below 18.5, normal weight 18.5 to 24.9, overweight 25 to 29.9, and obese 30 and above. The snippet computes everything in metric internally and converts imperial inputs before applying the formula, so the thresholds are identical regardless of which unit system you use.' },
      { q: 'Why does the weight value change when I switch units?', a: 'It is converting your entry to keep it physically equivalent. When you switch from metric to imperial, 70 kg becomes about 154 lb — the same actual weight expressed in a different unit. Without this conversion, the field would read 70 lb, which is a completely different (and physically implausible) weight, and your BMI would jump incorrectly. The conversion preserves your real measurement across the toggle.' },
      { q: 'Is BMI an accurate measure of health?', a: 'BMI is a useful population-level screening tool but has known limitations for individuals. It does not distinguish muscle from fat, so very muscular athletes can register as overweight despite low body fat, and it does not account for fat distribution, age, sex, bone density, or ethnicity. Treat it as one data point rather than a diagnosis. For a fuller picture, combine it with body fat percentage, waist-to-height ratio, waist circumference, and a healthcare provider\'s assessment. Many clinicians now pair BMI with waist measurement specifically because abdominal fat carries more health risk than the same weight distributed elsewhere on the body.' },
      { q: 'How do I add an ideal weight range for the user\'s height?', a: 'The healthy BMI range is 18.5 to 24.9, so the ideal weight range for any height is simply those bounds multiplied by height squared in metres: lowerKg = 18.5 * heightM² and upperKg = 24.9 * heightM². For a 1.75m person that gives roughly 57 to 76 kg. Convert back to pounds (÷ 0.453592) for imperial display. Showing this range alongside the BMI gives users a concrete, actionable target rather than just an abstract index number.' },
      { q: 'How do I build this in React?', a: 'Store unit, height fields, and weight in useState. Compute BMI in a useMemo: convert imperial to metric inside the memo, apply weight / (heightM ** 2), and derive the category and advice from the result. For the gauge marker, map the BMI to a percentage within its category band and set the marker style with a left percentage. Render the score with bmi.toFixed(1).' },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the piecewise marker math yourself to understand it fully. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the pos variable is computed differently in each of the four bmi branches so the marker lands proportionally within its color band on the gauge, and why weight and height are always converted to metric internally before the formula runs. The same assistant can help optimize it — asking whether calc() should be debounced on rapid typing, or whether the four separate gauge color stops in the linear-gradient could be generated from a shared threshold array instead of being hardcoded twice. It's also a good way to extend the tool: ask it to add an ideal weight range display, a BMI history chart across multiple entries, or age and sex inputs to compute BMR alongside it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "BMI calculator" in plain HTML, CSS, and JavaScript with a metric/imperial unit toggle and an animated category gauge — no libraries, no build step.

Requirements:
- A unit toggle between Metric (single height field in cm) and Imperial (separate feet and inches fields), where switching units also converts the existing weight value in place (kg to lb or lb to kg) so the number stays physically equivalent instead of just relabeling it.
- All BMI math must happen in one internal metric representation: convert feet/inches to meters and pounds to kilograms before applying the formula weight over height squared, so the category thresholds never need to be duplicated per unit system.
- Four WHO weight categories with fixed thresholds (under 18.5, 18.5 to 25, 25 to 30, 30 and above), each producing a distinct label, a distinct CSS class controlling the score color, and a distinct short advice sentence.
- A horizontal gauge track built from a single CSS linear-gradient with hard color stops marking the four category boundaries, and a circular marker whose horizontal position is computed as a percentage that places it proportionally within its own category's band (not just proportionally across the whole 0-40 BMI range), animated into position with a springy overshoot cubic-bezier transition.
- Guard the calculation against zero, negative, or empty height and weight inputs so it never displays NaN or Infinity, and clamp the marker's position between 2% and 98% so it can never visually overflow the track at extreme BMI values.
- Recalculate on every input event so the result updates live as the user types, with the BMI value always displayed rounded to one decimal place.`,
    },
  },
};

export default bmiCalculator;
