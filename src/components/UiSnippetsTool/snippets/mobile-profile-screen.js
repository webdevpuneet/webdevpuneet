const mobileProfileScreen = {
  id: 'mobile-profile-screen',
  title: 'Mobile Profile Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="pf-phone">
  <div class="pf-screen">
    <div class="pf-status"><span>9:41</span><span class="pf-batt"><i></i></span></div>
    <div class="pf-cover">
      <button class="pf-back" aria-label="Back">&#8249;</button>
      <button class="pf-edit" id="pfEdit">Edit</button>
      <div class="pf-avatar">AM<span class="pf-on"></span></div>
    </div>
    <div class="pf-id">
      <h1>Alex Morgan</h1>
      <p>@alexmorgan · Product Designer</p>
    </div>
    <div class="pf-stats">
      <div><b>248</b><small>Posts</small></div>
      <div class="pf-sep"></div>
      <div><b>12.4k</b><small>Followers</small></div>
      <div class="pf-sep"></div>
      <div><b>318</b><small>Following</small></div>
    </div>
    <div class="pf-list">
      <div class="pf-item"><span class="pf-ic i1">🔔</span><span>Notifications</span><label class="pf-sw"><input type="checkbox" checked><i></i></label></div>
      <div class="pf-item"><span class="pf-ic i2">🌙</span><span>Dark mode</span><label class="pf-sw"><input type="checkbox" id="pfDark"><i></i></label></div>
      <div class="pf-item pf-nav"><span class="pf-ic i3">🔒</span><span>Privacy &amp; security</span><em>&#8250;</em></div>
      <div class="pf-item pf-nav"><span class="pf-ic i4">💳</span><span>Payment methods</span><em>&#8250;</em></div>
      <div class="pf-item pf-nav"><span class="pf-ic i5">❓</span><span>Help &amp; support</span><em>&#8250;</em></div>
    </div>
    <button type="button" class="pf-logout">Log out</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.pf-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.pf-screen{width:100%;height:100%;border-radius:34px;overflow-y:auto;background:#f1f5f9;color:#0f172a;transition:background .3s,color .3s;scrollbar-width:none;-ms-overflow-style:none}
.pf-screen::-webkit-scrollbar{display:none}
.pf-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700}
.pf-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.pf-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.pf-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}

.pf-cover{position:relative;height:96px;background:linear-gradient(120deg,#6366f1,#ec4899);margin-top:8px}
.pf-back,.pf-edit{position:absolute;top:12px;background:rgba(255,255,255,.22);border:none;color:#fff;border-radius:99px;cursor:pointer;font-family:inherit}
.pf-back{left:14px;width:30px;height:30px;font-size:18px}
.pf-edit{right:14px;padding:6px 14px;font-size:12px;font-weight:700}
.pf-avatar{position:absolute;bottom:-34px;left:50%;transform:translateX(-50%);width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#4338ca,#7c3aed);border:4px solid #f1f5f9;color:#fff;font-weight:800;font-size:24px;display:flex;align-items:center;justify-content:center;transition:border-color .3s}
.pf-on{position:absolute;right:4px;bottom:6px;width:16px;height:16px;border-radius:50%;background:#22c55e;border:3px solid #f1f5f9;transition:border-color .3s}

.pf-id{text-align:center;padding:44px 20px 14px}
.pf-id h1{font-size:21px;font-weight:800}
.pf-id p{font-size:12.5px;color:#94a3b8;margin-top:3px}
.pf-stats{display:flex;align-items:center;justify-content:space-between;margin:0 20px 16px;background:#fff;border-radius:14px;padding:14px 8px}
.pf-stats>div{flex:1;text-align:center}
.pf-stats b{font-size:17px;font-weight:800}
.pf-stats small{display:block;font-size:10.5px;color:#94a3b8;margin-top:2px}
.pf-sep{flex:0 0 1px!important;height:26px;background:#e2e8f0}

.pf-list{margin:0 20px;background:#fff;border-radius:14px;overflow:hidden}
.pf-item{display:flex;align-items:center;gap:12px;padding:13px 15px;border-bottom:1px solid #f1f5f9;font-size:13.5px;font-weight:600}
.pf-item:last-child{border-bottom:none}
.pf-nav{cursor:pointer}
.pf-nav:hover{background:#f8fafc}
.pf-ic{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.i1{background:#fef3c7}.i2{background:#e0e7ff}.i3{background:#dcfce7}.i4{background:#fae8ff}.i5{background:#dbeafe}
.pf-item span:nth-child(2){flex:1}
.pf-item em{font-style:normal;color:#cbd5e1;font-size:18px}

.pf-sw{position:relative;width:42px;height:24px;flex-shrink:0;cursor:pointer}
.pf-sw input{opacity:0;width:0;height:0;position:absolute}
.pf-sw i{position:absolute;inset:0;background:#cbd5e1;border-radius:99px;transition:background .2s}
.pf-sw i::after{content:'';position:absolute;left:3px;top:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.3)}
.pf-sw input:checked + i{background:#6366f1}
.pf-sw input:checked + i::after{transform:translateX(18px)}

.pf-logout{display:block;width:calc(100% - 40px);margin:18px 20px 24px;background:#fff;color:#ef4444;border:1px solid #fecaca;border-radius:13px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit}
.pf-logout:hover{background:#fef2f2}

.pf-screen.dark{background:#0f172a;color:#e2e8f0}
.pf-screen.dark .pf-stats,.pf-screen.dark .pf-list{background:#1e293b}
.pf-screen.dark .pf-item{border-color:#263244}
.pf-screen.dark .pf-avatar,.pf-screen.dark .pf-on{border-color:#0f172a}
.pf-screen.dark .pf-logout{background:#1e293b;border-color:#7f1d1d}
.pf-screen.dark .pf-nav:hover{background:#263244}`,

  js: `var screen = document.querySelector('.pf-screen');
document.getElementById('pfDark').addEventListener('change', function () {
  screen.classList.toggle('dark', this.checked);
});
document.getElementById('pfEdit').addEventListener('click', function () {
  this.textContent = this.textContent === 'Edit' ? 'Done' : 'Edit';
});
document.querySelectorAll('.pf-nav').forEach(function (row) {
  row.addEventListener('click', function () {
    row.style.background = 'rgba(99,102,241,.12)';
    setTimeout(function () { row.style.background = ''; }, 180);
  });
});`,

  seo: {
    title: 'Mobile Profile Screen — Free Account Settings UI Snippet',
    description: `A mobile profile screen with a cover header, avatar, stats row, a settings list with real toggles, and a working dark-mode switch. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Profile Screen — Account & Settings UI',
      description: `A profile screen is the account hub of a mobile app — a cover header with an avatar, follower stats, a settings list with toggles and navigation rows, and a log-out action. This snippet builds a complete, polished one inside a CSS phone frame, including working switches and a functional dark-mode toggle that restyles the whole screen, in HTML, CSS, and vanilla JavaScript with no dependency.

**The cover-and-avatar header**

The header is a gradient cover with a back button and an Edit button, and the avatar overlaps the bottom edge — positioned with \`bottom: -34px\` and a thick border ring so it punches through the seam, the universal profile-header pattern. A green presence dot sits on the avatar. The avatar and dot borders are theme-aware so they match the background in light and dark modes.

**Pure-CSS toggle switches**

The notification and dark-mode switches are real checkboxes styled into iOS-style toggles: the native input is visually hidden, and an adjacent \`<i>\` is the track whose \`::after\` is the knob. The \`:checked + i\` sibling selector turns the track indigo and slides the knob with a \`transform\` — an accessible toggle (it's a real checkbox, keyboard-operable) with zero JavaScript for the visual state.

**A dark mode that actually works**

The dark-mode switch isn't decorative: toggling it adds a \`.dark\` class to the screen that restyles the background, cards, list, borders, avatar ring, and log-out button. It demonstrates a complete theming pass driven by one class, which is exactly how you'd wire a real in-app theme setting.

**The settings list**

Rows combine a colored icon tile, a label, and either a toggle or a chevron for navigation. Navigation rows give a tap highlight on click (a brief background flash), the standard touch feedback for list items. Stat counts sit in a divided card above, and a bordered log-out button in danger red anchors the bottom.

**Reusing it**

Swap the user data, stats, and rows for your own, and wire the navigation rows to your router and the toggles to real settings. Lift it out of the frame for a responsive web account page, or keep it framed beside a [mobile login screen](/ui-snippets/mobile-login-screen/) to present a full app flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A profile screen renders with a cover, avatar, and settings.` },
      { title: 'Toggle dark mode', text: `The dark-mode switch restyles the entire screen.` },
      { title: 'Flip notifications', text: `The iOS-style switch animates its knob.` },
      { title: 'Tap a settings row', text: `Navigation rows give a touch-highlight on tap.` },
      { title: 'Press Edit', text: `The Edit button toggles to Done.` },
      { title: 'Bind your data', text: `Swap the user info, stats, and rows for your own.` },
    ] },
    features: [
      { title: 'Overlapping avatar', text: `Avatar punches through the cover seam.` },
      { title: 'CSS toggle switches', text: `Real checkboxes styled with a sibling selector.` },
      { title: 'Working dark mode', text: `One class restyles the whole screen.` },
      { title: 'Theme-aware borders', text: `Avatar and dot rings match the background.` },
      { title: 'Settings list', text: `Icon tiles, toggles, and chevron nav rows.` },
      { title: 'Tap feedback', text: `Navigation rows flash on tap.` },
      { title: 'Stats card', text: `Divided counts above the list.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS, real focusable controls.` },
    ],
    useCases: [
      { title: 'Account hub screens', text: 'Show a cover header with an avatar punching through the seam, follower stats and a settings list, all within a [phone mockup](/ui-snippets/phone-mockup/).' },
      { title: 'Settings list prototypes', text: 'Use the real checkbox toggles as the basis of a mobile take on a [settings panel](/ui-snippets/settings-panel/), styled with a sibling selector.' },
      { title: 'Social stat presentation', text: 'Show follower and post counts with a [user stats card](/ui-snippets/user-stats-card/) layout, and keep avatar and dot rings matching the active theme.' },
      { title: 'Theme switching demos', text: 'Pair the working dark mode with a [colour mode toggle](/ui-snippets/color-mode-toggle/), where one class restyles the entire screen at once.' },
      { title: 'Onboarding to profile flows', text: 'Follow a [mobile login screen](/ui-snippets/mobile-login-screen/) with this profile to demonstrate a signed-in experience from first screen to settings.' },
      { icon: 'CODE', title: 'Related: Mobile Ride-Hailing Screen', desc: 'See the [Mobile Ride-Hailing Screen](/ui-snippets/mobile-map-ride-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the toggle switches built?', a: `Each is a real checkbox visually hidden next to an <i> element that acts as the track, with its ::after pseudo-element as the knob. The CSS :checked + i sibling selector turns the track on and slides the knob with a transform. Because it's a genuine checkbox, it's keyboard-accessible and needs no JavaScript for the visual on/off state.` },
      { q: 'Does the dark-mode toggle actually change the theme?', a: `Yes. Flipping it adds a dark class to the screen, and CSS rules under that class restyle the background, cards, list, borders, avatar ring, and log-out button. It's a complete theming pass driven by a single class — the same approach you'd use for a real in-app dark-mode setting.` },
      { q: 'How does the avatar overlap the cover?', a: `The avatar is absolutely positioned with a negative bottom offset so it extends past the cover's edge, and a thick border ring in the page background color makes it appear to punch through the seam. The ring color is theme-aware so it blends with both light and dark backgrounds.` },
      { q: 'Can I use this as a web account page?', a: `Yes. The phone frame is just a wrapper, and the profile content is independent. Lift it out for a responsive web account or settings page, wire the navigation rows to your router and the toggles to your settings store, and it works the same without the device frame.` },
      { q: 'How do I use this profile screen in React, Vue, or Angular?', a: `Render the user info, stats, and settings rows from props or state. Bind the dark class to a theme value updated by the switch, and tie each toggle to a setting in state. Navigation rows call your router. The CSS switches work as-is since they're checkboxes. Tailwind styles the cover, cards, and list with utilities.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing every selector by eye, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the pf-sw checkbox and its adjacent i element combine with the checked plus i sibling selector to produce a working toggle with zero JavaScript for the visual state, or why the avatar uses a negative bottom offset to punch through the cover seam. The same assistant can help optimize it, for example checking whether the pf-screen dark class approach scales cleanly if the settings list grows to dozens of rows, or whether the tap-highlight setTimeout on nav rows could be replaced with a CSS-only active state. It is equally good for extending the screen: ask it to add a real router-aware navigation transition, persist the dark-mode choice to localStorage, or add a skeleton loading state before the profile data arrives. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile "profile and settings" screen in plain HTML, CSS, and JavaScript, framed inside a CSS phone mockup, using only real form controls and CSS class toggling — no toggle-switch library.

Requirements:
- A phone frame with a status bar showing a time and a battery glyph built from CSS box shapes, not an icon font.
- A gradient cover header with a back button and an edit button, and a circular avatar absolutely positioned with a negative bottom offset so it visually overlaps the bottom edge of the cover, with a thick border ring matching the page background so it looks like it punches through the seam. Include a small presence dot on the avatar with the same border-ring trick.
- A stats row (posts, followers, following) in a card with thin vertical dividers between the three values.
- A settings list where each row has a colored square icon tile, a label, and either a toggle switch or a chevron for navigation.
- Every toggle switch must be a real checkbox input, visually hidden, placed next to a sibling element that acts as the track and uses a ::after pseudo-element as the knob; the on/off visual state must be driven purely by the CSS checked plus sibling selector, with no JavaScript required to move the knob.
- Wire exactly one of the toggles (dark mode) to real behavior: toggling it must add or remove a class on the screen container that is picked up by CSS rules restyling the background, the cards, the list borders, and the avatar/dot ring colors so they still read correctly against the dark background.
- Clicking a navigation row (chevron row) must give brief tap feedback (a background flash that fades after under 300ms) without affecting the toggle rows.
- Keep all markup keyboard-focusable and make sure the toggles remain real, accessible checkboxes rather than divs with click handlers.`,
    },
  },
};

export default mobileProfileScreen;
