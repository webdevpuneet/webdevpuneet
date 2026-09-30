const bootstrapCommentSectionReplies = {
  id: 'bootstrap-comment-section-replies',
  title: 'Bootstrap Comment Section with Replies',
  lastmod: '2026-09-10',
  category: 'cards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5" style="max-width:600px;">
  <h6 class="fw-bold mb-3">Comments (<span id="bscmCount">2</span>)</h6>

  <form class="mb-4" id="bscmForm">
    <div class="mb-2">
      <input type="text" class="form-control form-control-sm" id="bscmName" placeholder="Your name" required>
    </div>
    <div class="mb-2">
      <textarea class="form-control" id="bscmText" rows="2" placeholder="Add a comment..." required></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-sm">Post comment</button>
  </form>

  <div id="bscmList">
    <div class="bscm-item card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>Alex Rivera</strong>
          <span class="small text-muted">2h ago</span>
        </div>
        <p class="mb-2">This layout looks great on mobile too, nice work!</p>
        <div class="d-flex gap-3 align-items-center">
          <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-like">
            <span class="bscm-heart">&#9825;</span> <span class="bscm-like-count">3</span>
          </button>
          <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-reply-toggle">Reply</button>
        </div>
        <div class="bscm-reply-box d-none mt-2">
          <input type="text" class="form-control form-control-sm" placeholder="Write a reply...">
        </div>
      </div>
    </div>

    <div class="bscm-item card mb-3">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <strong>Priya Nair</strong>
          <span class="small text-muted">5h ago</span>
        </div>
        <p class="mb-2">Could you share the source for the icon set used here?</p>
        <div class="d-flex gap-3 align-items-center">
          <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-like">
            <span class="bscm-heart">&#9825;</span> <span class="bscm-like-count">0</span>
          </button>
          <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-reply-toggle">Reply</button>
        </div>
        <div class="bscm-reply-box d-none mt-2">
          <input type="text" class="form-control form-control-sm" placeholder="Write a reply...">
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bscm-item { border: 1px solid #eceef1; border-radius: 10px; }
.bscm-like.liked .bscm-heart { color: #dc3545; }
.bscm-heart { font-size: 1rem; }`,
  js: `const list = document.getElementById('bscmList');
const form = document.getElementById('bscmForm');
const nameInput = document.getElementById('bscmName');
const textInput = document.getElementById('bscmText');
const countLabel = document.getElementById('bscmCount');

function wireItem(item) {
  const likeBtn = item.querySelector('.bscm-like');
  const countSpan = item.querySelector('.bscm-like-count');
  const heart = item.querySelector('.bscm-heart');
  const replyToggle = item.querySelector('.bscm-reply-toggle');
  const replyBox = item.querySelector('.bscm-reply-box');

  likeBtn.addEventListener('click', () => {
    const liked = likeBtn.classList.toggle('liked');
    let count = parseInt(countSpan.textContent, 10) || 0;
    count = liked ? count + 1 : Math.max(0, count - 1);
    countSpan.textContent = count;
    heart.innerHTML = liked ? '&#9829;' : '&#9825;';
  });

  replyToggle.addEventListener('click', () => {
    replyBox.classList.toggle('d-none');
    if (!replyBox.classList.contains('d-none')) {
      replyBox.querySelector('input').focus();
    }
  });
}

document.querySelectorAll('.bscm-item').forEach(wireItem);

function updateCount() {
  countLabel.textContent = document.querySelectorAll('#bscmList > .bscm-item').length;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!name || !text) return;

  const item = document.createElement('div');
  item.className = 'bscm-item card mb-3';
  item.innerHTML = \`
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <strong></strong>
        <span class="small text-muted">just now</span>
      </div>
      <p class="mb-2"></p>
      <div class="d-flex gap-3 align-items-center">
        <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-like">
          <span class="bscm-heart">&#9825;</span> <span class="bscm-like-count">0</span>
        </button>
        <button type="button" class="btn btn-sm btn-link p-0 text-decoration-none bscm-reply-toggle">Reply</button>
      </div>
      <div class="bscm-reply-box d-none mt-2">
        <input type="text" class="form-control form-control-sm" placeholder="Write a reply...">
      </div>
    </div>\`;

  // Text content is assigned via textContent (never innerHTML) for the
  // user-supplied name and comment, avoiding an HTML/script injection path.
  item.querySelector('strong').textContent = name;
  item.querySelector('p').textContent = text;

  list.insertBefore(item, list.firstChild);
  wireItem(item);
  updateCount();

  form.reset();
});`,

  seo: {
    title: 'Bootstrap Comment Section with Replies — Free Snippet',
    description: `A real Bootstrap 5.3 comment list with toggleable like counts, nested reply inputs, and safe DOM-inserted new comments. Copy-paste or export to React & Vue.`,
    about: {
      title: 'Bootstrap Comment Section with Replies — HTML, CSS & JavaScript',
      description: `A comment section needs to handle two independent, stateful interactions per comment — liking and replying — plus the ability to grow the list at runtime, all without any comment's behavior interfering with another's. This snippet solves that with a single \`wireItem(item)\` function that attaches both the like and reply listeners scoped to one \`.bscm-item\` card, using \`item.querySelector()\` rather than global \`document.querySelector()\` calls. That scoping is what makes new comments work correctly: every freshly created card is passed through the exact same \`wireItem()\` call used for the two comments present at load, so there is only one code path for "how a comment behaves," never a duplicated one for dynamically added comments.\n\nThe like button toggles a \`liked\` class on itself with \`classList.toggle()\`, and reads that return value directly to decide whether to increment or decrement the visible count — \`Math.max(0, count - 1)\` guards against the count ever going negative if it were somehow already at zero. The heart itself swaps between the outline character \`&#9825;\` and the filled character \`&#9829;\` via \`heart.innerHTML\`, and a CSS rule (\`.bscm-like.liked .bscm-heart { color: #dc3545 }\`) colors it red only once the \`liked\` class is present, so the visual state and the underlying boolean can never disagree.\n\nThe reply toggle simply reveals a per-comment \`.bscm-reply-box\` (a hidden input) by removing Bootstrap's \`d-none\` class, and immediately calls \`.focus()\` on the newly revealed input so the user can start typing without an extra click — a small detail that matters for a "toggle to reveal an input" pattern, since a revealed-but-unfocused input often gets missed.\n\nPosting a new top-level comment is where a comment section commonly introduces an XSS hole: naively inserting user-typed text via \`innerHTML\` would let a comment containing \`<script>\` or an \`onerror\` attribute execute. This snippet avoids that specific pitfall by building the new comment's static markup (the button structure, the reply box, the like count starting at zero) via a fixed \`innerHTML\` template that contains no user data, and only afterward setting the untrusted name and comment text using \`.textContent\` on the \`<strong>\` and \`<p>\` elements — a value assigned through \`textContent\` is always rendered as plain text, never parsed as HTML, so even a comment containing angle brackets displays safely instead of being interpreted as markup. The new card is inserted at the top of the list with \`list.insertBefore(item, list.firstChild)\` so the newest comment always appears first, and \`updateCount()\` recounts the actual \`.bscm-item\` elements in the DOM afterward rather than incrementing a separately tracked number, so the displayed count can never drift out of sync with what's actually rendered.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Two existing comments appear as cards, each with an outlined heart and a like count, plus a Reply link and a comment-count header reading "Comments (2)".' },
        { title: 'Click the heart on a comment', text: 'It fills in red, the count increments by one, and clicking it again empties the heart and decrements the count.' },
        { title: 'Click "Reply" under a comment', text: 'A small reply input box appears directly beneath that comment and is automatically focused, ready to type into.' },
        { title: 'Fill in the name and comment fields and submit', text: 'A brand-new comment card appears at the very top of the list, above both existing comments, and the header count updates to "Comments (3)".' },
        { title: 'Like the new comment', text: 'It behaves identically to the original two — the heart fills, the count increments — because it was wired up with the exact same function.' },
      ],
    },
    features: [
      'Per-comment like toggle with a filled/outline heart glyph swap and safe count math',
      'Independent reply-box toggle per comment with auto-focus on reveal',
      'Single wireItem() function shared by initial and dynamically added comments',
      'New comments inserted at the top of the list via insertBefore',
      'User-supplied name and comment text inserted with textContent, never innerHTML, avoiding script injection',
      'Live comment-count header recalculated from actual DOM elements, not a separate counter',
      'Form reset automatically after a successful post',
      'Like count never goes below zero thanks to a Math.max guard',
    ],
    useCases: [
      { icon: 'CHAT', title: 'Blog post and article comment sections', desc: `A standard threaded-looking comment area for articles, often placed beneath related content like a [testimonial carousel](/ui-snippets/bootstrap-testimonial-carousel/).` },
      { icon: 'APP', title: 'Community forums and discussion boards', desc: 'Let users like and reply to posts in a lightweight forum thread without a full backend, useful for prototyping before wiring up a real API.' },
      { icon: 'LEARN', title: 'Learning safe dynamic DOM insertion', desc: 'A concrete example of separating trusted static markup (innerHTML) from untrusted user text (textContent) when inserting new elements at runtime.' },
      { icon: 'FLOW', title: 'Product review and feedback widgets', desc: `Collect and display user feedback with likes, similar to review interactions near a [FAQ accordion](/ui-snippets/bootstrap-accordion-faq-search/) on a product page.` },
      { icon: 'DESIGN', title: 'Portfolio and demo site comment mockups', desc: `Show a realistic-feeling comment UI in a design mockup or client demo without needing a live comments backend, pairing well with a [chat widget](/ui-snippets/bootstrap-chat-widget-bubble/) for full engagement mockups.` },
    ],
    faqs: [
      { q: 'Is the like count or comment persisted anywhere?', a: 'No, this is a front-end-only demo — likes, replies, and new comments exist only in the current page\'s memory and reset on reload. Wire the like button and form submit handlers to real API calls to persist them.' },
      { q: 'Is it safe to post a comment containing HTML tags or a script tag?', a: `Yes — the name and comment text are inserted using .textContent, which always renders as literal text rather than being parsed as markup, so a comment like "<script>alert(1)</script>" displays as that exact text instead of executing.` },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — model comments as an array in state (React useState, Vue ref, Angular class field), render each with .map()/*ngFor* including a liked boolean and reply-open boolean per item, and update state on click rather than toggling classList directly.' },
      { q: 'Do newly added comments support liking and replying like the original ones?', a: 'Yes — every new comment card is passed through the same wireItem() function used for the initial two comments, so there is exactly one implementation of like and reply behavior for every comment, old or new.' },
      { q: 'Does the reply input actually submit a nested reply?', a: 'In this demo the reply input is a UI-only field for demonstrating the toggle behavior; extend its own submit handling (e.g. an Enter keydown listener) to append a nested reply element beneath the parent comment for full functionality.' },
      { q: 'Why use Math.max(0, count - 1) when decrementing the like count?', a: 'It prevents the displayed count from ever going negative in an edge case, such as if the liked class and the numeric count were ever out of sync due to a bug or manual DOM edit — it is a defensive guard, not something that should trigger in normal use.' },
      { q: 'Would this port cleanly to a Tailwind CSS design?', a: 'Yes — swap the card, btn-link, and form-control classes for Tailwind border/rounded/flex utilities; the like, reply-toggle, and comment-insertion logic in wireItem() and the submit handler are plain DOM APIs with no Bootstrap dependency, so nothing in the JavaScript needs to change.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to make the reply input actually submit and render a nested reply card indented beneath its parent comment, or to add relative timestamps that update automatically ("just now" turning into "2m ago"). It's also worth asking it to persist comments to localStorage.`,
      prompt: `Build a Bootstrap 5.3 comment section with likes and replies using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A list of comment cards, each showing a name, timestamp, comment text, a like button with a toggling filled/outline heart icon and a count, and a "Reply" link.
- Clicking "Reply" on a comment must reveal a small nested reply input directly beneath that specific comment (not a shared global input), and auto-focus it.
- A form above the list with name and comment text fields must, on submit, create a brand-new comment card with the same like and reply functionality as the existing comments, insert it at the top of the list, and reset the form.
- User-supplied name and comment text must be inserted safely (using textContent, not innerHTML) so HTML or script content typed into the form cannot execute.
- A comment count in a header must accurately reflect the number of comments currently rendered, including newly added ones.`,
    },
  },
};

export default bootstrapCommentSectionReplies;
