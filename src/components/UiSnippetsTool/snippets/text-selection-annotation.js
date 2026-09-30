const textSelectionAnnotation = {
  id: 'text-selection-annotation',
  title: 'Text Selection Highlight & Comment',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="demo-wrap">
  <article class="doc-card">
    <h2>Designing for Collaborative Review</h2>
    <p id="doc-body">Select any portion of this text with your mouse to reveal a floating toolbar above your selection. You can highlight the passage in yellow to mark it as important, or leave an inline comment attached to the exact words you selected. This mirrors the annotation workflow found in Google Docs and Medium, where readers and collaborators mark up a shared document without altering the underlying text. Try selecting a full sentence, or just a single word, and notice how the toolbar always repositions itself directly above whatever you selected. Highlighted passages remain clickable afterward &mdash; click a highlight that has a comment attached to reveal the note in a small popover, exactly like resolving a thread in a real document editor.</p>
  </article>

  <div class="selection-toolbar hidden" id="selection-toolbar" role="toolbar" aria-label="Text selection actions">
    <button id="btn-highlight" title="Highlight">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 11H3v10h6"/><path d="M9 11l9-9 5 5-9 9H9z"/></svg>
      Highlight
    </button>
    <button id="btn-comment" title="Comment">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      Comment
    </button>
  </div>

  <div class="comment-popover hidden" id="comment-popover">
    <textarea id="comment-input" placeholder="Add a note..." rows="3"></textarea>
    <div class="comment-actions">
      <button id="comment-cancel" class="btn-ghost">Cancel</button>
      <button id="comment-save" class="btn-primary">Save</button>
    </div>
  </div>

  <div class="note-viewer hidden" id="note-viewer">
    <p id="note-text"></p>
    <button id="note-close" class="btn-ghost">Close</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { position: relative; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px 24px; }

.doc-card {
  width: 560px; max-width: 100%;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 32px; box-shadow: 0 8px 30px rgba(15,23,42,0.06);
}
.doc-card h2 { font-size: 19px; font-weight: 700; color: #0f172a; margin-bottom: 14px; }
.doc-card p { font-size: 14.5px; line-height: 1.85; color: #334155; user-select: text; }

mark.annotation-highlight {
  background: #fef08a; padding: 1px 0; border-radius: 2px;
  cursor: pointer; position: relative;
}
mark.annotation-highlight.has-comment { background: #fde68a; }
.comment-dot {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; border-radius: 50%;
  background: #6366f1; color: #fff; font-size: 8px; font-weight: 700;
  vertical-align: super; margin-left: 2px;
}

.selection-toolbar {
  position: fixed; top: 0; left: 0;
  background: #1e293b; border-radius: 10px; padding: 5px;
  display: flex; gap: 3px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.28);
  z-index: 1000;
  transform: translate(-50%, -100%) translateY(-10px);
}
.selection-toolbar.hidden { display: none; }
.selection-toolbar button {
  display: flex; align-items: center; gap: 5px;
  background: transparent; border: none; color: #cbd5e1;
  font-size: 12px; font-weight: 600; padding: 7px 10px; border-radius: 7px;
  cursor: pointer; font-family: inherit; transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}
.selection-toolbar button:hover { background: #334155; color: #fff; }

.comment-popover {
  position: fixed; top: 0; left: 0;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 10px; width: 240px;
  box-shadow: 0 12px 32px rgba(15,23,42,0.18);
  z-index: 1001;
  transform: translate(-50%, -100%) translateY(-10px);
}
.comment-popover.hidden { display: none; }
#comment-input {
  width: 100%; border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 8px 10px; font-size: 12.5px; font-family: inherit; resize: none;
  outline: none; transition: border-color 0.15s;
}
#comment-input:focus { border-color: #6366f1; }
.comment-actions { display: flex; justify-content: flex-end; gap: 6px; margin-top: 8px; }

.btn-ghost {
  background: transparent; border: none; color: #64748b;
  font-size: 12px; font-weight: 600; padding: 6px 10px; border-radius: 7px;
  cursor: pointer; font-family: inherit;
}
.btn-ghost:hover { background: #f1f5f9; color: #1e293b; }
.btn-primary {
  background: #6366f1; color: #fff; border: none;
  font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 7px;
  cursor: pointer; font-family: inherit; transition: background 0.15s;
}
.btn-primary:hover { background: #4f46e5; }

.note-viewer {
  position: fixed; top: 0; left: 0;
  background: #1e293b; color: #f1f5f9; border-radius: 10px;
  padding: 12px 14px; width: 220px;
  box-shadow: 0 12px 32px rgba(15,23,42,0.24);
  z-index: 1001;
  transform: translate(-50%, -100%) translateY(-10px);
}
.note-viewer.hidden { display: none; }
#note-text { font-size: 12.5px; line-height: 1.55; margin-bottom: 8px; }
.note-viewer .btn-ghost { color: #94a3b8; padding: 4px 8px; }
.note-viewer .btn-ghost:hover { background: #334155; color: #fff; }`,
  js: `const docBody = document.getElementById('doc-body');
const toolbar = document.getElementById('selection-toolbar');
const commentPopover = document.getElementById('comment-popover');
const commentInput = document.getElementById('comment-input');
const noteViewer = document.getElementById('note-viewer');
const noteText = document.getElementById('note-text');

let savedRange = null;
let activeHighlightForComment = null;

function hideAll() {
  toolbar.classList.add('hidden');
  commentPopover.classList.add('hidden');
  noteViewer.classList.add('hidden');
}

function positionAt(el, rect) {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  el.style.left = (rect.left + rect.width / 2 + scrollX) + 'px';
  el.style.top = (rect.top + scrollY) + 'px';
}

document.addEventListener('mouseup', (e) => {
  // Ignore clicks that originate inside our own UI
  if (e.target.closest('.selection-toolbar, .comment-popover, .note-viewer')) return;

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    hideAll();
    return;
  }
  const range = selection.getRangeAt(0);
  if (!docBody.contains(range.commonAncestorContainer)) {
    hideAll();
    return;
  }
  if (range.toString().trim().length === 0) {
    hideAll();
    return;
  }

  savedRange = range.cloneRange();
  const rect = range.getBoundingClientRect();
  positionAt(toolbar, rect);
  toolbar.classList.remove('hidden');
  commentPopover.classList.add('hidden');
  noteViewer.classList.add('hidden');
});

function wrapRangeInMark(range, extraClass) {
  const mark = document.createElement('mark');
  mark.className = 'annotation-highlight' + (extraClass ? ' ' + extraClass : '');
  try {
    range.surroundContents(mark);
    return mark;
  } catch (err) {
    // Selection spans multiple inline elements — fall back to extracting
    // the fragment and re-inserting it inside the mark wrapper.
    const fragment = range.extractContents();
    mark.appendChild(fragment);
    range.insertNode(mark);
    return mark;
  }
}

document.getElementById('btn-highlight').addEventListener('click', () => {
  if (!savedRange) return;
  wrapRangeInMark(savedRange, '');
  window.getSelection().removeAllRanges();
  savedRange = null;
  hideAll();
});

document.getElementById('btn-comment').addEventListener('click', () => {
  if (!savedRange) return;
  const rect = savedRange.getBoundingClientRect();
  positionAt(commentPopover, rect);
  toolbar.classList.add('hidden');
  commentPopover.classList.remove('hidden');
  commentInput.value = '';
  commentInput.focus();
});

document.getElementById('comment-cancel').addEventListener('click', () => {
  hideAll();
  savedRange = null;
});

document.getElementById('comment-save').addEventListener('click', () => {
  const note = commentInput.value.trim();
  if (!note || !savedRange) { hideAll(); return; }

  const mark = wrapRangeInMark(savedRange, 'has-comment');
  mark.dataset.note = note;

  const dot = document.createElement('span');
  dot.className = 'comment-dot';
  dot.textContent = '1';
  mark.appendChild(dot);

  window.getSelection().removeAllRanges();
  savedRange = null;
  hideAll();
});

docBody.addEventListener('click', (e) => {
  const mark = e.target.closest('mark.annotation-highlight.has-comment');
  if (!mark) return;
  const rect = mark.getBoundingClientRect();
  positionAt(noteViewer, rect);
  noteText.textContent = mark.dataset.note;
  noteViewer.classList.remove('hidden');
  toolbar.classList.add('hidden');
  commentPopover.classList.add('hidden');
});

document.getElementById('note-close').addEventListener('click', hideAll);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideAll();
});`,
  seo: {
    title: 'Text Selection Highlight & Comment — Free JS Snippet',
    description: 'Selection-triggered floating toolbar for highlighting text and adding inline comments using the real DOM Range API. Exports to React, Vue & Angular.',
    about: {
      title: 'Text Selection Highlight & Comment — DOM Selection, Range and surroundContents Annotation Pattern',
      description: `Real-time collaborative annotation — select text, highlight it, attach a comment to the exact words selected — has gone from a Google Docs and Medium specialty feature to a baseline expectation across knowledge-base tools, code review platforms, PDF viewers, and AI writing assistants. Most implementations that look convincing are actually fake: an absolutely-positioned overlay that approximates where the selection was, disconnected from the real text nodes. This snippet builds the genuine version, directly on top of the browser's **Selection and Range API**, which is the only reliable way to know exactly which characters of text a user selected and to durably mark that exact span.

**How selection detection works**

A single \`mouseup\` listener on \`document\` calls \`window.getSelection()\` after every mouse release anywhere on the page. If the returned \`Selection\` object is collapsed (meaning the user clicked without dragging, so start and end points are identical) or contains no text, the floating toolbar stays hidden. Otherwise, \`selection.getRangeAt(0)\` retrieves the first (and, for mouse selections, only) \`Range\` — an object representing a specific start and end boundary point within the DOM tree, independent of visual position. The snippet checks \`docBody.contains(range.commonAncestorContainer)\` to make sure the selection actually falls inside the annotatable article text, so selecting UI chrome like a button label doesn't trigger the toolbar.

**Positioning the toolbar from real geometry**

The toolbar's position is not guessed — \`range.getBoundingClientRect()\` returns the exact bounding box of the live selection in viewport coordinates, the same rectangle the browser itself uses to paint the blue selection highlight. \`positionAt()\` reads that rectangle's \`left + width / 2\` for horizontal centering and \`top\` for vertical placement, adds the current scroll offset, and applies it as \`left\`/\`top\` on a \`position: fixed\` element whose CSS \`transform: translate(-50%, -100%) translateY(-10px)\` centers it horizontally and floats it just above the selection — the exact technique real editors use, because it tracks the actual selected characters rather than an approximate mouse coordinate.

**Highlighting: surroundContents with a fallback**

The core, genuinely tricky part of DOM-based highlighting is turning an arbitrary user selection into a wrapped \`<mark>\` element. \`Range.surroundContents(mark)\` is the native, single-call way to do this — it moves the range's contents inside the new \`mark\` node — but it throws a \`DOMException\` if the range's boundaries don't cleanly nest inside a single parent (for example, a selection that starts partway through one \`<span>\` and ends partway through a different one, spanning multiple inline nodes at different depths). This snippet handles that case explicitly with \`try/catch\`: on failure, it falls back to \`range.extractContents()\` (which removes the selected content as a \`DocumentFragment\`, correctly splitting any partially-selected nodes at the boundaries) followed by appending that fragment inside a new \`<mark>\` and calling \`range.insertNode(mark)\` to put the wrapper back in place. This two-path approach — try the fast native method, fall back to manual extract-and-reinsert — is the standard, correct way to make in-place DOM highlighting robust against real-world selections that cross element boundaries, which single-call \`surroundContents\` alone cannot handle.

**Comments: popover input and a persistent indicator**

Clicking "Comment" instead of "Highlight" repositions a small \`textarea\`-based popover over the same saved range. Saving a non-empty note calls the same \`wrapRangeInMark()\` helper (with an extra \`has-comment\` class for a slightly deeper highlight color) and stores the note text directly on the \`<mark>\` element via \`mark.dataset.note\`, then appends a small numbered \`.comment-dot\` badge inside the mark so the reader can see at a glance which highlights carry a note. A delegated click listener on the whole article checks \`e.target.closest('mark.annotation-highlight.has-comment')\` so clicking any commented highlight — old or newly created — reopens a small note viewer positioned above it, reading the note straight back out of the \`dataset.note\` attribute. Because the range is saved as a *cloned* \`Range\` object (\`range.cloneRange()\`) at the moment of selection, it remains valid and independently usable even after the live browser selection is cleared when the user clicks the toolbar button.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Select any text in the article', text: 'Click and drag across a word, sentence, or paragraph inside #doc-body. On mouseup, the code calls window.getSelection() and getRangeAt(0) to capture the exact Range, then shows the floating .selection-toolbar directly above it via getBoundingClientRect().' },
        { title: 'Click Highlight to mark the passage', text: 'wrapRangeInMark() wraps the saved range in a <mark class="annotation-highlight"> using Range.surroundContents(), falling back to extractContents() + insertNode() for selections spanning multiple inline elements.' },
        { title: 'Click Comment to attach a note', text: 'The toolbar swaps for a small textarea popover positioned over the same saved range. Typing a note and clicking Save wraps the selection in a highlight, stores the note in mark.dataset.note, and appends a numbered .comment-dot indicator.' },
        { title: 'Reopen a comment by clicking its highlight', text: 'Any highlight with the has-comment class is click-listened via event delegation on #doc-body — clicking it reads mark.dataset.note back out and shows it in the .note-viewer popover positioned above that specific highlight.' },
        { title: 'Dismiss with Escape or Cancel', text: 'Pressing Escape, or clicking Cancel/Close on any open popover, calls hideAll() which hides the toolbar, comment popover, and note viewer without mutating the document.' },
        { title: 'Persist highlights and comments', text: 'To make annotations durable, serialize each mark\'s text content, an XPath or character-offset locator for its range, and its dataset.note to your backend on save, then re-apply the same wrapRangeInMark() logic against freshly computed ranges when the document reloads.' },
      ],
    },
    features: [
      'Real DOM Selection and Range API usage — window.getSelection(), getRangeAt(0), range.getBoundingClientRect() — not a fake overlay',
      'Toolbar positioned from the live selection\'s actual bounding rectangle, matching the browser\'s own selection paint geometry',
      'Range.surroundContents() for the common case, with a try/catch fallback to extractContents() + insertNode() for multi-node selections',
      'Cloned Range (range.cloneRange()) saved at selection time so it remains valid after the live browser selection is cleared',
      'Comment notes stored directly on the DOM via mark.dataset.note, with a numbered .comment-dot badge indicating annotated passages',
      'Event delegation on the article container for reopening comment popovers on any highlight, old or newly created',
      'Escape key and explicit Cancel/Close controls dismiss any open popover without mutating the underlying highlight state',
      'Guards against selections originating outside the annotatable content or inside the toolbar/popover UI itself',
    ],
    useCases: [
      { icon: 'APP', title: 'Document and knowledge-base collaborative review', desc: 'Internal wikis, RFC documents, and knowledge-base articles benefit from lightweight, no-account-required highlighting and commenting so reviewers can mark up specific passages during a review pass, similar to suggestion mode in Google Docs but scoped to read-heavy reference content rather than a full editable document.' },
      { icon: 'LEARN', title: 'Reading and study tools with highlight-to-save', desc: 'E-reader and study apps commonly let users highlight passages while reading and optionally attach a personal note — this exact selection-to-mark pattern is the underlying mechanic, extendable to export all highlights and notes for a document as a study summary.' },
      { icon: 'FLOW', title: 'AI writing assistant inline feedback', desc: 'AI-native writing tools increasingly show suggestions or feedback anchored to specific selected text rather than as a disconnected sidebar list — this pattern is the anchoring mechanism: select or programmatically mark a range, then attach structured feedback (like a suggested edit) to it via the same dataset-based note storage used here for comments.' },
      { icon: 'DESIGN', title: 'Design review and content QA annotation', desc: 'Marketing and content teams reviewing long-form copy (landing pages, docs, blog drafts) can use inline highlight-and-comment to flag specific phrasing for revision without leaving a separate comment thread disconnected from the actual sentence in question — compare this anchored-comment approach to the general-purpose [Toast Notification](/ui-snippets/toast-notification/) for surfacing feedback that is not text-anchored.' },
      { icon: 'CODE', title: 'Teaching the DOM Selection and Range API correctly', desc: 'Most tutorials on text highlighting stop at a single surroundContents() call and break the moment a user selects across a link or bold tag. This snippet is a complete, working reference for the fallback pattern needed to handle real-world multi-node selections, useful in frontend interviews, code reviews, or as linked documentation for teams building their own annotation feature.' },
      { icon: 'FORM', title: 'Code review and PDF-style inline commenting for web content', desc: 'Web-based code review tools and PDF-alternative document viewers need to let reviewers comment on specific highlighted spans of text rather than whole-line or whole-document comments — this pattern generalizes directly to that use case once the highlight-persistence layer is connected to a backend thread/comment system.' },
    ],
    faqs: [
      { q: 'Why does the code use try/catch around surroundContents() instead of just calling it directly?', a: 'Range.surroundContents() throws a DOMException whenever the range\'s boundary points do not both sit at the same nesting depth inside a single parent element — which happens any time a user drags a selection starting partway through one inline element (like a <strong> or <a>) and ending partway through a different one. The fallback path — range.extractContents() to pull out the (correctly split) selected fragment, then wrapping it in a new <mark> and reinserting with range.insertNode() — handles that general case, so the highlight feature does not silently fail on realistic selections that cross element boundaries.' },
      { q: 'How is the toolbar positioned exactly above the selected text, not just near the mouse cursor?', a: 'The code calls range.getBoundingClientRect() on the actual Selection Range object, which returns the precise bounding box the browser itself computed for the selected text — the same geometry used to paint the native blue selection highlight. This is more accurate than tracking the mouse cursor position, because a selection\'s bounding box can differ significantly from where the mouse happens to be released, especially for selections spanning multiple lines.' },
      { q: 'Why is the range cloned with cloneRange() before storing it as savedRange?', a: 'Clicking a toolbar button collapses or clears the browser\'s live window.getSelection() (because focus moves to the button), which would invalidate a reference to the original, live Range object. Calling range.cloneRange() at the moment of selection creates an independent Range object with the same boundary points that remains fully valid and usable — for surroundContents(), extractContents(), or getBoundingClientRect() — even after the live selection is cleared.' },
      { q: 'How would I persist highlights and comments so they survive a page reload?', a: 'You need a serializable way to describe each range\'s position — common approaches are storing the highlighted text plus a character offset from the start of the container, or a small set of XPath expressions for the start/end nodes. On page load, re-locate each stored range using that data and re-run the same wrapRangeInMark() logic used interactively, then re-attach any stored dataset.note. Libraries like rangy or the W3C Web Annotation Data Model provide more robust serialization schemes for production use.' },
      { q: 'Does highlighting break if the selected text includes an existing highlight or a link?', a: 'The extractContents() fallback path correctly handles nested or adjacent inline elements by splitting them at the selection boundaries, so selecting across an existing <mark> or an <a> tag will still produce a valid highlight, though the nested element structure inside the new highlight will reflect however extractContents() split the original nodes. For production use with heavily nested rich text, thoroughly test selections that start or end mid-element to confirm the resulting markup renders as expected.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly why range.surroundContents() needs a fallback, and to trace what extractContents() plus insertNode() actually does to the DOM tree step by step — the Selection and Range API has real edge cases that are worth understanding rather than treating as magic. It's a strong snippet to extend with AI help: ask it to add a way to serialize and persist highlights/comments so they survive a page reload (character-offset or XPath-based range serialization), to support multiple highlight colors selectable from the toolbar, or to make the comment popover support multiple stacked notes per highlight instead of just one. You could also ask it to explain how this differs from a fake absolutely-positioned overlay approach, and why real editors like Google Docs rely on genuine Range-based anchoring instead.`,
      prompt: `Build a text selection annotation feature in plain HTML, CSS, and JavaScript using the real browser Selection and Range API — not a fake positioned overlay.

Requirements:
- Detect text selections within a specific content container on mouseup using window.getSelection() and Range objects; ignore collapsed selections, empty selections, and selections that originate outside the annotatable container or inside the annotation UI itself.
- Show a small floating toolbar positioned precisely above the selected text using the Range's actual getBoundingClientRect(), with at least two actions: Highlight and Comment.
- Implement highlighting by wrapping the selected Range in a <mark>-style element using Range.surroundContents(), with a fallback (using extractContents() and insertNode()) for selections that span multiple inline elements and would cause surroundContents() to throw.
- Implement commenting: clicking Comment opens a small inline input positioned over the same selection; saving a non-empty note wraps the selection in a highlight, stores the note text associated with that specific highlighted element, and shows a small comment-count or indicator badge on it.
- Clicking an existing highlight that has an attached comment must reopen a small viewer showing that specific note, positioned above that highlight (not a generic sidebar).
- Save the Range as a clone at the moment of selection so it remains valid and reusable even after the live browser selection is cleared by clicking a toolbar button.
- Support dismissing any open toolbar or popover via the Escape key and an explicit close/cancel control.`,
    },
  },
};
export default textSelectionAnnotation;
