const redlineEditReplace = {
  id: 'redline-edit-replace',
  title: 'Redline Edit Replace',
  lastmod: '2026-11-15',
  category: 'text-animations',
  html: `<main class="desk">
  <div class="doc">
    <div class="doc-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="doc-name">proposal-v3.docx · Track changes on</span></div>
    <p class="body" id="body" aria-live="polite">
      We build <span class="edit"><span class="old">cheap</span><span class="ins"></span></span> websites for
      <span class="edit"><span class="old">everyone</span><span class="ins"></span></span> and ship them in
      <span class="edit"><span class="old">a few months</span><span class="ins"></span></span>, with
      <span class="edit"><span class="old">okay</span><span class="ins"></span></span> support after launch.
    </p>
    <div class="legend"><span><i class="k del"></i>Deleted</span><span><i class="k add"></i>Inserted</span><button type="button" class="replay" id="replay">Replay edits</button></div>
  </div>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:grid;place-items:center;background:#e9edf3;font-family:system-ui,sans-serif}
.desk{width:100%;padding:24px 16px;display:grid;place-items:center}
.doc{width:min(680px,100%);background:#fff;border-radius:12px;box-shadow:0 20px 50px rgba(20,30,60,.18);overflow:hidden}
.doc-bar{display:flex;align-items:center;gap:6px;padding:10px 14px;background:#f3f5f9;border-bottom:1px solid #e1e6ef}
.dot{width:10px;height:10px;border-radius:50%;background:#cbd3e1}
.doc-name{margin-left:10px;font-size:12px;color:#6b7690}
.body{padding:36px 34px 26px;font:400 clamp(20px,3.4vw,28px)/1.9 Georgia,'Times New Roman',serif;color:#1f2a44}

.edit{position:relative;white-space:nowrap}
.old{position:relative;display:inline-block;vertical-align:top;overflow:hidden;transition:color .3s,max-width .5s ease,opacity .4s}
.old::after{content:"";position:absolute;left:0;top:56%;height:2px;width:0;background:#e11d48;transition:width .45s ease-out}
.edit.struck .old{color:#e11d48}
.edit.struck .old::after{width:100%}
.ins{display:inline-block;color:#16a34a;font-weight:700;border-bottom:2px solid #16a34a;max-width:0;overflow:hidden;vertical-align:top;white-space:nowrap;transition:max-width .6s ease}
.edit.typing .ins{max-width:14em;margin-left:6px}
.edit.accepted .old{max-width:0;opacity:0}
.edit.accepted .ins{color:inherit;font-weight:400;border-bottom-color:transparent;margin-left:0}

.legend{display:flex;align-items:center;gap:18px;padding:12px 34px 18px;font-size:12px;color:#6b7690}
.legend .k{display:inline-block;width:14px;height:3px;margin-right:7px;vertical-align:middle;border-radius:2px}
.k.del{background:#e11d48}.k.add{background:#16a34a}
.replay{margin-left:auto;font:600 12px system-ui,sans-serif;color:#1f2a44;background:#eef2f9;border:1px solid #d4dcec;border-radius:8px;padding:7px 14px;cursor:pointer}
.replay:focus-visible{outline:2px solid #2563eb;outline-offset:2px}
@media (prefers-reduced-motion:reduce){.old,.old::after,.ins{transition:none}}`,

  js: `var edits = Array.prototype.slice.call(document.querySelectorAll('.edit'));
var NEW_TEXT = ['affordable', 'growing local businesses', 'six weeks', 'ongoing'];
var timers = [];
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

function reset() {
  timers.forEach(clearTimeout);
  timers = [];
  edits.forEach(function (ed) {
    ed.classList.remove('struck', 'typing', 'accepted');
    ed.querySelector('.ins').textContent = '';
  });
}

function typeInto(el, text, done) {
  var i = 0;
  (function step() {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) later(step, 45); else done();
  })();
}

function run() {
  reset();
  var t = 600;
  edits.forEach(function (ed, i) {
    var ins = ed.querySelector('.ins');
    later(function () { ed.classList.add('struck'); }, t);                    // 1. red line strikes the old word
    later(function () {                                                        // 2. the new word is typed in beside it
      ed.classList.add('typing');
      typeInto(ins, NEW_TEXT[i], function () { later(function () { ed.classList.add('accepted'); }, 700); });  // 3. accept: old collapses
    }, t + 650);
    t += 650 + NEW_TEXT[i].length * 45 + 1500;
  });
}

document.getElementById('replay').addEventListener('click', run);

if (reduce) {
  edits.forEach(function (ed, i) { ed.querySelector('.ins').textContent = NEW_TEXT[i]; ed.classList.add('typing', 'accepted'); });
} else {
  run();
}`,

  seo: {
    title: 'Redline Edit Replace — Strikethrough and Rewrite Animation',
    description: `A word is struck through in red, the correction types in beside it in green, then the old word collapses away, repeated edit after edit like tracked changes.`,
    about: {
      title: `Redline Edit Replace — Strike, Type, Accept: A Tracked-Changes Text Animation`,
      description: `Everyone recognises the visual language of an edit: red strikethrough on the word that goes, green on the word that replaces it. This snippet animates that whole workflow as a sentence rewrites itself, four edits in sequence. It's useful because it tells a story with text alone: "this is how we're making your words better".

**Three phases per edit**

Each edit is a small group: an \`.old\` word and an empty \`.ins\` placeholder. In the first phase the group gets \`struck\`, which grows a red line from 0 to full width through a \`::after\` pseudo-element and turns the word red. In the second phase \`typing\` opens the \`.ins\` container (a \`max-width\` transition from 0) while JavaScript types the replacement one letter at a time. In the third, \`accepted\` collapses the old word to zero width and fades it, and the new word loses its green underline and returns to normal text colour, as if you'd accepted the change.

**Why max-width, not display**

\`display:none\` can't be transitioned. Animating \`max-width\` from 0 to a generous \`14em\` (and from the word's width back to 0 for the old word) lets the sentence reflow smoothly as words appear and disappear, with the text after the edit sliding into place rather than jumping.

**A cancellable timeline**

All the steps are scheduled through one \`later()\` helper that stores each timer, so "Replay edits" can clear everything mid-sequence and start fresh with no overlapping animations. The paragraph is an \`aria-live\` region so assistive tech hears the finished sentence, and reduced-motion visitors see the final, accepted version immediately.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the three blocks', text: `A white document window appears and four words in the sentence are struck through and rewritten in turn, ending with the clean final sentence.` },
      { title: 'Write your own sentence', text: `Edit the paragraph and wrap each word you want to change in \`<span class="edit"><span class="old">…</span><span class="ins"></span></span>\`.` },
      { title: 'Set the replacements', text: `Update \`NEW_TEXT\` in the JavaScript so there is one replacement string for each edit, in order.` },
      { title: 'Tune the timing', text: `Typing speed is the \`45\` (ms per letter). The \`650\` before typing and the \`1500\` after each edit set the pause. Raise them for a calmer read.` },
      { title: 'Re-colour the marks', text: `Red is \`#e11d48\` and green is \`#16a34a\`. Change them (and the legend swatches) to match your brand or a darker background.` },
    ] },
    features: [
      { title: 'Three-phase edit', text: `Strike, type, accept: each change is told in three clear steps, matching how people read tracked changes.` },
      { title: 'Animated strike line', text: `A \`::after\` rule grows across the old word, so the cut is drawn rather than switched on.` },
      { title: 'Smooth reflow', text: `Words appear and disappear through \`max-width\` transitions, so the sentence closes up gracefully.` },
      { title: 'Typed replacements', text: `The new word is typed letter by letter, with a green underline that clears on accept.` },
      { title: 'Cancellable timeline', text: `One timer helper means Replay clears every pending step first, so runs never overlap.` },
      { title: 'Final state for everyone', text: `Reduced-motion users see the accepted sentence at once, and the paragraph is a polite live region.` },
    ],
    useCases: [
      { title: 'Copywriting and editing services', text: `Show a before-and-after rewrite of a client sentence as a live demo on a freelance copywriter's site.` },
      { title: 'Grammar and AI writing tools', text: `Illustrate suggestions being accepted in a landing page hero for a writing assistant.` },
      { title: 'Legal and document-review products', text: `Demonstrate tracked changes and approvals without screenshots.` },
      { title: 'Rebrand and "we changed" announcements', text: `Strike the old claim and type the new one in a changelog or about page.` },
      { title: 'Teaching writing', text: `Show students how a vague sentence turns specific, one edit at a time.` },
    ],
    faqs: [
      { q: 'How do I add a fifth edit?', a: `Add another \`.edit\` group in the paragraph and one more string at the end of \`NEW_TEXT\`. The script reads every \`.edit\` in order and the timing accumulates, so no other change is needed.` },
      { q: 'Why does the sentence jump when an old word disappears?', a: `The old word needs a measurable width to animate from. It must be \`display:inline-block\` with an explicit \`max-width\` transition. If you changed it to inline, the collapse becomes instant.` },
      { q: 'Can the edits run when the section scrolls into view?', a: `Yes. Remove the direct \`run()\` call and trigger it from an IntersectionObserver, as other scroll-triggered snippets here do.` },
      { q: 'Can I keep the struck word visible at the end?', a: `Yes: leave out the \`accepted\` step, or make it only turn the old word grey. That produces a permanent "before and after" view.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant to explain why the collapsing of the old word uses max-width and opacity instead of display none, and how storing every setTimeout in an array lets the replay button cancel a half-finished sequence safely. It's worth asking how you'd restructure the schedule using promises or async/await.`,
      prompt: `Build a "tracked changes" text animation in plain HTML, CSS and JavaScript where words in a sentence get struck through and rewritten one edit at a time.

Requirements:
- A document card with a toolbar-style header and a paragraph containing four edit groups. Each group has an .old word and an empty .ins span.
- Phase 1: add a struck class that grows a red line across the old word (a ::after pseudo-element animating width) and turns it red.
- Phase 2: add a typing class that opens the .ins span with a max-width transition while JavaScript types the replacement text one letter at a time; the inserted text is green with an underline.
- Phase 3: add an accepted class that collapses the old word (max-width to 0 and opacity to 0) and returns the new text to the normal colour with no underline, so the sentence reflows smoothly.
- Schedule all steps through a helper that stores every timeout, so a "Replay edits" button can clear them and restart without overlap.
- Make the paragraph an aria-live polite region, and under prefers-reduced-motion show the final accepted sentence immediately with no transitions.`,
    },
  },
};

export default redlineEditReplace;
