const heroAudienceToggleSwitcher = {
  id: 'hero-audience-toggle-switcher',
  title: 'Hero with Audience Toggle Switcher',
  lastmod: '2026-11-07',
  category: 'heroes',
  html: `<section class="ats-hero" data-audience="dev">
  <div class="ats-bg" aria-hidden="true"><span class="ats-orb ats-orb-a"></span><span class="ats-orb ats-orb-b"></span><span class="ats-grid"></span></div>

  <div class="ats-toggle" id="atsToggle" role="tablist" aria-label="Choose your audience">
    <span class="ats-thumb" aria-hidden="true"></span>
    <button type="button" class="ats-opt active" id="ats-tab-dev" role="tab" aria-selected="true" aria-controls="atsPanel" data-audience="dev" tabindex="0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>Developers
    </button>
    <button type="button" class="ats-opt" id="ats-tab-team" role="tab" aria-selected="false" aria-controls="atsPanel" data-audience="team" tabindex="-1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Teams
    </button>
    <button type="button" class="ats-opt" id="ats-tab-enterprise" role="tab" aria-selected="false" aria-controls="atsPanel" data-audience="enterprise" tabindex="-1">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>Enterprise
    </button>
  </div>

  <div class="ats-panel" id="atsPanel" role="tabpanel" aria-labelledby="ats-tab-dev">
    <div class="ats-copy">
      <span class="ats-eyebrow ats-sw" id="atsEyebrow" style="--i:0"><i class="ats-dot"></i><span id="atsEyebrowText">Ship faster, break less</span></span>
      <h1 class="ats-h1 ats-sw" id="atsH1" style="--i:1">An API that gets<br><em>out of your way</em></h1>
      <p class="ats-sub ats-sw" id="atsSub" style="--i:2">Type-safe SDKs, predictable errors and docs that match the code. Go from first request to production in an afternoon, not a sprint.</p>
      <div class="ats-ctas ats-sw" id="atsCtas" style="--i:3">
        <a href="#" class="ats-cta-primary" id="atsCtaPrimary"><span id="atsCtaPrimaryText">Read the docs</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg></a>
        <a href="#" class="ats-cta-secondary" id="atsCtaSecondary">View on GitHub</a>
      </div>
      <ul class="ats-proof ats-sw" id="atsProof" style="--i:4">
        <li>TypeScript, Python and Go SDKs</li><li>p99 latency under 80 ms</li><li>OpenAPI-first docs</li>
      </ul>
    </div>

    <div class="ats-visual" id="atsVisual">
      <div class="ats-card on" data-for="dev">
        <div class="ats-win">
          <div class="ats-bar"><i></i><i></i><i></i><span class="ats-file">checkout.ts</span></div>
          <pre class="ats-code"><code><span class="k">import</span> { Acme } <span class="k">from</span> <span class="s">"@acme/sdk"</span>;

<span class="k">const</span> acme = <span class="k">new</span> <span class="f">Acme</span>({ apiKey: process.env.<span class="p">ACME_KEY</span> });

<span class="k">const</span> order = <span class="k">await</span> acme.orders.<span class="f">create</span>({
  customer: <span class="s">"cus_9f2a"</span>,
  items: [{ sku: <span class="s">"tee-black-m"</span>, qty: <span class="n">2</span> }],
});

<span class="c">// order.status is typed: "paid" | "pending"</span>
console.<span class="f">log</span>(order.status);</code></pre>
          <div class="ats-resp"><span class="ats-ok"></span>201 Created<i>38 ms</i></div>
        </div>
        <div class="ats-float ats-float-a"><span class="ats-fdot"></span>Typed responses, zero guesswork</div>
      </div>

      <div class="ats-card" data-for="team">
        <div class="ats-win">
          <div class="ats-board-head">
            <div><strong>Q4 launch plan</strong><span>9 of 12 tasks done</span></div>
            <div class="ats-avatars"><b style="--c:#f472b6">MC</b><b style="--c:#60a5fa">JO</b><b style="--c:#fbbf24">AK</b></div>
          </div>
          <div class="ats-progress"><i style="width:75%"></i></div>
          <ul class="ats-tasks">
            <li><span class="ats-check done"></span><em>Finalise pricing page</em><b class="ats-pill ok">Done</b></li>
            <li><span class="ats-check done"></span><em>Write the release notes</em><b class="ats-pill ok">Done</b></li>
            <li><span class="ats-check"></span><em>QA sign-off on mobile</em><b class="ats-pill run">In review</b></li>
            <li><span class="ats-check"></span><em>Announce to customers</em><b class="ats-pill todo">Up next</b></li>
          </ul>
        </div>
        <div class="ats-float ats-float-a"><b class="ats-mini" style="--c:#f472b6">MC</b>Maya moved "Pricing page" to Done</div>
      </div>

      <div class="ats-card" data-for="enterprise">
        <div class="ats-win">
          <div class="ats-admin-head">
            <span class="ats-shield"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
            <div><strong>Security and access</strong><span>Workspace policies</span></div>
            <b class="ats-pill ok">All checks passed</b>
          </div>
          <ul class="ats-rows">
            <li><div><strong>Single sign-on</strong><span>SAML 2.0 with SCIM provisioning</span></div><i class="ats-switch on"></i></li>
            <li><div><strong>Audit log</strong><span>Streams to your SIEM, 365-day retention</span></div><i class="ats-switch on"></i></li>
            <li><div><strong>Data residency</strong><span>Choose EU or US per workspace</span></div><i class="ats-switch on"></i></li>
            <li><div><strong>Role-based access</strong><span>Custom roles down to the project</span></div><i class="ats-switch on"></i></li>
          </ul>
        </div>
        <div class="ats-float ats-float-a"><span class="ats-fdot"></span>SOC 2 Type II and ISO 27001</div>
      </div>
    </div>
  </div>
</section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
/* Registered colour properties let the whole accent palette animate when the audience changes */
@property --a{syntax:'<color>';inherits:true;initial-value:#2563eb}
@property --a2{syntax:'<color>';inherits:true;initial-value:#6d28d9}
@property --t{syntax:'<color>';inherits:true;initial-value:#7dd3fc}
body{font-family:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#070b14;color:#e8edf7;-webkit-font-smoothing:antialiased}

.ats-hero{--a:#2563eb;--a2:#6d28d9;--t:#7dd3fc;position:relative;isolation:isolate;overflow:hidden;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px;padding:72px 24px;transition:--a .6s ease,--a2 .6s ease,--t .6s ease}
.ats-hero[data-audience="team"]{--a:#047857;--a2:#0f766e;--t:#6ee7b7}
.ats-hero[data-audience="enterprise"]{--a:#7c3aed;--a2:#c026d3;--t:#e9d5ff}

/* Background: two blurred colour orbs and a faded grid, all tinted by the active audience */
.ats-bg{position:absolute;inset:0;z-index:-1;pointer-events:none}
.ats-orb{position:absolute;border-radius:50%;filter:blur(95px);opacity:.4;will-change:transform}
.ats-orb-a{width:560px;height:560px;left:-150px;top:-170px;background:var(--a);animation:atsFloatA 16s ease-in-out infinite alternate}
.ats-orb-b{width:520px;height:520px;right:-170px;bottom:-190px;background:var(--a2);animation:atsFloatB 19s ease-in-out infinite alternate}
.ats-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 78%);mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,#000 30%,transparent 78%)}
@keyframes atsFloatA{to{transform:translate(90px,70px) scale(1.12)}}
@keyframes atsFloatB{to{transform:translate(-80px,-60px) scale(1.1)}}

/* Toggle: one thumb whose position and width are measured from the active tab, so any number of options works */
.ats-toggle{--x:5px;--w:0px;position:relative;display:inline-flex;gap:2px;padding:5px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 10px 30px rgba(0,0,0,.35);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.ats-thumb{position:absolute;top:5px;bottom:5px;left:0;width:var(--w);transform:translateX(var(--x));border-radius:999px;background:linear-gradient(135deg,var(--a),var(--a2));box-shadow:0 8px 24px color-mix(in srgb,var(--a) 55%,transparent),inset 0 1px 0 rgba(255,255,255,.28)}
.ats-toggle.ready .ats-thumb{transition:transform .42s cubic-bezier(.34,1.3,.5,1),width .42s cubic-bezier(.34,1.3,.5,1)}
.ats-opt{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;border:0;background:none;color:#9aa6bd;font:inherit;font-size:13.5px;font-weight:650;padding:10px 18px;border-radius:999px;cursor:pointer;transition:color .25s}
.ats-opt:hover{color:#e8edf7}
.ats-opt.active{color:#fff}
.ats-opt:focus-visible{outline:2px solid var(--t);outline-offset:2px}
.ats-opt svg{flex:none}

/* Copy and visual side by side */
.ats-panel{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);align-items:center;gap:56px;width:100%;max-width:1120px}
.ats-copy{text-align:left}
.ats-sw{transition:opacity .3s ease,transform .3s ease,filter .3s ease;transition-delay:calc(var(--i,0)*45ms)}
.ats-sw.is-out{opacity:0;transform:translateY(10px);filter:blur(5px);transition-duration:.18s;transition-delay:0s}
.ats-eyebrow{display:inline-flex;align-items:center;gap:9px;padding:6px 13px 6px 10px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t);background:color-mix(in srgb,var(--a) 24%,transparent);border:1px solid color-mix(in srgb,var(--t) 28%,transparent)}
.ats-dot{width:7px;height:7px;border-radius:50%;background:var(--t);animation:atsPulse 2.2s infinite}
@keyframes atsPulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--t) 70%,transparent)}70%,100%{box-shadow:0 0 0 8px transparent}}
.ats-h1{margin:18px 0 16px;font-size:clamp(34px,5.2vw,58px);font-weight:800;line-height:1.06;letter-spacing:-.035em;color:#fff}
.ats-h1 em{font-style:normal;background:linear-gradient(95deg,var(--t),#fff 85%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ats-sub{font-size:16.5px;line-height:1.7;color:#a8b3c9;max-width:520px}
.ats-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.ats-cta-primary{display:inline-flex;align-items:center;gap:9px;padding:14px 26px;border-radius:12px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;background:linear-gradient(135deg,var(--a),var(--a2));box-shadow:0 12px 32px color-mix(in srgb,var(--a) 50%,transparent),inset 0 1px 0 rgba(255,255,255,.25);transition:transform .2s,box-shadow .2s}
.ats-cta-primary:hover{transform:translateY(-2px)}
.ats-cta-primary svg{transition:transform .2s}
.ats-cta-primary:hover svg{transform:translateX(3px)}
.ats-cta-secondary{display:inline-flex;align-items:center;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;color:#e8edf7;text-decoration:none;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.16);transition:background .2s,border-color .2s}
.ats-cta-secondary:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.28)}
.ats-proof{list-style:none;display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:30px;font-size:13px;color:#8e9ab2}
.ats-proof li{display:inline-flex;align-items:center;gap:8px}
.ats-proof li::before{content:'';width:16px;height:16px;border-radius:50%;background:color-mix(in srgb,var(--t) 24%,transparent) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E") center/9px no-repeat}

/* The visual: three stacked cards, one shown at a time, tilting gently toward the pointer */
.ats-visual{--rx:0deg;--ry:0deg;display:grid;grid-template-columns:minmax(0,1fr);transform:perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .25s ease-out}
.ats-card{grid-area:1/1;min-width:0;position:relative;opacity:0;visibility:hidden;transform:translateY(18px) scale(.97);filter:blur(6px);transition:opacity .4s ease,transform .4s ease,filter .4s ease,visibility 0s .4s}
.ats-card.on{opacity:1;visibility:visible;transform:none;filter:none;transition:opacity .5s ease .12s,transform .5s ease .12s,filter .5s ease .12s,visibility 0s}
.ats-card::before{content:'';position:absolute;inset:6px;z-index:-1;border-radius:22px;background:linear-gradient(135deg,color-mix(in srgb,var(--t) 55%,transparent),transparent 45%,color-mix(in srgb,var(--a2) 55%,transparent));filter:blur(26px);opacity:.5}
.ats-win{border-radius:18px;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.12);box-shadow:0 30px 70px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.ats-float{position:absolute;left:-18px;bottom:-32px;display:flex;align-items:center;gap:9px;padding:9px 15px 9px 11px;border-radius:12px;font-size:12.5px;font-weight:600;color:#e8edf7;background:rgba(12,18,32,.88);border:1px solid rgba(255,255,255,.14);box-shadow:0 14px 34px rgba(0,0,0,.5);animation:atsBob 6s ease-in-out infinite alternate}
@keyframes atsBob{to{transform:translateY(-8px)}}
.ats-fdot{width:8px;height:8px;border-radius:50%;background:var(--t)}
.ats-mini{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--c);color:#0b1220;font-size:9px;font-weight:800}

/* Developers: a code window */
.ats-bar{display:flex;align-items:center;gap:7px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
.ats-bar i{width:10px;height:10px;border-radius:50%;background:#ff5f57}
.ats-bar i:nth-child(2){background:#febc2e}
.ats-bar i:nth-child(3){background:#28c840}
.ats-file{margin-left:10px;font:12px ui-monospace,SFMono-Regular,Menlo,monospace;color:#8e9ab2}
.ats-code{padding:18px 20px;font:13px/1.8 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:#cbd5e1;white-space:pre;overflow-x:auto}
.ats-code .k{color:#c4b5fd}.ats-code .s{color:#86efac}.ats-code .f{color:#7dd3fc}.ats-code .c{color:#64748b;font-style:italic}.ats-code .n{color:#fdba74}.ats-code .p{color:#f0abfc}
.ats-resp{display:flex;align-items:center;gap:10px;padding:12px 20px;border-top:1px solid rgba(255,255,255,.08);font:600 12.5px ui-monospace,SFMono-Regular,Menlo,monospace;color:#86efac;background:rgba(34,197,94,.07)}
.ats-resp i{margin-left:auto;font-style:normal;color:#8e9ab2}
.ats-ok{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e}

/* Teams: a project board */
.ats-board-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px 12px}
.ats-board-head strong{display:block;font-size:15px;color:#fff}
.ats-board-head span{font-size:12.5px;color:#8e9ab2}
.ats-avatars{display:flex}
.ats-avatars b{display:grid;place-items:center;width:30px;height:30px;margin-left:-5px;border-radius:50%;background:var(--c);color:#0b1220;font-size:10.5px;font-weight:800;border:2px solid #121a2b}
.ats-progress{height:6px;margin:0 20px 14px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.ats-progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--a),var(--t))}
.ats-tasks{list-style:none;padding:0 12px 12px}
.ats-tasks li{display:flex;align-items:center;gap:12px;padding:11px 10px;border-radius:10px;font-size:14px;color:#d6deee}
.ats-tasks li+li{border-top:1px solid rgba(255,255,255,.06)}
.ats-tasks em{flex:1;font-style:normal}
.ats-check{flex:none;width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,.22)}
.ats-check.done{border-color:transparent;background:var(--t) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23062018' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12l5 5L20 7'/%3E%3C/svg%3E") center/11px no-repeat}
.ats-pill{flex:none;white-space:nowrap;padding:3px 10px;border-radius:99px;font-size:11.5px;font-weight:700}
.ats-pill.ok{color:#6ee7b7;background:rgba(16,185,129,.16)}
.ats-pill.run{color:#fcd34d;background:rgba(245,158,11,.16)}
.ats-pill.todo{color:#a8b3c9;background:rgba(255,255,255,.08)}

/* Enterprise: security and access settings */
.ats-admin-head{display:flex;align-items:center;gap:12px;padding:18px 20px 14px}
.ats-admin-head div{flex:1;min-width:0}
.ats-admin-head strong{display:block;font-size:15px;color:#fff}
.ats-admin-head div span{font-size:12.5px;color:#8e9ab2}
.ats-shield{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:11px;color:#fff;background:linear-gradient(135deg,var(--a),var(--a2));box-shadow:0 8px 20px color-mix(in srgb,var(--a) 45%,transparent)}
.ats-rows{list-style:none;padding:0 12px 12px}
.ats-rows li{display:flex;align-items:center;gap:14px;padding:12px 10px;border-radius:10px}
.ats-rows li+li{border-top:1px solid rgba(255,255,255,.06)}
.ats-rows li div{flex:1;min-width:0}
.ats-rows strong{display:block;font-size:14px;color:#e8edf7}
.ats-rows li span{font-size:12.5px;color:#8e9ab2}
.ats-switch{flex:none;position:relative;width:38px;height:22px;border-radius:99px;background:rgba(255,255,255,.14)}
.ats-switch::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .2s}
.ats-switch.on{background:linear-gradient(135deg,var(--a),var(--a2))}
.ats-switch.on::after{transform:translateX(16px)}

@media (max-width:900px){
  .ats-hero{padding:56px 20px;gap:36px}
  .ats-panel{grid-template-columns:minmax(0,1fr);gap:48px}
  .ats-copy{text-align:center}
  .ats-sub{margin:0 auto}
  .ats-ctas,.ats-proof{justify-content:center}
  .ats-float{left:10px;bottom:-30px}
}
@media (max-width:460px){
  .ats-opt{padding:9px 12px;font-size:12.5px;gap:6px}
  .ats-opt svg{width:14px;height:14px}
}
@media (prefers-reduced-motion:reduce){
  .ats-orb,.ats-float,.ats-dot{animation:none}
  .ats-sw,.ats-card,.ats-visual,.ats-toggle.ready .ats-thumb,.ats-hero{transition-duration:.01ms!important;transition-delay:0s!important}
}`,
  js: `// One copy set per audience. Choosing a tab fades the text out, writes the new copy, fades it back in,
// slides the thumb under the new tab, swaps the visual card and lets the accent colour glide to the new palette.
var COPY = {
  dev: {
    eyebrow: 'Ship faster, break less',
    h1: 'An API that gets<br><em>out of your way</em>',
    sub: 'Type-safe SDKs, predictable errors and docs that match the code. Go from first request to production in an afternoon, not a sprint.',
    primary: 'Read the docs',
    secondary: 'View on GitHub',
    proof: ['TypeScript, Python and Go SDKs', 'p99 latency under 80 ms', 'OpenAPI-first docs']
  },
  team: {
    eyebrow: 'One workspace, zero silos',
    h1: 'Ship work your<br><em>whole team can see</em>',
    sub: 'Plan, assign and track every project in one place, so nobody needs a status meeting just to know where things stand.',
    primary: 'Start free trial',
    secondary: 'Book a demo',
    proof: ['12,000+ teams on board', '4.8 average rating', 'Set up in five minutes']
  },
  enterprise: {
    eyebrow: 'Built for security reviews',
    h1: 'Scale to every team,<br><em>pass every audit</em>',
    sub: 'SSO, SCIM, audit logs and regional data hosting come standard, plus a dedicated team to get you through procurement and security review.',
    primary: 'Talk to sales',
    secondary: 'Read the security docs',
    proof: ['SOC 2 Type II', 'SSO and SCIM included', '99.99% uptime SLA']
  }
};
var ORDER = ['dev', 'team', 'enterprise'];   // the same order as the tabs in the HTML
var STORAGE_KEY = 'ats-audience';

var hero = document.querySelector('.ats-hero');
var toggle = document.getElementById('atsToggle');
var tabs = [].slice.call(document.querySelectorAll('.ats-opt'));
var panel = document.getElementById('atsPanel');
var cards = [].slice.call(document.querySelectorAll('.ats-card'));
var visual = document.getElementById('atsVisual');
var eyebrowText = document.getElementById('atsEyebrowText');
var h1 = document.getElementById('atsH1');
var sub = document.getElementById('atsSub');
var primaryText = document.getElementById('atsCtaPrimaryText');
var secondary = document.getElementById('atsCtaSecondary');
var proof = document.getElementById('atsProof');
var swaps = [document.getElementById('atsEyebrow'), h1, sub, document.getElementById('atsCtas'), proof];
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var current = null;
var timer = null;

// Measure the active tab, so the thumb fits any label and any number of tabs
function placeThumb() {
  var active = toggle.querySelector('.ats-opt.active');
  if (!active) return;
  toggle.style.setProperty('--x', active.offsetLeft + 'px');
  toggle.style.setProperty('--w', active.offsetWidth + 'px');
}

function write(key) {
  var d = COPY[key];
  eyebrowText.textContent = d.eyebrow;
  h1.innerHTML = d.h1;              // innerHTML only here: the headline holds a <br> and an <em>
  sub.textContent = d.sub;          // everything else is plain text
  primaryText.textContent = d.primary;
  secondary.textContent = d.secondary;
  proof.textContent = '';
  d.proof.forEach(function (t) {
    var li = document.createElement('li');
    li.textContent = t;
    proof.appendChild(li);
  });
}

function select(key, fromUser) {
  if (!COPY[key] || key === current) return;
  var first = current === null;
  current = key;

  tabs.forEach(function (tab) {
    var on = tab.dataset.audience === key;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
    tab.tabIndex = on ? 0 : -1;       // roving tabindex: arrow keys move between tabs
  });
  panel.setAttribute('aria-labelledby', 'ats-tab-' + key);
  hero.setAttribute('data-audience', key);   // CSS reads this to tint the whole hero
  placeThumb();
  cards.forEach(function (card) { card.classList.toggle('on', card.dataset.for === key); });

  if (first) { write(key); return; }

  // Fade out, write while invisible, fade back in. Swapping the text instantly would read as a glitch.
  clearTimeout(timer);
  swaps.forEach(function (el) { el.classList.add('is-out'); });
  timer = setTimeout(function () {
    write(key);
    swaps.forEach(function (el) { el.classList.remove('is-out'); });
  }, reduce ? 0 : 180);

  if (fromUser) { try { localStorage.setItem(STORAGE_KEY, key); } catch (e) { /* private mode */ } }
}

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () { select(tab.dataset.audience, true); });
});

// Arrow keys, Home and End move between tabs, as in any tab list
toggle.addEventListener('keydown', function (e) {
  var i = ORDER.indexOf(current);
  var n = null;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % ORDER.length;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + ORDER.length) % ORDER.length;
  else if (e.key === 'Home') n = 0;
  else if (e.key === 'End') n = ORDER.length - 1;
  if (n === null) return;
  e.preventDefault();
  select(ORDER[n], true);
  tabs[n].focus();
});

// Start on ?audience=team if the link says so, else on the last choice, else on the first tab
var start = ORDER[0];
try {
  var asked = new URLSearchParams(window.location.search).get('audience');
  var saved = localStorage.getItem(STORAGE_KEY);
  start = COPY[asked] ? asked : (COPY[saved] ? saved : ORDER[0]);
} catch (e) { /* no storage: start on the first tab */ }
select(start, false);

// Measure again when the window resizes or the fonts arrive; animate the thumb only after the first placement
window.addEventListener('resize', placeThumb);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeThumb);
requestAnimationFrame(function () { toggle.classList.add('ready'); });

// A gentle 3D tilt toward the pointer (mouse only, never with reduced motion)
if (!reduce && window.matchMedia && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', function (e) {
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    visual.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
    visual.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg');
  });
  hero.addEventListener('mouseleave', function () {
    visual.style.setProperty('--ry', '0deg');
    visual.style.setProperty('--rx', '0deg');
  });
}`,
  seo: {
    title: 'Hero with Audience Toggle Switcher — Free HTML CSS JS',
    description: 'A dark hero with a sliding toggle that rewrites the headline and buttons and swaps a product card for developers, teams and enterprise. Free HTML, CSS and JS.',
    about: {
      title: 'Hero with Audience Toggle Switcher — One Hero, Three Messages',
      description: `A single hero rarely speaks to every audience equally well. "Type-safe SDKs" reads as noise to a team lead, "one workspace, zero silos" undersells the product to an engineer, and neither answers the question a security reviewer asks first. Instead of building three landing pages, this hero lets visitors pick who they are with a sliding toggle, then rewrites the eyebrow, headline, subheading, both buttons and the proof points in place. It also swaps the card on the right, so a developer sees a code window, a team sees a project board and an enterprise buyer sees their security settings, and the whole page recolours to match.

**A sliding thumb that measures itself**

The toggle is a row of \`role="tab"\` buttons over one absolutely positioned \`.ats-thumb\`. On every selection, \`placeThumb()\` reads the active tab's \`offsetLeft\` and \`offsetWidth\` and writes them to two CSS variables, \`--x\` and \`--w\`; the thumb uses them in a \`translateX()\` and a \`width\` that are both transitioned with a springy \`cubic-bezier\`. Because the thumb is measured rather than assumed to be half the track, tabs can have labels of any length and there can be any number of them. Add a fourth \`.ats-opt\` and a fourth key in \`COPY\` and nothing else changes.

**The whole palette glides, not just the button**

The hero sets three custom properties, \`--a\`, \`--a2\` and \`--t\` (two gradient colours and a light text accent), per \`data-audience\` value. They are registered with \`@property\` as \`<color>\` values, which is what lets a \`transition\` on \`--a\` interpolate the colour instead of snapping. The background orbs, the thumb, the primary button, the headline highlight, the eyebrow pill and the card glow all read those variables, so one attribute change retints everything together. In a browser without \`@property\` support the colours still change, just without the glide.

**A full copy object per audience**

The \`COPY\` object holds a complete set of strings per audience: eyebrow, headline, subheading, both button labels and a list of proof points. \`select(key)\` writes every field in one pass rather than swapping a word inside a fixed sentence, so each audience's messaging can be written, reviewed and changed by whoever owns it. The headline is the only field written with \`innerHTML\`, because it carries a deliberate \`<br>\` and an \`<em>\` for the gradient highlight; everything else uses \`textContent\`, and the proof list is built with \`createElement\`.

**Fade out, write, fade in**

Before new text is written, the copy elements get an \`.is-out\` class that fades them to \`opacity: 0\` with a small upward shift and blur. A 180ms timeout, matched to that transition, waits for the fade to finish, writes the new strings and removes the class. Each element has its own \`--i\` index, so the way back in is staggered by 45ms per element. An instant swap would read as a flicker; this makes the change look deliberate.

**One visual card per audience**

The right-hand side holds three cards stacked in the same CSS grid cell with \`grid-area: 1 / 1\`, so the container is always as tall as the tallest card and nothing jumps. Only the card marked \`.on\` is visible; the others sit at \`opacity: 0\` and \`visibility: hidden\`, with the visibility change delayed so the fade completes. A soft tilt follows the pointer on devices that can hover.

**Keyboard and accessibility**

The toggle is a proper tab list: \`aria-selected\` follows the active tab, \`aria-controls\` points at the panel, \`aria-labelledby\` on the panel is updated to the active tab, and tabindex roves so the arrow keys, Home and End move between tabs. Animations are switched off for visitors who prefer reduced motion, and the tilt is never enabled for them.

**Remembering the choice and deep links**

The last choice is saved to \`localStorage\` (inside a try/catch, since storage can throw in private browsing), and a link ending in \`?audience=enterprise\` opens that tab first. That makes it easy to send each audience from an ad, an email or a docs page straight to its own version of the hero.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick an audience', text: 'Click Developers, Teams or Enterprise, or focus the toggle and use the arrow keys. The copy, buttons, proof points, card and colours all change together.' },
        { title: 'Write your own copy', text: 'In the JS panel, edit the strings inside the COPY object for each audience. The headline accepts a <br> and an <em> for the gradient highlight.' },
        { title: 'Swap the visual cards', text: 'In the HTML panel, edit the three .ats-card blocks (code window, project board, security settings) or replace them with a screenshot of your product.' },
        { title: 'Change the palette', text: 'In the CSS panel, change the --a, --a2 and --t values on .ats-hero[data-audience] to your brand colours for each audience.' },
        { title: 'Add or remove an audience', text: 'Add a key to COPY and ORDER, a matching tab button with a data-audience attribute, and a .ats-card with a data-for attribute. The thumb measures itself, so no CSS maths changes.' },
        { title: 'Link straight to an audience', text: 'Add ?audience=team (or any key from COPY) to the page address and that tab opens first. Without it, the last choice is restored from localStorage.' },
        { title: 'Export in your format', text: 'Use Export for a standalone HTML file, a React component or a React + Tailwind version.' },
      ],
    },
    features: [
      'Three audiences out of the box, and any number supported by the self-measuring thumb',
      'Sliding pill toggle whose position and width are measured from the active tab',
      'Whole-page recolour through registered @property colour variables that animate',
      'A different product card per audience: code window, project board, security settings',
      'Full copy object per audience: eyebrow, headline, subheading, both buttons, proof points',
      'Fade-out, write, staggered fade-in so the text swap never flickers',
      'Aurora background with blurred orbs and a masked grid that follow the palette',
      'Roving-tabindex tab list with arrow keys, Home and End, plus aria-selected and aria-controls',
      'Remembers the last choice in localStorage and opens ?audience=key links directly',
      'Pointer tilt on the card for mouse users, with prefers-reduced-motion respected',
      'Responsive: stacks and centres on tablets and phones',
      'Export as HTML file, React JSX or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'APP', title: 'Dev-tool and platform landing pages', desc: 'Speak to the engineer evaluating the API and to the manager signing off on it, without maintaining two separate pages.' },
      { icon: 'FLOW', title: 'B2B SaaS with several buyers', desc: 'Show the individual, the team lead and the security reviewer the part of the product each one cares about, from one URL.' },
      { icon: 'DESIGN', title: 'Marketplaces: buyers and sellers', desc: 'Swap the hero between "Start shopping" and "Start selling" with the same toggle, card swap and recolour.' },
      { icon: 'CODE', title: 'Ad and email landing pages', desc: 'Send each campaign to its audience with ?audience=team so the page opens already speaking to that visitor.' },
      { icon: 'LEARN', title: 'Learn the registered-property trick', desc: 'Study how @property turns an instant custom-property change into a smooth colour transition across every element that uses it.' },
      { icon: 'FORM', title: 'Pair with a stats row', desc: 'Combine with the [Hero with Animated Stat Counters](/ui-snippets/hero-stats-counter-row/) for a hero that counts up and adapts to its audience.' },
    ],
    faqs: [
      { q: 'How does the sliding thumb know where to go?', a: 'On every selection, placeThumb() reads the active tab\'s offsetLeft and offsetWidth and writes them to the --x and --w CSS variables on the toggle. The thumb applies them as a translateX and a width, both with a transition, so it fits any label and any number of tabs. It is measured again on resize and when the fonts finish loading.' },
      { q: 'How does the whole page change colour smoothly?', a: 'The hero defines --a, --a2 and --t per data-audience value, and they are registered with @property as colour values. A registered property can be transitioned, so changing the attribute makes the browser interpolate the colour for every element that uses the variable. Without @property support the colours simply switch instantly.' },
      { q: 'Why fade the text out before changing it?', a: 'An instant swap reads as a layout glitch. The copy elements get an .is-out class (opacity 0, a small shift and blur), a 180ms timeout matched to that transition waits, and then the strings are written and the class removed so they fade back in, one after another using their --i delay.' },
      { q: 'Why does only the headline use innerHTML?', a: 'The headline copy holds a <br> for the line break and an <em> for the gradient highlight, which need markup. The eyebrow, subheading and buttons use textContent, and the proof list is built with createElement, which is the safer default when no markup is needed.' },
      { q: 'How do I add a fourth audience?', a: 'Add a key to the COPY object and to ORDER, a tab button with a matching data-audience in the toggle, and a .ats-card with data-for set to the same key. Add a [data-audience] block in the CSS for its colours. The thumb measures the active tab, so there is no width or translate maths to change.' },
      { q: 'Does it remember the choice, and can I link to one audience?', a: 'Yes to both. The clicked key is saved to localStorage, and on load the page opens ?audience=key from the address if present, then the saved choice, then the first tab. Storage access is wrapped in try/catch, so private browsing falls back to the first tab.' },
      { q: 'Can the rest of the page react to the toggle too?', a: 'Yes. Fire a custom event from select(), for example document.dispatchEvent(new CustomEvent("audiencechange", { detail: key })), and let a pricing table or testimonial section listen for it. The data-audience attribute on the hero is also available to your own CSS.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how the registered @property colour variables make the whole hero recolour smoothly, and what you would see without them. It can also walk through why placeThumb() measures offsetLeft and offsetWidth instead of using fixed percentages, and where the 180ms timeout has to match the CSS transition. For next steps the code does not already have, ask it to fire a custom audiencechange event so a pricing table below can switch with the hero, to send an analytics event on every tab change, to pick the starting audience from a UTM parameter or the referrer, or to move the COPY object into a CMS or JSON file so marketing can edit each audience without touching code. Treat the snippet as a starting point for a conversation, not a finished artifact.`,
      prompt: `Build a dark, premium hero section in plain HTML, CSS and vanilla JavaScript that speaks to three audiences (Developers, Teams, Enterprise) through a sliding tab toggle. No libraries.

Requirements:
- Layout: a centred pill-shaped toggle at the top, then a two-column panel (copy on the left, a product card on the right) that stacks and centres below 900px. Use a deep navy background with two blurred colour orbs that drift slowly and a faint grid that fades out toward the edges with a radial mask.
- Toggle: three buttons with small inline SVG icons inside one pill, over a single absolutely positioned "thumb" with a gradient fill and glow. After every selection, measure the active button (offsetLeft and offsetWidth), write them to CSS variables, and let the thumb translate and resize with a springy cubic-bezier transition, so any label length and any number of tabs works. Place the thumb without animation on first load.
- Accessibility: role="tablist" with role="tab" buttons, aria-selected, aria-controls pointing at a role="tabpanel" whose aria-labelledby follows the active tab, roving tabindex, and Arrow keys, Home and End to move between tabs. Visible focus rings. Respect prefers-reduced-motion.
- Copy: one JavaScript object with a full set per audience (eyebrow, headline with a <br> and an <em>, subheading, primary and secondary button labels, and three proof points). On selection, fade the eyebrow, headline, subheading, buttons and proof list to opacity 0 with a small upward shift and blur, write the new copy after a timeout matched to the transition, then fade back in with a 45ms stagger per element (a --i index). Use innerHTML only for the headline, with a comment explaining why, and textContent or createElement elsewhere.
- Theming: define three custom properties per data-audience value on the hero (two gradient colours and a light text accent: blue and violet for developers, emerald and teal for teams, violet and fuchsia for enterprise), registered with @property as colours so that a transition on them animates. Use them for the orbs, the thumb, the primary button, the eyebrow pill, the gradient on the headline's <em> and the card glow.
- Visuals: three glass cards stacked in the same CSS grid cell, only the active one visible (fade, slide, blur; visibility delayed so the fade completes). Developers: a code window with traffic-light dots, syntax-coloured TypeScript for an SDK call and a "201 Created, 38 ms" footer. Teams: a project board with avatars, a progress bar, four tasks with check circles and status pills, and a floating "Maya moved Pricing page to Done" chip. Enterprise: a security settings panel with a shield icon, four rows (SSO, audit log, data residency, role-based access) with on-switches, and a floating "SOC 2 Type II and ISO 27001" chip.
- Details: a primary gradient button with an arrow that nudges on hover, a glass secondary button, a pulsing dot in the eyebrow, a gentle 3D tilt of the card toward the mouse on devices that can hover, and the last choice saved to localStorage in a try/catch. Open ?audience=key from the address first if present.`,
    },
  },
};

export default heroAudienceToggleSwitcher;
