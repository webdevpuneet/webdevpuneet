const bootstrapSettingsTabsPage = {
  id: 'bootstrap-settings-tabs-page',
  title: 'Bootstrap Settings Page with Tabs',
  lastmod: '2026-09-10',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="row bst-shell mx-auto">
    <div class="col-3">
      <div class="nav flex-column nav-pills" id="bstTabs" role="tablist" aria-orientation="vertical">
        <button class="nav-link active text-start" data-bs-toggle="pill" data-bs-target="#bstProfile" type="button" role="tab">Profile</button>
        <button class="nav-link text-start" data-bs-toggle="pill" data-bs-target="#bstSecurity" type="button" role="tab">Security</button>
        <button class="nav-link text-start" data-bs-toggle="pill" data-bs-target="#bstNotifications" type="button" role="tab">Notifications</button>
        <button class="nav-link text-start" data-bs-toggle="pill" data-bs-target="#bstBilling" type="button" role="tab">Billing</button>
      </div>
    </div>

    <div class="col-9">
      <div class="tab-content card bst-card">
        <div class="card-body p-4">
          <div class="tab-pane fade show active" id="bstProfile" role="tabpanel">
            <h5 class="fw-bold mb-3">Profile</h5>
            <div class="mb-3">
              <label class="form-label small">Display name</label>
              <input type="text" class="form-control" value="Jordan Blake">
            </div>
            <div class="mb-2">
              <label class="form-label small d-flex justify-content-between">
                <span>Bio</span>
                <span class="text-muted" id="bstBioCount">0 / 160</span>
              </label>
              <textarea class="form-control" id="bstBio" rows="3" maxlength="160" placeholder="Tell us about yourself..."></textarea>
            </div>
          </div>

          <div class="tab-pane fade" id="bstSecurity" role="tabpanel">
            <h5 class="fw-bold mb-3">Security</h5>
            <div class="mb-3">
              <label class="form-label small">Current password</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="mb-3">
              <label class="form-label small">New password</label>
              <input type="password" class="form-control" placeholder="New password">
            </div>
            <button class="btn btn-dark btn-sm">Update password</button>
          </div>

          <div class="tab-pane fade" id="bstNotifications" role="tabpanel">
            <h5 class="fw-bold mb-3">Notifications</h5>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" role="switch" id="bstNotifyEmail" checked>
              <label class="form-check-label" for="bstNotifyEmail">Email notifications</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" role="switch" id="bstNotifySms">
              <label class="form-check-label" for="bstNotifySms">SMS alerts</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" role="switch" id="bstNotifyMarketing" checked>
              <label class="form-check-label" for="bstNotifyMarketing">Marketing emails</label>
            </div>
            <p class="small text-muted mb-0" id="bstNotifySummary"></p>
          </div>

          <div class="tab-pane fade" id="bstBilling" role="tabpanel">
            <h5 class="fw-bold mb-3">Billing</h5>
            <p class="text-muted small">Current plan: <strong>Pro — $29/mo</strong></p>
            <button class="btn btn-outline-dark btn-sm">Manage subscription</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bst-shell { max-width: 760px; }
.bst-card { border: 1px solid #eceef1; border-radius: 14px; min-height: 320px; }
#bstTabs .nav-link { color: #495057; border-radius: 8px; margin-bottom: 4px; }
#bstTabs .nav-link.active { background: #212529; color: #fff; }`,
  js: `const bio = document.getElementById('bstBio');
const bioCount = document.getElementById('bstBioCount');
const MAX_BIO = 160;

bio.addEventListener('input', () => {
  bioCount.textContent = bio.value.length + ' / ' + MAX_BIO;
});

const emailSwitch = document.getElementById('bstNotifyEmail');
const smsSwitch = document.getElementById('bstNotifySms');
const marketingSwitch = document.getElementById('bstNotifyMarketing');
const summary = document.getElementById('bstNotifySummary');

function updateSummary() {
  const on = [];
  if (emailSwitch.checked) on.push('email');
  if (smsSwitch.checked) on.push('SMS');
  if (marketingSwitch.checked) on.push('marketing');
  summary.textContent = on.length ? ('You will receive: ' + on.join(', ') + '.') : 'All notifications are turned off.';
}

[emailSwitch, smsSwitch, marketingSwitch].forEach(sw => sw.addEventListener('change', updateSummary));

updateSummary();`,
  seo: {
    title: 'Bootstrap Settings Page with Tabs — Free Snippet',
    description: 'A Bootstrap 5.3 settings page using real nav-pills and data-bs-toggle tabs, live notification switches, and a bio counter. Export to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Settings Page with Tabs — HTML, CSS & JavaScript',
      description: `Settings pages live or die on whether the tab switching actually feels native, and this snippet uses Bootstrap's own tab machinery rather than hand-rolled show/hide logic — every pill button carries \`data-bs-toggle="pill"\` and a \`data-bs-target\` pointing at its matching \`.tab-pane\`, and Bootstrap's bundled JS (\`bootstrap.bundle.min.js\`, which includes Popper and the Tab plugin) handles the \`fade show active\` class choreography, ARIA \`role="tab"\`/\`role="tabpanel"\` wiring, and keyboard behavior automatically. The nav itself is a real \`nav flex-column nav-pills\` with \`aria-orientation="vertical"\`, styled with a small additive \`.bst-card\`/\`#bstTabs .nav-link.active\` layer on top rather than a custom-built tab system.\n\nThe two pieces of actual custom JavaScript live inside two of the four panes. In Profile, a \`<textarea>\` with a real \`maxlength="160"\` attribute (so the browser itself enforces the hard limit) is paired with a live counter: an \`input\` event listener reads \`bio.value.length\` on every keystroke and writes \`"N / 160"\` into \`#bstBioCount\`, giving the user constant feedback on how much room is left without ever letting the count exceed the \`MAX_BIO\` constant, since the native \`maxlength\` attribute stops further typing at exactly 160 characters regardless of what the counter displays.\n\nIn Notifications, three real Bootstrap \`form-check form-switch\` toggles (Email, SMS, Marketing) each fire a \`change\` event that calls a shared \`updateSummary()\` function. That function checks each switch's \`.checked\` state, pushes a matching label into an \`on\` array, and joins it into a sentence like "You will receive: email, marketing." — or, when every switch is off, an explicit "All notifications are turned off" message rather than an empty or broken-looking string, which is the small edge case that a naive \`on.join(', ')\` alone would render as just a bare period.\n\nThe Security pane demonstrates plain password fields and an update button with no extra JS wired (deliberately left as a static form, since password changes belong behind a real backend call), and the Billing pane shows a static current-plan summary — both included to round out a realistic four-tab settings page rather than over-engineering panes that do not need dynamic behavior.\n\nBecause the tab switching is handled entirely by Bootstrap's own JS plugin rather than custom code, there is nothing to reimplement when porting to React, Vue, or Angular beyond re-initializing the Bootstrap Tab/Pill component (or using a framework-native tabs pattern instead); the bio counter and notification summary, being plain event listeners over a fixed set of ids, drop straight into a \`useEffect\`/\`onMounted\`/\`ngAfterViewInit\` block with refs replacing the \`getElementById\` calls.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The Profile tab is active and highlighted dark in the vertical pill nav, showing a display-name field and an empty bio textarea with a "0 / 160" counter.' },
        { title: 'Type in the bio textarea', text: 'The counter next to "Bio" updates on every keystroke, and typing stops accepting new characters once you reach 160.' },
        { title: 'Click the Security tab', text: 'The pane swaps with Bootstrap\'s fade transition to show password fields, and the Security pill becomes the highlighted active tab.' },
        { title: 'Click the Notifications tab and toggle a switch', text: 'The summary sentence below the three switches updates immediately to reflect exactly which notification types are currently enabled.' },
        { title: 'Turn all three notification switches off', text: 'The summary changes to "All notifications are turned off" instead of showing an empty or malformed sentence.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 vertical nav-pills wired to tab-content panes via genuine data-bs-toggle="pill"',
      'Tab switching, fade transitions, and ARIA roles handled entirely by Bootstrap\'s own Tab plugin',
      'Bio textarea enforces a hard 160-character limit via a native maxlength attribute',
      'Live character counter updates on every keystroke via a plain input event listener',
      'Three real Bootstrap form-switch toggles control notification preferences',
      'A shared updateSummary() function derives a readable sentence from the current switch states',
      'Explicit "all off" message handles the edge case where no notification types are enabled',
      'Four distinct panes (Profile, Security, Notifications, Billing) covering a realistic settings surface',
    ],
    useCases: [
      { icon: 'DASHBOARD', title: 'Account and app settings pages', desc: 'A complete settings shell ready to extend, similar in structure to an [admin dashboard sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/) navigation pattern.' },
      { icon: 'FORM', title: 'User profile management', desc: 'Reuse the character-limited bio field pattern anywhere a user edits a short public description, such as beside a [team member grid](/ui-snippets/bootstrap-team-member-grid/) profile.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s native tab plugin', desc: 'A clean example of using data-bs-toggle="pill" correctly instead of writing custom tab-switching JavaScript.' },
      { icon: 'APP', title: 'SaaS account preference centers', desc: 'The notification-switch summary pattern generalizes well to any app exposing multiple opt-in channels to a user.' },
      { icon: 'CART', title: 'Billing and subscription management', desc: 'Extend the Billing pane with real plan data, pairing naturally with the [subscription plans cards](/ui-snippets/bootstrap-subscription-plans-cards/) snippet for an upgrade flow.' },
    ],
    faqs: [
      { q: 'How does clicking a tab actually switch panes?', a: 'Each pill button has data-bs-toggle="pill" and a data-bs-target matching a .tab-pane id; Bootstrap\'s bundled JavaScript (which includes the Tab plugin) listens for clicks on those attributes and handles adding/removing the fade, show, and active classes and ARIA state — no custom tab-switching code was written.' },
      { q: 'Can the bio textarea exceed 160 characters?', a: 'No — the textarea has a native HTML maxlength="160" attribute, so the browser itself prevents typing or pasting beyond that limit; the JavaScript counter is purely a readout of the current length, not the enforcement mechanism.' },
      { q: 'What does the notification summary say if I turn everything off?', a: 'It explicitly reads "All notifications are turned off" — the updateSummary() function checks for this case and returns that fixed message instead of joining an empty array, which would otherwise produce a blank or malformed sentence.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — for the tabs, either keep Bootstrap\'s JS and initialize it in useEffect/onMounted/ngAfterViewInit, or replace it with your framework\'s native tab state; for the bio counter and notification summary, move the input/change listeners into the same lifecycle hooks using refs instead of getElementById, and clean up listeners on unmount if you attach them manually.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'The nav-pills, tab-content, and form-switch classes are visual — you can restyle them with Tailwind, but you would need to either keep Bootstrap\'s JS loaded just for the Tab plugin\'s behavior or reimplement pane switching yourself, since Tailwind has no equivalent JS component.' },
      { q: 'Is the password field connected to a real update mechanism?', a: 'No — the Security pane is intentionally left as static markup with no JavaScript wired to the Update password button, since a real implementation needs a server-side call; wire your own fetch/axios request to that button\'s click event.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a "Save changes" sticky footer that only enables once a field has been edited, or to persist the active tab in the URL hash so refreshing the page keeps the same tab open. It's also worth asking it to add form validation to the password fields.`,
      prompt: `Build a Bootstrap 5.3 settings page using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A vertical Bootstrap nav-pills sidebar (Profile, Security, Notifications, Billing) wired to tab-content panes using real data-bs-toggle="pill" and data-bs-target attributes, relying on Bootstrap's own Tab plugin for switching, not custom JS.
- The Profile pane needs a bio textarea with a native maxlength of 160 characters and a live counter showing "current length / 160" that updates on every keystroke.
- The Notifications pane needs at least three Bootstrap form-switch toggles, with a summary sentence below them that updates live to list which notification types are currently enabled, and shows an explicit "all off" message when none are.
- Security and Billing panes should show realistic static content for those sections.
- All tab, textarea, and switch behavior should work with plain vanilla JavaScript beyond Bootstrap's own bundled plugin.`,
    },
  },
};

export default bootstrapSettingsTabsPage;
