const quizResultBreakdown = {
  id: 'quiz-result-breakdown',
  title: 'Quiz Result Breakdown',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="qrb-card">
  <div class="qrb-summary">
    <div class="qrb-ring-wrap">
      <svg class="qrb-ring" viewBox="0 0 120 120">
        <circle class="qrb-ring-track" cx="60" cy="60" r="52"></circle>
        <circle class="qrb-ring-fill" id="qrbRingFill" cx="60" cy="60" r="52"></circle>
      </svg>
      <div class="qrb-ring-label"><span id="qrbScorePct">70%</span><small>score</small></div>
    </div>
    <div class="qrb-summary-text">
      <div class="qrb-banner qrb-banner--pass" id="qrbBanner">You passed &#127881;</div>
      <p class="qrb-sub">7 of 10 correct &middot; passing score is 60%</p>
      <div class="qrb-actions">
        <button class="qrb-btn qrb-btn--ghost" type="button" id="qrbExpandAll">Expand all reviews</button>
        <button class="qrb-btn qrb-btn--primary" type="button">Retake quiz</button>
      </div>
    </div>
  </div>

  <ul class="qrb-list" id="qrbList">
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row">
        <span class="qrb-item-icon">&#10003;</span>
        <span class="qrb-item-q">1. What does CSS stand for?</span>
        <span class="qrb-item-tag">Correct</span>
      </div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row">
        <span class="qrb-item-icon">&#10003;</span>
        <span class="qrb-item-q">2. Which tag defines a hyperlink?</span>
        <span class="qrb-item-tag">Correct</span>
      </div>
    </li>
    <li class="qrb-item" data-correct="false">
      <div class="qrb-item-row qrb-item-row--clickable">
        <span class="qrb-item-icon">&#10007;</span>
        <span class="qrb-item-q">3. Which property controls text size?</span>
        <span class="qrb-item-tag">Review</span>
        <span class="qrb-chevron">&#9656;</span>
      </div>
      <div class="qrb-review">
        <p><strong>Your answer:</strong> text-style</p>
        <p><strong>Correct answer:</strong> font-size</p>
        <p class="qrb-explain">font-size sets the size of text; text-style is not a real CSS property.</p>
      </div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row">
        <span class="qrb-item-icon">&#10003;</span>
        <span class="qrb-item-q">4. What does DOM stand for?</span>
        <span class="qrb-item-tag">Correct</span>
      </div>
    </li>
    <li class="qrb-item" data-correct="false">
      <div class="qrb-item-row qrb-item-row--clickable">
        <span class="qrb-item-icon">&#10007;</span>
        <span class="qrb-item-q">5. Which method adds an item to the end of an array?</span>
        <span class="qrb-item-tag">Review</span>
        <span class="qrb-chevron">&#9656;</span>
      </div>
      <div class="qrb-review">
        <p><strong>Your answer:</strong> array.append()</p>
        <p><strong>Correct answer:</strong> array.push()</p>
        <p class="qrb-explain">push() adds to the end; append() is not a native JS array method.</p>
      </div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row">
        <span class="qrb-item-icon">&#10003;</span>
        <span class="qrb-item-q">6. Which selector targets an id?</span>
        <span class="qrb-item-tag">Correct</span>
      </div>
    </li>
    <li class="qrb-item" data-correct="false">
      <div class="qrb-item-row qrb-item-row--clickable">
        <span class="qrb-item-icon">&#10007;</span>
        <span class="qrb-item-q">7. What is the default display value of a &lt;div&gt;?</span>
        <span class="qrb-item-tag">Review</span>
        <span class="qrb-chevron">&#9656;</span>
      </div>
      <div class="qrb-review">
        <p><strong>Your answer:</strong> inline</p>
        <p><strong>Correct answer:</strong> block</p>
        <p class="qrb-explain">A div is a block-level element by default; span is inline.</p>
      </div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row"><span class="qrb-item-icon">&#10003;</span><span class="qrb-item-q">8. Which keyword declares a constant?</span><span class="qrb-item-tag">Correct</span></div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row"><span class="qrb-item-icon">&#10003;</span><span class="qrb-item-q">9. What unit is relative to the root font size?</span><span class="qrb-item-tag">Correct</span></div>
    </li>
    <li class="qrb-item" data-correct="true">
      <div class="qrb-item-row"><span class="qrb-item-icon">&#10003;</span><span class="qrb-item-q">10. Which HTTP method typically retrieves data?</span><span class="qrb-item-tag">Correct</span></div>
    </li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:40px 16px;min-height:100vh;display:flex;align-items:center;justify-content:center}
.qrb-card{max-width:640px;margin:0 auto;background:#12141f;border:1px solid #23273a;border-radius:18px;padding:28px}
.qrb-summary{display:flex;gap:24px;align-items:center;padding-bottom:22px;border-bottom:1px solid #20232f;flex-wrap:wrap}
.qrb-ring-wrap{position:relative;width:120px;height:120px;flex:none}
.qrb-ring{width:100%;height:100%;transform:rotate(-90deg)}
.qrb-ring-track{fill:none;stroke:#20232f;stroke-width:10}
.qrb-ring-fill{fill:none;stroke:#34d399;stroke-width:10;stroke-linecap:round;stroke-dasharray:326.7;stroke-dashoffset:326.7;transition:stroke-dashoffset 1s ease}
.qrb-ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.qrb-ring-label span{font-size:26px;font-weight:700}
.qrb-ring-label small{font-size:11px;color:#8a8fa8;text-transform:uppercase;letter-spacing:.05em}
.qrb-summary-text{flex:1;min-width:220px}
.qrb-banner{display:inline-block;padding:6px 14px;border-radius:99px;font-size:13px;font-weight:700;margin-bottom:8px}
.qrb-banner--pass{background:#0f2e22;color:#34d399}
.qrb-banner--fail{background:#3a1420;color:#f87171}
.qrb-sub{margin:0 0 14px;color:#9aa0b8;font-size:13.5px}
.qrb-actions{display:flex;gap:10px;flex-wrap:wrap}
.qrb-btn{font:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:9px;cursor:pointer;border:1px solid transparent}
.qrb-btn--primary{background:#6d5efc;color:#fff}
.qrb-btn--primary:hover{background:#5c4cf0}
.qrb-btn--ghost{background:transparent;color:#c7cade;border-color:#2c3046}
.qrb-btn--ghost:hover{background:#181b27}
.qrb-list{list-style:none;margin:0;padding:14px 0 0;display:flex;flex-direction:column;gap:6px}
.qrb-item-row{display:flex;align-items:center;gap:10px;padding:12px;border-radius:10px}
.qrb-item[data-correct="true"] .qrb-item-row{background:#101a15}
.qrb-item[data-correct="false"] .qrb-item-row{background:#1a1116}
.qrb-item-row--clickable{cursor:pointer}
.qrb-item-icon{width:20px;height:20px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700}
.qrb-item[data-correct="true"] .qrb-item-icon{background:#0f2e22;color:#34d399}
.qrb-item[data-correct="false"] .qrb-item-icon{background:#3a1420;color:#f87171}
.qrb-item-q{flex:1;font-size:13.5px}
.qrb-item-tag{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#8a8fa8}
.qrb-chevron{font-size:10px;color:#6d7290;transition:transform .18s ease}
.qrb-item.qrb-open .qrb-chevron{transform:rotate(90deg)}
.qrb-review{display:grid;grid-template-rows:0fr;transition:grid-template-rows .2s ease}
.qrb-item.qrb-open .qrb-review{grid-template-rows:1fr}
.qrb-review > *{overflow:hidden}
.qrb-review p{margin:0;padding:8px 44px 0;font-size:13px;color:#c7cade;line-height:1.5}
.qrb-review p:last-child{padding-bottom:12px}
.qrb-explain{color:#8a8fa8 !important;font-style:italic}`,

  js: `const totalQuestions = document.querySelectorAll('.qrb-item').length;
const correctCount = document.querySelectorAll('.qrb-item[data-correct="true"]').length;
const scorePct = Math.round((correctCount / totalQuestions) * 100);
const passThreshold = 60;

const ringFill = document.getElementById('qrbRingFill');
const circumference = 2 * Math.PI * 52; // matches the SVG circle's r="52"
const offset = circumference - (scorePct / 100) * circumference;
ringFill.style.strokeDasharray = String(circumference);
requestAnimationFrame(() => { ringFill.style.strokeDashoffset = String(offset); });

document.getElementById('qrbScorePct').textContent = scorePct + '%';

const banner = document.getElementById('qrbBanner');
const passed = scorePct >= passThreshold;
banner.textContent = passed ? 'You passed \\u{1F389}' : 'Not quite \\u{2014} try again';
banner.classList.add(passed ? 'qrb-banner--pass' : 'qrb-banner--fail');
if (!passed) ringFill.style.stroke = '#f87171';

// Toggle the review panel for each wrong answer independently.
document.querySelectorAll('.qrb-item-row--clickable').forEach((row) => {
  row.addEventListener('click', () => {
    row.closest('.qrb-item').classList.toggle('qrb-open');
  });
});

document.getElementById('qrbExpandAll').addEventListener('click', () => {
  document.querySelectorAll('.qrb-item[data-correct="false"]').forEach((item) => item.classList.add('qrb-open'));
});`,

  seo: {
    title: 'Quiz Result Breakdown — Free Score Ring & Per-Question Review UI',
    description: `A post-quiz results panel with an animated score ring, pass/fail banner, and per-question breakdown with an expandable review for each wrong answer. Plain HTML, CSS & JS.`,
    about: {
      title: 'Quiz Result Breakdown — Score Ring, Pass Banner, and Answer Review',
      description: `The quiz result breakdown is the screen a learner sees right after submitting: an animated score ring, a clear pass or fail banner, and a per-question list they can drill into to see what they got wrong and why. This snippet builds the whole pattern in plain HTML, CSS, and JavaScript.

**A computed score, not a hardcoded number**

The script counts \`.qrb-item[data-correct="true"]\` elements against the total and derives the percentage from that count — change how many list items are marked correct and the ring, banner, and label all update automatically, so the markup stays the single source of truth.

**The ring is real geometry**

The SVG circle's circumference is computed as \`2 * Math.PI * r\` (with \`r="52"\` matching the markup), then \`stroke-dashoffset\` is set to \`circumference - (percent/100) * circumference\`. Setting the offset on the next animation frame (rather than immediately) lets the browser register the starting dasharray first, so the fill animates from empty to the score instead of snapping into place.

**Pass/fail changes the whole tone**

Crossing the pass threshold swaps the banner's text, color, and even the ring's stroke color between green and red — a passing result and a failing one should not just differ by a number, they should read differently at a glance.

**Per-question review, independently expandable**

Each wrong answer is a \`.qrb-item\` with a nested \`.qrb-review\` panel using the same \`grid-template-rows: 0fr/1fr\` collapse technique as an accordion. Clicking a row toggles only that item's \`qrb-open\` class, so learners can compare several wrong answers side by side instead of the panel forcing one-at-a-time review.

**Expand-all shortcut**

The "Expand all reviews" button opens every wrong-answer panel in one click, useful when a learner wants to skim all their mistakes at once rather than clicking through each one.

**Customizing it**

Wire the correct/incorrect counting to your real quiz-submission data, add per-question point values instead of equal weighting, or animate the ring with a duration proportional to the score. Pair it with a [quiz card](/ui-snippets/quiz-card/) for the question flow itself, or a [circular progress](/ui-snippets/circular-progress/) ring elsewhere in the same dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A results card with a score ring and question list render.` },
      { title: 'Watch the ring animate', text: `It fills from empty to the computed score on load.` },
      { title: 'Read the pass/fail banner', text: `Its color and text reflect the 60% threshold.` },
      { title: 'Click a wrong answer', text: `Its review panel expands with your answer and the correct one.` },
      { title: 'Click "Expand all reviews"', text: `Every wrong answer opens at once.` },
      { title: 'Edit data-correct on list items', text: `The score, ring, and banner recompute from the markup.` },
    ] },
    features: [
      { title: 'Computed score', text: `Percentage derives from data-correct attributes, not a hardcoded value.` },
      { title: 'Real SVG ring math', text: `Circumference and dashoffset from actual circle radius.` },
      { title: 'Animated fill', text: `Ring fills from empty to score on load.` },
      { title: 'Pass/fail theming', text: `Banner and ring color switch at the threshold.` },
      { title: 'Independent review panels', text: `Each wrong answer expands separately.` },
      { title: 'Expand-all shortcut', text: `Opens every review panel in one click.` },
      { title: 'Accessible correct/incorrect tags', text: `Text labels, not color alone.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and JS.` },
    ],
    useCases: [
      { title: 'Course quizzes', text: 'Follow a [quiz card](/ui-snippets/quiz-card/) flow with this results screen, whose score is computed from `data-correct` attributes, not hardcoded.' },
      { title: 'Certification exams', text: 'Show pass or fail against a strict threshold, with the banner and ring colour switching automatically at the pass mark.' },
      { title: 'Onboarding knowledge checks', text: 'Pair with an [onboarding tour](/ui-snippets/onboarding-tour/) to confirm that new users understood the product before they continue.' },
      { title: 'Hiring assessments', text: 'Summarise a candidate\'s screening quiz with per-question review, expanding each wrong answer to show what went wrong.' },
      { title: 'Trivia and game recaps', text: 'Reuse the animated score ring for a session recap screen at the end of a game or challenge.' },
      { icon: 'CODE', title: 'Related: Video Call Hand-Raise Queue', desc: 'See the [Video Call Hand-Raise Queue](/ui-snippets/video-call-hand-raise-queue/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the score percentage calculated?', a: `The script queries all elements with class qrb-item to get the total question count, then queries only those with data-correct="true" to get the correct count, and divides one by the other. Because it reads the DOM rather than using a hardcoded number, changing which items carry data-correct="true" in your markup automatically updates the ring, the label, and the pass/fail banner.` },
      { q: 'How does the ring know how far to fill?', a: `The SVG circle's circumference is computed with the actual geometry formula, 2 * Math.PI * r, using r="52" to match the circle drawn in the markup. The stroke-dashoffset is then set to circumference minus the score's share of the circumference, so at 70% the visible arc covers exactly 70% of the ring — it is real trigonometry-adjacent circle math, not a percentage-width hack.` },
      { q: 'Why does the fill animate instead of appearing instantly?', a: `The dasharray is set to the full circumference immediately, but the dashoffset (which controls how much is hidden) is only set inside a requestAnimationFrame callback. That defers the change to the next paint, after the browser has already rendered the starting state, so the CSS transition on stroke-dashoffset has an initial value to animate from instead of jumping straight to the final one.` },
      { q: 'Can multiple wrong-answer reviews be open at the same time?', a: `Yes. Each .qrb-item that has a review panel toggles its own qrb-open class independently when its row is clicked, rather than closing any other open item first. That lets a learner compare several mistakes side by side. The "Expand all reviews" button simply adds qrb-open to every item with data-correct="false" in one pass.` },
      { q: 'How do I use this quiz result breakdown in React, Vue, or Angular?', a: `Store questions as an array of objects with a correct boolean, your answer, and the correct answer text. Compute score = correct.length / total in render, derive the ring's dashoffset the same way, and toggle an "open" set of question ids in component state when a row is clicked instead of a DOM class. The ring math and grid-template-rows collapse animation are plain CSS and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of reverse-engineering the ring math by trial and error, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how circumference (2 * Math.PI * r) and stroke-dashoffset combine to turn a percentage into a partial circle, and why the dashoffset is set inside requestAnimationFrame rather than synchronously. The same assistant can help you extend the data model — for example computing score from weighted question point values instead of equal counts, or adding a third state (partially correct, for multi-select questions) that needs its own icon and color. It's also a good way to sanity-check the accordion accessibility: ask whether the review toggle buttons need aria-expanded, and how to make the "expand all" shortcut also move focus sensibly for keyboard users.`,
      prompt: `Build a "quiz result breakdown" panel in plain HTML, CSS, and JavaScript — no frameworks, no dependencies.

Requirements:
- An SVG ring/circle progress indicator showing the quiz score as a percentage, where the fill amount is computed from real circle geometry: circumference = 2 * Math.PI * r using the circle's actual radius attribute, and stroke-dashoffset = circumference - (percent/100) * circumference. Animate the fill from empty to the final value on page load using a CSS transition, deferring the dashoffset assignment to a requestAnimationFrame callback so the transition has something to animate from.
- The score percentage must be computed by counting DOM elements marked as correct out of the total question elements — do not hardcode the percentage as a separate number; it must derive from the same markup that lists the questions.
- A pass/fail banner whose text, background color, and the ring's stroke color all change together based on whether the computed score meets a passing threshold (e.g. 60%).
- A list of every question with a correct/incorrect indicator. Questions answered incorrectly are clickable and expand an inline review panel (showing "your answer" vs "correct answer" plus a brief explanation) using a smooth height animation; each incorrect question's panel must expand and collapse independently of the others, not as a single shared accordion.
- Include an "expand all reviews" button that opens every incorrect question's review panel at once.
- Keep everything in a dark theme, and make sure the JavaScript only references classnames/ids that exist in the HTML you write.`,
    },
  },
};

export default quizResultBreakdown;
