const lessonSidebarNav = {
  id: 'lesson-sidebar-nav',
  title: 'Lesson Sidebar Navigation',
  lastmod: '2026-08-22',
  category: 'navigation',
  cdnUrls: [],
  html: `<aside class="lsn-sidebar" id="lsnSidebar">
  <div class="lsn-head">
    <h2>Intro to Data Design</h2>
    <div class="lsn-course-progress"><div class="lsn-course-bar" id="lsnCourseBar"></div></div>
    <span class="lsn-course-pct" id="lsnCoursePct">40% complete</span>
  </div>
  <nav class="lsn-nav" id="lsnNav">
    <section class="lsn-section" data-open="true">
      <button class="lsn-section-head" type="button">
        <span class="lsn-chevron">&#9656;</span>
        <span class="lsn-section-title">1. Foundations</span>
        <span class="lsn-section-count">3/3</span>
      </button>
      <ul class="lsn-lessons">
        <li class="lsn-lesson" data-status="done"><span class="lsn-icon">&#10003;</span><span class="lsn-text">What is data design?</span><span class="lsn-time">4m</span></li>
        <li class="lsn-lesson" data-status="done"><span class="lsn-icon">&#10003;</span><span class="lsn-text">Reading a dataset</span><span class="lsn-time">6m</span></li>
        <li class="lsn-lesson" data-status="done"><span class="lsn-icon">&#10003;</span><span class="lsn-text">Signal vs. noise</span><span class="lsn-time">5m</span></li>
      </ul>
    </section>
    <section class="lsn-section" data-open="true">
      <button class="lsn-section-head" type="button">
        <span class="lsn-chevron">&#9656;</span>
        <span class="lsn-section-title">2. Structuring Views</span>
        <span class="lsn-section-count">1/4</span>
      </button>
      <ul class="lsn-lessons">
        <li class="lsn-lesson" data-status="done"><span class="lsn-icon">&#10003;</span><span class="lsn-text">Grids &amp; hierarchy</span><span class="lsn-time">7m</span></li>
        <li class="lsn-lesson" data-status="current"><span class="lsn-icon">&#9679;</span><span class="lsn-text">Choosing a chart type</span><span class="lsn-time">9m</span></li>
        <li class="lsn-lesson" data-status="todo"><span class="lsn-icon">&#9675;</span><span class="lsn-text">Color &amp; encoding</span><span class="lsn-time">6m</span></li>
        <li class="lsn-lesson" data-status="todo"><span class="lsn-icon">&#9675;</span><span class="lsn-text">Annotation basics</span><span class="lsn-time">5m</span></li>
      </ul>
    </section>
    <section class="lsn-section" data-open="false">
      <button class="lsn-section-head" type="button">
        <span class="lsn-chevron">&#9656;</span>
        <span class="lsn-section-title">3. Interaction</span>
        <span class="lsn-section-count">0/3</span>
      </button>
      <ul class="lsn-lessons">
        <li class="lsn-lesson" data-status="locked"><span class="lsn-icon">&#128274;</span><span class="lsn-text">Filters &amp; drilldowns</span><span class="lsn-time">8m</span></li>
        <li class="lsn-lesson" data-status="locked"><span class="lsn-icon">&#128274;</span><span class="lsn-text">Tooltips done right</span><span class="lsn-time">4m</span></li>
        <li class="lsn-lesson" data-status="locked"><span class="lsn-icon">&#128274;</span><span class="lsn-text">Final project</span><span class="lsn-time">15m</span></li>
      </ul>
    </section>
    <section class="lsn-section" data-open="false">
      <button class="lsn-section-head" type="button">
        <span class="lsn-chevron">&#9656;</span>
        <span class="lsn-section-title">4. Publishing</span>
        <span class="lsn-section-count">0/2</span>
      </button>
      <ul class="lsn-lessons">
        <li class="lsn-lesson" data-status="locked"><span class="lsn-icon">&#128274;</span><span class="lsn-text">Exporting &amp; sharing</span><span class="lsn-time">3m</span></li>
        <li class="lsn-lesson" data-status="locked"><span class="lsn-icon">&#128274;</span><span class="lsn-text">Course wrap-up</span><span class="lsn-time">2m</span></li>
      </ul>
    </section>
  </nav>
</aside>
<main class="lsn-stage">
  <h1 id="lsnStageTitle">Choosing a chart type</h1>
  <p id="lsnStageHint">Select any unlocked lesson in the sidebar to open it here.</p>
</main>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e14;color:#e7e9f2;display:flex;min-height:100vh;align-items:center;justify-content:center}
.lsn-sidebar{width:300px;flex:none;background:#12141d;border-right:1px solid #23273a;display:flex;flex-direction:column;max-height:100vh;overflow-y:auto}
.lsn-head{padding:18px 18px 14px;border-bottom:1px solid #20232f}
.lsn-head h2{margin:0 0 10px;font-size:15px;letter-spacing:-.01em}
.lsn-course-progress{height:6px;border-radius:99px;background:#20232f;overflow:hidden}
.lsn-course-bar{height:100%;width:40%;background:linear-gradient(90deg,#6d5efc,#22d3ee);border-radius:99px}
.lsn-course-pct{display:block;margin-top:6px;font-size:11.5px;color:#8a8fa8}
.lsn-nav{padding:8px 8px 20px}
.lsn-section{margin-bottom:2px}
.lsn-section-head{width:100%;display:flex;align-items:center;gap:8px;background:none;border:none;color:#c7cade;font:inherit;font-size:13px;font-weight:600;padding:10px 8px;border-radius:8px;cursor:pointer;text-align:left}
.lsn-section-head:hover{background:#181b27}
.lsn-chevron{font-size:10px;color:#6d7290;transition:transform .18s ease}
.lsn-section[data-open="true"] .lsn-chevron{transform:rotate(90deg)}
.lsn-section-title{flex:1}
.lsn-section-count{font-size:11px;font-weight:500;color:#6d7290}
.lsn-lessons{list-style:none;margin:0;padding:0 4px 6px;display:grid;overflow:hidden;transition:grid-template-rows .2s ease}
.lsn-section[data-open="true"] .lsn-lessons{grid-template-rows:1fr}
.lsn-section[data-open="false"] .lsn-lessons{grid-template-rows:0fr}
.lsn-lessons > div{overflow:hidden}
.lsn-lesson{display:flex;align-items:center;gap:10px;padding:8px 10px 8px 30px;border-radius:8px;font-size:13px;color:#aeb2c9;cursor:pointer;min-height:0}
.lsn-section[data-open="false"] .lsn-lesson{visibility:hidden}
.lsn-lesson:hover{background:#181b27}
.lsn-lesson .lsn-icon{width:16px;text-align:center;font-size:12px;flex:none}
.lsn-lesson[data-status="done"] .lsn-icon{color:#34d399}
.lsn-lesson[data-status="current"] .lsn-icon{color:#22d3ee}
.lsn-lesson[data-status="todo"] .lsn-icon{color:#585d78}
.lsn-lesson[data-status="locked"] .lsn-icon{color:#585d78;font-size:11px}
.lsn-lesson .lsn-text{flex:1}
.lsn-lesson .lsn-time{font-size:11px;color:#585d78}
.lsn-lesson[data-status="locked"]{opacity:.45;cursor:not-allowed}
.lsn-lesson[data-status="current"]{background:#1c2136;color:#fff;box-shadow:inset 3px 0 0 #6d5efc}
.lsn-lesson.lsn-active{background:#1c2136;color:#fff;box-shadow:inset 3px 0 0 #6d5efc}
.lsn-stage{flex:1;padding:48px;max-width:720px}
.lsn-stage h1{margin:0 0 10px;font-size:26px}
.lsn-stage p{color:#9aa0b8;font-size:14.5px;line-height:1.6}
@media (max-width:760px){body{flex-direction:column}.lsn-sidebar{width:100%;max-height:none}}`,

  js: `const nav = document.getElementById('lsnNav');

// Collapse / expand a section when its header is clicked.
nav.querySelectorAll('.lsn-section-head').forEach((head) => {
  head.addEventListener('click', () => {
    const section = head.closest('.lsn-section');
    const isOpen = section.getAttribute('data-open') === 'true';
    section.setAttribute('data-open', String(!isOpen));
  });
});

const stageTitle = document.getElementById('lsnStageTitle');
const stageHint = document.getElementById('lsnStageHint');

// Selecting a lesson: locked lessons do nothing, others become the active lesson.
nav.querySelectorAll('.lsn-lesson').forEach((lesson) => {
  lesson.addEventListener('click', () => {
    if (lesson.dataset.status === 'locked') return;
    nav.querySelectorAll('.lsn-lesson').forEach((l) => {
      l.classList.remove('lsn-active');
      if (l.dataset.status === 'current') l.dataset.status = 'done', (l.querySelector('.lsn-icon').innerHTML = '&#10003;');
    });
    lesson.classList.add('lsn-active');
    lesson.dataset.status = 'current';
    lesson.querySelector('.lsn-icon').innerHTML = '&#9679;';
    stageTitle.textContent = lesson.querySelector('.lsn-text').textContent;
    stageHint.textContent = 'Lesson opened from the sidebar.';
  });
});`,

  seo: {
    title: 'Lesson Sidebar Navigation — Free Collapsible Course Sidebar UI',
    description: `A collapsible course sidebar with expandable sections, per-lesson status icons (done, current, locked), and disabled locked lessons. Plain HTML, CSS & JS.`,
    about: {
      title: 'Lesson Sidebar Navigation — Collapsible Sections With Lesson Status',
      description: `The lesson sidebar navigation is the primary way learners move through a course: sections that expand and collapse, lessons marked done, current, or locked, and one lesson always highlighted as active. This snippet builds it in plain HTML, CSS, and JavaScript — no dependencies.

**Collapsible sections**

Each \`.lsn-section\` carries a \`data-open\` attribute. Clicking its \`.lsn-section-head\` button flips the attribute, and CSS animates \`.lsn-lessons\` between \`grid-template-rows: 0fr\` and \`1fr\` — a technique that transitions height without knowing the content's pixel height in advance, so lists of any length collapse and expand smoothly.

**Status icons that mean something**

Every lesson row carries \`data-status\`: \`done\` shows a green checkmark, \`current\` a cyan dot with a highlighted background and a left accent bar, \`todo\` a dim empty circle, and \`locked\` a lock glyph. The icon and row styling are driven entirely by that attribute, so changing a lesson's state is a one-line data change.

**Locked lessons are truly disabled**

Locked rows get \`opacity: .45\`, \`cursor: not-allowed\`, and their click handler returns immediately — they're visually and functionally inert, not just grayed out with an active click target underneath.

**One active lesson at a time**

Clicking an unlocked lesson clears \`current\`/active state from every other row, demotes the previous current lesson to done, and promotes the clicked lesson to current — mirroring how a real course marks your progress as you move forward.

**Course-level progress**

A slim progress bar and percentage in the header summarize completion across the whole sidebar, separate from the per-section counts shown next to each section title.

**Customizing it**

Swap the section and lesson data for your own course, add per-lesson duration or difficulty badges, or persist the active lesson to localStorage so a reload resumes where the learner left off. Pair it with a [progress wizard](/ui-snippets/progress-wizard/) for multi-step enrollment, or a [checkbox tree](/ui-snippets/checkbox-tree/) for nested curriculum outlines.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A sidebar with four collapsible sections and a stage panel render.` },
      { title: 'Click a section header', text: `The chevron rotates and its lessons expand or collapse.` },
      { title: 'Click an unlocked lesson', text: `It becomes the active lesson and the stage title updates.` },
      { title: 'Try a locked lesson', text: `It's dimmed and does nothing when clicked.` },
      { title: 'Replace the section data', text: `Edit the HTML list items for your own course.` },
      { title: 'Tune the accent color', text: `Change the gradient and highlight variables in CSS.` },
    ] },
    features: [
      { title: 'Collapsible sections', text: `grid-template-rows animates height without fixed values.` },
      { title: 'Three status icons', text: `Done, current, and locked read from data-status.` },
      { title: 'Disabled locked rows', text: `Dimmed and inert — clicks are ignored.` },
      { title: 'Active lesson highlight', text: `Left accent bar and background on the current row.` },
      { title: 'Auto-advance state', text: `Selecting a lesson demotes the prior current to done.` },
      { title: 'Course progress bar', text: `Header summarizes overall completion.` },
      { title: 'Per-section counts', text: `Each header shows completed over total lessons.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS — no framework needed.` },
    ],
    useCases: [
      { title: 'Online course navigation', text: 'Let learners move through sections that expand and collapse, with each lesson marked done, current or locked from a `data-status` attribute.' },
      { title: 'Onboarding tracks', text: 'Structure product setup like an [onboarding tour](/ui-snippets/onboarding-tour/), with a [progress wizard](/ui-snippets/progress-wizard/) showing the overall step the learner is on.' },
      { title: 'Documentation chapters', text: 'Organise long guides into collapsible chapters for documentation sites, animating height through `grid-template-rows` without any fixed pixel values.' },
      { title: 'Certification prerequisites', text: 'Lock modules in certification programmes until earlier ones are completed, dimming locked rows and ignoring clicks on them entirely.' },
      { title: 'Internal training programmes', text: 'Pair with an [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/) for new hires, with a left accent bar marking the active lesson.' },
      { icon: 'CODE', title: 'Related: Off-Canvas Push Menu', desc: 'See the [Off-Canvas Push Menu](/ui-snippets/off-canvas-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the section collapse animate without JavaScript measuring height?', a: `Each .lsn-lessons list uses CSS grid with grid-template-rows toggled between 0fr and 1fr via the parent's data-open attribute, and a nested wrapper with overflow:hidden clips the content. Grid track sizes animate like any other property, so the browser interpolates from 0fr to 1fr smoothly regardless of how many lessons are inside, with no JavaScript height calculation required.` },
      { q: 'Why are locked lessons still clickable elements instead of removed from the DOM?', a: `They stay in the DOM so the course structure remains visible — learners can see what's coming and how much is left, which is a UX expectation for courses. The click handler checks data-status === 'locked' and returns immediately, so the row is present and readable but functionally inert; combined with reduced opacity and cursor: not-allowed, it reads as disabled without hiding content.` },
      { q: 'How do I mark a lesson complete when a video or quiz finishes?', a: `From your video/quiz completion callback, find the corresponding .lsn-lesson element (by an id or data attribute you add), set its data-status to 'done', swap the icon glyph, and update the section's count label and the course-level progress bar's width and percentage text. The same function that click-selects a lesson can be extended to also mark the previous lesson done automatically.` },
      { q: 'Can I unlock a whole section once its prerequisite section finishes?', a: `Yes. When the last lesson in a section is marked done, loop the next section's lesson elements, set their data-status from 'locked' to 'todo', and remove the disabled click guard for that status. You can also auto-open the newly unlocked section by setting its data-open attribute to true so learners immediately see what's next.` },
      { q: 'How do I use this lesson sidebar in React, Vue, or Angular?', a: `Model the course as an array of sections, each with an array of lessons carrying a status field ('done' | 'current' | 'todo' | 'locked'). Render sections and lessons from that state, toggle an "open" boolean per section in component state instead of a DOM attribute, and update lesson status via your framework's state setter on selection. The CSS grid-template-rows collapse technique ports unchanged since it only depends on a data attribute selector.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing at the collapse mechanics, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why grid-template-rows: 0fr/1fr on a nested overflow:hidden wrapper produces a smooth height animation without JavaScript ever measuring the lessons list's pixel height — and why that approach handles lists of any length better than a fixed max-height. The same assistant is useful for extending the state machine: ask it to add a "locked until prerequisite" rule that automatically flips a section's lessons from locked to todo once the prior section completes, or to persist the active lesson and completed lessons to localStorage so a page reload resumes exactly where the learner left off. It can also help you audit the disabled-state accessibility — for example whether locked lessons should carry aria-disabled and how keyboard users should be prevented from focusing them.`,
      prompt: `Build a "lesson sidebar navigation" component in plain HTML, CSS, and JavaScript — no frameworks, no dependencies.

Requirements:
- A sidebar containing multiple collapsible sections; each section has a clickable header (with a chevron icon) and a list of lesson rows.
- Clicking a section header toggles that section's open/closed state, animating the lesson list's height open and closed using a CSS technique that does not require JavaScript to measure content height (e.g. grid-template-rows transitioning between 0fr and 1fr on a wrapper with overflow hidden), so it works correctly for lists of any length.
- Each lesson row carries one of four statuses via a data attribute: "done" (checkmark icon), "current" (dot icon, highlighted row with a left accent bar), "todo" (empty circle icon), or "locked" (lock icon).
- Locked lesson rows must be visually dimmed (reduced opacity, not-allowed cursor) AND functionally inert — their click handler must check the status and return early, doing nothing, rather than just being styled to look disabled while still being clickable.
- Clicking any unlocked lesson row: removes active/current styling from whichever lesson was previously current (demoting it to "done" with an updated icon), and sets the clicked lesson to "current" with updated icon and highlight styling.
- Include a course-level progress bar and percentage in the sidebar header, plus a small "completed/total" count next to each section's title.
- Keep all styling in a dark theme with a purple/cyan accent gradient, and make sure the JavaScript only ever references classnames and ids that actually exist in the HTML you write.`,
    },
  },
};

export default lessonSidebarNav;
