const faqSearchAccordion = {
  id: 'faq-search-accordion',
  title: 'FAQ Search Accordion',
  lastmod: '2026-06-22',
  category: 'layouts',
  html: `<div class="fsa-card">
  <h3>Frequently asked questions</h3>
  <div class="fsa-search">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
    <input type="text" id="fsaSearch" placeholder="Search questions…" autocomplete="off">
    <button type="button" class="fsa-clear" id="fsaClear" hidden aria-label="Clear">✕</button>
  </div>

  <div class="fsa-list" id="fsaList"></div>
  <p class="fsa-empty" id="fsaEmpty" hidden>No questions match — try different keywords.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}

.fsa-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:560px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.fsa-card h3{font-size:19px;font-weight:800;color:#0f172a;margin-bottom:16px}

.fsa-search{display:flex;align-items:center;gap:9px;border:1.5px solid #e2e8f0;border-radius:11px;padding:10px 13px;margin-bottom:14px;color:#94a3b8;transition:border-color .15s,box-shadow .15s}
.fsa-search:focus-within{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.fsa-search input{flex:1;border:none;outline:none;font-size:14px;font-family:inherit;color:#0f172a}
.fsa-clear{border:none;background:#e2e8f0;color:#475569;width:20px;height:20px;border-radius:50%;font-size:10px;cursor:pointer;flex-shrink:0}

.fsa-list{display:flex;flex-direction:column}
.fsa-item{border-bottom:1px solid #f1f5f9}
.fsa-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;background:none;border:none;padding:15px 2px;font-size:14.5px;font-weight:700;color:#1e293b;cursor:pointer;text-align:left;font-family:inherit}
.fsa-q mark{background:#fef08a;color:inherit;border-radius:2px;padding:0 1px}
.fsa-chevron{flex-shrink:0;color:#94a3b8;transition:transform .25s}
.fsa-item.open .fsa-chevron{transform:rotate(180deg)}
.fsa-a-wrap{display:grid;grid-template-rows:0fr;transition:grid-template-rows .28s ease}
.fsa-item.open .fsa-a-wrap{grid-template-rows:1fr}
.fsa-a-inner{overflow:hidden;min-height:0}
.fsa-a{font-size:13.5px;color:#64748b;line-height:1.6;padding:0 2px 16px}
.fsa-a mark{background:#fef08a;color:inherit;border-radius:2px;padding:0 1px}

.fsa-empty{text-align:center;padding:28px 0;font-size:14px;color:#94a3b8}`,

  js: `var FAQS = [
  { q: 'How do I reset my password?', a: 'Click "Forgot password" on the sign-in page and enter your email. We\\'ll send a reset link that stays valid for one hour.' },
  { q: 'Can I change my plan later?', a: 'Yes — upgrade or downgrade anytime from Settings → Billing. Changes are prorated, so you only pay for what you use.' },
  { q: 'Do you offer refunds?', a: 'We offer a 30-day money-back guarantee on all annual plans. Contact support and we\\'ll process it within 5 business days.' },
  { q: 'How do I export my data?', a: 'Go to Settings → Data and click Export. You\\'ll get a downloadable archive of everything in JSON and CSV formats.' },
  { q: 'Is my data encrypted?', a: 'All data is encrypted in transit with TLS and at rest with AES-256. We never sell or share your data with third parties.' },
  { q: 'Can I invite team members?', a: 'On Team and Enterprise plans you can invite unlimited members from Settings → Team. Each member gets their own login.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and (on annual Enterprise plans) bank transfer and invoicing.' },
  { q: 'How do I cancel my subscription?', a: 'Cancel anytime from Settings → Billing → Cancel. You keep access until the end of your current billing period.' },
];

var listEl = document.getElementById('fsaList');
var searchEl = document.getElementById('fsaSearch');
var clearBtn = document.getElementById('fsaClear');
var emptyEl = document.getElementById('fsaEmpty');
var openIndex = -1;

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function mark(text, q) {
  var safe = escapeHtml(text);
  if (!q) return safe;
  var i = safe.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return safe;
  return safe.slice(0, i) + '<mark>' + safe.slice(i, i + q.length) + '</mark>' + safe.slice(i + q.length);
}

function render(query) {
  var q = (query || '').trim();
  var matches = FAQS.filter(function (f) {
    return !q || (f.q + ' ' + f.a).toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  emptyEl.hidden = matches.length > 0;
  listEl.innerHTML = matches.map(function (f, i) {
    var open = q ? true : i === openIndex;     // expand all while searching
    return '<div class="fsa-item' + (open ? ' open' : '') + '" data-i="' + i + '">' +
      '<button type="button" class="fsa-q"><span>' + mark(f.q, q) + '</span>' +
        '<svg class="fsa-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>' +
      '</button>' +
      '<div class="fsa-a-wrap"><div class="fsa-a-inner"><div class="fsa-a">' + mark(f.a, q) + '</div></div></div>' +
    '</div>';
  }).join('');
}

listEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.fsa-q');
  if (!btn || searchEl.value.trim()) return;     // while searching, items stay expanded
  var item = btn.closest('.fsa-item');
  var i = +item.dataset.i;
  openIndex = item.classList.contains('open') ? -1 : i;
  render('');
});

searchEl.addEventListener('input', function () {
  clearBtn.hidden = !this.value;
  render(this.value);
});
clearBtn.addEventListener('click', function () {
  searchEl.value = '';
  clearBtn.hidden = true;
  openIndex = -1;
  render('');
  searchEl.focus();
});

render('');`,

  seo: {
    title: 'FAQ Search Accordion — Searchable FAQ HTML CSS JS',
    description: `A searchable FAQ accordion that filters questions live, highlights matched terms, and auto-expands results. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'FAQ Search Accordion — Live-Filtered Questions with Match Highlighting',
      description: `A static FAQ list is fine with five questions, but past a dozen, visitors give up scanning and leave. Adding search turns a wall of questions into something people actually use — they type a keyword, see only the relevant answers with their term highlighted, and get unblocked. This snippet builds that searchable FAQ accordion in plain HTML, CSS, and vanilla JavaScript: live filtering across questions and answers, match highlighting, and smart expand behavior.

**Search filters questions and answers**

The search box filters on every keystroke against both the question *and* the answer text, so a query like "refund" finds the relevant entry even if the word only appears in the answer body, not the question title. Matching is case-insensitive and substring-based, which is what users expect from a help search. When nothing matches, an explicit empty state ("No questions match — try different keywords") appears instead of a confusing blank list.

**Highlighting that shows why each result matched**

Matched terms are wrapped in a \`<mark>\` and rendered with a yellow highlight, in both the question and the answer. This is the detail that makes search feel trustworthy — the user immediately sees *where* their term appears, so a result that matched on a single word in a long answer doesn't look like a mistake. The highlighting is built safely: answer text is HTML-escaped first (\`escapeHtml\`) before the \`<mark>\` is inserted, so user-typed queries can't inject markup — a subtle but important XSS guard whenever you build HTML from user input.

**Search expands; browsing collapses**

The expand behavior adapts to context. While browsing (no query), it's a classic single-open accordion — clicking a question expands it and collapses the others, keeping the list scannable. The moment you search, every matching result expands automatically so you can read all the candidate answers at once without extra clicks — because when you're searching, you want to see the answers, not hunt for the right one to open. Clearing the search returns to the collapsed accordion. This dual mode is what separates a thoughtful FAQ search from a list that just hides non-matches.

**A reveal animation with no height measurement**

Each answer uses the modern CSS grid trick to animate open: the wrapper transitions \`grid-template-rows\` from \`0fr\` to \`1fr\` with the inner content set to \`overflow: hidden; min-height: 0\`. This animates each answer to its exact natural height with zero JavaScript measurement — no \`max-height\` guessing that clips long answers or feels mistimed. It adapts perfectly whether an answer is one line or five.

**Data-driven and accessible**

The whole list renders from a \`FAQS\` array of \`{ q, a }\` objects, so adding or editing questions is a data change. Each question is a real \`<button>\`, so it's keyboard-focusable and operable with Enter/Space, and the chevron rotates to indicate state. For a production build you'd add \`aria-expanded\` and \`aria-controls\` to fully wire the accordion semantics (covered in the FAQs), but the structure — buttons controlling associated answer regions — is correct from the start.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A searchable FAQ card renders with eight questions in a collapsed accordion.` },
      { title: 'Browse by clicking', text: `Click a question to expand its answer — opening one collapses the others, keeping the list scannable.` },
      { title: 'Search for a keyword', text: `Type in the search box — only matching questions show, every match expands, and the term is highlighted in yellow.` },
      { title: 'See the empty state', text: `Search for something with no match to see the "No questions match" message instead of a blank list.` },
      { title: 'Clear the search', text: `Click the ✕ to clear the query and return to the collapsed browsing accordion.` },
      { title: 'Edit the questions', text: `Add or change entries in the FAQS array ({ q, a }) — the list, search, and highlighting all update automatically.` },
    ] },
    features: [
      { title: 'Live search across Q and A', text: `Filters on every keystroke against both question and answer text, so matches in answers surface too.` },
      { title: 'Match highlighting', text: `Matched terms are wrapped in a yellow <mark> in both question and answer, showing exactly why each result matched.` },
      { title: 'XSS-safe highlighting', text: `Answer text is HTML-escaped before the <mark> is inserted, so user queries can never inject markup.` },
      { title: 'Context-aware expand', text: `Single-open accordion while browsing; auto-expand-all while searching, so you read answers without extra clicks.` },
      { title: 'Height-measurement-free animation', text: `The grid-template-rows 0fr→1fr trick animates each answer to its true height with no JavaScript measurement.` },
      { title: 'Empty state', text: `A clear "no questions match" message replaces a confusing blank list when search returns nothing.` },
      { title: 'Data-driven list', text: `Questions render from a FAQS array — add or edit them with a one-line data change.` },
      { title: 'Keyboard-operable buttons', text: `Each question is a real <button>, focusable and toggleable with Enter/Space, with a rotating chevron indicator.` },
    ],
    useCases: [
      { title: 'Help center and support pages', text: `Make a large FAQ actually usable with search — pair with a [helpful feedback widget](/ui-snippets/helpful-feedback-widget/) to learn which answers land.` },
      { title: 'Pricing and product FAQs', text: `Let prospects find billing, refund, or feature answers fast before they commit.` },
      { title: 'Documentation landing pages', text: `Surface common questions with search above deeper docs, alongside a [table of contents](/ui-snippets/table-of-contents/).` },
      { title: 'Onboarding and getting-started', text: `Answer setup questions searchably so new users self-serve instead of opening tickets.` },
      { title: 'Event and webinar pages', text: `Address logistics questions (timing, access, recording) in a searchable block.` },
      { title: 'Learning search + accordion patterns', text: `A reference for live filtering, safe highlighting, and context-aware expand — compare with an [accordion FAQ](/ui-snippets/accordion-faq/) for the no-search version.` },
      { icon: 'CODE', title: 'Related: Live Code Playground', desc: 'See the [Live Code Playground](/ui-snippets/live-code-playground/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I add or edit questions?', a: `Edit the FAQS array — each entry is a { q, a } object. The list renders from it, so adding, removing, or reordering questions needs no other changes, and search automatically covers the new content since it filters against the array text.` },
      { q: 'Why escape the answer HTML before highlighting?', a: `Because the highlight function builds HTML by inserting a <mark> around the matched substring, any raw HTML or a malicious query could otherwise be injected into the page. Escaping the text first (& < > → entities) and only then inserting the safe <mark> tag means user-typed search terms are treated as plain text — a small but essential XSS guard whenever you construct HTML from user input.` },
      { q: 'Why expand all results when searching but only one when browsing?', a: `The two modes serve different intents. Browsing is exploratory, so a single-open accordion keeps the list short and scannable. Searching is goal-directed — the user wants the answer now — so showing all matching answers expanded saves a second click and lets them compare candidates at a glance. Adapting the behavior to intent is what makes the search feel helpful rather than mechanical.` },
      { q: 'How do I make the accordion fully accessible?', a: `Add aria-expanded to each question button (reflecting open state) and aria-controls pointing at its answer region's id, give each answer region a matching id and role="region" with aria-labelledby back to the button. The buttons are already keyboard-operable; these ARIA attributes let screen readers announce the expand/collapse state and associate each answer with its question.` },
      { q: 'How do I use this FAQ search in React, Vue, or Angular?', a: `In React, hold the query and open index in useState and derive the filtered, highlighted list with useMemo; in Vue, use ref()/computed(); in Angular, use a component field with a pipe or getter. The filter, escape, and highlight functions are plain JavaScript that port unchanged — only the per-keystroke re-render moves into the framework's reactivity.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to just trust that the highlighting is safe from injection. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why escapeHtml runs before the mark tag gets inserted in the mark function, and what could go wrong if that order were reversed. The same assistant can help you optimize it — ask whether re-rendering the entire list's innerHTML on every keystroke is fast enough for a much larger FAQ set, and whether the grid-template-rows expand animation would still work correctly if an item's content changed size while it was already open. It's also useful for extending the component: ask it to add fuzzy or typo-tolerant matching instead of exact substring search, group results by category with sticky headers, or track which questions get searched most often to surface them at the top by default. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a searchable FAQ accordion in plain HTML, CSS, and JavaScript with live filtering and match highlighting — no library.

Requirements:
- A data-driven list of question-and-answer objects that a single render function turns into DOM markup on every search keystroke, rather than pre-rendering static HTML.
- The search must filter against the combined text of both the question and the answer (not just the question title), so a query that only appears inside an answer still surfaces that entry.
- Any matched substring in either the question or the answer must be wrapped in a mark element and visually highlighted, but the surrounding text must be HTML-escaped before the mark tag is inserted, so a search query can never be used to inject arbitrary markup into the page.
- While the search box is empty, the component must behave like a single-open accordion: clicking a question expands it and collapses whichever other question was open. The instant a non-empty search query is present, every matching item must render already expanded, since a searching user wants to compare all matching answers at once rather than click through them one by one.
- Show an explicit "no results" message when a search returns zero matches, rather than leaving a blank list.
- Animate each answer's reveal using a CSS grid-template-rows transition from a zero-fraction row to a one-fraction row (with an inner overflow-hidden wrapper), so every answer expands to its own natural content height with no JavaScript height measurement and no fixed max-height guess.
- Every question must be rendered as a real button element with a rotating chevron icon reflecting open/closed state, and a clear (X) button must appear next to the search input only when it contains text, clearing the query and refocusing the input when clicked.`,
    },
  },
};

export default faqSearchAccordion;
