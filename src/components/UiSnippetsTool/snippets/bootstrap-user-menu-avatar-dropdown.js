const bootstrapUserMenuAvatarDropdown = {
  id: 'bootstrap-user-menu-avatar-dropdown',
  title: 'Bootstrap User Menu Dropdown with Theme Switch',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="bsuser-stage" id="bsuserStage">
  <div class="dropdown">
    <button class="btn d-flex align-items-center gap-2 bsuser-trigger" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="bsuser-avatar">DR</span>
      <span class="d-none d-sm-inline small fw-semibold">Dana Reyes</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <ul class="dropdown-menu dropdown-menu-end bsuser-menu">
      <li class="px-3 py-2 border-bottom">
        <div class="small fw-semibold">Dana Reyes</div>
        <div class="small text-muted">dana@fenwick.com</div>
      </li>
      <li><a class="dropdown-item" href="javascript:void(0)">Profile</a></li>
      <li><a class="dropdown-item" href="javascript:void(0)">Billing</a></li>
      <li><a class="dropdown-item" href="javascript:void(0)">Settings</a></li>
      <li>
        <div class="dropdown-item d-flex justify-content-between align-items-center">
          <span>Dark mode</span>
          <div class="form-check form-switch mb-0"><input class="form-check-input" type="checkbox" id="bsuserTheme"></div>
        </div>
      </li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item text-danger" href="javascript:void(0)">Sign out</a></li>
    </ul>
  </div>
</div>`,
  css: `.bsuser-stage { min-height: 100vh; padding: 24px; background: #f6f7f9; transition: background .2s, color .2s; }
.bsuser-stage.bsuser-dark { background: #111827; color: #e5e7eb; }
.bsuser-trigger { border: 1px solid #e5e7eb; background: #fff; }
.bsuser-avatar { width: 26px; height: 26px; border-radius: 50%; background: #111827; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.bsuser-menu { width: 220px; }
.bsuser-menu .form-switch .form-check-input { cursor: pointer; }`,
  js: `const themeToggle = document.getElementById('bsuserTheme');
const stage = document.getElementById('bsuserStage');

// Clicking the switch itself would normally also bubble up and close the
// Bootstrap dropdown (any click inside a dropdown-item closes it by
// default) — stop that specific propagation so toggling doesn't dismiss
// the menu, matching how a settings toggle should behave.
themeToggle.addEventListener('click', e => e.stopPropagation());

themeToggle.addEventListener('change', () => {
  stage.classList.toggle('bsuser-dark', themeToggle.checked);
});`,

  seo: {
    title: 'Bootstrap User Menu Dropdown with Theme Switch — Free Snippet',
    description: 'A real Bootstrap 5.3 avatar dropdown with account links and an inline dark-mode toggle that flips the page theme without closing the menu.',
    about: {
      title: 'Bootstrap User Menu Dropdown with Theme Switch — HTML, CSS & JavaScript',
      description: `An avatar dropdown menu is usually a plain list of links — this one embeds a real, working control inside it: a dark-mode \`form-switch\` toggle that flips a class on the page and changes its colors immediately, without the dropdown closing when you click it. That last detail matters and takes one specific line: Bootstrap's Dropdown closes automatically on any click inside a \`.dropdown-item\`, which is the right default for a navigation link but wrong for an interactive control like a toggle switch. Calling \`e.stopPropagation()\` on the switch's own click event stops that click from bubbling up to whatever triggers the auto-close, while the toggle's separate \`change\` listener still fires normally and applies the theme.\n\nBuilt entirely on **real Bootstrap 5.3** — the Dropdown component for the menu itself, and the real \`form-switch\` component for the toggle — with a user info header, standard account links, and a sign-out action rounding out the menu.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a light page with an avatar button top-right.' },
        { title: 'Open the menu', text: 'Click the avatar — Bootstrap\'s real Dropdown opens showing the user\'s name, email, links, and a dark-mode switch.' },
        { title: 'Click the dark mode switch', text: 'The whole page background and text flip to dark — and the dropdown stays open.' },
        { title: 'Click "Profile" or another link', text: 'A normal dropdown-item click closes the menu as expected, unlike the toggle.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Dropdown and form-switch components, loaded from the actual CDN',
      'Dark-mode toggle inside the menu genuinely changes the page theme, not just decorative',
      'Toggling the switch does not close the dropdown, unlike a normal menu link click',
      'Clicking any other menu item closes the dropdown normally, as expected',
      'User info header (name and email) included above the action links',
      'Responsive — the visible name hides on narrow screens, leaving just the avatar',
    ],
    useCases: [
      { icon: 'CODE',  title: 'SaaS app headers and admin panels', desc: 'The standard avatar-menu pattern for account actions, extended with a genuinely useful inline setting.' },
      { icon: 'LEARN', title: 'Learning to embed interactive controls in a Bootstrap dropdown', desc: 'A concrete example of the stopPropagation() fix needed when a dropdown-item contains its own interactive control.' },
      { icon: 'ACCESS', title: 'Quick-access theme and preference toggles', desc: 'Putting common preferences directly in the user menu saves a trip to a separate settings page for a one-click choice.' },
      { icon: 'DASH',  title: 'Pairing with the Bootstrap Admin Dashboard snippet', desc: 'Drop this menu into the admin dashboard shell\'s top bar avatar for a complete account-menu experience.' },
    ],
    faqs: [
      { q: 'Is this a real Bootstrap dropdown?', a: 'Yes — the avatar button and menu use Bootstrap 5.3\'s actual Dropdown component (data-bs-toggle="dropdown"), and the toggle is Bootstrap\'s real form-switch component, both loaded from the genuine CDN.' },
      { q: 'Why doesn\'t clicking the dark-mode switch close the menu?', a: 'By default, Bootstrap closes a dropdown on any click inside a .dropdown-item. A click listener on the switch itself calls e.stopPropagation(), preventing that click from triggering the auto-close, while its separate change listener still applies the theme normally.' },
      { q: 'Does the dark mode actually change anything, or is it just for show?', a: 'It genuinely toggles a class on the page container that switches the background and text colors via CSS, applied immediately when the switch changes — not a decorative control.' },
      { q: 'Why does clicking "Profile" still close the menu?', a: 'Only the toggle switch has the stopPropagation() fix applied; every other menu item is a normal dropdown-item link, so it keeps Bootstrap\'s default close-on-click behavior, which is the correct behavior for a navigation link.' },
      { q: 'What happens on a narrow screen?', a: 'The visible name text next to the avatar hides below Bootstrap\'s sm breakpoint (d-none d-sm-inline), leaving just the avatar circle as the trigger, saving horizontal space in a mobile header.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to persist the dark-mode choice to localStorage so it's remembered on the next visit, or to add a real user avatar image with a fallback to initials if the image fails to load. It's also a good exercise to ask the assistant to add a language selector as a second interactive control inside the same menu, following the same stopPropagation pattern.`,
      prompt: `Build a Bootstrap 5.3 user account dropdown menu with an inline dark-mode toggle, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- An avatar button (initials-based, no external image required) that opens a real Bootstrap Dropdown menu (data-bs-toggle="dropdown") showing the user's name and email, at least three navigation links (e.g. Profile, Billing, Settings), a sign-out link, and a real Bootstrap form-switch toggle labeled "Dark mode" embedded as one of the menu items.
- Toggling the dark-mode switch must genuinely change the page's visual theme (background and text colors) immediately via a class toggle, and critically must NOT cause the dropdown menu to close — while clicking any of the other menu links must close the dropdown normally, matching Bootstrap's default behavior.
- Solve the close-on-toggle problem using the correct approach: stopping the toggle's own click event from propagating, rather than disabling Bootstrap's dropdown auto-close globally (which would break the normal links).
- The trigger button must be responsive, hiding the visible name text (but keeping the avatar) below a small screen breakpoint.`,
    },
  },
};

export default bootstrapUserMenuAvatarDropdown;
