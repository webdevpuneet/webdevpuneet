const gpaCalculator = {
  id: 'gpa-calculator',
  title: 'GPA Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <h2>GPA Calculator</h2>

  <div class="table-head">
    <span>Course</span>
    <span>Grade</span>
    <span>Credits</span>
    <span></span>
  </div>
  <div id="course-rows"></div>

  <button class="btn btn-add" id="btn-add-row">+ Add Course</button>

  <div class="summary">
    <div class="summary-card">
      <div class="k">Total Credits</div>
      <div class="v" id="total-credits">0</div>
    </div>
    <div class="summary-card accent">
      <div class="k">GPA</div>
      <div class="v" id="gpa-value">0.00</div>
    </div>
    <div class="summary-card">
      <div class="k">Quality Points</div>
      <div class="v" id="quality-points">0.00</div>
    </div>
  </div>

  <div class="scale-note">4.0 scale: A=4.0 · A-=3.7 · B+=3.3 · B=3.0 · B-=2.7 · C+=2.3 · C=2.0 · C-=1.7 · D+=1.3 · D=1.0 · F=0.0</div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 620px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.table-head { display: grid; grid-template-columns: 1fr 100px 90px 32px; gap: 8px; padding: 0 4px 8px; font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }

.course-row { display: grid; grid-template-columns: 1fr 100px 90px 32px; gap: 8px; margin-bottom: 8px; align-items: center; }
.course-row input[type="text"] { padding: 9px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; }
.course-row select { padding: 9px 8px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; background: #fff; }
.course-row input[type="number"] { padding: 9px 8px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; width: 100%; }
.course-row input:focus, .course-row select:focus { outline: none; border-color: #6366f1; }
.remove-btn { width: 28px; height: 28px; border-radius: 7px; border: 1.5px solid #fecaca; background: #fff; color: #dc2626; font-size: 14px; cursor: pointer; line-height: 1; }
.remove-btn:hover { background: #fef2f2; }

.btn-add { display: block; width: 100%; margin: 6px 0 20px; padding: 10px; border-radius: 9px; border: 1.5px dashed #cbd5e1; background: #f8fafc; color: #6366f1; font-size: 13px; font-weight: 700; cursor: pointer; }
.btn-add:hover { border-color: #6366f1; background: #eef2ff; }

.summary { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.summary-card { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 12px; padding: 12px 14px; text-align: center; }
.summary-card .k { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
.summary-card .v { font-size: 20px; font-weight: 800; color: #1e293b; }
.summary-card.accent { background: #eef2ff; border-color: #c7d2fe; }
.summary-card.accent .v { color: #4338ca; }

.scale-note { font-size: 10.5px; color: #94a3b8; text-align: center; line-height: 1.6; }`,
  js: `const GRADE_POINTS = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

let rows = [
  { name: 'Introduction to Programming', grade: 'A', credits: 3 },
  { name: 'Calculus I', grade: 'B+', credits: 4 },
  { name: 'World History', grade: 'A-', credits: 3 },
];
let idCounter = 0;
rows = rows.map(r => ({ ...r, id: idCounter++ }));

const courseRows = document.getElementById('course-rows');

function render() {
  courseRows.innerHTML = rows.map(row => {
    const options = Object.keys(GRADE_POINTS).map(g =>
      '<option value="' + g + '"' + (g === row.grade ? ' selected' : '') + '>' + g + '</option>'
    ).join('');
    return '<div class="course-row" data-id="' + row.id + '">' +
      '<input type="text" class="name-input" value="' + row.name.replace(/"/g, '&quot;') + '" placeholder="Course name" />' +
      '<select class="grade-select">' + options + '</select>' +
      '<input type="number" class="credits-input" value="' + row.credits + '" min="0" step="0.5" />' +
      '<button class="remove-btn" title="Remove">\\u00D7</button>' +
    '</div>';
  }).join('');

  courseRows.querySelectorAll('.course-row').forEach(rowEl => {
    const id = Number(rowEl.dataset.id);
    rowEl.querySelector('.name-input').addEventListener('input', (e) => {
      const r = rows.find(x => x.id === id);
      if (r) r.name = e.target.value;
    });
    rowEl.querySelector('.grade-select').addEventListener('change', (e) => {
      const r = rows.find(x => x.id === id);
      if (r) r.grade = e.target.value;
      calculate();
    });
    rowEl.querySelector('.credits-input').addEventListener('input', (e) => {
      const r = rows.find(x => x.id === id);
      if (r) r.credits = Number(e.target.value) || 0;
      calculate();
    });
    rowEl.querySelector('.remove-btn').addEventListener('click', () => {
      rows = rows.filter(x => x.id !== id);
      render();
      calculate();
    });
  });
}

function calculate() {
  const totalCredits = rows.reduce((s, r) => s + (Number(r.credits) || 0), 0);
  const qualityPoints = rows.reduce((s, r) => s + (GRADE_POINTS[r.grade] || 0) * (Number(r.credits) || 0), 0);
  const gpa = totalCredits > 0 ? qualityPoints / totalCredits : 0;

  document.getElementById('total-credits').textContent = totalCredits.toLocaleString();
  document.getElementById('quality-points').textContent = qualityPoints.toFixed(2);
  document.getElementById('gpa-value').textContent = gpa.toFixed(2);
}

document.getElementById('btn-add-row').addEventListener('click', () => {
  rows.push({ id: idCounter++, name: '', grade: 'A', credits: 3 });
  render();
  calculate();
});

render();
calculate();`,

  seo: {
    title: 'GPA Calculator — Free HTML CSS JS Snippet',
    description: 'Calculate weighted GPA from a dynamic list of courses, grades and credit hours using real quality-point math, with add and remove rows. Exports to React & Vue.',
    about: {
      title: 'GPA Calculator — Credit-Weighted Grade Point Average from a Dynamic Course List',
      description: `A grade point average is not a simple average of letter grades converted to numbers — a 3-credit A and a 1-credit A don't contribute equally to your GPA, because GPA is weighted by credit hours. This calculator implements the actual formula registrars use: total quality points divided by total credit hours, recalculated live as courses, grades, and credit values are added, edited, or removed.

**Quality points: the core of weighted GPA math**

For each course, "quality points" are \`gradePointValue \\u00D7 credits\` — a 4-credit course earning a B (3.0) contributes 12 quality points, while a 1-credit course earning the same B contributes only 3. \`calculate()\` sums quality points across every row with \`rows.reduce((s, r) => s + (GRADE_POINTS[r.grade] || 0) * (Number(r.credits) || 0), 0)\`, then divides that sum by the total credit hours (\`rows.reduce((s, r) => s + (Number(r.credits) || 0), 0)\`) to get the final GPA. This is precisely why a single low grade in a high-credit course drags GPA down more than the same grade in a 1-credit elective — the weighting is baked directly into the math, not applied as an afterthought.

**A standard 4.0 plus/minus grade scale**

\`GRADE_POINTS\` maps the common US undergraduate letter-grade scale — A through F, with plus/minus gradations at 0.3-point increments (A- is 3.7, B+ is 3.3, and so on) — matching the scale used by the large majority of US colleges and universities. Different institutions occasionally use slightly different plus/minus values or omit certain grades entirely, which is called out in the scale-reference note under the calculator so the numbers being used are always visible rather than hidden behind an opaque dropdown.

**Dynamic, stateful course rows**

Each course is tracked in a \`rows\` array of \`{ id, name, grade, credits }\` objects, with a monotonically increasing \`idCounter\` assigning a stable identity to each row independent of its position in the array — the same pattern used for tracking DOM identity across re-renders in the [linked list visualizer](/ui-snippets/linked-list-visualizer/). This stable id is what lets the Remove button on any given row delete exactly that course (via \`rows.filter(x => x.id !== id)\`) even after rows have been reordered or others removed, rather than accidentally deleting the wrong row by stale array index.

**Editing without full-page re-renders on every keystroke**

Typing in a course's name field or credit-hours field updates that row's data directly via a closure over its \`id\`, without triggering a full \`render()\` call on every keystroke — only the grade dropdown and credits field (both of which affect the calculated GPA) trigger \`calculate()\` immediately, while the name field just updates state quietly in the background. This avoids the input losing focus or cursor position that a naive "re-render the whole list on every keystroke" implementation would cause.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Edit the pre-filled example courses', text: 'Change any course name, grade, or credit-hour value to match your own transcript — the GPA recalculates immediately.' },
        { title: 'Click "+ Add Course"', text: 'Adds a new blank row defaulted to grade A and 3 credits, ready to fill in.' },
        { title: 'Select a grade from the dropdown', text: 'Choose from the full A through F scale including plus/minus gradations (A-, B+, and so on).' },
        { title: 'Set credit hours for each course', text: 'Credits can include half-values (e.g. 0.5 or 1.5) for institutions that use fractional credit hours.' },
        { title: 'Remove a course', text: 'Click the × button on any row to delete it — the GPA recalculates immediately with the remaining courses.' },
        { title: 'Read the summary cards', text: 'Total Credits, GPA (to two decimal places), and total Quality Points are all shown together for a full picture of the calculation.' },
      ],
    },
    features: [
      'Real credit-weighted GPA formula — total quality points divided by total credit hours, not a naive grade average',
      'Standard 4.0 plus/minus grade scale (A through F with 0.3-point increments) with the scale shown as a reference note',
      'Dynamic add/remove course rows with stable per-row identity for reliable deletion at any list position',
      'Live recalculation on every grade or credit-hours change, without losing focus while typing a course name',
      'Support for fractional credit hours (0.5 step) for institutions using non-integer credit values',
      'Total Credits and total Quality Points shown alongside the final GPA for full transparency into the calculation',
      'Pre-filled with realistic example courses so the calculator is immediately useful without empty-state friction',
      'Entirely client-side — no data is stored or transmitted anywhere',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Students planning a semester\'s course load', desc: 'Estimate how a hypothetical set of grades and credit hours for an upcoming semester would affect cumulative GPA before registering for classes.' },
      { icon: 'APP', title: 'Academic advising tools', desc: 'Embed in a student portal or advising dashboard so students can self-serve "what GPA do I need this semester" calculations without a spreadsheet.' },
      { icon: 'FLOW', title: 'Transfer credit and grade scale comparison', desc: 'Recreate a transcript from another institution using this tool\'s standard 4.0 scale to estimate how it would translate for graduate school applications.' },
      { icon: 'CODE', title: 'Prototype for a full transcript management app', desc: 'Use the stable-id row pattern and quality-point calculation as a starting structure for a more complete student records or transcript-tracking application.' },
      { icon: 'DASH', title: 'Scholarship or eligibility threshold checking', desc: 'Quickly check whether a hypothetical grade combination would keep cumulative GPA above a scholarship or academic-standing threshold.' },
      { icon: 'CODE', title: 'Related: Text Case Converter', desc: 'See the [Text Case Converter](/ui-snippets/text-case-converter/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is GPA actually calculated by this tool?', a: 'For each course, quality points equal the grade\'s point value (on the 4.0 scale) multiplied by its credit hours. GPA is the sum of every course\'s quality points divided by the sum of every course\'s credit hours — this credit-weighted formula is the standard method used by virtually all US colleges and universities, not a simple average of letter-grade values.' },
      { q: 'Why does a higher-credit course affect GPA more than a lower-credit one with the same grade?', a: 'Because quality points scale directly with credit hours — a B (3.0) in a 4-credit course contributes 12 quality points, while the same B in a 1-credit course contributes only 3. Since GPA divides total quality points by total credits, courses with more credit hours carry proportionally more weight in the final number.' },
      { q: 'What grade scale does this calculator use?', a: 'The standard US undergraduate 4.0 scale with plus/minus gradations: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, F=0.0. This matches the majority of US institutions, though some schools use slightly different plus/minus increments or omit certain grades — always verify against your specific institution\'s official scale for real academic decisions.' },
      { q: 'Can I use fractional credit hours?', a: 'Yes — the credits input accepts values in 0.5 increments, accommodating institutions that award half-credit for certain courses like labs or seminars.' },
      { q: 'Does removing a course row ever delete the wrong one?', a: 'No — each course row is tracked with a stable, unique id assigned when it\'s created, independent of its position in the list. The remove button always deletes the row matching its own id, so removing one course never accidentally affects a different row even after other rows have been added or removed.' },
      { q: 'Is my grade data saved anywhere?', a: 'No — everything lives only in the browser tab\'s memory for the current session. Refreshing the page resets to the default example courses; nothing is persisted to local storage or transmitted to a server.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why quality points (grade value times credits) rather than a simple grade average is the correct GPA formula — a concrete example with courses of different credit weights makes it click quickly. It's also a solid starting point to extend: ask for cumulative GPA tracking across multiple semesters, a "what grade do I need in my remaining courses" reverse calculator, or persistence via localStorage so the course list survives a page reload.`,
      prompt: `Build a credit-weighted GPA calculator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A dynamic list of course rows, each with an editable course name, a grade dropdown (standard 4.0 scale with plus/minus: A, A-, B+, B, B-, C+, C, C-, D+, D, F), and an editable credit-hours number input supporting 0.5 increments.
- Track each row with a stable unique identifier assigned at creation time, independent of its position in the array, so a course can always be correctly identified and removed regardless of how the list has been reordered or edited.
- Implement the real credit-weighted GPA formula: for each course multiply its grade's 4.0-scale point value by its credit hours to get quality points, sum quality points across all courses, sum credit hours across all courses, and divide the two sums to get the final GPA — do not implement it as a simple average of grade values.
- Provide "Add Course" and per-row "Remove" controls that update the list and immediately recalculate.
- Display total credit hours, total quality points, and the final GPA (to two decimal places) together as summary figures.
- Editing a course's name should not cause the grade dropdown or credit input in other rows to lose focus or reset — update state per-row without a full list re-render on every keystroke in the name field.
- Pre-fill the list with a few realistic example courses so the calculator is immediately usable.`,
    },
  },
};

export default gpaCalculator;
