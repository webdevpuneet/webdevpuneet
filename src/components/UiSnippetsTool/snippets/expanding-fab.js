const expandingFab = {
  id: 'expanding-fab',
  title: 'Expanding FAB',
  category: 'buttons',
  html: `<div class="page">
  <div class="page-content">
    <p>Click the + button in the bottom-right to expand the action menu.</p>
  </div>

  <!-- Backdrop (outside fab-wrap so it never covers the action buttons) -->
  <div class="fab-backdrop" id="fab-backdrop" onclick="closeFab()"></div>

  <div class="fab-wrap" id="fab-wrap">
    <!-- Sub-actions (hidden by default) -->
    <div class="fab-actions" id="fab-actions">
      <div class="fab-action-item" style="--i:3">
        <span class="fab-tooltip">New document</span>
        <button class="fab-sub" onclick="fabAction('document')" aria-label="New document" style="background:#6366f1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </button>
      </div>
      <div class="fab-action-item" style="--i:2">
        <span class="fab-tooltip">Upload file</span>
        <button class="fab-sub" onclick="fabAction('upload')" aria-label="Upload file" style="background:#0ea5e9">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </button>
      </div>
      <div class="fab-action-item" style="--i:1">
        <span class="fab-tooltip">Take photo</span>
        <button class="fab-sub" onclick="fabAction('photo')" aria-label="Take photo" style="background:#10b981">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        </button>
      </div>
    </div>

    <!-- Main FAB -->
    <button class="fab-main" id="fab-main" onclick="toggleFab()" aria-expanded="false" aria-label="Open actions">
      <svg class="fab-icon" id="fab-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>
  </div>

  <div class="fab-toast" id="fab-toast"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; overflow: hidden; }

.page { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; }
.page-content { font-size: 14px; color: #94a3b8; text-align: center; max-width: 200px; }

/* FAB container */
.fab-wrap { position: fixed; bottom: 28px; right: 28px; display: flex; flex-direction: column-reverse; align-items: flex-end; gap: 12px; z-index: 50; }

/* Main FAB */
.fab-main { width: 56px; height: 56px; border-radius: 50%; background: #6366f1; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 24px rgba(99,102,241,0.4); transition: background 0.15s, box-shadow 0.15s, transform 0.15s; position: relative; z-index: 2; }
.fab-main:hover { background: #4f46e5; transform: scale(1.05); }
.fab-main.open { background: #374151; box-shadow: 0 6px 24px rgba(0,0,0,0.25); }

.fab-icon { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
.fab-main.open .fab-icon { transform: rotate(45deg); }

/* Sub-actions */
.fab-actions { display: flex; flex-direction: column-reverse; gap: 10px; align-items: flex-end; }

.fab-action-item { display: flex; align-items: center; gap: 10px; opacity: 0; transform: translateY(16px) scale(0.9); pointer-events: none; transition: opacity 0.2s, transform 0.2s; transition-delay: 0s; }
.fab-actions.open .fab-action-item { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; transition-delay: calc((var(--i) - 1) * 0.05s); }

.fab-sub { width: 44px; height: 44px; border-radius: 50%; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.2); transition: transform 0.15s, box-shadow 0.15s; }
.fab-sub:hover { transform: scale(1.12); box-shadow: 0 6px 20px rgba(0,0,0,0.25); }

.fab-tooltip { background: #1e293b; color: #f1f5f9; font-size: 12px; font-weight: 600; padding: 5px 10px; border-radius: 7px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

/* Backdrop */
.fab-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0); pointer-events: none; transition: background 0.3s; z-index: 1; }
.fab-backdrop.open { background: rgba(0,0,0,0.2); pointer-events: all; backdrop-filter: blur(2px); }

/* Toast */
.fab-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(80px); background: #1e293b; color: #fff; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; box-shadow: 0 4px 20px rgba(0,0,0,0.2); transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s; opacity: 0; pointer-events: none; z-index: 100; white-space: nowrap; }
.fab-toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }`,
  js: `let isOpen = false;

function toggleFab() {
  isOpen ? closeFab() : openFab();
}

function openFab() {
  isOpen = true;
  document.getElementById('fab-main').classList.add('open');
  document.getElementById('fab-actions').classList.add('open');
  document.getElementById('fab-backdrop').classList.add('open');
  document.getElementById('fab-main').setAttribute('aria-expanded','true');
}

function closeFab() {
  isOpen = false;
  document.getElementById('fab-main').classList.remove('open');
  document.getElementById('fab-actions').classList.remove('open');
  document.getElementById('fab-backdrop').classList.remove('open');
  document.getElementById('fab-main').setAttribute('aria-expanded','false');
}

function fabAction(action) {
  const msgs = { document: '📄 New document created', upload: '📁 Upload dialog opened', photo: '📷 Camera opened' };
  closeFab();
  showToast(msgs[action] || 'Action triggered');
}

function showToast(msg) {
  const toast = document.getElementById('fab-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeFab(); });`,
  seo: {
    title: 'Expanding FAB — Free HTML CSS JS Snippet',
    description: 'Floating action button expanding into staggered sub-actions with tooltips and blur backdrop. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Expanding FAB — Staggered Sub-Actions, Tooltip Labels, Rotate Icon & Blur Backdrop',
      description: `A Floating Action Button (FAB) is the primary action button pattern in Material Design and most mobile-first web interfaces. The expanding FAB variant reveals multiple sub-actions when clicked — each secondary button slides up with a staggered delay, revealing contextual options without cluttering the main UI. For a radial-arc layout instead of a vertical stack, see the [floating action button](/ui-snippets/floating-action-btn/). This snippet provides a complete expanding FAB: a main button with a + icon that rotates to × on open, three sub-action buttons with staggered slide-up animations, tooltip labels, a blurred backdrop, and Escape key close.\n\n**The staggered animation**\n\nEach .fab-action-item has a CSS custom property --i (1, 2, or 3). In the .open state, transition-delay: calc((var(--i) - 1) × 0.05s) creates a staggered entrance: item 1 at 0ms, item 2 at 50ms, item 3 at 100ms. The transform goes from translateY(16px) scale(0.9) to translateY(0) scale(1). For the close animation, the delays reverse because transition-delay applies to the exit state too — the topmost item (--i: 3) closes first.\n\n**The + to × icon rotation**\n\nThe main FAB icon uses transform: rotate(45deg) when .open is applied. The + character rotated 45° becomes a × shape — no icon swap needed. The cubic-bezier(0.34, 1.56, 0.64, 1) spring curve gives the rotation an overshoot bounce.\n\n**The blurred backdrop**\n\nWhen the FAB opens, a fixed-position backdrop covers the page. It fades from transparent to rgba(0,0,0,0.2) and applies backdrop-filter: blur(2px) — a subtle blur that visually separates the open FAB from the page content. Clicking the backdrop calls closeFab(). The pointer-events toggle prevents the backdrop from intercepting clicks when closed.\n\n**Sub-action tooltips**\n\nEach sub-action has a [tooltip](/ui-snippets/css-tooltip/) span that appears to the left of the button. The tooltips show on initial render but become visible only when the action item is visible (opacity: 1 in the open state). No JavaScript hover logic needed — the tooltip opacity is driven by the parent item's opacity.\n\n**Accessibility**\n\nThe main FAB button has aria-expanded toggling with open state and aria-label="Open actions". Each sub-action button has aria-label describing its action. ESC key closes the FAB via document keydown listener.

**Positioning and safe area handling**

The FAB uses position: fixed; bottom: 28px; right: 28px. On iOS Safari, the home indicator area can overlap the FAB. Use CSS environment variables: bottom: calc(28px + env(safe-area-inset-bottom)) to push the FAB above the safe area. This is important for mobile web apps that users install as PWAs on their home screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click the + FAB button to expand sub-actions', text: 'Three sub-action buttons slide up with staggered timing. The + icon rotates to ×. A blurred backdrop appears. Click any sub-action to trigger its action, or click the × or backdrop to close.' },
      { title: 'Update the sub-action icons and colours', text: 'Edit each .fab-sub button\'s inline style="background:#colour" and swap the inner SVG icon paths. Each sub-action gets its own colour — use brand colours or semantic colours (blue for upload, green for photo, etc.).' },
      { title: 'Update the tooltip labels', text: 'Edit the .fab-tooltip span text inside each .fab-action-item div. Keep labels short (1-3 words) so they fit next to the button without wrapping.' },
      { title: 'Add more sub-action buttons', text: 'Duplicate a .fab-action-item div, increment its --i value, update the button colour, icon, aria-label, and tooltip. Add the new action to the fabAction() switch statement.' },
      { title: 'Change the FAB position', text: 'Update bottom and right on .fab-wrap to reposition. For top-right, change flex-direction to column (not column-reverse) so actions expand downward. For left-side FAB, set left: 28px and remove right.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState for open state, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Staggered sub-action entrance: CSS --i custom property × 0.05s delay per item','Transform: translateY(16px) scale(0.9) → 0 scale(1) slide-up entrance','+ rotates to × at 45deg: single icon, cubic-bezier spring curve','Blurred backdrop: backdrop-filter:blur(2px) + rgba(0,0,0,0.2) on open','Tooltip labels: .fab-tooltip shows left of each sub-action button','Sub-action colours: each button has independent background colour','Escape key close: document keydown listener','Toast feedback: slide-up confirmation for each triggered action'],
    useCases: [
      { icon: 'MOBILE', title: 'Mobile web app primary action button', desc: 'The FAB is the standard mobile action pattern from Material Design — used in Google Drive, Gmail, and every Android app. Place it fixed bottom-right for the primary action users take most frequently in your app.' },
      { icon: 'APP', title: 'Dashboard create and compose actions', desc: 'Use an expanding FAB in admin dashboards for create operations: new document, new task, invite user, upload file. Groups multiple "create" actions that would otherwise require separate toolbar buttons or a dropdown.' },
      { icon: 'DESIGN', title: 'Content management and media library interfaces', desc: 'CMS interfaces need quick access to create page, upload image, add widget, or record video. The FAB pattern groups these creation actions without taking space in the toolbar or content area.' },
      { icon: 'CODE', title: 'Chat and messaging app compose actions', desc: 'Messaging apps use expanding FABs for attach options: photo, file, location, contact. The backdrop dims the conversation thread while the user picks an attachment type. Close on Escape or backdrop click matches the expected mobile pattern.' },
      { icon: 'LEARN', title: 'Study CSS custom property stagger and backdrop-filter', desc: 'The --i custom property technique for staggered animation delays demonstrates how CSS variables drive timing without JavaScript. The backdrop-filter: blur() pattern shows how to apply frosted glass blur behind a specific element rather than an entire overlay.' },
      { icon: 'STAR', title: 'Social features and reaction picker buttons', desc: 'Adapt the FAB as a social reaction picker (see the [emoji reaction bar](/ui-snippets/emoji-reaction-bar/)): main button shows a ❤ heart, sub-actions reveal 👍 👎 😂 😮 emojis. The tooltip shows the reaction name. Each sub-action fires a reaction API call on click.' },
      { icon: 'CODE', title: 'Related: Load More Button', desc: 'See the [Load More Button](/ui-snippets/load-more-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the staggered animation work using CSS custom properties?', a: 'Each .fab-action-item has a style="--i:N" attribute where N is 1, 2, or 3. In CSS: .fab-actions.open .fab-action-item { transition-delay: calc((var(--i) - 1) * 0.05s); }. This gives item 1 a 0ms delay, item 2 a 50ms delay, and item 3 a 100ms delay. The items reveal from bottom to top (--i: 1 is nearest the FAB). For the close animation, remove the transition-delay rule from the .open state so all items close at the same speed.' },
      { q: 'How do I add a FAB with a label text instead of just an icon?', a: 'Change .fab-main from a circle (border-radius: 50%; width/height: 56px) to a pill shape: border-radius: 28px; padding: 0 20px; width: auto; height: 56px. Add a text span inside: <button class="fab-main">+ <span>Create</span></button>. When open, the text can change to "Close" or disappear (display: none on .open) to make room for the × icon. Adjust the box-shadow accordingly.' },
      { q: 'How do I prevent the FAB from blocking page content on mobile?', a: 'Add padding-bottom: 100px to the main page content container so content does not hide behind the FAB at the bottom of scroll. Alternatively, make the FAB scrollable with the page instead of fixed: change position: fixed to position: sticky with appropriate margin. For critical content directly above the FAB, add bottom: 100px to that element.' },
      { q: 'How do I use the expanding FAB in React?', a: 'Click "JSX" to download. Manage isOpen with useState(false). Pass isOpen to the main button, actions container, and backdrop via className. For sub-actions, use a CSS Module or Tailwind class that applies the transition-delay based on index: className={isOpen ? "fab-action-item open" : "fab-action-item"} with inline style={{ transitionDelay: isOpen ? index * 0.05 + "s" : "0s" }}.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stagger math in your head. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the --i custom property combines with the calc-based transition-delay to produce the bottom-to-top staggered reveal, and why that same delay formula also affects the closing animation's order. The same assistant can help optimize it — ask whether the backdrop's backdrop-filter blur could hurt performance on lower-end mobile devices and what a graceful fallback would look like, and whether the fixed 44px sub-action buttons are large enough to meet touch target size guidelines. It's also useful for extending the FAB: ask it to support a dynamic number of sub-actions generated from a data array instead of hardcoded markup, add a long-press gesture that opens the menu on mobile, or make the whole thing keyboard-navigable with arrow keys between the sub-actions once open. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an expanding floating action button (FAB) in plain HTML, CSS, and JavaScript using CSS custom properties for staggered timing — no library.

Requirements:
- A circular main button fixed to a corner of the viewport, containing a plus-shaped icon built from two crossed line elements (not a font icon or image), that rotates 45 degrees via CSS transform when an "open" state class is applied so the plus visually becomes an X without swapping any markup.
- Several circular sub-action buttons stacked above the main button in a column, each carrying a numeric CSS custom property representing its order in the stack.
- Sub-action buttons must be hidden by default via zero opacity, a downward-and-shrunk transform, and pointer-events none; when the container's "open" class is applied, each button must animate to full opacity, its natural transform, and pointer-events enabled, with a transition-delay computed from its custom property so the buttons reveal in a staggered bottom-to-top sequence rather than all at once.
- Each sub-action button must have its own tooltip label element that appears alongside it, an aria-label describing its specific action, and its own distinct background color.
- A backdrop element separate from the button stack must fade in behind everything when the FAB opens, using backdrop-filter blur plus a semi-transparent dark background, and must be clickable to close the FAB; it must not intercept clicks at all while closed.
- Clicking a sub-action button must close the FAB and show a temporary toast notification confirming which action was triggered.
- Pressing Escape while the FAB is open must close it, and the main button must expose its expanded/collapsed state via aria-expanded.`,
    },
  },
};

export default expandingFab;
