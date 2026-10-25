import { IMG } from './meta.js';

/* Login and Register screens share one structure (makeAuth). A centred card, or a split layout
   with an image panel and a quote; optional social sign-in buttons (the badge letter comes from
   the provider via CSS, no brand artwork is embedded); the form posts normally to the address
   you give it (your own backend, Firebase, Auth0, Netlify Identity or any service). The `auth`
   behaviour (behaviors.js) adds show / hide password, a password strength hint and a matching
   check on the register form; nothing is sent from the editor previews. */

const PROVIDERS = [['google', 'Google'], ['github', 'GitHub'], ['apple', 'Apple'], ['microsoft', 'Microsoft'], ['facebook', 'Facebook']];

const uri = svg => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
const svg = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;
const MARKS = {
  google: svg('0 0 48 48', '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>'),
  microsoft: svg('0 0 24 24', '<path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/><path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#FFB900" d="M13 13h10v10H13z"/>'),
  facebook: svg('0 0 24 24', '<path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07"/>'),
  // one-colour marks follow the text colour (CSS mask), so they stay visible on dark themes
  github: svg('0 0 24 24', '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'),
  apple: svg('0 0 24 24', '<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>'),
};
const MONO = ['github', 'apple'];
const BADGE_CSS = Object.entries(MARKS).map(([k, v]) => MONO.includes(k)
  ? `[data-prov=${k}] .au-badge{background-color:currentColor;-webkit-mask:${uri(v)} center/contain no-repeat;mask:${uri(v)} center/contain no-repeat}`
  : `[data-prov=${k}] .au-badge{background-image:${uri(v)}}`).join('');

const EYE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/></svg>';

const textField = (key, group, label, value, extra = {}) => ({ key, group, label, type: 'text', value, ...extra });

export function makeAuth(mode) {
  const reg = mode === 'register';
  const id = reg ? 'register-form' : 'login-form';

  const html = `<div class="st-wrap au">
  <div class="au-card">
    <div class="au-panel" data-show="showPanel">
      <img class="au-panel-img" data-image="panelImage" data-optional alt="" loading="lazy">
      <figure class="au-quote">
        <blockquote data-edit="quote"></blockquote>
        <figcaption data-edit="quoteBy"></figcaption>
      </figure>
    </div>
    <div class="au-main">
      <header class="au-head">
        <span class="st-icon au-icon" data-show="showIcon" data-icon="icon" data-anim="item"></span>
        <h2 class="au-h" data-anim="item" data-anim-text data-edit="heading"></h2>
        <p class="au-lead" data-anim="item" data-edit="lead"></p>
      </header>
      <div class="au-social" data-show="showSocial" data-anim="item">
        <ul class="au-provs" data-list="providers">
          <li data-set="data-prov:provider"><a class="au-prov" data-href="url"><span class="au-badge" aria-hidden="true"></span><span data-edit="label"></span></a></li>
        </ul>
        <p class="au-or"><span data-edit="dividerText"></span></p>
      </div>
      <form class="au-form" data-auth method="post" data-set="action:formAction" data-anim="item">
${reg ? `        <div class="au-field" data-show="showName">
          <label class="au-label" for="au-name"><span data-edit="nameLabel"></span></label>
          <input class="au-input" id="au-name" type="text" autocomplete="name" data-set="name:nameName;placeholder:namePlaceholder">
        </div>
` : ''}        <div class="au-field">
          <label class="au-label" for="au-email"><span data-edit="emailLabel"></span></label>
          <input class="au-input" id="au-email" type="email" required autocomplete="${reg ? 'email' : 'username'}" data-set="name:emailName;placeholder:emailPlaceholder">
        </div>
        <div class="au-field">
          <label class="au-label" for="au-pw"><span data-edit="passwordLabel"></span></label>
          <div class="au-pw">
            <input class="au-input" id="au-pw" type="password" required data-pw autocomplete="${reg ? 'new-password' : 'current-password'}"${reg ? ' minlength="8"' : ''} data-set="name:passwordName;placeholder:passwordPlaceholder">
            <button type="button" class="au-eye" data-pw-toggle aria-pressed="false" data-set="aria-label:pwToggleLabel">${EYE}</button>
          </div>
${reg ? `          <div class="au-meter" data-pw-meter data-show="showMeter" data-level="0" data-set="data-levels:meterLevels"><span class="au-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="au-meter-text" role="status"></span></div>
          <p class="au-hint" data-show-if="passwordHint" data-edit="passwordHint"></p>
` : ''}        </div>
${reg ? `        <div class="au-field" data-show="showConfirm">
          <label class="au-label" for="au-pw2"><span data-edit="confirmLabel"></span></label>
          <div class="au-pw">
            <input class="au-input" id="au-pw2" type="password" required data-pw-confirm autocomplete="new-password" data-set="name:confirmName;placeholder:confirmPlaceholder;data-mismatch:mismatchText">
          </div>
        </div>
        <label class="au-check au-terms" data-show="showTerms"><input type="checkbox" name="terms" required><span><span data-edit="termsText"></span> <a data-href="termsUrl"><span data-edit="termsLink"></span></a></span></label>
` : `        <div class="au-row">
          <label class="au-check" data-show="showRemember"><input type="checkbox" name="remember" value="1"><span data-edit="rememberLabel"></span></label>
          <a class="au-link" data-show="showForgot" data-href="forgotUrl"><span data-edit="forgotText"></span></a>
        </div>
`}        <button class="st-btn au-btn" type="submit"><span data-edit="button"></span></button>
      </form>
      <p class="au-switch" data-anim="item"><span data-edit="switchText"></span> <a class="au-link" data-href="switchUrl"><span data-edit="switchLink"></span></a></p>
      <p class="au-note" data-show-if="note" data-edit="note"></p>
    </div>
  </div>
</div>`;

  const css = `.st-${id}{padding:clamp(48px,7cqi,96px) 0;background:var(--st-surface)}
.au{display:flex;justify-content:center}
.au-card{display:grid;grid-template-columns:minmax(0,1fr);width:100%;max-width:460px;overflow:hidden;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-bg);box-shadow:0 30px 70px -30px color-mix(in srgb,var(--st-text) 45%,transparent),0 0 0 1px color-mix(in srgb,var(--st-text) 7%,transparent)}
.au-card:has(.au-panel){max-width:980px;grid-template-columns:minmax(0,5fr) minmax(0,6fr)}
.au-panel{position:relative;display:flex;align-items:flex-end;min-height:420px;background:var(--st-text);color:#fff;overflow:hidden}
.au-panel-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9}
.au-panel::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(8,10,20,.82),rgba(8,10,20,.05) 70%)}
.au-quote{position:relative;z-index:1;padding:clamp(24px,3cqi,40px)}
.au-quote blockquote{font:700 clamp(19px,1.2cqi + 12px,24px)/1.35 var(--st-font-heading);letter-spacing:-.01em}
.au-quote figcaption{margin-top:12px;font-size:14.5px;opacity:.85}
.au-quote blockquote:empty,.au-quote figcaption:empty{display:none}
.au-main{display:flex;flex-direction:column;gap:18px;padding:clamp(28px,4cqi,48px)}
.au-head{display:flex;flex-direction:column;align-items:flex-start;gap:10px}
.au-icon{margin-bottom:4px}
.au-h{font-size:clamp(28px,2cqi + 16px,38px)}
.au-lead{color:var(--st-muted);font-size:16px}
.au-provs{list-style:none;display:grid;gap:10px}
.au-prov{display:flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 16px;border:1.5px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:600 15px/1 var(--st-font-body);text-decoration:none;transition:border-color .2s ease,background .2s ease}
.au-prov:hover{border-color:var(--st-brand);background:color-mix(in srgb,var(--st-brand) 5%,var(--st-bg))}
.au-prov:focus-visible,.au-link:focus-visible,.au-eye:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.au-badge{flex:none;width:22px;height:22px;background:center/contain no-repeat}
${BADGE_CSS}
.au-or{display:flex;align-items:center;gap:12px;margin-top:18px;color:var(--st-muted);font-size:13.5px}
.au-or::before,.au-or::after{content:"";flex:1;height:1px;background:color-mix(in srgb,var(--st-text) 12%,transparent)}
.au-or:has(span:empty)::before,.au-or:has(span:empty)::after{display:none}
.au-form{display:flex;flex-direction:column;gap:16px}
.au-field{display:flex;flex-direction:column;gap:6px}
.au-label{font-size:14px;font-weight:700}
.au-input{width:100%;min-height:50px;padding:0 14px;border:1.5px solid color-mix(in srgb,var(--st-text) 18%,transparent);border-radius:calc(var(--st-radius) * .7px);background:var(--st-bg);color:var(--st-text);font:500 16px/1 var(--st-font-body);outline:none;transition:border-color .2s ease,box-shadow .2s ease}
.au-input:focus{border-color:var(--st-brand);box-shadow:0 0 0 4px color-mix(in srgb,var(--st-brand) 16%,transparent)}
.au-input:user-invalid{border-color:#dc2626}
.au-pw{position:relative}
.au-pw .au-input{padding-right:48px}
.au-eye{position:absolute;top:50%;right:6px;display:grid;place-items:center;width:38px;height:38px;margin-top:-19px;border:0;border-radius:8px;background:none;color:var(--st-muted);cursor:pointer}
.au-eye:hover,.au-eye.is-on{color:var(--st-brand)}
.au-hint{font-size:13px;color:var(--st-muted)}
.au-hint:empty{display:none}
.au-meter{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--st-muted)}
.au-bars{display:flex;gap:4px;flex:1;max-width:140px}
.au-bars i{flex:1;height:5px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 12%,transparent);transition:background .25s ease}
.au-meter[data-level="1"] .au-bars i:nth-child(-n+1){background:#ef4444}
.au-meter[data-level="2"] .au-bars i:nth-child(-n+2){background:#f59e0b}
.au-meter[data-level="3"] .au-bars i:nth-child(-n+3){background:#84cc16}
.au-meter[data-level="4"] .au-bars i{background:#16a34a}
.au-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.au-row:not(:has(.au-check,.au-link)){display:none}
.au-check{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;cursor:pointer}
.au-check input{flex:none;width:18px;height:18px;margin-top:2px;accent-color:var(--st-brand)}
.au-link{color:var(--st-brand);font-weight:700;text-decoration:none}
.au-link:hover,.au-check a:hover{text-decoration:underline}
.au-check a{color:var(--st-brand);font-weight:600}
.au-btn{width:100%;margin-top:4px}
.au-switch{text-align:center;font-size:15px;color:var(--st-muted)}
.au-note{text-align:center;font-size:13px;color:var(--st-muted)}
.au-note:empty{display:none}
@container st (max-width:860px){.au-card:has(.au-panel){max-width:460px;grid-template-columns:1fr}.au-panel{min-height:200px}}`;

  const social = (label, p) => ({ provider: p, label, url: '#' });
  return {
    id,
    name: reg ? 'Register Form (Sign Up Page)' : 'Login Form (Sign In Page)',
    version: '1.0.0',
    category: 'auth',
    behaviors: ['auth'],
    created: '2026-10-25',
    updated: '2026-10-25',
    tags: reg ? ['register', 'sign-up', 'signup', 'create-account', 'form', 'password', 'social-login', 'auth', 'light'] : ['login', 'sign-in', 'signin', 'form', 'password', 'social-login', 'auth', 'light'],
    bestFor: reg
      ? ['Sign-up and create-account pages', 'Trial and free-plan registration', 'Membership and community join pages']
      : ['Login and sign-in pages', 'Customer, member and admin portals', 'Gated content and client areas'],
    groups: [
      { id: 'header', label: 'Heading' },
      { id: 'form', label: 'Form' },
      { id: 'social', label: 'Social sign-in', toggle: 'showSocial' },
      { id: 'panel', label: 'Image panel (split layout)', toggle: 'showPanel' },
    ],
    fields: [
      { key: 'icon', group: 'header', label: 'Icon', type: 'icon', value: reg ? 'user-round' : 'lock' },
      { key: 'showIcon', group: 'header', label: 'Show icon', type: 'switch', toggle: 'showIcon' },
      { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: reg ? 'Create your *account*' : 'Welcome *back*' },
      { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: reg ? 'Start free. No credit card needed, and you can cancel any time.' : 'Sign in to your account to pick up where you left off.' },

      { key: 'formAction', group: 'form', label: 'Form URL (action)', type: 'url', value: reg ? 'https://webdevpuneet.com/account/register' : 'https://webdevpuneet.com/account/login', hint: 'Where the form posts to: your own sign-in endpoint, or the address your auth service gives you.' },
      ...(reg ? [
        textField('nameLabel', 'form', 'Name label', 'Full name'),
        textField('namePlaceholder', 'form', 'Name placeholder', 'Your name'),
        textField('nameName', 'form', 'Name field name', 'name', { hint: 'The field names your backend expects.' }),
      ] : []),
      textField('emailLabel', 'form', 'Email label', 'Email address'),
      textField('emailPlaceholder', 'form', 'Email placeholder', 'you@example.com'),
      textField('emailName', 'form', 'Email field name', 'email'),
      textField('passwordLabel', 'form', 'Password label', 'Password'),
      textField('passwordPlaceholder', 'form', 'Password placeholder', reg ? 'At least 8 characters' : 'Your password'),
      textField('passwordName', 'form', 'Password field name', 'password'),
      textField('pwToggleLabel', 'form', 'Show-password button label (screen readers)', 'Show password'),
      ...(reg ? [
        textField('passwordHint', 'form', 'Password hint (optional)', 'Use 8 or more characters with a mix of letters and numbers.'),
        textField('meterLevels', 'form', 'Strength words (4, comma separated)', 'Weak,Fair,Good,Strong'),
        { key: 'showMeter', group: 'form', label: 'Show password strength', type: 'switch', toggle: 'showMeter' },
        { key: 'showName', group: 'form', label: 'Ask for a name', type: 'switch', toggle: 'showName' },
        { key: 'showConfirm', group: 'form', label: 'Ask to confirm the password', type: 'switch', toggle: 'showConfirm' },
        textField('confirmLabel', 'form', 'Confirm label', 'Confirm password'),
        textField('confirmPlaceholder', 'form', 'Confirm placeholder', 'Repeat your password'),
        textField('confirmName', 'form', 'Confirm field name', 'password_confirmation'),
        textField('mismatchText', 'form', 'Message when passwords differ', 'Passwords do not match'),
        { key: 'showTerms', group: 'form', label: 'Require agreeing to terms', type: 'switch', toggle: 'showTerms' },
        textField('termsText', 'form', 'Terms text', 'I agree to the'),
        textField('termsLink', 'form', 'Terms link text', 'Terms and Privacy Policy'),
        { key: 'termsUrl', group: 'form', label: 'Terms link', type: 'url', value: '/terms/' },
      ] : [
        { key: 'showRemember', group: 'form', label: 'Show “remember me”', type: 'switch', toggle: 'showRemember' },
        textField('rememberLabel', 'form', 'Remember-me label', 'Keep me signed in'),
        { key: 'showForgot', group: 'form', label: 'Show “forgot password”', type: 'switch', toggle: 'showForgot' },
        textField('forgotText', 'form', 'Forgot-password text', 'Forgot password?'),
        { key: 'forgotUrl', group: 'form', label: 'Forgot-password link', type: 'url', value: '/forgot-password/' },
      ]),
      textField('button', 'form', 'Button text', reg ? 'Create account' : 'Sign in'),
      textField('switchText', 'form', 'Switch text', reg ? 'Already have an account?' : 'New here?'),
      textField('switchLink', 'form', 'Switch link text', reg ? 'Sign in' : 'Create an account'),
      { key: 'switchUrl', group: 'form', label: 'Switch link', type: 'url', value: reg ? '/login/' : '/register/' },
      textField('note', 'form', 'Note at the bottom (optional)', reg ? '' : 'Protected by industry-standard encryption.'),

      textField('dividerText', 'social', 'Text between buttons and form', reg ? 'or sign up with email' : 'or sign in with email'),

      { key: 'panelImage', group: 'panel', label: 'Panel image', type: 'image', value: IMG('hero-portrait.jpg'), hint: 'About 900×1100 px. Shown beside the form on wide screens.', upload: { name: 'panel', maxW: 1200 } },
      { key: 'panelImageAlt', group: 'panel', label: 'Alt text', type: 'text', value: 'A smiling customer' },
      { key: 'quote', group: 'panel', label: 'Quote (optional)', type: 'textarea', value: reg ? '“Setting up took ten minutes, and the whole team was using it by lunch.”' : '“I can find everything in seconds. It has changed how our team works.”' },
      { key: 'quoteBy', group: 'panel', label: 'Quote by (optional)', type: 'text', value: 'Amara Okoye, Head of Operations' },
    ],
    lists: [{
      key: 'providers', group: 'social', label: 'Buttons', itemLabel: 'Button', titleKey: 'label', min: 1, max: 4,
      fields: [
        { key: 'provider', label: 'Service', type: 'choice', options: PROVIDERS, value: 'google' },
        { key: 'label', label: 'Button text', type: 'text', value: 'Continue with Google' },
        { key: 'url', label: 'Link', type: 'url', value: '#', hint: 'Your sign-in address for this service.' },
      ],
      value: [social(reg ? 'Sign up with Google' : 'Continue with Google', 'google'), social(reg ? 'Sign up with GitHub' : 'Continue with GitHub', 'github')],
    }],
    toggles: reg
      ? [{ key: 'showIcon', label: 'Icon', value: true }, { key: 'showSocial', label: 'Social sign-in', value: true }, { key: 'showPanel', label: 'Image panel', value: false }, { key: 'showMeter', label: 'Strength', value: true }, { key: 'showName', label: 'Name', value: true }, { key: 'showConfirm', label: 'Confirm', value: true }, { key: 'showTerms', label: 'Terms', value: true }]
      : [{ key: 'showIcon', label: 'Icon', value: true }, { key: 'showSocial', label: 'Social sign-in', value: true }, { key: 'showPanel', label: 'Image panel', value: false }, { key: 'showRemember', label: 'Remember me', value: true }, { key: 'showForgot', label: 'Forgot password', value: true }],
    theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f4f4f8', text: '#0f172a', muted: '#475569', radius: '14' },
    fonts: { heading: 'jakarta', body: 'inter' },
    html,
    css,
  };
}
