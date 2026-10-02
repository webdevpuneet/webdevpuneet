const subscriptionWidget = {
  id: 'subscription-widget',
  title: 'Email Subscription Widget',
  lastmod: '2026-06-13',
  category: 'forms',
  html: `<div class="widget-wrap">
  <div class="widget" id="subWidget">
    <div class="state-idle" id="stateIdle">
      <div class="icon-ring">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <h2 class="widget-title">Stay in the loop</h2>
      <p class="widget-sub">Get the latest tips, tutorials, and tools delivered to your inbox every week.</p>
      <ul class="benefits">
        <li><span class="check">✓</span> Weekly developer tips &amp; snippets</li>
        <li><span class="check">✓</span> Exclusive UI component releases</li>
        <li><span class="check">✓</span> No spam, unsubscribe anytime</li>
      </ul>
      <div class="form-row">
        <div class="input-wrap" id="inputWrap">
          <svg class="mail-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input type="email" class="email-input" id="emailInput" placeholder="your@email.com" onkeydown="handleKey(event)" oninput="clearError()">
        </div>
        <button class="sub-btn" id="subBtn" onclick="subscribe()">Subscribe</button>
      </div>
      <div class="error-msg" id="errorMsg"></div>
      <div class="social-proof">
        <div class="proof-avatars">
          <span class="pavatar" style="background:#dbeafe;color:#1d4ed8">JL</span>
          <span class="pavatar" style="background:#fce7f3;color:#be185d">AR</span>
          <span class="pavatar" style="background:#dcfce7;color:#15803d">KS</span>
        </div>
        <span class="proof-text">Join <strong>2,400+</strong> developers already subscribed</span>
      </div>
    </div>

    <div class="state-success" id="stateSuccess">
      <div class="success-ring">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 class="widget-title">You are in!</h2>
      <p class="widget-sub" id="confirmMsg">We have sent a confirmation to your email. Check your inbox to complete your subscription.</p>
      <div class="success-meta" id="confirmedEmail"></div>
      <button class="reset-btn" onclick="resetForm()">Subscribe another email</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%); display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.widget-wrap { width: 100%; max-width: 400px; }
.widget { background: #fff; border-radius: 20px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); padding: 32px 28px; overflow: hidden; }
.icon-ring { width: 52px; height: 52px; border-radius: 50%; background: #eef2ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.widget-title { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 8px; }
.widget-sub { font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 16px; }
.benefits { list-style: none; display: flex; flex-direction: column; gap: 7px; margin-bottom: 20px; }
.benefits li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }
.check { color: #16a34a; font-weight: 700; }
.form-row { display: flex; gap: 8px; margin-bottom: 6px; }
.input-wrap { flex: 1; position: relative; }
.mail-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.email-input { width: 100%; padding: 10px 12px 10px 36px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 14px; color: #111827; outline: none; transition: border-color 0.2s; }
.email-input:focus { border-color: #4f46e5; }
.email-input.invalid { border-color: #ef4444; animation: shake 0.3s; }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
.sub-btn { padding: 10px 18px; background: #4f46e5; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.1s; white-space: nowrap; }
.sub-btn:hover { background: #4338ca; }
.sub-btn:active { transform: scale(0.97); }
.sub-btn.loading { opacity: 0.7; pointer-events: none; }
.error-msg { font-size: 12px; color: #ef4444; min-height: 16px; }
.social-proof { display: flex; align-items: center; gap: 10px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #f3f4f6; }
.proof-avatars { display: flex; }
.pavatar { width: 26px; height: 26px; border-radius: 50%; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; margin-left: -6px; }
.pavatar:first-child { margin-left: 0; }
.proof-text { font-size: 12px; color: #6b7280; }
.proof-text strong { color: #374151; }
.state-success { display: none; text-align: center; }
.state-success.show { display: block; animation: fadeUp 0.4s ease; }
.state-idle.hide { display: none; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
.success-ring { width: 64px; height: 64px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; animation: popIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
.success-meta { font-size: 13px; font-weight: 600; color: #4f46e5; margin-top: 8px; margin-bottom: 20px; }
.reset-btn { background: none; border: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.15s; }
.reset-btn:hover { border-color: #4f46e5; color: #4f46e5; }`,

  js: `function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function clearError() {
  document.getElementById('errorMsg').textContent = '';
  document.getElementById('emailInput').classList.remove('invalid');
}
function handleKey(e) {
  if (e.key === 'Enter') subscribe();
}
function subscribe() {
  const input = document.getElementById('emailInput');
  const email = input.value.trim();
  if (!email) {
    document.getElementById('errorMsg').textContent = 'Please enter your email address.';
    input.classList.add('invalid');
    input.focus();
    return;
  }
  if (!validateEmail(email)) {
    document.getElementById('errorMsg').textContent = 'Please enter a valid email address.';
    input.classList.add('invalid');
    input.focus();
    return;
  }
  const btn = document.getElementById('subBtn');
  btn.textContent = 'Subscribing...';
  btn.classList.add('loading');
  setTimeout(function() {
    document.getElementById('stateIdle').classList.add('hide');
    const success = document.getElementById('stateSuccess');
    success.classList.add('show');
    document.getElementById('confirmedEmail').textContent = email;
  }, 900);
}
function resetForm() {
  document.getElementById('emailInput').value = '';
  document.getElementById('errorMsg').textContent = '';
  const btn = document.getElementById('subBtn');
  btn.textContent = 'Subscribe';
  btn.classList.remove('loading');
  document.getElementById('stateIdle').classList.remove('hide');
  document.getElementById('stateSuccess').classList.remove('show');
}`,

  seo: {
    title: 'Email Subscription Widget — HTML CSS JS Snippet',
    description: 'Email newsletter signup widget with live validation, an animated success state, and social-proof avatars. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Email Subscription Widget — Live Validation, Animated Success State & Social Proof`,
      description: `An email subscription widget is the front door to a newsletter or mailing list. Its job is to convert a casual visitor into a subscriber by presenting a clear value proposition, reducing friction in the signup process, and confirming the subscription with positive feedback. This snippet implements all three: benefit bullets explain the value, a single email field minimises friction, and an animated success state provides satisfying confirmation.\n\n**Two-state architecture**\n\nThe component has two HTML blocks side by side inside the card: \`#stateIdle\` (the form) and \`#stateSuccess\` (the confirmation). Initially, \`#stateSuccess\` has \`display: none\`. On successful submission, \`#stateIdle\` gets the \`.hide\` class (sets \`display: none\`) and \`#stateSuccess\` gets the \`.show\` class (sets \`display: block\` and triggers the \`fadeUp\` animation). The \`resetForm()\` function reverses both class changes. This toggle-between-states pattern avoids page navigation and keeps the widget self-contained.\n\n**Email validation**\n\nThe \`validateEmail()\` function uses a regex: \`/^[^\s@]+@[^\s@]+\.[^\s@]+$/\`. This pattern checks for: at least one non-whitespace, non-@ character before the @, a domain segment after the @, and a dot with at least one character after it. It is intentionally simple — RFC 5321 full email validation is thousands of characters of regex and impractical for UI use. The goal is to catch obvious typos (no @, no dot) not to verify deliverability. Deliverability verification belongs server-side via SMTP probing.\n\n**Shake animation for invalid input**\n\nWhen validation fails, the input gets the \`.invalid\` class which triggers a CSS \`@keyframes shake\` animation: four keyframes moving the element ±4px on the X axis over 0.3s. This is a well-established error affordance from iOS and Android — the haptic-like motion draws the eye to the field without needing additional error text color alone. The animation class is removed by \`clearError()\` on the \`oninput\` event so it can retrigger on the next submission attempt.\n\n**Simulated loading state**\n\nA \`setTimeout\` of 900ms simulates a network request. In production, replace this with a real API call (Mailchimp, ConvertKit, your own endpoint). The button text changes to "Subscribing..." and a \`.loading\` class adds \`opacity: 0.7; pointer-events: none\` to prevent double-submission. Always disable the button during async operations.\n\n**Success ring animation**\n\nThe green checkmark circle uses \`@keyframes popIn\`: it scales from 0 to 1 using a spring-like cubic-bezier (\`0.175, 0.885, 0.32, 1.275\`) which slightly overshoots scale(1) before settling — the same easing used in iOS app icon install animations. The surrounding \`fadeUp\` animation on the success state slides the entire block up from 16px below its final position with opacity 0, creating a fluid reveal that feels intentional.\n\n**Social proof section**\n\nThe proof strip at the bottom shows three stacked avatars (initials-based) plus a subscriber count. The avatars use \`margin-left: -6px\` on all except the first to create the overlapping stack effect. Different background/text colors per avatar add variety. In production, replace the static "2,400+" with a live subscriber count fetched from your mailing list API.\n\n**Benefit bullets**\n\nThree concise bullet points with green checkmarks (not list-style markers but actual Unicode ✓ characters styled with \`color: #16a34a\`) build pre-commitment by naming specific deliverables. The "unsubscribe anytime" bullet reduces anxiety about commitment — studies show this objection-handling increases opt-in rates.\n\n**React integration**\n\nManage \`email\`, \`error\`, \`loading\`, and \`submitted\` state with \`useState\`. The form and success view are conditional renders: \`{submitted ? <SuccessState /> : <FormState />}\`. Pass an \`onSubmit\` prop for the API call and use the \`loading\` flag to disable the button and show spinner text. Validate in a \`handleSubmit\` function before calling the prop.\n\n**Accessibility**\n\nThe email input should have \`type="email"\` which triggers the @ keyboard on iOS. Add \`aria-describedby\` pointing to the \`#errorMsg\` element so screen readers announce the error when it appears. The success state should receive focus programmatically (\`successRef.current.focus()\`) so keyboard users know the state changed.\n\nSee also the [newsletter signup snippet](/ui-snippets/newsletter-signup/) for a lighter inline version, the [contact form snippet](/ui-snippets/contact-form/) for a full multi-field form, and the [glassmorphism login snippet](/ui-snippets/glassmorphism-login/) for another card-based form pattern.`
    },
    howToUse: [
      { title: 'Copy the full HTML card', text: 'The widget needs both #stateIdle and #stateSuccess divs. Both must be present — JavaScript toggles between them. Do not remove either block.' },
      { title: 'Add the CSS block', text: 'Paste the CSS. Change #4f46e5 (indigo) to your brand accent color throughout. The gradient background on body is optional — remove it to use your own page background.' },
      { title: 'Include the JavaScript', text: 'Add the five JS functions. subscribe() validates, shows loading, then transitions to the success state after 900ms. Replace the setTimeout with your real API call.' },
      { title: 'Connect to your mailing list', text: 'Replace the setTimeout in subscribe() with a fetch POST to your email service endpoint (Mailchimp, ConvertKit, etc.). Keep the btn.classList.add("loading") and the success state transition.' },
      { title: 'Update the social proof numbers', text: 'Change "2,400+" in the proof-text span to reflect your real subscriber count. Optionally fetch it from your mailing list API and inject it dynamically.' }
    ],
    features: [
      'Two-state card: form view and animated success view',
      'Live email validation with regex and shake animation on error',
      'Loading state disables button to prevent double-submission',
      'Animated success checkmark with spring cubic-bezier easing',
      'Social proof avatars with overlapping stack via negative margin',
      'Benefit bullet list to reduce friction and handle objections',
      'Enter-key submission support',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '📧', title: 'Newsletter signups', desc: 'Capture subscribers for a developer blog or design newsletter, with live email validation and a shake animation when the address is invalid.' },
      { icon: '🚀', title: 'SaaS waitlists', desc: 'Collect pre-launch emails for a product waitlist, using a loading state that disables the button to prevent accidental double submission.' },
      { icon: '🎓', title: 'Course launches', desc: 'Announce early-bird access to an online course, with social-proof avatars beneath the form to encourage hesitant visitors.' },
      { icon: '🔔', title: 'Open-source release notices', desc: 'Offer release notifications for a library or tool, ending in an animated success checkmark with a spring easing.' },
    ],
    faqs: [
      { q: 'How do I connect this to Mailchimp or ConvertKit?', a: 'Replace the setTimeout in subscribe() with a fetch POST to your mailing list API endpoint. Include the email in the request body and handle the response to show success or error states.' },
      { q: 'How do I use this subscription widget in React?', a: 'Use useState for email, error, loading, and submitted. Render the form or success state conditionally. Pass an onSubmit handler prop for the actual API call.' },
      { q: 'How do I add a name field to the form?', a: 'Add a second input for name above the email row. Include it in the form-row or as a separate row. Add name validation (non-empty check) in the subscribe() function before the email check.' },
      { q: 'Can I use this as a popup modal instead?', a: 'Yes — wrap the .widget in a modal overlay and control visibility with a class toggle. See the modal snippet at /ui-snippets/modal/ for the overlay pattern.' },
      { q: 'How do I export this signup widget to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the toolbar. It generates a Vue 3 single-file component with the validation and submit logic in script setup, an Angular standalone component, a plain React component, and a React + Tailwind version where the widget styles become utility classes. Each export maps the inline handlers to the matching framework event bindings and keeps the success-state transition intact, so the form behaves the same across React, Vue, and Angular — swap the mock submit for your mailing-list API call afterwards.' }
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the two-state toggle by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the hide and show classes swap the idle form and the success confirmation, and why the invalid input's shake animation is retriggerable from the oninput handler rather than firing only once. The same assistant can help optimize it — for instance whether the email regex in validateEmail is too permissive or too strict for your real signup flow, or whether the 900ms setTimeout that fakes the network request should be replaced with a real fetch call that also handles error responses. It's also useful for extending the widget: ask it to add a name field with its own validation, wire the "2,400+ developers" count to a live subscriber total, or persist a dismissed/already-subscribed state to localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an email subscription widget in plain HTML, CSS, and JavaScript with two mutually exclusive states — no framework, no build step.

Requirements:
- A card containing two full sections: an idle form state (icon, headline, benefit bullets, email input with an inline mail icon, subscribe button, error message area, and a social-proof row with overlapping avatar circles) and a success state (checkmark icon, confirmation headline, the submitted email, and a "subscribe another" reset button) — only one of the two visible at a time via class toggling, not conditional rendering.
- A validateEmail function using a simple regex that checks for a non-whitespace non-@ segment, an @ symbol, a domain segment, and a dot followed by at least one character — intentionally simple, not full RFC validation.
- Submitting with an empty field or a failing regex must show a specific error message, add an invalid class to the input that triggers a CSS keyframe shake animation (a few small left-right translateX keyframes), and refocus the input; typing again must clear both the error text and the invalid class immediately.
- Clicking subscribe with a valid email must switch the button to a loading label and a disabled/dimmed visual state, wait roughly 900ms via setTimeout to simulate a network call, then swap from the idle state to the success state and display the submitted email in the confirmation.
- The success state's checkmark icon must play a spring-style pop-in keyframe animation (scale from 0 to 1 with a cubic-bezier overshoot) the moment it becomes visible.
- A reset button in the success state must clear the input, remove the loading state, and switch back to the idle form so another email can be entered.
- Enter key press inside the email input must trigger the same subscribe logic as clicking the button.`,
    },
  }
};

export default subscriptionWidget;
