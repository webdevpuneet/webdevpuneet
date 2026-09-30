const fs = require('fs');
const p = 'c:/Projects/tools/src/components/UiSnippetsTool/snippets/';

const additions = {
'quantity-stepper': `

**Connecting to a cart API**

In the add() function, replace the feedback animation with a fetch call: fetch("/api/cart", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ productId: "prod_123", qty: +document.getElementById("s4-val").value }) }). Show success state on resolve and revert to "Add to cart" on reject. The quantity value is always a valid number between min and max due to the clamp() guard.`,

'drag-sort-list': `

**Serialising the new order**

After each drop, serialise the current DOM order to an array of IDs for your API. Add a data-id attribute to each .sort-item: <li class="sort-item" draggable="true" data-id="task-123">. In showOrder() or the dragend handler: const ids = [...list.querySelectorAll(".sort-item")].map(el => el.dataset.id); fetch("/api/reorder", { method: "PATCH", body: JSON.stringify({ ids }) }). This is the standard pattern for persisting sort order to any backend.`,

'read-more': `

**Accessibility considerations**

The .rm-btn should communicate its purpose to screen readers. Add aria-expanded="false" initially, toggling to "true" on expand. Add aria-controls="rm1-content" pointing to the content element ID. Update in the toggle() function: btn.setAttribute("aria-expanded", isExpanded). The gradient overlay has pointer-events: none so keyboard users can still interact with any links inside the clamped text.`,

'scroll-to-top': `

**Keyboard accessibility**

The button is a standard button element so it is keyboard-focusable by default. Tab focuses it when visible, Enter or Space activates it. Add a visible focus ring: .stt-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 3px; } to override the default browser outline with a branded focus indicator. The aria-label="Scroll to top" and title="Back to top" communicate the button purpose to screen readers and mouse hover users respectively.`,

'horizontal-timeline': `

**Connecting to real roadmap data**

Replace the static HTML with dynamically generated items: fetch("/api/roadmap").then(r=>r.json()).then(data => { data.milestones.forEach(m => { const item = document.createElement("div"); item.className = "tl-item " + m.state; item.innerHTML = buildItemHTML(m); track.appendChild(item); }); autoScrollToActive(); }). Define buildItemHTML(m) to return the dot and card HTML from the milestone object. The auto-scroll and progress bar work identically with dynamic content.`,

'color-swatch': `

**Persisting the selection**

Store the selected variant in localStorage or a URL parameter for returning users. On page load: const saved = new URLSearchParams(location.search).get("colour"); if (saved) { const btn = document.querySelector(".swatch[data-name=\'" + saved + "\']"); if (btn) btn.click(); }. On selection: history.replaceState(null, "", "?colour=" + encodeURIComponent(selectedColour)). This preserves the selection across page reloads and allows sharing a specific colour variant via URL.`,

'notification-badge': `

**Animating the badge in when count goes from zero to one**

When count changes from 0 to 1 (badge becomes visible), add an entrance animation: badge.style.animation = "none"; badge.offsetHeight; badge.style.animation = "badgeIn 0.3s cubic-bezier(0.34,1.56,0.64,1)"; and define @keyframes badgeIn { from { transform: scale(0); } to { transform: scale(1); } }. The offsetHeight forces a reflow between clearing and resetting the animation, ensuring it triggers correctly.`,

'avatar-group': `

**Using real images with initials fallback**

Replace the .av div with an img element: <img class="av" src="user.jpg" alt="Alex Johnson">. The border, border-radius, hover, and negative margin styles apply automatically. For error handling when the image fails to load, use the onerror attribute: onerror="this.outerHTML='<div class=\\'av\\' style=\\'--bg:linear-gradient(135deg,#6366f1,#a78bfa)\\'>AJ</div>'". This replaces the broken image with the gradient initials fallback without JavaScript setup.`,

'toast-queue': `

**Integrating with a global event bus**

For framework-free apps, dispatch and listen to custom events: window.dispatchEvent(new CustomEvent("toast", { detail: { type:"success", title:"Saved!" } })). Add a listener: window.addEventListener("toast", e => toast(e.detail.type, e.detail.title, e.detail.msg)). Any module or component can now fire toasts without direct function calls. This decoupled pattern prevents circular dependencies in larger applications.`,

'skeleton-dashboard': `

**Handling partial loading states**

In a real dashboard, different sections may load at different speeds. Show each card's skeleton independently: when the stats API resolves, replace only the .stats-row skeletons. When the chart API resolves, replace the chart skeleton. Each card can have an independent isLoading state. This progressive loading approach shows data as it arrives rather than waiting for all APIs to complete before revealing anything.`,
};

let fixed = 0;
Object.entries(additions).forEach(([id, add]) => {
  let raw = fs.readFileSync(p+id+'.js','utf8');
  const seoBlock = raw.slice(raw.lastIndexOf('seo:'));
  const am = seoBlock.match(/about:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`\s*,\s*\n\s*\}/);
  if(!am){ console.log('SKIP '+id); return; }
  const newDesc = am[1] + add;
  raw = raw.replace(am[1], newDesc);
  fs.writeFileSync(p+id+'.js', raw);
  const wc = newDesc.trim().split(/\s+/).length;
  console.log((wc>=350?'PASS':'FAIL')+' '+id+': '+wc+'w');
  fixed++;
});
console.log('Fixed:', fixed);
