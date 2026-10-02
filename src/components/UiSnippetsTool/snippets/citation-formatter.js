const citationFormatter = {
  id: 'citation-formatter',
  title: 'Citation Style Formatter',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<div class="cf-card">
  <h3>Citation formatter</h3>

  <div class="cf-style" role="radiogroup" aria-label="Citation style">
    <button type="button" class="cf-style-btn active" data-style="apa">APA</button>
    <button type="button" class="cf-style-btn" data-style="mla">MLA</button>
  </div>

  <div class="cf-fields">
    <label class="cf-field">
      <span>Author (full name)</span>
      <input type="text" id="cfAuthor" placeholder="Jane A. Smith" value="Jane A. Smith">
    </label>
    <label class="cf-field">
      <span>Title of work</span>
      <input type="text" id="cfTitle" placeholder="The Long Thaw" value="The Long Thaw">
    </label>
    <label class="cf-field">
      <span>Publication / site name</span>
      <input type="text" id="cfPublication" placeholder="Atlas Review" value="Atlas Review">
    </label>
    <label class="cf-field">
      <span>Year</span>
      <input type="text" id="cfYear" placeholder="2024" value="2024">
    </label>
    <label class="cf-field">
      <span>URL</span>
      <input type="text" id="cfUrl" placeholder="https://example.com/article" value="https://example.com/the-long-thaw">
    </label>
  </div>

  <div class="cf-output">
    <p class="cf-citation" id="cfCitation"></p>
    <button type="button" class="cf-copy" id="cfCopy">Copy citation</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1116;color:#e7e9ee;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 20px}

.cf-card{background:#171a21;border:1px solid #272c37;border-radius:16px;padding:24px;width:100%;max-width:440px}
.cf-card h3{font-size:16.5px;font-weight:800;margin-bottom:14px}

.cf-style{display:flex;background:#1e222c;border-radius:10px;padding:3px;margin-bottom:16px}
.cf-style-btn{flex:1;border:none;background:none;padding:9px;border-radius:8px;font-size:13px;font-weight:700;color:#8b93a5;cursor:pointer;transition:background .15s,color .15s}
.cf-style-btn.active{background:#3b82f6;color:#fff}

.cf-fields{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}
.cf-field{display:flex;flex-direction:column;gap:5px}
.cf-field span{font-size:11.5px;font-weight:700;color:#8b93a5;text-transform:uppercase;letter-spacing:.04em}
.cf-field input{border:1.5px solid #272c37;background:#12151b;border-radius:9px;padding:10px 12px;font-size:13.5px;color:#e7e9ee;font-family:inherit;outline:none;transition:border-color .15s}
.cf-field input:focus{border-color:#3b82f6}

.cf-output{background:#12151b;border:1px solid #272c37;border-radius:12px;padding:16px}
.cf-citation{font-size:14px;line-height:1.65;color:#e7e9ee;margin-bottom:12px;word-break:break-word}
.cf-citation i{font-style:italic}
.cf-copy{background:#242938;color:#c9cfdb;border:1px solid #323950;border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer;transition:background .15s,color .15s}
.cf-copy:hover{background:#2c3244;color:#fff}
.cf-copy.cf-copied{background:#16a34a;border-color:#16a34a;color:#fff}`,

  js: `var style = 'apa';

var fields = {
  author: document.getElementById('cfAuthor'),
  title: document.getElementById('cfTitle'),
  publication: document.getElementById('cfPublication'),
  year: document.getElementById('cfYear'),
  url: document.getElementById('cfUrl'),
};
var citationEl = document.getElementById('cfCitation');
var copyBtn = document.getElementById('cfCopy');

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// "Jane A. Smith" -> "Smith, J. A." (APA: initials only for first/middle names)
function authorApa(full) {
  var parts = full.trim().split(/\\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  var last = parts.pop();
  var initials = parts.map(function (p) { return p.charAt(0).toUpperCase() + '.'; }).join(' ');
  return last + ', ' + initials;
}

// "Jane A. Smith" -> "Smith, Jane A." (MLA: full first/middle names kept)
function authorMla(full) {
  var parts = full.trim().split(/\\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  var last = parts.pop();
  return last + ', ' + parts.join(' ');
}

// Titles/sentences don't get a second terminal period if they already end in . ! or ?
function withTerminal(text, punct) {
  var t = text.trim();
  if (!t) return '';
  var last = t.charAt(t.length - 1);
  if (last === '.' || last === '!' || last === '?') return t;
  return t + punct;
}

// MLA style omits the leading http:// or https:// from URLs.
function stripProtocol(url) {
  return url.trim().replace(/^https?:\\/\\//i, '');
}

function buildApa(v) {
  var author = authorApa(v.author);
  var year = v.year.trim();
  var title = withTerminal(v.title, '.');
  var pub = withTerminal(v.publication, '.');
  var url = v.url.trim();

  var out = '';
  if (author) out += escapeHtml(author) + ' ';
  if (year) out += '(' + escapeHtml(year) + '). ';
  if (title) out += '<i>' + escapeHtml(title) + '</i> ';
  if (pub) out += escapeHtml(pub) + ' ';
  if (url) out += escapeHtml(url);
  return out.trim();
}

function buildMla(v) {
  var author = authorMla(v.author);
  var year = v.year.trim();
  var title = withTerminal(v.title, '.');
  var pub = v.publication.trim();
  var url = stripProtocol(v.url);

  var out = '';
  if (author) out += escapeHtml(withTerminal(author, '.')) + ' ';
  if (title) out += '&quot;' + escapeHtml(title) + '&quot; ';
  if (pub) out += '<i>' + escapeHtml(pub) + '</i>, ';
  if (year) out += escapeHtml(year) + ', ';
  if (url) out += escapeHtml(url) + '.';
  return out.trim();
}

function plainText(html) {
  return html.replace(/<i>/g, '').replace(/<\\/i>/g, '').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function render() {
  var v = {
    author: fields.author.value,
    title: fields.title.value,
    publication: fields.publication.value,
    year: fields.year.value,
    url: fields.url.value,
  };
  var html = style === 'apa' ? buildApa(v) : buildMla(v);
  citationEl.innerHTML = html || 'Fill in the fields above to build a citation.';
  copyBtn.classList.remove('cf-copied');
  copyBtn.textContent = 'Copy citation';
}

document.querySelector('.cf-style').addEventListener('click', function (e) {
  var btn = e.target.closest('.cf-style-btn');
  if (!btn) return;
  style = btn.dataset.style;
  document.querySelectorAll('.cf-style-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
  render();
});

Object.keys(fields).forEach(function (key) {
  fields[key].addEventListener('input', render);
});

copyBtn.addEventListener('click', function () {
  var text = plainText(citationEl.innerHTML);
  var done = function () {
    copyBtn.classList.add('cf-copied');
    copyBtn.textContent = 'Copied \\u2713';
    setTimeout(function () {
      copyBtn.classList.remove('cf-copied');
      copyBtn.textContent = 'Copy citation';
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(function () {});
  } else {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (err) {}
    document.body.removeChild(ta);
  }
});

render();`,

  seo: {
    title: 'Citation Style Formatter — Free APA & MLA Generator HTML CSS JS',
    description: `A citation formatter that turns author, title, publication, year, and URL into correctly punctuated APA or MLA references, with one-click copy. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Citation Style Formatter — Real APA and MLA Punctuation Rules, Not Approximations',
      description: `Most "citation generator" demos get the easy 80% right and fumble the punctuation that actually matters — where italics go, whether a period sits inside or outside quotation marks, whether the URL keeps its protocol. This snippet builds a genuinely accurate APA and MLA formatter from five structured fields (author, title, publication, year, URL), in plain HTML, CSS, and vanilla JavaScript, with italics represented via CSS \`font-style\` since the output is plain text.

**APA: the work's title is italicized, not the site**

For an online work, APA style (7th edition) italicizes the *title of the work itself* and leaves the publication/site name in plain text: \`Smith, J. A. (2024). The Long Thaw. Atlas Review. https://…\`. The author is reduced to last name plus initials — \`authorApa()\` splits the full name, pops the last token as the surname, and reduces every remaining token to a capitalized initial. The year sits in parentheses immediately after the author, and the URL is included in full with its protocol, no trailing period.

**MLA: the title gets quotes, the publication gets italics — the opposite pairing**

MLA style (9th edition) treats the source title as a *part of* its container: it goes in quotation marks, while the container — the publication or site name — is what gets italicized: \`Smith, Jane A. "The Long Thaw." Atlas Review, 2024, example.com/the-long-thaw.\` The author keeps full first and middle names rather than reducing to initials (\`authorMla()\`), and per current MLA guidance, the URL's \`http://\` or \`https://\` prefix is stripped before it's included — a genuinely easy-to-miss detail this formatter gets right automatically.

**Terminal punctuation that respects existing punctuation**

A title that already ends in a question mark or exclamation point shouldn't get a second, redundant period after it — \`withTerminal()\` checks the last character before deciding whether to append one, in both styles. This is a small rule that a naive "always add a period" implementation gets wrong.

**One state, two renderers, no re-typing**

The five input fields feed a single \`v\` object on every keystroke, and \`buildApa()\` / \`buildMla()\` are pure functions from that object to a citation string — switching styles re-runs the same field values through the other formatter, so nothing needs re-entering when you compare styles side by side.

**Copy button with a real fallback**

The copy button uses the modern \`navigator.clipboard\` API when available and falls back to a hidden-textarea-plus-\`execCommand\` approach otherwise, so it works in older or restricted embedding contexts too.

**Customizing it**

Add support for multiple authors (APA joins additional authors with \`&\`; MLA lists only the first author followed by "et al." for three or more), or extend the field set for journal volume/issue numbers. Pair it with [code block](/ui-snippets/code-block/) for a technical writing toolkit, or a [table of contents](/ui-snippets/table-of-contents/) for a long-form article layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A formatter loads with example fields already filled in, showing an APA citation.` },
      { title: 'Edit the fields', text: `Author, title, publication, year, and URL — the citation updates on every keystroke.` },
      { title: 'Switch to MLA', text: `Watch the punctuation invert: the title moves into quotes and the publication becomes italicized.` },
      { title: 'Click "Copy citation"', text: `The plain-text citation (no HTML markup) is copied to your clipboard.` },
      { title: 'Try edge cases', text: `A single-word author name or a title ending in "?" both format correctly without extra punctuation.` },
      { title: 'Extend for your needs', text: `Add multi-author support or journal-specific fields like volume and issue.` },
    ] },
    features: [
      { title: 'Real APA punctuation', text: `Italicized work title, plain publication name, initials-only author, parenthetical year.` },
      { title: 'Real MLA punctuation', text: `Quoted title, italicized publication, full author first/middle names, protocol-stripped URL.` },
      { title: 'Smart terminal punctuation', text: `Titles ending in ? or ! never get a redundant extra period appended.` },
      { title: 'Live two-way formatting', text: `The same five fields drive both styles — switch without re-entering data.` },
      { title: 'CSS-based italics', text: `font-style renders italics correctly for plain-text citation output.` },
      { title: 'Clipboard copy with fallback', text: `Uses the modern Clipboard API with an execCommand fallback for older browsers.` },
      { title: 'HTML-escaped input', text: `User-entered text is escaped before rendering, so special characters display safely.` },
      { title: 'Single-word author handling', text: `Author names with no separable first/last split still format sensibly.` },
    ],
    useCases: [
      { title: 'Academic writing tools', text: 'Give students properly punctuated APA or MLA references, with italics, quotation marks and terminal punctuation handled as each style requires.' },
      { title: 'Blog and journalism CMSs', text: 'Let writers generate a correct source reference from five fields, never adding a redundant period after a title ending in a question mark.' },
      { title: 'Bibliography managers', text: 'Provide a lightweight formatter in a reference tool, switching between styles without retyping, with one-click copy for the finished citation.' },
      { title: 'Library and research portals', text: 'Offer patrons instant APA or MLA output, with initials-only author formatting for APA and full names for MLA.' },
      { title: 'Footnote and article pairing', text: 'Pair with a [footnote hover preview](/ui-snippets/footnote-hover-preview/) and a [table of contents](/ui-snippets/table-of-contents/) for long articles that cite sources.' },
      { icon: 'CODE', title: 'Related: Conditional Branching Form Fields — Show Only What Applies', desc: 'See the [Conditional Branching Form Fields — Show Only What Applies](/ui-snippets/conditional-branching-form-fields/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What exactly is different between the APA and MLA output?', a: `In APA, the title of the work is italicized and the publication/site name is plain text, with the author reduced to last name plus initials and the year in parentheses right after the author. In MLA, that pairing inverts: the title goes in quotation marks and the publication is italicized instead, the author keeps full first and middle names, and the year moves later in the citation, after the publication.` },
      { q: 'Why does the URL look different between the two styles?', a: `MLA style specifically instructs writers to omit the leading http:// or https:// from a URL in a Works Cited entry, so this formatter strips it automatically for MLA output via stripProtocol(). APA style keeps the URL exactly as entered, protocol included, since APA references are meant to be directly clickable/functional as given.` },
      { q: 'How does the formatter avoid double punctuation on a title?', a: `withTerminal() inspects the last character of the title (or author string) before deciding whether to append a period — if the text already ends in a period, question mark, or exclamation point, nothing extra is added. Without this check, a title like "What Is Justice?" would incorrectly render as "What Is Justice?." with a redundant trailing period.` },
      { q: 'How would I add support for two or more authors?', a: `APA joins two authors with an ampersand (Smith, J. A., & Lee, K.) and switches to "et al." after 20 authors; MLA lists only the first author in "Last, First" form followed by ", et al." once there are three or more authors, but keeps both names spelled out in full for exactly two. You would extend the author field to accept multiple names (or add repeatable fields) and branch authorApa()/authorMla() on the count.` },
      { q: 'How do I use this citation formatter in React, Vue, or Angular?', a: `Hold the five field values in component state and recompute the citation with a memoized/computed value keyed to those fields and the selected style — buildApa() and buildMla() are already pure functions of a plain data object, so they port unchanged into any framework; only the input bindings and the copy button's DOM access change.` },
    ],
    aiPrompt: {
      paragraph: `Rather than double-checking punctuation rules by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to verify that the APA output correctly italicizes the work title while MLA correctly quotes it and italicizes the publication instead, and to check that withTerminal() genuinely avoids double punctuation on titles ending in question marks or exclamation points. The same assistant is useful for extending accuracy further — ask it to add correct handling for two-author and three-plus-author (et al.) cases in both styles, add Chicago or Harvard style as a third formatter following the same buildXxx(v) pattern, or handle a missing field (like no URL for a print source) by omitting it cleanly rather than leaving a stray space. Treat the code less like a finished artifact and more like a starting point for a conversation, and always double-check generated citations against your institution's current style guide before submitting real academic work.`,
      prompt: `Build a "citation style formatter" in plain HTML, CSS, and JavaScript with no library, that converts structured input fields into properly punctuated APA and MLA reference strings.

Requirements:
- Five input fields: author (a single full name like "Jane A. Smith"), title of work, publication or site name, year, and URL, plus a toggle to switch between APA and MLA output, all driving a live-updating citation preview on every keystroke.
- An APA formatter that follows real APA style conventions for an online work: author reduced to last name plus capitalized initials for any first/middle names, the year in parentheses immediately after the author, the title of the work italicized (use CSS font-style for the italics since output is plain text), the publication/site name in plain (non-italic) text, and the full URL including its protocol with no trailing period.
- An MLA formatter that follows real MLA style conventions: author kept as last name plus full first and middle names (not reduced to initials), the title of the source wrapped in quotation marks (not italicized), the publication/site name italicized (the inverse of the APA treatment), the year placed after the publication rather than right after the author, and the URL included with its leading http:// or https:// protocol stripped off per current MLA guidance, ending in a period.
- A helper that decides whether to append a terminal period to the title (or author string): if the text already ends in a period, question mark, or exclamation point, no additional period should be added, in either style.
- A copy-to-clipboard button that copies the plain-text version of the citation (no HTML tags, with proper quote characters) using the modern Clipboard API, with a working fallback (a temporary offscreen textarea plus the older copy command) for environments where that API is unavailable.
- All user-entered field values must be HTML-escaped before being inserted into the rendered citation, so special characters in a title or author name cannot break the markup.`,
    },
  },
};

export default citationFormatter;
