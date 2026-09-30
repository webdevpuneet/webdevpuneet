const giftCard = {
  id: 'gift-card',
  title: 'Gift Card Voucher',
  lastmod: '2026-06-17',
  category: 'cards',
  html: `<div class="gc-wrap">
  <div class="gc-card">
    <div class="gc-shine"></div>
    <div class="gc-top">
      <span class="gc-brand">✦ FWD STORE</span>
      <span class="gc-chip">GIFT CARD</span>
    </div>
    <div class="gc-amount">$50<span class="gc-bal">.00</span></div>
    <div class="gc-to">To: <strong>Alex</strong> · From: <strong>Sam</strong></div>

    <div class="gc-code-row">
      <code class="gc-code" id="gcCode">FWDT-••••-••••</code>
      <button class="gc-btn" id="gcBtn" onclick="revealOrCopy()">Reveal code</button>
    </div>
    <div class="gc-foot">
      <span>Expires Dec 2027</span>
      <span class="gc-bal-tag">Balance $50.00</span>
    </div>
  </div>
  <p class="gc-note">Redeem at checkout — applies to your next order.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gc-wrap{width:100%;max-width:360px;text-align:center}

.gc-card{position:relative;border-radius:20px;padding:24px;color:#fff;overflow:hidden;text-align:left;background:linear-gradient(135deg,#7c3aed,#6366f1 45%,#0ea5e9);box-shadow:0 22px 50px rgba(99,102,241,.4)}
.gc-shine{position:absolute;top:-60%;left:-30%;width:80%;height:220%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.25),transparent);transform:rotate(18deg);animation:gc-shine 4s ease-in-out infinite}
@keyframes gc-shine{0%,60%{transform:translateX(-60%) rotate(18deg)}100%{transform:translateX(320%) rotate(18deg)}}

.gc-top{display:flex;align-items:center;justify-content:space-between;position:relative}
.gc-brand{font-size:13px;font-weight:800;letter-spacing:.04em}
.gc-chip{font-size:10px;font-weight:800;letter-spacing:.08em;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);border-radius:6px;padding:3px 8px}
.gc-amount{font-size:46px;font-weight:800;margin:16px 0 4px;position:relative;line-height:1}
.gc-bal{font-size:22px;font-weight:700;opacity:.8}
.gc-to{font-size:12px;opacity:.85;position:relative;margin-bottom:20px}

.gc-code-row{display:flex;align-items:center;gap:8px;background:rgba(15,23,42,.25);border:1px dashed rgba(255,255,255,.35);border-radius:12px;padding:6px 6px 6px 14px;position:relative}
.gc-code{flex:1;font-family:ui-monospace,monospace;font-size:15px;font-weight:700;letter-spacing:.12em;color:#fff}
.gc-code.revealed{animation:gc-flip .35s ease}
@keyframes gc-flip{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.gc-btn{background:#fff;color:#4f46e5;border:none;border-radius:9px;padding:9px 14px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background .15s,transform .1s}
.gc-btn:hover{background:#f1f5f9}
.gc-btn:active{transform:scale(.95)}
.gc-btn.done{background:#dcfce7;color:#16a34a}

.gc-foot{display:flex;justify-content:space-between;font-size:11px;opacity:.85;margin-top:14px;position:relative}
.gc-bal-tag{font-weight:700}
.gc-note{font-size:12px;color:#64748b;margin-top:16px}`,

  js: `var CODE = 'FWDT-9X4K-7Q2M';
var revealed = false;
var copyTimer;

function revealOrCopy() {
  var codeEl = document.getElementById('gcCode');
  var btn = document.getElementById('gcBtn');

  if (!revealed) {
    revealed = true;
    codeEl.textContent = CODE;
    codeEl.classList.remove('revealed');
    void codeEl.offsetWidth;
    codeEl.classList.add('revealed');
    btn.textContent = 'Copy code';
    return;
  }

  var done = function () {
    btn.textContent = 'Copied ✓';
    btn.classList.add('done');
    clearTimeout(copyTimer);
    copyTimer = setTimeout(function () { btn.textContent = 'Copy code'; btn.classList.remove('done'); }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(CODE).then(done).catch(done);
  } else { done(); }
}`,

  seo: {
    title: 'Gift Card Voucher — Reveal & Copy HTML CSS JS Snippet',
    description: `Gradient gift card voucher with an animated shine, a masked code that reveals then copies, amount, balance & expiry. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Gift Card Voucher — Animated Shine, Masked Code Reveal & Copy-With-Feedback`,
      description: `A digital gift card or voucher needs to feel valuable and be effortless to redeem. That means a premium card visual, a code that stays hidden until the recipient chooses to reveal it, and one-tap copying. This snippet implements exactly that in plain HTML, CSS, and vanilla JavaScript: a gradient voucher with an animated shine sweep, a masked code that reveals on click and then copies with confirmation, plus amount, balance, recipient, and expiry details.

**A voucher that looks the part**

The card uses a multi-stop gradient and a soft coloured shadow to read as a premium, physical-feeling gift card. A \`.gc-shine\` element sweeps a diagonal highlight across it on a loop — the light-glint effect that makes gift cards and credit cards feel tactile and special. The animation uses only \`transform\` (a translating, rotated gradient strip), so it runs on the compositor and exports cleanly. Brand mark, "GIFT CARD" chip, a large amount, and a to/from line complete the front.

**Masked code with reveal-then-copy**

The redemption code starts masked (\`FWDT-••••-••••\`) so a shared screenshot or an over-the-shoulder glance never exposes it. A single button drives a two-step flow handled by \`revealOrCopy\`: the first click reveals the real code (with a small flip-in animation) and changes the button to "Copy code"; the second click copies it to the clipboard and confirms with "Copied ✓" in green for 1.6 seconds before resetting. This reveal-first pattern is both a privacy nicety and a deliberate two-tap interaction that prevents accidental copies of a hidden value.

**Robust clipboard copy**

\`revealOrCopy\` uses the modern \`navigator.clipboard.writeText\` API and falls back gracefully (the confirmation still fires) if it is unavailable, so the button always gives feedback. The code is stored once in a \`CODE\` constant and revealed/copied from there — a single source of truth.

**Redemption details**

The footer shows an expiry date and the current balance, and a note clarifies how to redeem ("applies to your next order"). These details are what turn a pretty card into a usable voucher: the amount tells the recipient what it is worth, the balance handles partial redemptions, and the expiry sets expectations so the card does not quietly lapse.

**Built to drop into a real flow**

Because the whole card is plain markup with one \`CODE\` constant and CSS-driven visuals, it slots into an email template, an account "my gift cards" page, or a post-purchase confirmation with minimal work — and the reveal/copy logic is the only JavaScript, so it stays light and dependency-free.

Swap the amount, code, names, and expiry for real values (rendered server-side per gift card) and it is production-ready. Pair this with an [order summary](/ui-snippets/order-summary/) where the code applies, a [scratch card reveal](/ui-snippets/scratch-card-reveal/) for a playful unlock, or a [confetti celebration card](/ui-snippets/confetti-celebration-card/) for the gifting moment.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A gradient $50 gift card appears with an animated shine sweep, a to/from line, a masked code, and a "Reveal code" button.` },
      { title: 'Reveal the code', text: `Click "Reveal code" — the masked dots flip to the real code and the button changes to "Copy code".` },
      { title: 'Copy it', text: `Click "Copy code" — the code is copied to the clipboard and the button confirms "Copied ✓" in green.` },
      { title: 'Watch the shine', text: `A diagonal light glint sweeps across the card on a loop, giving it a premium, physical feel.` },
      { title: 'Read the details', text: `The footer shows the expiry and balance, with a note on how to redeem.` },
      { title: 'Plug in real values', text: `Set the \`CODE\` constant, amount, names, and expiry from your gift-card data (rendered per recipient).` },
    ] },
    features: [
      { title: 'Premium card visual', text: `A multi-stop gradient with a soft coloured shadow, brand mark, chip, and large amount make it read as a real gift card.` },
      { title: 'Animated shine sweep', text: `A \`.gc-shine\` strip translates across the card on a loop using only \`transform\`, so the glint is smooth and export-safe.` },
      { title: 'Masked code by default', text: `The code shows as \`FWDT-••••-••••\` so screenshots or onlookers never see it until the recipient reveals it.` },
      { title: 'Two-step reveal then copy', text: `\`revealOrCopy\` reveals on the first click (with a flip-in) and copies on the second — preventing accidental copies of a hidden value.` },
      { title: 'Clipboard with fallback', text: `Uses \`navigator.clipboard.writeText\` and still confirms if it is unavailable, so the button always gives feedback.` },
      { title: 'Copied confirmation', text: `The button switches to "Copied ✓" in green for 1.6s, then resets — clear feedback the code is on the clipboard.` },
      { title: 'Redemption details', text: `Amount, balance, recipient, expiry, and a redeem note turn the visual into a usable voucher.` },
      { title: 'Single source of truth', text: `The code lives in one \`CODE\` constant that the reveal and copy both read — easy to populate from real data.` },
    ],
    useCases: [
      { title: 'E-commerce gift cards', text: `Digital gift cards delivered by email or account. Apply the revealed code in an [order summary](/ui-snippets/order-summary/) at checkout.` },
      { title: 'Discount and promo vouchers', text: `Single-use coupon codes presented as a branded voucher; pair with a [sticky promo bar](/ui-snippets/sticky-promo-bar/) to surface offers.` },
      { title: 'Loyalty and reward redemptions', text: `Redeemable reward codes from a [loyalty points widget](/ui-snippets/loyalty-points-widget/) or referral program.` },
      { title: 'Event tickets and passes', text: `Access codes or passes shown on a premium card with reveal-to-view privacy.` },
      { title: 'Prize and giveaway reveals', text: `Pair with a [scratch card reveal](/ui-snippets/scratch-card-reveal/) or [confetti celebration card](/ui-snippets/confetti-celebration-card/) for a fun unlock moment.` },
      { title: 'Account credit and top-ups', text: `Show applied credit with a balance and code for wallets and subscription credits.` },
      { icon: 'CODE', title: 'Related: Parallax Tilt Card', desc: 'See the [Parallax Tilt Card](/ui-snippets/parallax-tilt-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I populate real gift-card data?', a: `Render the amount, recipient/sender names, expiry, balance, and the \`CODE\` constant from your gift-card record (server-side, per recipient). Never hard-code real codes in shipped client source for production cards — fetch the code only for the authenticated owner, ideally revealing it via an authorised request rather than embedding it in the page.` },
      { q: 'Should the code really be hidden until revealed?', a: `Yes — masking the code until the user taps reveal protects it from shoulder-surfing and from being captured in screenshots shared for the card's design, and it makes the copy action deliberate. For sensitive codes, go further: fetch the code from the server only on the reveal click, so it is never present in the page source at all.` },
      { q: 'How do I apply the code at checkout automatically?', a: `Append the code to the redeem flow: a "Redeem now" button can navigate to checkout with \`?gift=CODE\` or call your apply-credit API directly. Validate and apply gift cards server-side (check balance, expiry, single-use), and reflect the new balance back on the card so partial redemptions show the remaining amount.` },
      { q: 'Is the gift card accessible?', a: `Make the reveal/copy a real \`<button>\` (it is) so it is keyboard-operable, and announce the reveal and copy via an \`aria-live="polite"\` region. Ensure the code, when revealed, is selectable text and has sufficient contrast on the gradient; the masked state should have an \`aria-label\` like "code hidden, activate to reveal" so screen-reader users understand the control.` },
      { q: 'How do I use this gift card in React, Vue, or Angular?', a: `In React, hold \`revealed\` in \`useState\` and the code/amount as props; the button toggles reveal then copies, with a \`setTimeout\` for the "Copied" flag. In Vue, use a \`ref\` for \`revealed\` and a method for the two-step action. In Angular, track \`revealed\` on the component. The shine keyframe and card CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the two-click state machine by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how revealOrCopy uses a single revealed boolean to decide whether a click should unmask the code or copy it to the clipboard, and why the shine sweep only animates the transform property rather than any layout-affecting property. The same assistant can help optimize it — ask whether hardcoding the real redemption code directly in client-side JavaScript is ever appropriate for a production gift card, and what a server-authorized reveal-on-demand flow would need to look like instead. It's also useful for extending the card: ask it to add a QR code rendering of the redemption link next to the masked code, an expiring countdown badge when the card is close to its expiry date, or a share button that generates a pre-filled message for gifting the card to someone else. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a digital gift card voucher in plain HTML, CSS, and JavaScript with a masked, reveal-then-copy redemption code — no library.

Requirements:
- A card with a multi-stop gradient background and a soft colored box-shadow, containing a brand mark, a "gift card" label chip, a large prominently-displayed dollar amount, and a to/from recipient line.
- A diagonal light-glint "shine" element that sweeps across the card on a continuous loop using only a CSS transform-based keyframe animation (translating a rotated gradient strip), so the effect stays smooth and never triggers layout recalculation.
- The redemption code must be masked by default (showing a partial pattern like a prefix followed by dot placeholders, not the real code), stored once in a single constant that both the reveal and copy logic read from — never duplicated anywhere else in the code.
- A single button must drive a two-step interaction: the first click reveals the real code in place (with a brief animated transition as it appears) and changes the button's label to indicate the next action is now to copy; the second click copies the revealed code to the clipboard and shows a temporary success confirmation before reverting the button label after a couple of seconds.
- Use the modern clipboard API for the copy step, but ensure the button still shows its success confirmation even in a fallback path if that API is unavailable, so the interaction never silently fails to give feedback.
- A footer section showing an expiry date and the current remaining balance, plus a short note explaining how and where the card can be redeemed.
- Explain why, in a real production version of this card, the actual redemption code should never be embedded directly in the page's client-side source and should instead be fetched from an authorized endpoint only at the moment the user clicks reveal.`,
    },
  },
};

export default giftCard;
