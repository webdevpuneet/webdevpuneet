const footnoteHoverPreview = {
  id: 'footnote-hover-preview',
  title: 'Footnote Hover Preview',
  lastmod: '2026-08-22',
  category: 'layouts',
  cdnUrls: [],
  html: `<article class="fhp-article">
  <h2>The Quiet Migration</h2>
  <p>By the time the survey teams reached the delta, the pattern was already well documented<sup class="fhp-ref" tabindex="0" data-note="1">1</sup> — communities were not fleeing catastrophe so much as drifting, year over year, toward higher ground and steadier water. Economists had long treated this as a footnote to bigger crises<sup class="fhp-ref" tabindex="0" data-note="2">2</sup>, but the scale of it kept surprising the people counting.</p>
  <p>What made the shift hard to see in real time was its slowness. No single year looked remarkable. It was only in aggregate, across a decade of township records<sup class="fhp-ref" tabindex="0" data-note="3">3</sup>, that the drift became a line worth drawing on a map.</p>
</article>

<ol class="fhp-notes" id="fhpNotes">
  <li id="fhp-note-1">Regional Hydrological Survey, 3rd ed. (2021), pp. 44–52.</li>
  <li id="fhp-note-2">See Alden &amp; Kowalczyk, "Displacement Without Disaster," <i>Journal of Regional Economics</i>, 2019.</li>
  <li id="fhp-note-3">Township registrar filings, compiled 2011–2021, cross-referenced against census delta.</li>
</ol>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,'Times New Roman',serif;background:#faf7f2;color:#2b271f;min-height:100vh;padding:48px 20px;display:flex;justify-content:center;align-items:center}

.fhp-article{max-width:560px;position:relative}
.fhp-article h2{font-size:26px;margin-bottom:18px;font-weight:700;letter-spacing:-.01em}
.fhp-article p{font-size:16.5px;line-height:1.75;margin-bottom:16px}

.fhp-ref{font-family:system-ui,sans-serif;font-size:11px;font-weight:700;color:#b45309;cursor:pointer;padding:0 1px;border-radius:3px;outline-offset:2px}
.fhp-ref:hover,.fhp-ref:focus-visible{background:#fde68a;outline:2px solid #b45309}

.fhp-popover{position:absolute;z-index:10;max-width:260px;background:#241f17;color:#f3ede1;font-family:system-ui,sans-serif;font-size:12.5px;line-height:1.55;padding:11px 13px;border-radius:10px;box-shadow:0 14px 34px rgba(0,0,0,.25);opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .14s ease,transform .14s ease}
.fhp-popover.fhp-visible{opacity:1;transform:translateY(0);pointer-events:auto}
.fhp-popover::after{content:'';position:absolute;bottom:-5px;left:16px;width:10px;height:10px;background:#241f17;transform:rotate(45deg)}
.fhp-popover.fhp-above::after{bottom:auto;top:-5px}
.fhp-popover b{color:#fbbf24;display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}

.fhp-notes{max-width:560px;margin:28px auto 0;padding-top:18px;border-top:1px solid #e2d9c8;font-family:system-ui,sans-serif;font-size:13px;color:#5c5546;line-height:1.6}
.fhp-notes li{margin-bottom:6px;padding-left:4px}`,

  js: `var popover = document.createElement('div');
popover.className = 'fhp-popover';
popover.setAttribute('role', 'tooltip');
document.body.appendChild(popover);

var hideTimer = null;
var activeRef = null;

function noteTextFor(ref) {
  var id = ref.dataset.note;
  var li = document.getElementById('fhp-note-' + id);
  return li ? li.innerHTML : '';
}

function positionPopover(ref) {
  var rect = ref.getBoundingClientRect();
  var scrollX = window.scrollX;
  var scrollY = window.scrollY;

  popover.style.left = '0px';
  popover.style.top = '0px';
  popover.classList.remove('fhp-above');

  var popRect = popover.getBoundingClientRect();
  var left = rect.left + scrollX - popRect.width / 2 + rect.width / 2;
  left = Math.max(8, Math.min(left, document.documentElement.clientWidth - popRect.width - 8 + scrollX));

  var top = rect.top + scrollY - popRect.height - 12;
  if (rect.top - popRect.height - 12 < 0) {
    // Not enough room above the marker — flip the popover below it instead.
    top = rect.bottom + scrollY + 12;
    popover.classList.add('fhp-above');
  }

  popover.style.left = left + 'px';
  popover.style.top = top + 'px';
}

function showFor(ref) {
  clearTimeout(hideTimer);
  activeRef = ref;
  popover.innerHTML = '<b>Footnote ' + ref.dataset.note + '</b>' + noteTextFor(ref);
  popover.classList.add('fhp-visible');
  positionPopover(ref);
}

function scheduleHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(function () {
    popover.classList.remove('fhp-visible');
    activeRef = null;
  }, 120);
}

document.querySelectorAll('.fhp-ref').forEach(function (ref) {
  ref.addEventListener('mouseenter', function () { showFor(ref); });
  ref.addEventListener('mouseleave', scheduleHide);
  ref.addEventListener('focus', function () { showFor(ref); });
  ref.addEventListener('blur', scheduleHide);
  ref.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { popover.classList.remove('fhp-visible'); ref.blur(); }
  });
});

// Keep the popover open while the pointer moves onto it (in case it's ever made interactive).
popover.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
popover.addEventListener('mouseleave', scheduleHide);

window.addEventListener('scroll', function () {
  if (activeRef) positionPopover(activeRef);
}, { passive: true });`,

  seo: {
    title: 'Footnote Hover Preview — Free Accessible Popover Footnotes HTML CSS JS',
    description: `Superscript footnote markers that show a hover or keyboard-focus preview popover without navigating away, positioned near the reference and flip-aware. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Footnote Hover Preview — Popover Footnotes That Work on Hover and Keyboard Focus',
      description: `Jumping to the bottom of a page to read a footnote and then scrolling back is the single worst part of footnotes on the web. This snippet fixes it with a preview popover that appears right next to the superscript marker on hover *or* keyboard focus, built in plain HTML, CSS, and vanilla JavaScript — no library, and no loss of the semantic footnote list at the bottom of the article.

**One popover element, reused for every marker**

Rather than creating a hidden popover per footnote, a single \`.fhp-popover\` div is created once and appended to \`document.body\`. Every reference marker's hover or focus event repositions and refills that one element with the relevant note's content — cheaper than managing dozens of individual popovers, and it means only one can ever be visible at a time.

**The real footnote text lives in a real, visible list**

The popover's content isn't duplicated data — \`noteTextFor()\` reads the \`innerHTML\` straight from the corresponding \`<li>\` in the semantic \`<ol class="fhp-notes">\` at the bottom of the article. That list stays in the DOM and readable on its own (for print, for search engines, for anyone who prefers scrolling to the reference section), so the popover is a genuine enhancement, not a replacement for accessible markup.

**Positioned near the marker, flips when it would run off-screen**

\`positionPopover()\` centers the popover horizontally over the marker and places it above by default — but checks whether that would push the popover above the viewport's top edge, and flips it to appear below the marker instead when there isn't room, swapping which edge carries the little triangle pointer via the \`.fhp-above\` class. The horizontal position also clamps to stay within the viewport so a marker near the page edge never causes the popover to overflow off-screen.

**Genuinely keyboard accessible, not hover-only**

Every marker carries \`tabindex="0"\`, and the exact same \`showFor()\`/\`scheduleHide()\` functions fire on \`focus\`/\`blur\` as on \`mouseenter\`/\`mouseleave\` — so a keyboard user tabbing through the article gets the identical preview experience a mouse user does, and \`Escape\` dismisses it and returns focus cleanly. The popover also carries \`role="tooltip"\` for assistive tech.

**A short hide delay prevents flicker**

\`scheduleHide()\` waits 120ms before actually hiding the popover, and that timer is cleared if the pointer or focus lands back on the reference (or on the popover itself) in that window — so briefly moving the mouse doesn't cause an annoying flash-hide-flash-show if the user is just repositioning within the same marker's area.

**Customizing it**

Make the popover itself scrollable-interactive content (a link inside it, say) since the mouseenter/mouseleave handlers on the popover already keep it open while hovered; adjust the vertical offset, colors, or add a small delay before showing to avoid popovers firing on quick mouse passes. Pair it with a [pull quote](/ui-snippets/pull-quote/) or [table of contents](/ui-snippets/table-of-contents/) for a complete long-form article layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An article with three superscript footnote markers renders, plus a real footnote list below it.` },
      { title: 'Hover a marker', text: `A popover appears near it, pulling its text from the matching list item.` },
      { title: 'Tab to a marker with the keyboard', text: `The same popover appears on focus, and Escape dismisses it.` },
      { title: 'Hover a marker near the top of the viewport', text: `Watch the popover flip below the marker instead of overflowing upward.` },
      { title: 'Scroll while a popover is open', text: `Its position updates to stay anchored to the marker.` },
      { title: 'Edit the footnote list', text: `Add or edit <li> items — the popovers read their content automatically via matching IDs.` },
    ] },
    features: [
      { title: 'Single reused popover', text: `One DOM element serves every marker instead of one hidden popover per footnote.` },
      { title: 'Reads from a real footnote list', text: `Content comes from a visible, semantic <ol> — no duplicated data to keep in sync.` },
      { title: 'Viewport-aware flipping', text: `Popovers flip below the marker when there's no room above, and clamp horizontally.` },
      { title: 'Keyboard accessible', text: `Focus and blur trigger the identical preview as hover, with Escape to dismiss.` },
      { title: 'Flicker-free hide delay', text: `A short cancelable timeout prevents flash-hide-flash-show on quick pointer moves.` },
      { title: 'Scroll-anchored positioning', text: `The popover repositions live if the page scrolls while it's open.` },
      { title: 'Tooltip ARIA role', text: `role="tooltip" on the popover signals its purpose to assistive technology.` },
      { title: 'Print and SEO friendly', text: `The underlying footnote list stays fully readable without any JavaScript.` },
    ],
    useCases: [
      { title: 'Long-form journalism and essays', text: 'Let readers check a source without leaving their place, with a preview popover next to the superscript marker on hover or keyboard focus.' },
      { title: 'Academic and research publishing', text: 'Pair with a [citation formatter](/ui-snippets/citation-formatter/) so formatted references can be previewed inline, using content read from a real semantic footnote list.' },
      { title: 'Legal and policy documents', text: 'Preview clause references or definitions in place, with popovers that flip below the marker when there is no room above.' },
      { title: 'Technical documentation', text: 'Show a glossary definition or caveat on demand, with Escape dismissing the preview for keyboard users.' },
      { title: 'Newsletter and blog platforms', text: 'Add a lightweight enhancement using one reused popover element, alongside a [table of contents](/ui-snippets/table-of-contents/) for long articles.' },
      { icon: 'CODE', title: 'Related: Priority Matrix Board', desc: 'See the [Priority Matrix Board](/ui-snippets/priority-matrix-board/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is there only one popover element instead of one per footnote?', a: `A single .fhp-popover div is created once and appended to the document body, then repositioned and refilled with content on every hover or focus event. This is both cheaper than managing a separate hidden element for every footnote and guarantees only one popover can ever be visible at a time, since there is only one element to show or hide.` },
      { q: 'How does the popover decide whether to appear above or below the marker?', a: `positionPopover() defaults to placing the popover above the marker, but first checks whether the popover\\'s height would push its top edge above the viewport (rect.top - popover height - offset < 0). If so, it repositions the popover below the marker instead and adds an fhp-above class that also flips which edge the pointer triangle appears on, so the popover never gets clipped by the top of the browser window.` },
      { q: 'Does this work with a screen reader or keyboard-only navigation?', a: `Yes. Every marker has tabindex="0" so it is reachable by Tab, and the same showFor()/scheduleHide() functions that respond to mouseenter/mouseleave are also wired to focus/blur, so keyboard users get an identical preview experience. The popover carries role="tooltip", and pressing Escape while a marker is focused explicitly hides the popover and blurs the marker.` },
      { q: 'Why is there a delay before the popover hides?', a: `scheduleHide() sets a 120ms timeout before actually removing the visible class, and that timeout is cleared if focus or the pointer returns to the reference marker (or the popover itself) within that window. Without the delay, a slightly imprecise mouse movement while reading the popover's content could cause it to flicker closed and reopen.` },
      { q: 'How do I use this footnote preview pattern in React, Vue, or Angular?', a: `Keep a single popover component mounted once (e.g. via a portal in React, or a teleport in Vue) and drive its visible state, content, and position from whichever reference marker is currently hovered or focused, held in shared component state. The positioning math in positionPopover() is plain DOM geometry and ports unchanged; only the mounting and state-management mechanics change per framework.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the positioning math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how positionPopover() decides whether to flip the popover above or below the marker, and why the footnote text is read from a visible <ol> rather than duplicated inline as data attributes. The same assistant can help optimize it — for example asking whether the 120ms hide delay is long enough for users with motor impairments, or whether horizontal clamping should also account for the marker being very close to the left edge, not just the right. It's also useful for extending the pattern: ask it to make the popover content itself focusable and scrollable for very long footnotes, add a small show-delay to avoid triggering on fast mouse passes, or support footnotes that contain links or citations formatted with something like the citation-formatter snippet. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "footnote hover preview" pattern for long-form article text in plain HTML, CSS, and JavaScript with no library.

Requirements:
- An article body containing several superscript footnote reference markers, each keyboard-focusable (tabindex="0") and linked by a data attribute to a real, visible, semantic ordered list of footnote text at the bottom of the article — the popover must read its content from that visible list rather than duplicating the footnote text elsewhere.
- A single popover element, created once and reused for every marker (not one hidden element per footnote), that is shown and repositioned whenever any marker is hovered or keyboard-focused, and hidden after a short cancelable delay when the pointer leaves or focus moves away, so quick pointer movements near the marker don't cause the popover to flicker open and closed.
- Positioning logic that centers the popover horizontally over the currently active marker, clamps its horizontal position so it never overflows past the left or right edge of the viewport, defaults to appearing above the marker, and automatically flips to appear below the marker instead when there isn't enough vertical room above it in the viewport.
- The popover's visibility, hover, and focus behavior must be identical for mouse and keyboard users — the exact same show/hide logic must fire on focus and blur events as on mouseenter and mouseleave, and pressing Escape while a marker is focused must dismiss the popover.
- If the page is scrolled while a popover is open, its position must update to stay anchored correctly to its marker.
- The popover element should carry an appropriate ARIA role indicating it is a tooltip/preview, and the underlying footnote list must remain fully readable and navigable without any JavaScript.`,
    },
  },
};

export default footnoteHoverPreview;
