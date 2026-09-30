const trustBadgeStrip = {
  id: 'trust-badge-strip',
  title: 'Checkout Trust & Security Badge Strip',
  lastmod: '2026-08-08',
  category: 'cards',
  html: `<div class="demo-wrap">
  <div class="checkout-mock">
    <div class="checkout-row">
      <span class="checkout-label">Order total</span>
      <span class="checkout-value">$84.00</span>
    </div>
    <button class="pay-btn">Pay Now</button>

    <div class="trust-strip">
      <button class="trust-item" data-tip="tip-secure">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
        <span>Secure Checkout</span>
      </button>
      <button class="trust-item" data-tip="tip-guarantee">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>
        <span>Money-Back Guarantee</span>
      </button>
      <button class="trust-item" data-tip="tip-ssl">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12.5l2 2 4-4.5"/></svg>
        <span>SSL Encrypted</span>
      </button>
    </div>

    <div class="pay-icons">
      <span class="pay-icon" data-tip="tip-visa" aria-label="Visa">
        <svg width="30" height="18" viewBox="0 0 30 18"><rect width="30" height="18" rx="3" fill="#1a1f71"/><text x="15" y="12.5" font-size="8" font-weight="700" fill="#fff" text-anchor="middle" font-family="sans-serif">VISA</text></svg>
      </span>
      <span class="pay-icon" data-tip="tip-mc" aria-label="Mastercard">
        <svg width="30" height="18" viewBox="0 0 30 18"><rect width="30" height="18" rx="3" fill="#f4f4f4"/><circle cx="12" cy="9" r="5.5" fill="#eb001b"/><circle cx="18" cy="9" r="5.5" fill="#f79e1b" fill-opacity="0.85"/></svg>
      </span>
      <span class="pay-icon" data-tip="tip-amex" aria-label="American Express">
        <svg width="30" height="18" viewBox="0 0 30 18"><rect width="30" height="18" rx="3" fill="#2e77bc"/><text x="15" y="12.5" font-size="6.5" font-weight="700" fill="#fff" text-anchor="middle" font-family="sans-serif">AMEX</text></svg>
      </span>
      <span class="pay-icon" data-tip="tip-pp" aria-label="PayPal">
        <svg width="30" height="18" viewBox="0 0 30 18"><rect width="30" height="18" rx="3" fill="#003087"/><text x="15" y="12.5" font-size="6" font-weight="700" fill="#fff" text-anchor="middle" font-family="sans-serif">PayPal</text></svg>
      </span>
    </div>

    <div class="tooltip-box" id="tooltip-box">Hover or tap a badge above for details.</div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 32px 16px; }

.checkout-mock {
  width: 100%; max-width: 340px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 22px; box-shadow: 0 8px 24px rgba(15,23,42,0.06);
}

.checkout-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.checkout-label { font-size: 13px; color: #64748b; }
.checkout-value { font-size: 20px; font-weight: 700; color: #0f172a; }

.pay-btn {
  width: 100%; background: #6366f1; color: #fff; border: none;
  border-radius: 10px; padding: 13px; font-size: 14px; font-weight: 700;
  font-family: inherit; cursor: pointer; transition: background 0.15s;
  margin-bottom: 16px;
}
.pay-btn:hover { background: #4f46e5; }

.trust-strip {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
  margin-bottom: 14px;
}
.trust-item {
  display: flex; align-items: center; gap: 5px;
  background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;
  border-radius: 20px; padding: 5px 10px; font-size: 10.5px; font-weight: 600;
  font-family: inherit; cursor: pointer; white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}
.trust-item:hover, .trust-item:focus-visible { background: #dcfce7; border-color: #86efac; }
.trust-item svg { flex-shrink: 0; }

.pay-icons { display: flex; gap: 6px; justify-content: center; margin-bottom: 14px; }
.pay-icon {
  cursor: pointer; border-radius: 4px; line-height: 0;
  transition: transform 0.15s;
}
.pay-icon:hover, .pay-icon:focus-visible { transform: translateY(-2px); }

.tooltip-box {
  font-size: 11.5px; color: #64748b; text-align: center; line-height: 1.5;
  min-height: 32px; padding: 6px 8px; border-top: 1px dashed #e2e8f0;
  transition: color 0.15s;
}
.tooltip-box.active { color: #1e293b; font-weight: 500; }`,
  js: `const tips = {
  'tip-secure': 'All transactions are processed over an encrypted connection — your card details never touch our servers unprotected.',
  'tip-guarantee': 'Not satisfied? Get a full refund within 30 days of purchase, no questions asked.',
  'tip-ssl': 'This page uses SSL/TLS encryption (the same standard used by banks) to protect your data in transit.',
  'tip-visa': 'Visa cards are accepted and processed through our PCI-compliant payment gateway.',
  'tip-mc': 'Mastercard cards are accepted and processed through our PCI-compliant payment gateway.',
  'tip-amex': 'American Express cards are accepted, including corporate and rewards cards.',
  'tip-pp': 'Pay with your PayPal balance, linked bank account, or PayPal Credit — no card required.',
};

const box = document.getElementById('tooltip-box');
const triggers = document.querySelectorAll('[data-tip]');

function showTip(key) {
  box.textContent = tips[key] || '';
  box.classList.add('active');
}
function resetTip() {
  box.textContent = 'Hover or tap a badge above for details.';
  box.classList.remove('active');
}

triggers.forEach(el => {
  const key = el.getAttribute('data-tip');
  el.addEventListener('mouseenter', () => showTip(key));
  el.addEventListener('mouseleave', resetTip);
  el.addEventListener('focus', () => showTip(key));
  el.addEventListener('blur', resetTip);
  // Tap support: toggle on click for touch devices without hover
  el.addEventListener('click', e => {
    e.preventDefault();
    showTip(key);
  });
});`,
  seo: {
    title: 'Checkout Trust & Security Badge Strip — HTML CSS JS Snippet',
    description: 'Hoverable trust signals — secure checkout, guarantee, SSL, payment icons — for a checkout mock with reassurance tooltips. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Checkout Trust & Security Badge Strip — Secure Checkout Badges, Payment Icons & Tooltip Reassurance for Higher Conversion',
      description: `Cart and checkout abandonment is one of the most expensive UX failures in ecommerce, and a meaningful share of it comes down to a single moment of hesitation right before a customer commits their card details: *is this actually safe?* Trust-driven UX addresses this directly by surfacing concrete, verifiable security and guarantee signals at the exact point of highest anxiety &mdash; immediately below the pay button &mdash; rather than burying them in a footer or terms page nobody reads before checking out. This snippet builds a compact, interactive trust badge strip: a "Secure Checkout" lock badge, a money-back guarantee badge, an SSL encryption badge, and a row of accepted payment method marks, each with a hover/tap tooltip that gives one concrete sentence of reassurance rather than a vague icon alone.

**Why visible trust signals matter more in 2026 checkout design**

As more of the web fills with AI-generated content, synthetic reviews, and increasingly convincing phishing pages, users have become more skeptical by default, and generic trust badges that used to work on visual pattern-matching alone (a small padlock icon, a vague "100% Secure" ribbon) now carry less weight because they are trivial to fake. The trust-driven UX pattern that actually moves the needle in 2026 pairs a recognizable badge with a specific, checkable claim: not just an SSL icon, but a tooltip explaining what SSL actually protects; not just a guarantee ribbon, but the actual refund window ("30 days, no questions asked"). Specificity is what separates a genuine trust signal from decorative badge-wallpaper that users have learned to tune out.

**Structure: badges, payment marks, and the reassurance tooltip**

The strip is built from two visually distinct badge types. The three pill-shaped \`.trust-item\` buttons (Secure Checkout, Money-Back Guarantee, SSL Encrypted) use a soft green palette (\`#f0fdf4\` background, \`#166534\` text) that borrows the universal "safe/good" association from status colors elsewhere in the product, paired with a simple inline SVG icon &mdash; a padlock, a shield-with-checkmark, and a shield-with-check for SSL &mdash; drawn directly in markup so no icon font or external asset request is needed. Below the trust pills sits a row of \`.pay-icon\` payment method marks, deliberately built as generic inline SVG rectangles with initials rather than real brand logos, since reproducing actual card network logos requires their brand guidelines and licensing; the point for this snippet is to demonstrate the pattern and layout, not to ship production-ready brand assets. Both badge types share one \`tips\` object keyed by a \`data-tip\` attribute, and hovering, focusing, or tapping any badge updates a single shared \`.tooltip-box\` beneath the row with that badge's specific reassurance sentence.

**Interaction: hover for desktop, tap for touch, focus for keyboard**

Because trust signals need to work identically for mouse, keyboard, and touch users, each badge listens for four separate events: \`mouseenter\`/\`mouseleave\` for hover, \`focus\`/\`blur\` for keyboard tabbing, and \`click\` for touch devices where hover does not exist. All four route through the same \`showTip(key)\` function, which looks the badge's key up in the shared \`tips\` object and writes the matching sentence into the tooltip box, adding an \`.active\` class that darkens the text so the currently-shown tip is visually distinct from the idle placeholder copy. This single-shared-tooltip approach (versus a separate floating tooltip per badge) keeps the component lightweight and avoids the z-index and positioning complexity that per-element floating tooltips typically introduce, while still giving every badge in the strip its own specific, checkable claim.

**Where this sits in a real checkout flow**

The demo wraps the strip in a minimal checkout mock &mdash; an order total, a primary "Pay Now" button, and the trust strip immediately beneath it &mdash; because placement matters as much as content. Trust signals shown far from the actual payment action (e.g. only in a footer) do far less to reduce last-second hesitation than the same signals shown in the direct visual path between "I'm about to pay" and "I clicked pay." Keep the strip close to the payment button, keep each badge's claim concrete and specific, and avoid stacking more than four or five badges, since an overcrowded trust strip starts to look like noise rather than a credible, scannable set of guarantees.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Hover, tab, or tap a badge',
          text: 'Hover any trust pill or payment icon with a mouse, tab to it with the keyboard, or tap it on a touch device. The shared .tooltip-box beneath the strip updates with that badge\'s specific reassurance sentence, pulled from the tips object in the JS by matching the data-tip key.',
        },
        {
          title: 'Add a new trust badge',
          text: 'Copy a .trust-item button, give it a new data-tip value (e.g. "tip-privacy"), swap the inline SVG icon path, and add a matching entry to the tips object in JS keyed by that same string, e.g. tips["tip-privacy"] = "We never sell your personal data to third parties."',
        },
        {
          title: 'Replace the placeholder payment icons with your own',
          text: 'The .pay-icon marks are generic inline SVGs with initials, not real brand logos — replace them with your payment processor\'s official brand SVGs (check each network\'s brand guidelines before using their logo) and keep each one wrapped with a data-tip attribute so the tooltip pattern still works.',
        },
        {
          title: 'Write specific, checkable tooltip copy',
          text: 'Avoid vague reassurance like "100% Secure!" — state the actual mechanism or policy: what encryption standard is used, how many days the guarantee window is, or what specifically is never shared. Specific claims read as more credible and are what actually reduces checkout hesitation.',
        },
        {
          title: 'Position the strip directly beneath the pay button',
          text: 'Trust signals work best placed in the direct visual path right after the primary payment action, not in a page footer. Keep the .trust-strip and .pay-icons rows immediately below .pay-btn as shown in this demo\'s .checkout-mock structure.',
        },
        {
          title: 'Export and integrate into your real checkout',
          text: 'Click HTML to download a standalone file, or JSX for a React component. Wire the tips object to real content from your legal/policy pages so the guarantee window and security claims shown always match your actual current policy.',
        },
      ],
    },
    features: [
      'Shared single tooltip box pattern: one .tooltip-box updates from any badge via a data-tip key, avoiding per-badge floating tooltip complexity',
      'Four-event coverage per badge: mouseenter/mouseleave (hover), focus/blur (keyboard), and click (touch) all route through one showTip() function',
      'Inline SVG icons for lock, shield-check, and payment marks — zero external icon font or image requests',
      'Soft semantic green palette on trust pills (#f0fdf4 / #166534) borrowing the universal safe/verified color association',
      'Generic payment method marks built as simple SVG rectangles, safely avoiding real brand logo licensing concerns',
      'Real <button> elements throughout for keyboard focusability and accessible activation, not styled spans',
      'Minimal checkout mock wrapper demonstrating correct placement directly beneath the primary pay action',
      'Idle vs active tooltip states distinguished with a color and font-weight change via the .active class',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Reducing cart and checkout abandonment on ecommerce payment pages',
        desc: 'Placed directly beneath a "Pay Now" or "Place Order" button, this strip gives hesitant shoppers concrete, checkable reasons to trust the transaction at the exact moment they are deciding whether to complete it. Pair it with the [Tactile Brutalist Press Button](/ui-snippets/brutalist-press-button) or your own primary CTA styling for a checkout moment that feels both confident and safe.',
      },
      {
        icon: 'APP',
        title: 'Subscription and SaaS billing pages needing guarantee messaging',
        desc: 'SaaS pricing and billing confirmation pages benefit from the same trust-signal pattern — swap "Money-Back Guarantee" copy for your actual refund or cancel-anytime policy, and use the SSL/Secure badges to reassure users entering recurring payment details for the first time.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems standardizing trust and security messaging across products',
        desc: 'Larger product teams often have inconsistent or missing trust messaging across different checkout surfaces (web, mobile web, in-app purchase). Standardizing this badge strip as a shared component with a centralized tips/policy object ensures every payment surface shows the same accurate, up-to-date guarantee and security claims.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching accessible, multi-input tooltip patterns',
        desc: 'This snippet is a clean reference for building a tooltip system that works correctly across mouse, keyboard, and touch without a UI library — the four-event pattern (hover, focus, click) routed through one shared display function is a technique that generalizes well beyond trust badges to any icon-plus-explanation UI element.',
      },
      {
        icon: 'FLOW',
        title: 'High-ticket or first-time-purchase checkout flows needing extra reassurance',
        desc: 'For high-value purchases or a customer\'s first transaction with a new brand, hesitation is highest and trust signals matter most. Consider expanding the tooltip copy to include specifics like a company registration number, a customer support phone number, or a link to independent reviews for these higher-stakes checkout contexts.',
      },
      {
        icon: 'CODE',
        title: 'A/B testing which trust signals actually move conversion',
        desc: 'Because each badge and its tooltip content live in a simple, swappable data structure, this component is straightforward to wire into an A/B testing setup — show different badge combinations or tooltip wording to different user segments and measure the effect on checkout completion rate.',
      },
    ],
    faqs: [
      {
        q: 'Do I need real payment network logos, or can I use the generic marks from this snippet?',
        a: 'For a live production checkout, use the official brand assets from each payment network (Visa, Mastercard, PayPal, etc.) after reviewing their brand usage guidelines, since most networks have specific rules about how their logo can be displayed. The generic initials-based SVG marks in this snippet exist to demonstrate the layout and interaction pattern without touching real trademarked logos — swap them out before shipping to production.',
      },
      {
        q: 'Does adding a trust badge strip actually reduce checkout abandonment?',
        a: 'Concrete, specific trust signals placed near the payment action are well documented to reduce checkout hesitation, particularly for first-time customers or higher-value purchases, because they directly address the "is this safe" moment of doubt. The effect is strongest when the claims are specific and verifiable (a named encryption standard, an exact refund window) rather than vague marketing language, and when the badges are placed in the direct visual path of the payment button rather than buried in a footer.',
      },
      {
        q: 'How do I make the tooltip content update dynamically instead of hard-coded strings?',
        a: 'Replace the static tips object with data fetched from your policy or legal content source (a CMS field, a config file, or an API response) at page load, keeping the same data-tip key structure so the showTip() lookup logic does not need to change. This ensures the guarantee window, security claims, and payment options shown always reflect your current actual policy rather than stale hard-coded copy.',
      },
      {
        q: 'Is the tooltip accessible to screen reader users?',
        a: 'The badges are real button elements that receive focus and trigger the tooltip update on both focus and blur, so keyboard users see the same reassurance text as mouse users. For stronger screen reader support, consider adding aria-live="polite" to the .tooltip-box element so its content change is announced automatically when a badge receives focus, rather than relying on the user to notice the visual text change.',
      },
      {
        q: 'How many trust badges is too many for a checkout page?',
        a: 'Most conversion research suggests three to five well-chosen, specific trust signals is the effective range — beyond that, badges start to visually compete with each other and can read as compensating for something ("why do they need to reassure me this much?") rather than as straightforward confidence-building. This snippet\'s three trust pills plus a small payment-icon row sits comfortably within that range.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through how the shared data-tip/tips-object pattern lets one .tooltip-box serve every badge in the strip, so you understand the tradeoff versus giving each badge its own floating tooltip before you decide which approach fits your real checkout page. It's also worth asking the assistant to help you replace the placeholder payment icons with your actual payment processor's official brand SVGs while keeping the tooltip wiring intact, and to add an aria-live region so the tooltip text change is announced to screen reader users automatically on focus. Finally, ask it to help you A/B test different badge combinations or tooltip copy by extracting the tips object into an easily swappable config so you can measure which specific trust claims actually move your checkout completion rate.`,
      prompt: `Build a checkout trust and security badge strip in plain HTML, CSS, and JavaScript that sits beneath a "Pay Now" button in a small checkout mock.

Requirements:
- Include at least three trust badges (for example Secure Checkout with a lock icon, a money-back guarantee, and SSL Encrypted) built as real button elements with inline SVG icons, no external icon fonts or images.
- Include a small row of generic (non-trademarked) payment method marks built as simple inline SVGs, each individually hoverable/tappable like the trust badges.
- All badges share a single tooltip display area beneath the strip. Hovering, keyboard-focusing, or tapping any badge updates that shared area with one specific, concrete reassurance sentence unique to that badge (not a vague "100% Secure" placeholder) — implement this via a single lookup object keyed by a data attribute, not per-badge floating tooltips.
- Wire up all the necessary events so the interaction works identically across mouse (hover), keyboard (focus/blur), and touch (tap/click) input.
- Wrap the strip in a minimal checkout mock (an order total and a primary pay button) so the strip's placement directly beneath the payment action is demonstrated, not just the badges in isolation.
- Keep the whole component self-contained, accessible (focusable badges, sufficient color contrast), and free of any real trademarked brand logos.`,
    },
  },
};
export default trustBadgeStrip;
