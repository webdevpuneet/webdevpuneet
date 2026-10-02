const mobileFeedScreen = {
  id: 'mobile-feed-screen',
  title: 'Mobile Feed Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mfd-phone">
  <div class="mfd-screen">
    <div class="mfd-status"><span>9:41</span><span class="mfd-batt"><i></i></span></div>
    <header class="mfd-head">
      <b class="mfd-logo">Pulse</b>
      <div class="mfd-hacts"><button aria-label="Notifications">&#9825;</button><button aria-label="Messages">&#9993;</button></div>
    </header>
    <div class="mfd-scroll">
      <div class="mfd-stories" id="mfdStories">
        <div class="mfd-story me"><div class="mfd-ring"><span>You</span></div><small>You</small></div>
        <div class="mfd-story new"><div class="mfd-ring"><span>MK</span></div><small>maya</small></div>
        <div class="mfd-story new"><div class="mfd-ring"><span>TR</span></div><small>theo</small></div>
        <div class="mfd-story new"><div class="mfd-ring"><span>SN</span></div><small>sana</small></div>
        <div class="mfd-story new"><div class="mfd-ring"><span>LO</span></div><small>leo</small></div>
        <div class="mfd-story new"><div class="mfd-ring"><span>IV</span></div><small>iva</small></div>
      </div>

      <article class="mfd-post" data-liked="false">
        <div class="mfd-top"><div class="mfd-av a1">MK</div><div><b>maya.kdesign</b><small>Lisbon, Portugal</small></div><button class="mfd-more" aria-label="More">&#8942;</button></div>
        <div class="mfd-media m1" tabindex="0"><span class="mfd-burst">&#10084;</span></div>
        <div class="mfd-acts">
          <button class="mfd-like" aria-pressed="false" aria-label="Like">&#9825;</button>
          <button aria-label="Comment">&#128172;</button>
          <button aria-label="Share">&#10148;</button>
          <button class="mfd-save" aria-label="Save">&#9734;</button>
        </div>
        <div class="mfd-likes"><b><span class="mfd-count">1,284</span> likes</b></div>
        <div class="mfd-cap"><b>maya.kdesign</b> New brand explorations for a coffee client ☕ swipe for the palette</div>
      </article>

      <article class="mfd-post" data-liked="false">
        <div class="mfd-top"><div class="mfd-av a2">TR</div><div><b>theo.builds</b><small>3 hours ago</small></div><button class="mfd-more" aria-label="More">&#8942;</button></div>
        <div class="mfd-media m2" tabindex="0"><span class="mfd-burst">&#10084;</span></div>
        <div class="mfd-acts">
          <button class="mfd-like" aria-pressed="false" aria-label="Like">&#9825;</button>
          <button aria-label="Comment">&#128172;</button>
          <button aria-label="Share">&#10148;</button>
          <button class="mfd-save" aria-label="Save">&#9734;</button>
        </div>
        <div class="mfd-likes"><b><span class="mfd-count">642</span> likes</b></div>
        <div class="mfd-cap"><b>theo.builds</b> Weekend workshop setup is finally done 🔨</div>
      </article>
    </div>

    <nav class="mfd-tabs">
      <button class="mfd-tab active" data-tab="home" aria-label="Home">&#8962;</button>
      <button class="mfd-tab" data-tab="search" aria-label="Search">&#9906;</button>
      <button class="mfd-tab plus" data-tab="add" aria-label="Create">+</button>
      <button class="mfd-tab" data-tab="reels" aria-label="Reels">&#9654;</button>
      <button class="mfd-tab" data-tab="me" aria-label="Profile"><span class="mfd-tabav">AM</span></button>
    </nav>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mfd-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mfd-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#fff;color:#0f172a;display:flex;flex-direction:column}
.mfd-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700}
.mfd-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.mfd-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.mfd-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}

.mfd-head{display:flex;align-items:center;justify-content:space-between;padding:8px 16px 10px;border-bottom:1px solid #f1f5f9}
.mfd-logo{font-size:22px;font-weight:800;background:linear-gradient(120deg,#f43f5e,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
.mfd-hacts button{background:none;border:none;font-size:19px;cursor:pointer;margin-left:12px;color:#0f172a}

.mfd-scroll{flex:1;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.mfd-scroll::-webkit-scrollbar{display:none}
.mfd-stories{display:flex;gap:12px;padding:12px 14px;overflow-x:auto;border-bottom:1px solid #f1f5f9}
.mfd-stories::-webkit-scrollbar{display:none}
.mfd-story{text-align:center;flex-shrink:0;width:56px;cursor:pointer}
.mfd-ring{width:56px;height:56px;border-radius:50%;padding:2.5px;background:linear-gradient(45deg,#f59e0b,#f43f5e,#8b5cf6);display:flex}
.mfd-story.me .mfd-ring{background:#e2e8f0}
.mfd-story.seen .mfd-ring{background:#cbd5e1}
.mfd-ring span{flex:1;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#475569;border:2px solid #fff;position:relative}
.mfd-story small{display:block;font-size:10.5px;color:#64748b;margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.mfd-post{border-bottom:1px solid #f1f5f9}
.mfd-top{display:flex;align-items:center;gap:9px;padding:9px 12px}
.mfd-av{width:32px;height:32px;border-radius:50%;color:#fff;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.a1{background:linear-gradient(135deg,#f43f5e,#f59e0b)}.a2{background:linear-gradient(135deg,#6366f1,#0ea5e9)}
.mfd-top b{font-size:12.5px;display:block}
.mfd-top small{font-size:10.5px;color:#94a3b8}
.mfd-more{margin-left:auto;background:none;border:none;font-size:17px;cursor:pointer;color:#0f172a}
.mfd-media{height:224px;position:relative;cursor:pointer;display:flex;align-items:center;justify-content:center;overflow:hidden}
.m1{background:linear-gradient(135deg,#fb7185,#a78bfa,#38bdf8)}
.m2{background:linear-gradient(135deg,#f59e0b,#ef4444,#8b5cf6)}
.mfd-burst{font-size:80px;color:#fff;opacity:0;transform:scale(.3);text-shadow:0 4px 14px rgba(0,0,0,.3)}
.mfd-media.pop .mfd-burst{animation:mfdBurst .8s ease}
@keyframes mfdBurst{15%{opacity:.95;transform:scale(1.1)}30%{transform:scale(.95)}45%{transform:scale(1)}100%{opacity:0;transform:scale(1)}}

.mfd-acts{display:flex;gap:14px;padding:9px 12px 4px}
.mfd-acts button{background:none;border:none;font-size:21px;cursor:pointer;color:#0f172a;line-height:1;transition:transform .15s}
.mfd-acts button:active{transform:scale(.85)}
.mfd-acts .mfd-save{margin-left:auto}
.mfd-like.on{color:#f43f5e}
.mfd-save.on{color:#f59e0b}
.mfd-likes{padding:0 12px;font-size:12.5px}
.mfd-cap{padding:3px 12px 12px;font-size:12.5px;line-height:1.4;color:#334155}
.mfd-cap b{color:#0f172a}

.mfd-tabs{display:flex;align-items:center;justify-content:space-around;padding:9px 8px;border-top:1px solid #f1f5f9;background:#fff}
.mfd-tab{background:none;border:none;font-size:21px;cursor:pointer;color:#94a3b8;line-height:1;transition:color .15s,transform .15s}
.mfd-tab.active{color:#0f172a}
.mfd-tab:active{transform:scale(.88)}
.mfd-tab.plus{width:34px;height:30px;border-radius:9px;background:linear-gradient(135deg,#f43f5e,#8b5cf6);color:#fff;font-size:22px}
.mfd-tabav{display:flex;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;font-size:9px;font-weight:800;align-items:center;justify-content:center;box-shadow:0 0 0 2px transparent}
.mfd-tab.active .mfd-tabav{box-shadow:0 0 0 2px #0f172a}`,

  js: `function toggleLike(post){
  var btn = post.querySelector('.mfd-like');
  var count = post.querySelector('.mfd-count');
  var liked = post.getAttribute('data-liked') === 'true';
  liked = !liked;
  post.setAttribute('data-liked', liked);
  btn.classList.toggle('on', liked);
  btn.innerHTML = liked ? '&#10084;' : '&#9825;';
  btn.setAttribute('aria-pressed', liked);
  var n = parseInt(count.textContent.replace(/,/g,''), 10);
  n += liked ? 1 : -1;
  count.textContent = n.toLocaleString();
}

document.querySelectorAll('.mfd-post').forEach(function(post){
  post.querySelector('.mfd-like').addEventListener('click', function(){ toggleLike(post); });
  post.querySelector('.mfd-save').addEventListener('click', function(){ this.classList.toggle('on'); this.innerHTML = this.classList.contains('on') ? '&#9733;' : '&#9734;'; });

  var media = post.querySelector('.mfd-media');
  var lastTap = 0;
  media.addEventListener('click', function(){
    var now = Date.now();
    if (now - lastTap < 320){
      if (post.getAttribute('data-liked') !== 'true') toggleLike(post);
      media.classList.remove('pop');
      void media.offsetWidth;
      media.classList.add('pop');
    }
    lastTap = now;
  });
});

document.querySelectorAll('.mfd-story.new').forEach(function(s){
  s.addEventListener('click', function(){ s.classList.remove('new'); s.classList.add('seen'); });
});

document.querySelectorAll('.mfd-tab').forEach(function(tab){
  tab.addEventListener('click', function(){
    if (tab.classList.contains('plus')) return;
    document.querySelectorAll('.mfd-tab').forEach(function(t){ t.classList.remove('active'); });
    tab.classList.add('active');
  });
});`,

  seo: {
    title: 'Mobile Feed Screen — Free HTML CSS JS UI Snippet',
    description: `A social feed with a story ring row, image posts, double-tap-to-like with a heart burst, and a bottom tab bar. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Feed Screen — Social Timeline UI',
      description: `A social feed is the home screen of every photo-sharing app — a horizontally scrolling row of story rings, a vertical stream of image posts with like, comment, share and save actions, and a bottom tab bar. This snippet builds a complete, interactive one inside a CSS phone frame: you can double-tap a photo to like it with a bursting heart, tap the heart to toggle the count, mark stories as seen, save posts, and switch tabs — in HTML, CSS, and vanilla JavaScript with no dependency.

**The gradient story rings**

Each story is a circle with a 2.5px padding that reveals a conic-style gradient ring behind an inner white disc — the recognizable "unseen story" look. Tapping a new story swaps its ring class so the vivid gradient fades to grey, exactly how real apps mark a story as watched. Your own story uses a plain grey ring, and the row scrolls horizontally with the scrollbar hidden.

**Double-tap to like with a heart burst**

The signature gesture is handled by timing taps on the media: two clicks within 320ms count as a double-tap, which likes the post if it is not already liked and plays a big heart-burst animation over the image. The burst is a single \`@keyframes mfdBurst\` on an overlaid heart that scales up, settles, and fades. To replay it on every double-tap, the code removes the animation class, forces a reflow with \`void media.offsetWidth\`, and re-adds it — the standard trick for restarting a CSS animation.

**Live like counts**

The heart button toggles a filled state and adjusts the count, parsing the displayed number by stripping commas and re-formatting with \`toLocaleString()\` so "1,284 likes" increments to "1,285" correctly. The \`aria-pressed\` attribute tracks the like state for assistive tech, and the save button flips between an outline and a filled star.

**The bottom tab bar**

Five tabs sit in a bar with the create button styled as a gradient pill. Tapping a tab moves the active state, and the profile tab shows a small avatar that gets a ring when active. The create button is intentionally excluded from the active-swap since it opens a composer rather than a feed section.

**Accessibility and performance**

Every action is a real \`<button>\` with an \`aria-label\`, and the like button carries \`aria-pressed\` that flips with its state, so screen-reader users hear whether a post is liked without relying on color. The like and save toggles change both an icon and an accent color, so the state never depends on hue alone — important for color-blind users. The double-tap gesture is layered on top of the buttons rather than replacing them, so keyboard and assistive users can still like a post by activating the heart directly. Performance-wise the heart burst is a single CSS keyframe on one overlaid element, and the restart uses a forced reflow rather than creating and destroying nodes, so rapid double-taps never leak DOM. The story row scrolls with native overflow and hidden scrollbars, which stays smooth on touch, and the count updates touch only one text node. Swapping the gradient blocks for lazy-loaded images with explicit dimensions keeps the feed from shifting as it loads.

**Reusing it**

Replace the gradient media blocks with real \`<img>\` elements, feed the posts from an array, and wire the actions to your API. Lift the stream out of the phone frame for a responsive web feed, or keep it framed beside a [mobile profile screen](/ui-snippets/mobile-profile-screen/) to present a full app.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A social feed renders with a story row, two image posts, and a bottom tab bar.` },
      { title: 'Double-tap a photo', text: `Two quick taps like the post and a large heart bursts over the image.` },
      { title: 'Tap the heart button', text: `It toggles filled and the like count increments or decrements with proper comma formatting.` },
      { title: 'Open a story', text: `Tapping a story fades its colorful ring to grey to mark it seen.` },
      { title: 'Save a post', text: `The star button flips between outline and filled.` },
      { title: 'Switch tabs', text: `The bottom bar moves the active state; the profile tab gets an avatar ring.` },
    ] },
    features: [
      { title: 'Gradient story rings', text: `Unseen rings fade to grey once opened.` },
      { title: 'Double-tap to like', text: `320ms tap timing triggers a heart burst.` },
      { title: 'Replayable burst', text: `Reflow trick restarts the CSS animation.` },
      { title: 'Live like counts', text: `toLocaleString keeps comma formatting correct.` },
      { title: 'aria-pressed likes', text: `Like state exposed to assistive tech.` },
      { title: 'Save toggle', text: `Outline star flips to filled on tap.` },
      { title: 'Bottom tab bar', text: `Active swap with a gradient create pill.` },
      { title: 'No dependency', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Social app home feeds', text: 'Show story rings above a stream of image posts, behind a [mobile profile screen](/ui-snippets/mobile-profile-screen/) for a complete social app prototype.' },
      { title: 'Photo-sharing galleries', text: 'Style posts like an [Instagram gallery](/ui-snippets/instagram-gallery/), with like, comment, share and save actions under every image.' },
      { title: 'Stories entry points', text: 'Open a [mobile stories viewer](/ui-snippets/mobile-stories-viewer/) from the ring row, where unseen rings fade to grey once a story has been opened.' },
      { title: 'Double-tap like gestures', text: 'Reuse the 320 ms tap timing and heart burst alongside a [like burst button](/ui-snippets/like-burst-button/), with a reflow trick replaying the animation.' },
      { title: 'Device-framed demos', text: 'Present the feed in a [phone mockup](/ui-snippets/phone-mockup/), using `toLocaleString` so like counts keep correct comma formatting as they change.' },
      { icon: 'CODE', title: 'Related: Mobile Biometric Unlock Screen', desc: 'See the [Mobile Biometric Unlock Screen](/ui-snippets/mobile-biometric-unlock-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the double-tap-to-like detected?', a: `The media element records the timestamp of each tap. When a new tap lands within 320ms of the previous one, it is treated as a double-tap: the post is liked if it was not already, and the heart-burst animation plays. A single tap simply updates the timestamp and does nothing else.` },
      { q: 'Why does the heart burst replay every time instead of only once?', a: `CSS animations only run when the class is first applied. To replay, the code removes the pop class, reads media.offsetWidth to force a synchronous reflow, then re-adds the class. That reflow is what lets the browser register the animation as new each time, so it fires on every double-tap.` },
      { q: 'How does the like count stay correctly comma-formatted?', a: `The displayed count is parsed by stripping commas and calling parseInt, then incremented or decremented, then re-rendered with toLocaleString(). That way 1,284 becomes 1,285 rather than 1284, matching how the number was originally displayed.` },
      { q: 'Why does the create (+) tab not become active when tapped?', a: `The plus tab opens a post composer rather than switching to a feed section, so the click handler returns early for it and leaves the current active tab in place — the same behavior as real apps where the create button launches a modal instead of a tab.` },
      { q: 'How do I use this feed in React, Vue, or Angular?', a: `Render posts and stories from arrays and key them by id. Track liked, saved, and count in per-post state and update them in handlers rather than mutating the DOM. Replace the gradient media with img tags. For the burst, toggle an animation flag and reset it with a key change or a ref-based reflow in useEffect (React), watch (Vue), or ngAfterViewInit (Angular). Tailwind expresses the rings and gradients with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the tap-timing logic on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the 320ms lastTap comparison distinguishes a double-tap from two separate single taps, or why the forced reflow through media.offsetWidth is necessary before re-adding the pop class to replay the mfdBurst keyframe. The same assistant is useful for optimizing it — ask whether the like-count parsing that strips commas and calls toLocaleString could break on locales that use different thousands separators, or how you would lazy-load the gradient media blocks as real images without causing layout shift in the feed. It is just as good for extending the snippet: have it add a comment sheet, a multi-image carousel per post with swipe paging, or a proper story-viewer overlay triggered from the story ring row. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile social-feed screen in plain HTML, CSS, and JavaScript inside a phone-frame container — no framework, no gesture library.

Requirements:
- A horizontally scrolling row of story circles, each with a gradient ring around a white inner disc for unseen stories, and a plain grey ring once a story has been tapped (swap a CSS class on click, do not rebuild the element).
- One or more post articles, each with a header (avatar, username, location or timestamp, more button), a media area, an actions row (like, comment, share, save), a like-count line, and a caption.
- Detect a double-tap on the media area using only click event timestamps: record the time of each click, and if a new click lands within roughly 320 milliseconds of the previous one, treat it as a double-tap.
- A double-tap must like the post only if it is not already liked, and must always replay a heart-burst animation over the media even on repeated double-taps — implement the replay by removing the animation class, forcing a synchronous reflow by reading the element's offsetWidth, then re-adding the class.
- The like button and double-tap must share the same like/unlike logic, updating a data-liked attribute on the post, toggling the heart icon and an accent color class, updating aria-pressed, and incrementing or decrementing the displayed like count while preserving thousands-separator formatting.
- A save button that independently toggles between an outline and filled star, and a bottom tab bar where tapping a tab moves an active-state class among the tabs except for a centered create/plus tab which must not become active when tapped.`,
    },
  },
};

export default mobileFeedScreen;
