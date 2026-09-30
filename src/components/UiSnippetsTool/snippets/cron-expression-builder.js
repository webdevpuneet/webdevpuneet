const cronExpressionBuilder = {
  id: 'cron-expression-builder',
  title: 'Cron Expression Builder',
  lastmod: '2026-08-15',
  category: 'tools',
  html: `<div class="cx-wrap">
  <div class="cx-head">
    <h3>Schedule</h3>
    <p class="cx-sub">Build a cron expression, or type one and see it explained.</p>
  </div>

  <div class="cx-presets" id="cxPresets">
    <button class="cx-preset" data-cron="*/5 * * * *">Every 5 min</button>
    <button class="cx-preset" data-cron="0 * * * *">Hourly</button>
    <button class="cx-preset" data-cron="30 2 * * *">Nightly 02:30</button>
    <button class="cx-preset" data-cron="0 9 * * 1-5">Weekdays 09:00</button>
    <button class="cx-preset" data-cron="0 0 1 * *">Monthly</button>
  </div>

  <div class="cx-fields">
    <label class="cx-f">
      <span>Minute</span>
      <input id="cxMin" type="text" spellcheck="false" autocomplete="off" value="30">
    </label>
    <label class="cx-f">
      <span>Hour</span>
      <input id="cxHour" type="text" spellcheck="false" autocomplete="off" value="2">
    </label>
    <label class="cx-f">
      <span>Day of month</span>
      <input id="cxDom" type="text" spellcheck="false" autocomplete="off" value="*">
    </label>
    <label class="cx-f">
      <span>Month</span>
      <input id="cxMon" type="text" spellcheck="false" autocomplete="off" value="*">
    </label>
    <label class="cx-f">
      <span>Day of week</span>
      <input id="cxDow" type="text" spellcheck="false" autocomplete="off" value="*">
    </label>
  </div>

  <div class="cx-out">
    <div class="cx-exp">
      <code id="cxExp">30 2 * * *</code>
      <button class="cx-copy" id="cxCopy">Copy</button>
    </div>
    <p class="cx-human" id="cxHuman">At 02:30, every day.</p>
  </div>

  <div class="cx-next">
    <span class="cx-next-label">Next 5 runs</span>
    <ul id="cxRuns"></ul>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0f172a;padding:26px 16px;color:#e2e8f0}

.cx-wrap{max-width:600px;margin:0 auto;background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;display:flex;flex-direction:column;gap:16px}
.cx-head h3{font-size:15px;font-weight:700}
.cx-sub{font-size:12px;color:#94a3b8;margin-top:3px}

.cx-presets{display:flex;flex-wrap:wrap;gap:7px}
.cx-preset{
  background:#0f172a;border:1px solid #334155;color:#cbd5e1;border-radius:999px;
  padding:6px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .14s;
}
.cx-preset:hover{border-color:#6366f1;color:#fff}
.cx-preset.on{background:#6366f1;border-color:#6366f1;color:#fff}

.cx-fields{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
@media (max-width:520px){.cx-fields{grid-template-columns:repeat(2,1fr)}}
.cx-f{display:flex;flex-direction:column;gap:5px}
.cx-f span{font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#64748b}
.cx-f input{
  width:100%;padding:9px 10px;border-radius:8px;border:1.5px solid #334155;
  background:#0f172a;color:#e2e8f0;font-family:ui-monospace,Menlo,Consolas,monospace;
  font-size:13px;text-align:center;transition:border-color .14s;
}
.cx-f input:focus{outline:none;border-color:#6366f1}
.cx-f input.bad{border-color:#f43f5e}

.cx-out{background:#0f172a;border:1px solid #334155;border-radius:10px;padding:13px}
.cx-exp{display:flex;align-items:center;gap:10px}
.cx-exp code{
  flex:1;min-width:0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:16px;
  font-weight:700;color:#a5b4fc;letter-spacing:.04em;overflow-x:auto;white-space:nowrap;
}
.cx-copy{background:#334155;color:#cbd5e1;border:none;border-radius:7px;padding:6px 11px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit;flex-shrink:0}
.cx-copy:hover{background:#475569}
.cx-copy.done{background:#059669;color:#fff}

.cx-human{margin-top:9px;font-size:13px;color:#cbd5e1;line-height:1.5}
.cx-human.bad{color:#fb7185}

.cx-next{border-top:1px solid #334155;padding-top:14px}
.cx-next-label{font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#64748b}
.cx-next ul{list-style:none;margin-top:9px;display:flex;flex-direction:column;gap:6px}
.cx-next li{
  font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;color:#94a3b8;
  display:flex;align-items:center;gap:9px;
}
.cx-next li::before{content:'';width:5px;height:5px;border-radius:50%;background:#6366f1;flex-shrink:0}
.cx-next li.none{color:#64748b}
.cx-next li.none::before{background:#475569}`,

  js: `var FIELDS = [
  { id: 'cxMin',  min: 0, max: 59, name: 'minute' },
  { id: 'cxHour', min: 0, max: 23, name: 'hour' },
  { id: 'cxDom',  min: 1, max: 31, name: 'day of month' },
  { id: 'cxMon',  min: 1, max: 12, name: 'month' },
  { id: 'cxDow',  min: 0, max: 6,  name: 'day of week' },
];

var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var inputs = FIELDS.map(function (f) { return document.getElementById(f.id); });
var expEl = document.getElementById('cxExp');
var humanEl = document.getElementById('cxHuman');
var runsEl = document.getElementById('cxRuns');

// Expand one cron field into the explicit set of values it matches.
// Returns null when the field is not valid syntax for its range.
function expand(part, min, max) {
  var out = [];
  var chunks = part.split(',');

  for (var i = 0; i < chunks.length; i++) {
    var chunk = chunks[i].trim();
    if (!chunk) return null;

    var step = 1;
    var slash = chunk.indexOf('/');
    if (slash !== -1) {
      step = Number(chunk.slice(slash + 1));
      if (!step || step < 1) return null;
      chunk = chunk.slice(0, slash);
    }

    var lo, hi;
    if (chunk === '*') {
      lo = min; hi = max;
    } else if (chunk.indexOf('-') > 0) {
      var ends = chunk.split('-');
      lo = Number(ends[0]); hi = Number(ends[1]);
    } else {
      lo = hi = Number(chunk);
    }

    if (!isFinite(lo) || !isFinite(hi) || lo < min || hi > max || lo > hi) return null;
    for (var v = lo; v <= hi; v += step) out.push(v);
  }

  // De-duplicate — "1-5,3" is legal and should not list 3 twice.
  return out.filter(function (v, i, a) { return a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
}

function pad(n) { return (n < 10 ? '0' : '') + n; }

// Returns the step size when values are evenly spaced from the field minimum,
// so */5 can be described as "every 5 minutes" rather than as a list of twelve.
function evenStep(vals, min) {
  if (vals.length < 3 || vals[0] !== min) return 0;
  var step = vals[1] - vals[0];
  for (var i = 2; i < vals.length; i++) {
    if (vals[i] - vals[i - 1] !== step) return 0;
  }
  return step > 1 ? step : 0;
}

// Turn one field into a readable fragment, using the whole-range case to stay quiet.
function describeList(vals, all, fmt) {
  if (vals.length === all) return null;
  if (vals.length === 1) return fmt(vals[0]);

  // A contiguous run reads far better as "Monday to Friday" than as a list.
  var contiguous = vals.every(function (v, i) { return i === 0 || v === vals[i - 1] + 1; });
  if (contiguous && vals.length > 2) return fmt(vals[0]) + ' to ' + fmt(vals[vals.length - 1]);

  if (vals.length > 4) return vals.length + ' values';
  return vals.slice(0, -1).map(fmt).join(', ') + ' and ' + fmt(vals[vals.length - 1]);
}

function describe(sets) {
  var mins = sets[0], hours = sets[1], dom = sets[2], mon = sets[3], dow = sets[4];
  var when;

  var minStep = evenStep(mins, 0);

  // The common, readable case: one specific time of day.
  if (mins.length === 1 && hours.length === 1) {
    when = 'At ' + pad(hours[0]) + ':' + pad(mins[0]);
  } else if (mins.length === 60 && hours.length === 24) {
    when = 'Every minute';
  } else if (minStep && hours.length === 24) {
    when = 'Every ' + minStep + ' minutes';
  } else if (hours.length === 24) {
    when = mins.length === 1 ? 'At minute ' + mins[0] + ' of every hour'
                             : 'At ' + mins.length + ' minutes past every hour';
  } else if (hours.length === 1 && mins.length <= 4) {
    // One hour, a few minutes — name the actual clock times.
    var times = mins.map(function (m) { return pad(hours[0]) + ':' + pad(m); });
    when = 'At ' + times.slice(0, -1).join(', ') + ' and ' + times[times.length - 1];
  } else {
    var minText = describeList(mins, 60, function (m) { return 'minute ' + m; });
    var hourText = describeList(hours, 24, function (h) { return pad(h) + ':00'; });
    when = 'At ' + (minText || 'every minute') + (hourText ? ', during ' + hourText : '');
  }

  var parts = [];
  var domText = describeList(dom, 31, function (d) { return 'day ' + d; });
  var dowText = describeList(dow, 7, function (d) { return DAYS[d]; });
  var monText = describeList(mon, 12, function (m) { return MONTHS[m - 1]; });

  if (domText) parts.push('on ' + domText);
  // Cron ORs day-of-month and day-of-week when both are restricted — worth saying.
  if (dowText) parts.push((domText ? 'or ' : 'on ') + dowText);
  if (monText) parts.push('in ' + monText);

  return when + (parts.length ? ', ' + parts.join(' ') : ', every day') + '.';
}

function matches(date, sets) {
  var domRestricted = sets[2].length !== 31;
  var dowRestricted = sets[4].length !== 7;
  var dayOk;

  // Standard cron rule: if BOTH day fields are restricted the match is an OR,
  // not an AND. Getting this wrong is the classic cron scheduling bug.
  if (domRestricted && dowRestricted) {
    dayOk = sets[2].indexOf(date.getDate()) !== -1 || sets[4].indexOf(date.getDay()) !== -1;
  } else {
    dayOk = sets[2].indexOf(date.getDate()) !== -1 && sets[4].indexOf(date.getDay()) !== -1;
  }

  return sets[0].indexOf(date.getMinutes()) !== -1 &&
         sets[1].indexOf(date.getHours()) !== -1 &&
         dayOk &&
         sets[3].indexOf(date.getMonth() + 1) !== -1;
}

function nextRuns(sets, count) {
  var out = [];
  var d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);

  // Walk minute by minute, capped at roughly four years so an impossible
  // expression (like 30 February) terminates instead of hanging the tab.
  var limit = 60 * 24 * 366 * 4;
  for (var i = 0; i < limit && out.length < count; i++) {
    if (matches(d, sets)) out.push(new Date(d));
    d.setMinutes(d.getMinutes() + 1);
  }
  return out;
}

function fmtRun(d) {
  return DAYS[d.getDay()].slice(0, 3) + ' ' + pad(d.getDate()) + ' ' + MONTHS[d.getMonth()].slice(0, 3) +
         '  ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function update() {
  var parts = inputs.map(function (el) { return el.value.trim() || '*'; });
  expEl.textContent = parts.join(' ');

  var sets = [];
  var bad = null;

  FIELDS.forEach(function (f, i) {
    var set = expand(parts[i], f.min, f.max);
    inputs[i].classList.toggle('bad', set === null);
    if (set === null && !bad) bad = f.name;
    sets.push(set);
  });

  if (bad) {
    humanEl.textContent = 'The ' + bad + ' field is not valid cron syntax.';
    humanEl.classList.add('bad');
    runsEl.innerHTML = '<li class="none">Fix the expression to preview run times.</li>';
    return;
  }

  humanEl.textContent = describe(sets);
  humanEl.classList.remove('bad');

  var runs = nextRuns(sets, 5);
  runsEl.innerHTML = '';
  if (!runs.length) {
    runsEl.innerHTML = '<li class="none">This expression never runs.</li>';
    return;
  }
  runs.forEach(function (r) {
    var li = document.createElement('li');
    li.textContent = fmtRun(r);
    runsEl.appendChild(li);
  });
}

function syncPresets() {
  var current = expEl.textContent;
  Array.prototype.forEach.call(document.querySelectorAll('.cx-preset'), function (b) {
    b.classList.toggle('on', b.dataset.cron === current);
  });
}

inputs.forEach(function (el) {
  el.addEventListener('input', function () { update(); syncPresets(); });
});

document.getElementById('cxPresets').addEventListener('click', function (e) {
  var btn = e.target.closest('.cx-preset');
  if (!btn) return;
  btn.dataset.cron.split(' ').forEach(function (v, i) { inputs[i].value = v; });
  update();
  syncPresets();
});

document.getElementById('cxCopy').addEventListener('click', function () {
  var btn = this;
  navigator.clipboard.writeText(expEl.textContent).then(function () {
    btn.textContent = 'Copied';
    btn.classList.add('done');
    setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1400);
  });
});

update();
syncPresets();`,

  seo: {
    title: 'Cron Expression Builder — Free HTML CSS JS Snippet',
    description: 'Build a cron schedule from five fields, get a plain-English explanation and the next five run times. Real field parsing, no library.',
    about: {
      title: 'Cron Expression Builder — Field Expansion, Plain-English Descriptions & Real Next-Run Calculation',
      description: `Cron syntax is five fields of terse punctuation that almost nobody reads confidently, and the cost of misreading one is a job that runs a thousand times more often than intended — or never. This snippet is a builder and an explainer in one: edit any field and the expression, a plain-English description, and the next five actual run times all update together, so the schedule is verified before it ships rather than after the pager goes off.

**Expanding fields rather than pattern-matching them**

Most cron helpers work by matching the expression against a table of known shapes and printing a canned sentence, which means anything slightly unusual falls through to "custom schedule". This one parses properly. \`expand()\` turns any field into the explicit list of values it matches, handling \`*\`, single numbers, \`a-b\` ranges, \`*/n\` and \`a-b/n\` steps, and comma-separated combinations of all of those. Because everything downstream works from those value sets rather than from the original string, the description and the run-time preview handle expressions the author never anticipated.

**Validation that names the field**

\`expand()\` returns \`null\` for anything outside its field's legal range — minute 61, month 0, a reversed range, a zero step — and the caller marks that specific input red and reports which field is wrong by name. Cron's failure mode is normally silent acceptance followed by wrong behaviour, so catching \`0-70\` in the minute field at the moment of typing is most of this component's value.

**The day-of-month / day-of-week OR rule**

This is the part real implementations get wrong. When both the day-of-month and day-of-week fields are restricted, standard cron treats them as an **OR**, not an AND: \`0 0 1 * 1\` fires on the 1st of the month *and* on every Monday, not only on Mondays that fall on the 1st. The matcher checks whether each field is restricted and switches between OR and AND accordingly, and the description says "on day 1 or Monday" so the behaviour is visible rather than surprising.

**Next runs computed, not guessed**

The preview walks forward minute by minute from now, testing each candidate against the parsed sets, and collects the first five matches. That is a brute-force search rather than a clever date calculation, and at one iteration per minute it finds a daily schedule in well under a second. The loop is capped at roughly four years so an expression that can never fire — 30 February, say — terminates and reports "This expression never runs" instead of hanging the tab, which is the failure mode any minute-stepping scheduler needs to guard against.

**Presets that stay in sync**

The preset chips write all five fields at once, and after every edit the current expression is compared back against the preset list so the matching chip highlights itself. Typing the equivalent expression by hand lights the same chip, because the sync compares the generated string rather than tracking which button was last clicked.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start from a preset or from scratch', text: 'The chips across the top write all five fields at once. The matching chip highlights whenever the current expression equals it, including when you type that expression by hand.' },
        { title: 'Edit any of the five fields', text: 'Each field accepts full cron syntax: * for every value, a single number, a-b ranges, */n steps, a-b/n stepped ranges, and comma-separated lists combining any of those.' },
        { title: 'Read the plain-English description', text: 'The sentence under the expression describes what the schedule actually does, staying quiet about fields set to the whole range so it reads naturally rather than restating every field.' },
        { title: 'Check the next five run times', text: 'Real dates and times computed by walking forward from now and testing each minute, so you can confirm the schedule fires when you expect before deploying it.' },
        { title: 'Watch for validation errors', text: 'An out-of-range or malformed field turns red immediately and the description names which field is wrong — minute 61 or a reversed range is caught as you type rather than by your scheduler at 3am.' },
        { title: 'Copy the finished expression', text: 'The Copy button writes the assembled five-field string to the clipboard via the Clipboard API and confirms with a short success state.' },
      ],
    },
    features: [
      'Real cron parsing: *, numbers, a-b ranges, */n and a-b/n steps, and comma-separated lists',
      'Per-field validation against legal ranges, marking the offending input and naming the field',
      'Plain-English description generated from the parsed value sets, not matched against canned templates',
      'Correct day-of-month / day-of-week OR semantics, the rule most cron helpers implement wrongly',
      'Next five run times computed by minute-stepping and testing, not estimated',
      'Iteration cap so an impossible expression reports "never runs" instead of freezing the tab',
      'Duplicate value de-duplication so overlapping lists like 1-5,3 behave correctly',
      'Preset chips that write all five fields and re-highlight by comparing the generated expression',
      'Clipboard API copy with a confirmation state, and no dependencies anywhere',
    ],
    useCases: [
      { icon: 'DASH', title: 'Scheduling UI in an admin or automation product', desc: 'Any product exposing cron to users needs this pairing of builder and explainer. Combine it with a [timezone converter](/ui-snippets/timezone-converter/) so the schedule and the timezone it runs in are decided in the same place.' },
      { icon: 'FLOW', title: 'CI/CD and job runner configuration screens', desc: 'Pipeline schedules, backup windows and report generation are all cron under the hood. Showing the next five runs turns "is this right?" from a question answered by waiting a day into one answered immediately.' },
      { icon: 'LEARN', title: 'Teaching cron syntax', desc: 'Because the description regenerates on every keystroke, editing a field and watching the sentence and the run times change is a far faster way to learn the syntax than reading the crontab manual page.' },
      { icon: 'CODE', title: 'Reference for parsing a small domain grammar', desc: 'The expand-then-derive structure here — parse into explicit sets first, then generate description, validation and matching from those sets — is the right shape for any small expression language, and much more robust than string pattern matching.' },
      { icon: 'FORM', title: 'Reminder and notification scheduling for end users', desc: 'Hide the raw fields behind the presets and keep the description and next-run list, and this becomes a friendly recurring-reminder picker that still produces a standard cron string for your backend.' },
      { icon: 'APP', title: 'Internal tools where the schedule is the risk', desc: 'Data pipelines and billing jobs are where a misread cron field becomes expensive. A visible next-run list in the form is a cheap, permanent guard against the whole class of mistake.' },
      { icon: 'CODE', title: 'Related: Debounce vs Throttle Visualizer', desc: 'See the [Debounce vs Throttle Visualizer](/ui-snippets/debounce-throttle-visualizer/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do day-of-month and day-of-week behave as OR rather than AND?', a: 'That is standard cron behaviour, and it surprises almost everyone. When both fields are restricted, a job fires if EITHER matches — so 0 0 1 * 1 runs on the 1st of every month and on every Monday. The matcher checks whether each field is restricted and switches between OR and AND to match real cron, and the description says "or" so the behaviour is visible in the UI.' },
      { q: 'How are the next run times calculated?', a: 'By walking forward from the current minute and testing each candidate minute against the parsed value sets, collecting the first five matches. It is brute force rather than a closed-form date calculation, which keeps the logic short and correct; a daily schedule resolves in a few hundred thousand cheap iterations, well under a second.' },
      { q: 'What stops an impossible expression from hanging the page?', a: 'The search loop is capped at roughly four years of minutes. An expression that can never fire — 30 February, or 31 in a month field set to February — exhausts the cap and the UI reports "This expression never runs" rather than looping forever. Any minute-stepping scheduler needs this guard.' },
      { q: 'Which cron syntax is supported?', a: 'The standard five-field format with *, single values, a-b ranges, */n and a-b/n steps, and comma-separated lists of any combination. Non-standard extensions — @reboot, @daily, L for last day, W for weekday, # for nth weekday, and named months or days like JAN and MON — are not parsed; expand() would return null and flag the field.' },
      { q: 'Do the run times use the visitor\'s timezone?', a: 'Yes. The preview is built with the browser\'s Date object, so it reflects the local timezone of whoever is looking. Since servers usually run cron in UTC, a production version should let the user pick the target timezone and compute against that — otherwise a schedule that looks correct locally fires at a different hour in production.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes, and it fits component state well. Hold the five field strings in state, and derive the expression, validation, description and run list with a memoised function of those five values — they are all pure functions of the input, so useMemo in React or a computed property in Vue removes any need for manual update() calls.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a timezone selector that computes the next run times in a chosen IANA zone rather than the browser's, since servers almost always run cron in UTC and a schedule that looks right locally is the most common way this kind of form misleads people. Other natural extensions: support named months and days (JAN-DEC, MON-SUN) and the @daily / @hourly shorthands, mapping them onto the same expansion step; add a reverse mode that accepts a pasted expression and splits it into the five fields; highlight the specific characters that failed to parse rather than marking the whole field; or add a frequency warning when an expression would fire more often than a threshold, which catches the */1 mistakes before they reach production.`,
      prompt: `Build a cron expression builder in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Five text inputs for minute, hour, day-of-month, month and day-of-week, plus a row of preset chips that fill all five fields at once.
- Write a real parser: an expand(part, min, max) function that returns the explicit sorted list of values a field matches, supporting *, single numbers, a-b ranges, */n steps, a-b/n stepped ranges, and comma-separated combinations. De-duplicate overlapping values. Return null for anything invalid — out of range, reversed range, zero or negative step.
- Derive EVERYTHING downstream from those expanded value sets rather than by pattern-matching the original string, so unusual but valid expressions are handled correctly.
- Validate per field: mark the offending input with an error style and report which field is invalid by name.
- Generate a plain-English description of the schedule that stays silent about fields covering their whole range, so it reads naturally instead of restating every field.
- Implement the standard cron day rule: when BOTH day-of-month and day-of-week are restricted, a run matches if EITHER matches (OR); otherwise both must match (AND). Make this visible in the description wording.
- Compute the next five run times by stepping forward minute by minute from now and testing each against the parsed sets. Cap the search at roughly four years of minutes so an impossible expression (like 30 February) reports "never runs" instead of hanging the page.
- Show the assembled expression in a monospace readout with a Clipboard API copy button and a confirmation state, and highlight whichever preset chip matches the current expression — comparing the generated string, so typing it by hand highlights it too.
- Style it as a dark settings card with uppercase field labels and a monospace list of upcoming run times.`,
    },
  },
};

export default cronExpressionBuilder;
