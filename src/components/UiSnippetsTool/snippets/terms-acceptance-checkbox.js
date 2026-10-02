const termsAcceptanceCheckbox = {
  id: 'terms-acceptance-checkbox',
  title: 'Terms Acceptance Checkbox Pattern',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="tc-card">
  <h2>Terms of Service</h2>
  <p class="tc-hint" id="tcHint">Scroll to the bottom to enable the checkbox.</p>

  <div class="tc-scrollbox" id="tcScrollbox" tabindex="0">
    <h3>1. Acceptance of terms</h3>
    <p>By accessing or using this service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you must not use the service.</p>
    <h3>2. Use of service</h3>
    <p>You agree to use the service only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the service. Prohibited behavior includes harassing or causing distress to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue.</p>
    <h3>3. Accounts</h3>
    <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account.</p>
    <h3>4. Intellectual property</h3>
    <p>The service and its original content, features, and functionality are and will remain the exclusive property of the company and its licensors. The service is protected by copyright, trademark, and other laws.</p>
    <h3>5. Termination</h3>
    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the terms. Upon termination, your right to use the service will cease immediately.</p>
    <h3>6. Limitation of liability</h3>
    <p>In no event shall the company, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the service.</p>
    <h3>7. Changes to terms</h3>
    <p>We reserve the right to modify or replace these terms at any time. It is your responsibility to review these terms periodically for changes. Continued use of the service after revisions constitutes acceptance of the new terms.</p>
    <h3>8. Contact us</h3>
    <p>If you have any questions about these terms, please contact our support team. This is the end of the document — thanks for reading all the way through.</p>
  </div>

  <label class="tc-checkbox-row" id="tcCheckboxRow">
    <input type="checkbox" id="tcCheckbox" disabled />
    <span>I have read and agree to the Terms of Service</span>
  </label>

  <button type="button" class="tc-continue" id="tcContinue" disabled>Continue</button>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d13;color:#e6eaf3;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.tc-card{width:100%;max-width:460px;background:#131620;border:1px solid #242a3b;border-radius:16px;padding:24px}
.tc-card h2{font-size:18px;margin:0 0 6px}
.tc-hint{font-size:12.5px;color:#8891a8;margin:0 0 14px;transition:color .2s ease}
.tc-hint.tc-hint--done{color:#5fe0a0}
.tc-scrollbox{height:220px;overflow-y:auto;background:#0e1018;border:1px solid #212636;border-radius:10px;padding:16px 18px;margin-bottom:16px}
.tc-scrollbox h3{font-size:13px;color:#c9cee0;margin:16px 0 6px}
.tc-scrollbox h3:first-child{margin-top:0}
.tc-scrollbox p{font-size:12.5px;line-height:1.7;color:#9aa1b8;margin:0 0 8px}
.tc-scrollbox::-webkit-scrollbar{width:8px}
.tc-scrollbox::-webkit-scrollbar-thumb{background:#2a3145;border-radius:8px}
.tc-checkbox-row{display:flex;align-items:center;gap:10px;font-size:13.5px;color:#c9cee0;margin-bottom:16px;cursor:not-allowed;opacity:.5;transition:opacity .2s ease}
.tc-checkbox-row.tc-checkbox-row--enabled{cursor:pointer;opacity:1}
.tc-checkbox-row input{width:17px;height:17px;accent-color:#6f8dff}
.tc-continue{width:100%;background:#2a3145;color:#767f98;border:none;padding:13px;border-radius:10px;font-size:14px;font-weight:700;cursor:not-allowed;transition:background .2s ease,color .2s ease}
.tc-continue:not(:disabled){background:#6f8dff;color:#0b0e1a;cursor:pointer}
.tc-continue:not(:disabled):hover{background:#89a2ff}`,

  js: `// Real scroll-position detection — not a timer. The checkbox unlocks only once
// the terms box has actually been scrolled to (near) its bottom.
const scrollbox = document.getElementById('tcScrollbox');
const hint = document.getElementById('tcHint');
const checkboxRow = document.getElementById('tcCheckboxRow');
const checkbox = document.getElementById('tcCheckbox');
const continueBtn = document.getElementById('tcContinue');

const SCROLL_TOLERANCE_PX = 4; // account for sub-pixel rounding across browsers
let hasScrolledToEnd = false;

function isScrolledToBottom(el) {
  return el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_TOLERANCE_PX;
}

function updateContinueState() {
  continueBtn.disabled = !(hasScrolledToEnd && checkbox.checked);
}

scrollbox.addEventListener('scroll', () => {
  if (hasScrolledToEnd) return; // already unlocked, nothing to do
  if (isScrolledToBottom(scrollbox)) {
    hasScrolledToEnd = true;
    checkbox.disabled = false;
    checkboxRow.classList.add('tc-checkbox-row--enabled');
    hint.textContent = 'You\\'ve reached the end — you may now agree.';
    hint.classList.add('tc-hint--done');
  }
});

// If the content is short enough to not need scrolling at all, unlock immediately.
if (isScrolledToBottom(scrollbox)) {
  hasScrolledToEnd = true;
  checkbox.disabled = false;
  checkboxRow.classList.add('tc-checkbox-row--enabled');
  hint.textContent = 'You may now agree.';
  hint.classList.add('tc-hint--done');
}

checkbox.addEventListener('change', updateContinueState);

continueBtn.addEventListener('click', () => {
  if (!continueBtn.disabled) {
    continueBtn.textContent = 'Continuing…';
  }
});`,

  seo: {
    title: 'Terms Acceptance Checkbox — Free Scroll-to-Enable Consent Pattern',
    description: `A scrollable terms box that unlocks its acceptance checkbox only once the user has actually scrolled to the bottom — real scrollTop/scrollHeight detection, not a timer — plus a disabled Continue button until both conditions are met.`,
    about: {
      title: 'Terms Acceptance Checkbox — Real Scroll Detection, Not a Fake Timer',
      description: `The terms acceptance checkbox pattern is the "you must actually read this" gate used before signup, checkout, or any binding agreement: a scrollable terms box, a checkbox that starts disabled, and a Continue button that stays disabled until both the scroll and the checkbox conditions are satisfied. This snippet implements the scroll detection for real — reading the box's actual scroll position — rather than faking it with a timer that just waits N seconds regardless of whether anyone scrolled.

**Real scroll-position math, not a timer**

The core check is \`el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_TOLERANCE_PX\`. \`scrollTop\` is how far the content has scrolled, \`clientHeight\` is the visible viewport height, and \`scrollHeight\` is the full content height — when their sum reaches the total height (within a small pixel tolerance for sub-pixel rounding across browsers), the user has genuinely reached the bottom. A \`setTimeout\`-based fake would let someone tab away and come back "read"; this only fires from a real \`scroll\` event.

**A one-way unlock**

Once \`hasScrolledToEnd\` flips to \`true\`, the listener short-circuits (\`if (hasScrolledToEnd) return\`) — scrolling back up doesn't re-lock the checkbox. This matches how these gates are meant to work: you've proven you reached the end at least once, and don't need to re-prove it by staying there.

**Short-content edge case handled**

If the terms box is short enough that its content never needs scrolling — \`scrollHeight\` already equals \`clientHeight\` — the same \`isScrolledToBottom\` check runs once on load and unlocks the checkbox immediately, so a legitimately-short agreement doesn't trap the user in an impossible-to-satisfy state.

**Two independent conditions gate Continue**

The Continue button only enables when *both* \`hasScrolledToEnd\` is true *and* the checkbox is checked — either alone isn't enough. \`updateContinueState()\` runs on every checkbox change and re-evaluates both flags, so unchecking the box after scrolling correctly re-disables Continue.

**Clear, changing hint text**

The hint above the box starts as an instruction ("Scroll to the bottom to enable the checkbox") and updates to confirmation copy once unlocked, giving a visible, non-color-dependent signal of state alongside the checkbox's own disabled/enabled styling.

**Customizing it**

Swap the tolerance value for stricter/looser detection, add a scroll-progress indicator, or require an additional delay-after-unlock for extra-sensitive agreements. Pair it with a [checkout form](/ui-snippets/checkout-form/) or [gdpr-consent-manager](/ui-snippets/gdpr-consent-manager/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The terms box renders with the checkbox disabled.` },
      { title: 'Scroll the terms box', text: `The scroll event fires on every scroll.` },
      { title: 'Reach the bottom', text: `scrollTop + clientHeight >= scrollHeight unlocks it.` },
      { title: 'Check the box', text: `Now enabled; the hint text confirms it.` },
      { title: 'Click Continue', text: `Enabled only once both conditions are true.` },
    ] },
    features: [
      { title: 'Real scroll detection', text: `scrollTop/clientHeight/scrollHeight math, no timer.` },
      { title: 'Pixel tolerance', text: `Accounts for sub-pixel rounding across browsers.` },
      { title: 'One-way unlock', text: `Scrolling back up doesn't re-lock the checkbox.` },
      { title: 'Short-content safeguard', text: `Auto-unlocks if there's nothing to scroll.` },
      { title: 'Two-condition gate', text: `Continue needs scroll completion AND the checkbox.` },
      { title: 'Live hint text', text: `Instruction copy changes once unlocked.` },
      { title: 'Disabled-state styling', text: `Visually distinct locked vs. unlocked states.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and JavaScript.` },
    ],
    useCases: [
      { title: 'Account sign-up consent', text: 'Gate account creation on genuinely reaching the end of the terms. The checkbox stays disabled until the scroll check passes, so agreeing means the box was scrolled, not just clicked.' },
      { title: 'Checkout agreements', text: 'Require acknowledgement of delivery, returns or subscription terms before payment, and place it above the [checkout form](/ui-snippets/checkout-form/) submit button so the order cannot continue early.' },
      { title: 'Privacy notice consent flows', text: 'Use the same scroll-to-unlock logic for long privacy notices alongside the [GDPR consent manager](/ui-snippets/gdpr-consent-manager/), where users must see the full policy before accepting.' },
      { title: 'Contract and e-signature steps', text: 'Add it as the reading step before a [document signature flow](/ui-snippets/document-signature-flow/), so signers confirm they reached the final clause before the signing screen opens.' },
      { title: 'Policy updates and re-acceptance', text: 'When terms change, show the new version in the box and make existing users scroll and tick again. Scrolling back up never re-locks the checkbox, so the experience stays smooth.' },
      { title: 'Compliance-sensitive products', text: 'Finance, health and education products often need proof that users reached the end of the terms. Pixel tolerance and the short-content auto-unlock keep it reliable across browsers and tiny policies.' },
    ],
    faqs: [
      { q: 'Why not just use a timer to "make sure they read it"?', a: `A timer only proves time passed, not that the user scrolled or looked at the content — someone could switch tabs and come back once the timer expires. This pattern instead checks the box's real scroll position via scrollTop + clientHeight >= scrollHeight, so the checkbox only unlocks after an actual scroll event reaches the bottom.` },
      { q: 'What does the tolerance value do?', a: `SCROLL_TOLERANCE_PX (4px here) accounts for the fact that scrollHeight, clientHeight, and scrollTop can differ by a pixel or two across browsers and zoom levels due to sub-pixel rounding. Without it, some browsers might never report scrollTop + clientHeight as exactly equal to scrollHeight even when the user is visibly at the bottom.` },
      { q: 'Does scrolling back up re-lock the checkbox?', a: `No — once hasScrolledToEnd becomes true, the scroll listener returns early on every subsequent scroll event and never re-locks it. The pattern only requires proving you reached the bottom once, not staying there.` },
      { q: 'What happens if the terms are short enough to not need scrolling?', a: `The same isScrolledToBottom check runs once immediately after setup. If the content already fits without scrolling, the check passes right away and the checkbox unlocks on load instead of leaving the user stuck unable to scroll to satisfy a condition that isn't physically possible.` },
      { q: 'Can I require an additional confirmation step, like re-typing "I agree"?', a: `Yes — add another input and include its condition in updateContinueState() alongside hasScrolledToEnd and checkbox.checked, so Continue only enables when all three conditions are satisfied.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the scroll check uses el.scrollTop + el.clientHeight >= el.scrollHeight - tolerance instead of a simpler heuristic, and why a timer-based "read time" approach would be a weaker (and easily gamed) proxy for actually reading the content. It can help you add a visual scroll-progress bar tied to the same scroll event, handle the short-content edge case differently (e.g. requiring an explicit "I've read the short version" button instead of auto-unlocking), or extend the gate to a multi-document flow where several scrollable sections must each be completed before the final checkbox unlocks.`,
      prompt: `Build a "terms acceptance checkbox" gate in plain HTML, CSS, and JavaScript (no dependencies, no timers).

Requirements:
- A scrollable box (fixed height, overflow-y: auto) containing several paragraphs of terms-of-service-style text, long enough to require scrolling in a normal viewport.
- A checkbox that starts disabled, and only becomes enabled once the user has scrolled the box to (at or very near) its actual bottom — detected via a real scroll event listener that computes el.scrollTop + el.clientHeight against el.scrollHeight with a small pixel tolerance for cross-browser rounding. Do NOT use a setTimeout or any time-based delay as a substitute for real scroll detection.
- Once unlocked, scrolling back up must NOT re-disable the checkbox — the unlock should be one-way after the user has proven they reached the bottom once.
- Handle the edge case where the content is short enough to not require scrolling at all (scrollHeight equals clientHeight on load) by unlocking the checkbox immediately in that case, rather than leaving the user stuck.
- A "Continue" button that stays disabled until BOTH the scroll-to-bottom condition has been met AND the checkbox is checked; unchecking the checkbox after scrolling should re-disable Continue.
- Visible, non-color-only feedback for the locked vs. unlocked state (e.g. changing hint text and a disabled/enabled visual style), not just a disabled attribute with no explanation.`,
    },
  },
};

export default termsAcceptanceCheckbox;
