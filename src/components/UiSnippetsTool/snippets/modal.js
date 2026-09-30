const modal = {
    id: 'modal',
    title: 'Modal / Dialog',
    category: 'modals',
    html: `<div class="demo">
  <button class="btn" onclick="openModal()">Open modal</button>
</div>
<div class="overlay" id="overlay" onclick="closeModal()"></div>
<div class="modal" id="modal">
  <button class="close" onclick="closeModal()">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
  <div class="modal-icon">🗑️</div>
  <h3>Delete project?</h3>
  <p>This will permanently delete <strong>My Project</strong> and all associated data. This action cannot be undone.</p>
  <div class="modal-actions">
    <button class="btn-cancel" onclick="closeModal()">Cancel</button>
    <button class="btn-confirm">Delete project</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.demo { display: flex; align-items: center; justify-content: center; }
.btn { padding: 10px 22px; background: #6366f1; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
.btn:hover { background: #4f46e5; }

.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); opacity: 0; pointer-events: none; transition: opacity 0.2s; z-index: 10; }
.overlay.show { opacity: 1; pointer-events: all; }

.modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -48%) scale(0.95); background: #fff; border-radius: 18px; padding: 32px 28px; width: 340px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); opacity: 0; pointer-events: none; transition: opacity 0.2s, transform 0.2s; z-index: 20; text-align: center; }
.modal.show { opacity: 1; pointer-events: all; transform: translate(-50%, -50%) scale(1); }

.close { position: absolute; top: 14px; right: 14px; background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px; border-radius: 6px; }
.close:hover { background: #f1f5f9; color: #1e293b; }
.modal-icon { font-size: 36px; margin-bottom: 14px; }
h3 { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 10px; }
p  { font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
p strong { color: #1e293b; }
.modal-actions { display: flex; gap: 10px; }
.btn-cancel  { flex: 1; padding: 10px; background: #f1f5f9; color: #475569; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
.btn-cancel:hover { background: #e2e8f0; }
.btn-confirm { flex: 1; padding: 10px; background: #dc2626; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
.btn-confirm:hover { background: #b91c1c; }`,
    js: `function openModal()  { document.getElementById('modal').classList.add('show'); document.getElementById('overlay').classList.add('show'); }
function closeModal() { document.getElementById('modal').classList.remove('show'); document.getElementById('overlay').classList.remove('show'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });`,

  seo: {
    title: 'Modal Dialog — Free HTML CSS JS Popup Snippet',
    description: 'Modal with blurred backdrop, scale-in animation, ESC and click-outside close — a complete dialog pattern. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Modal Dialog — Backdrop Blur Overlay, Scale Entry & Three Close Mechanisms',
      description: `A modal dialog temporarily blocks the rest of the page while the user handles a critical action — a delete confirmation, a form submission, an authentication prompt, or an upgrade gate. The design communicates urgency through the overlay and forces focus through the blurred background. This snippet implements a production-quality modal with three ways to close it and a polished entry animation.

**The backdrop blur overlay**

\`.overlay\` uses \`background: rgba(0,0,0,0.4)\` with \`backdrop-filter: blur(2px)\`. The rgba provides a semi-transparent dark dim. The backdrop-filter blurs everything rendered behind the overlay. The overlay starts at \`opacity: 0; pointer-events: none\`. Adding \`.show\` transitions to \`opacity: 1\` and restores pointer events. The modal sits on top of the overlay via \`z-index\` layering.

**The scale entry animation**

The modal starts at \`transform: translate(-50%, -48%) scale(0.95)\` — centred using the \`left: 50%; top: 50%\` absolute positioning trick, but scaled down 5% and shifted 2% upward. Adding \`.show\` transitions to \`translate(-50%, -50%) scale(1)\`. The 5% scale-up and 2px upward movement make the modal appear to emerge from just above centre — a subtle but polished entrance.

**Three close mechanisms**

\`openModal()\` adds \`.show\` to both the modal and overlay. \`closeModal()\` removes it. Three triggers call \`closeModal()\`: the Cancel button, the × close button in the top-right corner, and a \`document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); })\` listener. The overlay div has \`onclick="closeModal()"\` so clicking the dim background also closes.

**Preventing scroll under the modal**

Add \`document.body.style.overflow = 'hidden'\` in \`openModal()\` and \`document.body.style.overflow = ''\` in \`closeModal()\`. This prevents the page from scrolling while the modal is open.

**Adding accessibility attributes**

Add \`role="dialog"\`, \`aria-modal="true"\`, and \`aria-labelledby="modal-title"\` to the modal div. Give the h3 \`id="modal-title"\`. Move focus to the first interactive element (the cancel button) when the modal opens.

**The three close mechanisms**

Production modals need three independent close paths: (1) An explicit × close button in the modal header — covers users who do not know keyboard shortcuts. (2) Click-outside detection on the backdrop — the most natural close gesture on desktop. (3) ESC keydown on document — the universal keyboard escape for any overlay. Implementing all three reduces friction and matches expected behaviour across user profiles. Removing any one of them frustrates a segment of users.

**The backdrop blur**

backdrop-filter: blur(8px) on the overlay creates the frosted glass effect behind the modal. This requires the overlay to have a partially transparent background (rgba) — a fully opaque overlay has no content behind it to blur. The blur property is GPU-composited and does not trigger layout recalculation.

**The entry animation**

The modal dialog uses transform: scale(0.95) + opacity: 0 as the initial state, transitioning to scale(1) + opacity: 1 on open. This scale-up-from-slightly-small animation is the standard modal entry across macOS apps, iOS, and most web design systems. It communicates "appearing" more naturally than a slide-in from an edge.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open and close the modal', text: 'Click "Open modal" to see the blur overlay and scale entry animation. Close via Cancel, the × button, the overlay, or ESC key.' },
        { title: 'Update the modal content', text: 'In the HTML panel, change the icon, h3 title, and p description to your specific action. Keep the action-confirm pattern for destructive actions.' },
        { title: 'Change the confirm button colour', text: 'Update background: #dc2626 on .btn-confirm to match your action type — red for delete, blue for save, green for confirm.' },
        { title: 'Add a form inside', text: 'Replace the paragraph and button row with a form element containing inputs. The 340px max-width accommodates compact forms with 2-3 fields.' },
        { title: 'Prevent scroll', text: 'In the JS panel, add document.body.style.overflow = "hidden" in openModal() and document.body.style.overflow = "" in closeModal().' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'backdrop-filter: blur(2px) + rgba(0,0,0,0.4) overlay — blurs and dims the page',
      'Scale entry: transform from scale(0.95) + -48% Y to scale(1) + -50% Y',
      'opacity + pointer-events transition on .overlay.show',
      'Click-outside close: overlay onclick="closeModal()"',
      'ESC key close: document keydown listener checks e.key === "Escape"',
      'Close × button + Cancel button + confirm action button',
      'pointer-events: none when closed — invisible modal cannot intercept clicks',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'DEL',    title: 'Delete and destructive action confirmations', desc: 'Interrupt irreversible actions with a confirmation modal — see the focused [confirm dialog](/ui-snippets/confirm-dialog/) variant. The red confirm button signals danger and forces a conscious decision before permanent data loss.' },
      { icon: 'FORM',   title: 'In-context add and edit forms',               desc: 'Show a compact form modal for adding items or editing records without navigating away from the current page.' },
      { icon: 'SAFE',   title: 'Authentication and login prompts',             desc: 'Gate access to features behind an [auth login card](/ui-snippets/auth-login-card/) in a modal rather than a full-page redirect. Users stay in context while authenticating.' },
      { icon: 'APP',    title: 'Upgrade and paywall gates',                    desc: 'Show subscription tier options or an [upgrade banner](/ui-snippets/upgrade-banner/) when a user attempts to access a paid feature. The modal forces engagement with the upgrade decision.' },
      { icon: 'LEARN',  title: 'Learn scale animation and overlay patterns',   desc: 'Edit the scale(0.95) and translate offset values in the CSS panel to understand how the entry animation creates the emerge-from-above effect.' },
      { icon: 'FLOW',   title: 'Wizard and multi-step flow prompts',           desc: 'Use the modal for intermediate decisions within a workflow — confirming settings before a long operation or showing a preview before publishing.' },
      { icon: 'CODE', title: 'Related: Session Timeout Warning Modal', desc: 'See the [Session Timeout Warning Modal](/ui-snippets/session-timeout-modal/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does backdrop-filter blur work on the overlay?', a: 'backdrop-filter: blur(2px) blurs everything rendered behind the overlay element. The overlay must have a semi-transparent background (rgba) — a fully opaque background would cover the content before the blur can show. The blur effect requires a transparent path to the content below.' },
      { q: 'How does the scale entry animation work?', a: 'The modal uses position: fixed; left: 50%; top: 50%. The initial transform is translate(-50%, -48%) scale(0.95) — centred but scaled down and shifted 2% up. Adding .show transitions to translate(-50%, -50%) scale(1). The scale change creates the grow effect; the Y shift makes it appear to rise into position.' },
      { q: 'How do I prevent the page from scrolling when the modal is open?', a: 'In openModal(), add document.body.style.overflow = "hidden". In closeModal(), restore it: document.body.style.overflow = "". This blocks scroll events on the body while the modal is visible.' },
      { q: 'How do I make the modal accessible?', a: 'Add role="dialog" aria-modal="true" aria-labelledby="modal-title" to the modal div. Give the h3 id="modal-title". In openModal(), move focus to the first interactive element: document.querySelector(".btn-cancel").focus(). This ensures screen readers announce the modal and keyboard users can navigate it.' },
      { q: 'Can I have multiple independent modals?', a: 'Yes. Give each modal div a unique id. Create separate open/close functions for each, or modify openModal() to accept an id parameter: function openModal(id) { document.getElementById(id).classList.add("show"); }.' },
      { q: 'Can I use this modal in React?', a: 'Yes. Click "JSX" to download a React component. In React, replace the JS open/close functions with useState: const [isOpen, setIsOpen] = useState(false). Render the modal and overlay conditionally based on isOpen. The CSS animations work unchanged.' },
    ],
    aiPrompt: {
      paragraph: `Instead of working out the layering by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the overlay needs a partially transparent rgba background for its backdrop-filter: blur to have anything to blur, or why the modal's initial transform is translate(-50%, -48%) scale(0.95) rather than a plain scale(0.95). The same assistant can help optimize it, for instance checking whether toggling opacity and pointer-events with a class is enough to keep the hidden modal from being focusable by assistive tech, or whether the escape-key listener should be removed when the modal closes so it doesn't leak onto other overlays on the page. It's just as useful for extending the pattern: ask it to add a focus trap that cycles Tab between the modal's interactive elements, animate multiple stacked modals, or convert openModal/closeModal into a small reusable dialog controller. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a confirmation "modal dialog" in plain HTML, CSS, and JavaScript using only class toggling and CSS transitions — no animation library, no dialog element.

Requirements:
- A backdrop overlay fixed over the whole viewport with a semi-transparent dark background and a backdrop-filter blur, starting at opacity 0 with pointer-events disabled, and transitioning to opacity 1 with pointer-events enabled when a "show" class is added.
- A centered modal panel positioned with left/top 50% and a translate offset, whose closed state is offset slightly further up than its open state (for example -48% versus -50% on the Y axis) combined with a smaller scale (around 0.95 versus 1), so that opening it plays as a gentle scale-and-rise-into-place rather than a flat fade.
- Exactly three independent ways to close the modal, all calling the same close function: an explicit close (x) button inside the modal, clicking anywhere on the backdrop outside the modal panel, and pressing the Escape key while the modal is open (via a document-level keydown listener).
- A Cancel button and a destructive Confirm button styled distinctly (e.g. neutral gray versus red) inside the modal footer.
- The modal and backdrop must both use pointer-events: none while hidden so that an invisible, off-screen-opacity modal never intercepts clicks meant for the page behind it.
- Confirm and explain in code comments that when the modal opens, page scroll should be locked (body overflow hidden) and restored when it closes.`,
    },
  },
};

export default modal;
