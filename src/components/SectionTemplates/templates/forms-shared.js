/* Shared parts of the Forms category: markup helpers, the field lists every form needs (action URL,
   button, note, success and error text) and one stylesheet (FK_CSS) for every control: inputs, floating
   labels, selects, option cards, chips, switches, star and 0-10 ratings, steppers, file drop areas,
   character counters, progress bars and code boxes. The interactive bits (wizard steps, code boxes,
   steppers, file names, counters, amount chips) live in BEHAVIORS.formkit (behaviors.js).
   Every form posts through BEHAVIORS.form (fetch to the Formspree-style action URL, success and error
   messages, a honeypot field) and works as a normal POST without JavaScript. */
import { FORM_CSS } from './parts.js';

const CHECK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 0L7 9m5-5 5 5"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>';
const STAR = '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.2 1.2-6.5L2.5 9.5l6.6-.9z"/></svg>';
export const ICON_UPLOAD = UPLOAD;
export const ICON_STAR = STAR;

/* ── Markup helpers ─────────────────────────────────────────────────────────── */
export const HONEYPOT = '<input class="st-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">';

/** Opening of every form: <form data-form> and the fields wrapper that fades out on success */
export const formTop = (attrs = '') => `<form class="st-form fk" method="post" data-form data-set="action:formAction"${attrs ? ' ' + attrs : ''}>
      <div class="st-form-fields" data-form-fields>`;

/** The submit button and the note under it */
export const submitHtml = ({ btnClass = '', noteClass = '' } = {}) => `${HONEYPOT}
        <button class="st-btn st-form-btn${btnClass ? ' ' + btnClass : ''}" type="submit"><span data-edit="submit"></span></button>
        <p class="st-form-note${noteClass ? ' ' + noteClass : ''}" data-show-if="note" data-edit="note"></p>`;

/** The error message and the success message, closing the form (after the last field) */
export const formClose = () => `        <p class="st-form-error" data-form-error hidden role="alert" data-edit="errorText"></p>
      </div>
      <div class="st-form-success" data-form-success hidden tabindex="-1" role="status">
        <span class="st-icon">${CHECK}</span>
        <h3 data-edit="successTitle"></h3>
        <p data-edit="successText"></p>
      </div>
    </form>`;

/** Button, note, error and the success message, closing the form */
export const formBottom = opts => `        ${submitHtml(opts)}
${formClose()}`;

/** A labelled text-like input. opts: type, required, auto (autocomplete), mode (inputmode), ph (data-set placeholder key), optional (hides the label when the label field is empty), extra (raw attributes) */
export const fText = (name, labelKey, { type = 'text', required = false, auto = '', mode = '', ph = '', optional = false, extra = '' } = {}) =>
  `<label class="st-field"${optional ? ` data-show-if="${labelKey}"` : ''}><span data-edit="${labelKey}"></span><input name="${name}" type="${type}"${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${mode ? ` inputmode="${mode}"` : ''}${ph ? ` data-set="placeholder:${ph}"` : ''}${extra ? ' ' + extra : ''}></label>`;

export const fArea = (name, labelKey, { rows = 4, required = false, max = 0, optional = false, counter = false } = {}) =>
  counter
    ? `<label class="st-field"${optional ? ` data-show-if="${labelKey}"` : ''}><span data-edit="${labelKey}"></span><span class="fk-count" data-fk-count><textarea name="${name}" rows="${rows}"${required ? ' required' : ''}${max ? ` maxlength="${max}"` : ''}></textarea><span class="fk-counter" data-fk-counter aria-live="polite">0${max ? ' / ' + max : ''}</span></span></label>`
    : `<label class="st-field"${optional ? ` data-show-if="${labelKey}"` : ''}><span data-edit="${labelKey}"></span><textarea name="${name}" rows="${rows}"${required ? ' required' : ''}></textarea></label>`;

/** A <select> whose options come from a list field (item field "name") */
export const fSelect = (name, labelKey, listKey, { required = false, optional = false, auto = '' } = {}) =>
  `<label class="st-field"${optional ? ` data-show-if="${labelKey}"` : ''}><span data-edit="${labelKey}"></span><select name="${name}"${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''} data-list="${listKey}"><option data-set="value:name" data-edit="name"></option></select></label>`;

/** A floating-label input: the label sits in the box and moves up when the field is focused or filled */
export const fFloat = (name, labelKey, { type = 'text', required = false, auto = '', mode = '' } = {}) =>
  `<label class="fk-fl"><input name="${name}" type="${type}" placeholder=" "${required ? ' required' : ''}${auto ? ` autocomplete="${auto}"` : ''}${mode ? ` inputmode="${mode}"` : ''}><span data-edit="${labelKey}"></span></label>`;
export const fFloatArea = (name, labelKey, { rows = 4, required = false } = {}) =>
  `<label class="fk-fl fk-fl--area"><textarea name="${name}" rows="${rows}" placeholder=" "${required ? ' required' : ''}></textarea><span data-edit="${labelKey}"></span></label>`;

/** A checkbox with text (consent, newsletter opt-in) */
export const fCheck = (name, textKey, { required = false, optional = false, value = 'yes' } = {}) =>
  `<label class="fk-check"${optional ? ` data-show-if="${textKey}"` : ''}><input type="checkbox" name="${name}" value="${value}"${required ? ' required' : ''}><span data-edit="${textKey}"></span></label>`;

/** A group of option cards from a list (radio = one choice, checkbox = several). Item fields: name, desc (optional), value (optional) */
export const fOptions = (name, legendKey, listKey, { type = 'radio', required = false, look = 'card', optional = false } = {}) =>
  `<fieldset class="fk-group"${optional ? ` data-show-if="${legendKey}"` : ''}><legend class="fk-legend" data-edit="${legendKey}"></legend><div class="fk-options fk-options--${look}" data-list="${listKey}"><label class="fk-opt"><input type="${type}" name="${name}${type === 'checkbox' ? '[]' : ''}" data-set="value:name"${required && type === 'radio' ? ' required' : ''}><span class="fk-opt-body"><span class="fk-opt-title" data-edit="name"></span><span class="fk-opt-desc" data-show-if="desc" data-edit="desc"></span></span></label></div></fieldset>`;

/** Pill-shaped multi choice from a list (item field: name) */
export const fChips = (name, legendKey, listKey, { type = 'checkbox', optional = false } = {}) =>
  `<fieldset class="fk-group"${optional ? ` data-show-if="${legendKey}"` : ''}><legend class="fk-legend" data-edit="${legendKey}"></legend><div class="fk-chips" data-list="${listKey}"><label class="fk-chip"><input type="${type}" name="${name}${type === 'checkbox' ? '[]' : ''}" data-set="value:name"><span data-edit="name"></span></label></div></fieldset>`;

/** A file drop area; the chosen file name shows inside (formkit) */
export const fDrop = (name, titleKey, hintKey, { accept = '', multiple = false, required = false } = {}) =>
  `<label class="fk-drop" data-fk-drop><input type="file" name="${name}"${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''}${required ? ' required' : ''}><span class="fk-drop-icon">${UPLOAD}</span><strong class="fk-drop-title" data-edit="${titleKey}"></strong><small class="fk-drop-hint" data-show-if="${hintKey}" data-edit="${hintKey}"></small><span class="fk-drop-name" data-fk-file aria-live="polite"></span></label>`;

/** Five stars, CSS only (needs :has). Radios named `name`, values 1-5 */
export const fStars = (name, legendKey, { required = false } = {}) =>
  `<fieldset class="fk-group"><legend class="fk-legend" data-edit="${legendKey}"></legend><div class="fk-stars">${[1, 2, 3, 4, 5].map(n => `<label><input type="radio" name="${name}" value="${n}"${required && n === 1 ? ' required' : ''}><span class="visually-hidden fk-sr">${n} star${n > 1 ? 's' : ''}</span>${STAR}</label>`).join('')}</div></fieldset>`;

/** A 0-10 scale (net promoter score) */
export const fScale = (name, legendKey, lowKey, highKey, { from = 0, to = 10, required = false } = {}) => {
  const items = [];
  for (let i = from; i <= to; i++) items.push(`<label><input type="radio" name="${name}" value="${i}"${required && i === from ? ' required' : ''}><span>${i}</span></label>`);
  return `<fieldset class="fk-group"><legend class="fk-legend" data-edit="${legendKey}"></legend><div class="fk-scale">${items.join('')}</div><div class="fk-scale-ends"><span data-edit="${lowKey}"></span><span data-edit="${highKey}"></span></div></fieldset>`;
};

/** Plus / minus number input (formkit) */
export const fStepper = (name, labelKey, { min = 1, max = 10, value = 1 } = {}) =>
  `<div class="st-field fk-stepper-field"><span data-edit="${labelKey}"></span><span class="fk-stepper" data-fk-stepper><button type="button" data-fk-dec aria-label="Less">−</button><input name="${name}" type="number" inputmode="numeric" min="${min}" max="${max}" value="${value}" aria-label="${name}"><button type="button" data-fk-inc aria-label="More">+</button></span></div>`;

/* ── Field lists for the editor ─────────────────────────────────────────────── */
export const lbl = (key, label, value, group = 'form', extra = {}) => ({ key, group, label, type: 'text', value, ...extra });
export const area = (key, label, value, group = 'form', extra = {}) => ({ key, group, label, type: 'textarea', value, ...extra });

/** Form URL, button text, note, success and error messages, the same for every form (pass what is sent in `sends`) */
export const tailFields = ({ sends = 'name, email, message', submit = 'Send message', note = '', successTitle = 'Thanks, message sent!', successText = 'We will get back to you within one business day.', errorText = 'Sorry, something went wrong. Please try again or email us directly.', group = 'form' } = {}) => [
  { key: 'formAction', group, label: 'Form URL (action)', type: 'url', value: 'https://formspree.io/f/your-form-id', hint: `Paste your form endpoint from Formspree, Basin, Getform or your own server. Fields sent: ${sends}.` },
  lbl('submit', 'Button text', submit, group),
  lbl('note', 'Note under the button (optional)', note, group),
  lbl('successTitle', 'Success title', successTitle, group),
  lbl('successText', 'Success text', successText, group),
  lbl('errorText', 'Error text', errorText, group),
];

/** The usual heading fields (eyebrow, heading, lead) for a section */
export const headFields = ({ eyebrow = '', heading, lead = '' }) => [
  { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: eyebrow },
  { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: heading },
  { key: 'lead', group: 'header', label: 'Text (optional)', type: 'textarea', value: lead },
];
export const HEAD_GROUP = { id: 'header', label: 'Heading' };

/* ── Styles ─────────────────────────────────────────────────────────────────── */
export const FK_CSS = `${FORM_CSS}
.fk{--fk-line:color-mix(in srgb,var(--st-text) 16%,transparent);--fk-soft:color-mix(in srgb,var(--st-brand) 9%,transparent);--fk-ring:0 0 0 4px color-mix(in srgb,var(--st-brand) 18%,transparent)}
.fk .visually-hidden,.fk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.st-field select{width:100%;padding:13px 44px 13px 15px;-webkit-appearance:none;appearance:none;border-radius:calc(var(--st-radius) * .8px);border:1px solid var(--fk-line);background-color:var(--st-bg);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;background-size:18px;color:var(--st-text);font:400 16px/1.5 var(--st-font-body);outline:none;cursor:pointer}
.st-field select:focus,.st-field input[type="date"]:focus,.st-field input[type="time"]:focus{border-color:var(--st-brand);box-shadow:var(--fk-ring)}
.st-field input[type="date"],.st-field input[type="time"]{min-height:51px}
.st-field input:user-invalid,.st-field textarea:user-invalid,.st-field select:user-invalid,.fk-fl input:user-invalid,.fk-fl textarea:user-invalid{border-color:#dc2626}
.st-field input:user-valid:not(:placeholder-shown),.fk-fl input:user-valid:not(:placeholder-shown){border-color:color-mix(in srgb,#16a34a 70%,transparent)}
.st-field input::placeholder,.st-field textarea::placeholder{color:color-mix(in srgb,var(--st-muted) 75%,transparent)}
.fk-hint{font-size:13px;font-weight:400;color:var(--st-muted)}
/* grouped controls */
.fk-group{border:0;padding:0;margin:0;min-width:0;display:flex;flex-direction:column;gap:10px}
.fk-legend{padding:0;font-size:14.5px;font-weight:600;color:var(--st-text)}
.fk-options{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.fk-options--stack{grid-template-columns:1fr}
.fk-opt,.fk-chip,.fk-stars label,.fk-scale label{position:relative;cursor:pointer}
.fk-opt input,.fk-chip input,.fk-stars input,.fk-scale input{position:absolute;opacity:0;inset:0;margin:0;width:100%;height:100%;cursor:pointer}
.fk-opt-body{display:flex;flex-direction:column;gap:3px;height:100%;padding:14px 16px;border-radius:calc(var(--st-radius) * .8px);border:1.5px solid var(--fk-line);background:var(--st-bg);transition:border-color .2s,background .2s,box-shadow .2s}
.fk-opt:hover .fk-opt-body{border-color:color-mix(in srgb,var(--st-brand) 55%,transparent)}
.fk-opt input:checked + .fk-opt-body{border-color:var(--st-brand);background:var(--fk-soft);box-shadow:var(--fk-ring)}
.fk-opt input:focus-visible + .fk-opt-body{box-shadow:var(--fk-ring);border-color:var(--st-brand)}
.fk-opt-title{font-weight:700;font-size:15.5px}
.fk-opt-desc{font-size:13.5px;color:var(--st-muted);line-height:1.45}
.fk-chips{display:flex;flex-wrap:wrap;gap:8px}
.fk-chip span{display:inline-block;padding:9px 16px;border-radius:999px;border:1.5px solid var(--fk-line);background:var(--st-bg);font-size:14.5px;font-weight:600;transition:border-color .2s,background .2s,color .2s}
.fk-chip:hover span{border-color:color-mix(in srgb,var(--st-brand) 55%,transparent)}
.fk-chip input:checked + span{border-color:var(--st-brand);background:var(--st-brand);color:var(--st-brandText)}
.fk-chip input:focus-visible + span{box-shadow:var(--fk-ring)}
.fk-check{display:flex;align-items:flex-start;gap:10px;font-size:14.5px;line-height:1.5;color:var(--st-muted);cursor:pointer}
.fk-check input{flex:none;width:19px;height:19px;margin-top:2px;accent-color:var(--st-brand);cursor:pointer}
.fk-check a{color:var(--st-brand)}
.fk-switch{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 0;cursor:pointer;font-size:15px}
.fk-switch strong{display:block;font-weight:700}.fk-switch small{display:block;color:var(--st-muted);font-size:13.5px;margin-top:2px}
.fk-switch input{position:relative;flex:none;width:46px;height:26px;margin:0;border-radius:99px;background:color-mix(in srgb,var(--st-text) 22%,transparent);-webkit-appearance:none;appearance:none;cursor:pointer;transition:background .2s}
.fk-switch input::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:transform .2s}
.fk-switch input:checked{background:var(--st-brand)}.fk-switch input:checked::after{transform:translateX(20px)}
.fk-switch input:focus-visible{box-shadow:var(--fk-ring)}
/* floating labels */
.fk-fl{position:relative;display:block}
.fk-fl input,.fk-fl textarea{width:100%;padding:24px 15px 9px;border-radius:calc(var(--st-radius) * .8px);border:1px solid var(--fk-line);background:var(--st-bg);color:var(--st-text);font:400 16px/1.4 var(--st-font-body);outline:none;transition:border-color .2s,box-shadow .2s}
.fk-fl textarea{resize:vertical;min-height:120px}
.fk-fl span{position:absolute;left:16px;top:16px;color:var(--st-muted);font-size:16px;line-height:1.2;pointer-events:none;transform-origin:left top;transition:transform .18s ease,color .18s}
.fk-fl input:focus,.fk-fl textarea:focus{border-color:var(--st-brand);box-shadow:var(--fk-ring)}
.fk-fl input:focus + span,.fk-fl input:not(:placeholder-shown) + span,.fk-fl textarea:focus + span,.fk-fl textarea:not(:placeholder-shown) + span{transform:translateY(-9px) scale(.76);color:var(--st-brand)}
/* ratings */
.fk-stars{display:flex;gap:4px}
.fk-stars label{display:inline-flex;padding:2px}
.fk-stars svg{fill:none;stroke:color-mix(in srgb,var(--st-text) 28%,transparent);stroke-width:1.6;stroke-linejoin:round;transition:fill .15s,stroke .15s,transform .15s}
.fk-stars label:hover svg,.fk-stars label:has(~ label:hover) svg,.fk-stars label:has(input:checked) svg,.fk-stars label:has(~ label input:checked) svg{fill:#f59e0b;stroke:#f59e0b}
.fk-stars label:hover svg{transform:scale(1.12)}
.fk-stars label:has(input:focus-visible){outline:2px solid var(--st-brand);outline-offset:2px;border-radius:6px}
.fk-scale{display:grid;grid-template-columns:repeat(11,1fr);gap:6px}
.fk-scale label span{display:grid;place-items:center;height:44px;border-radius:calc(var(--st-radius) * .6px);border:1.5px solid var(--fk-line);background:var(--st-bg);font-weight:700;font-size:15px;transition:all .15s}
.fk-scale label:hover span{border-color:color-mix(in srgb,var(--st-brand) 55%,transparent)}
.fk-scale input:checked + span{background:var(--st-brand);border-color:var(--st-brand);color:var(--st-brandText)}
.fk-scale input:focus-visible + span{box-shadow:var(--fk-ring)}
.fk-scale-ends{display:flex;justify-content:space-between;font-size:13px;color:var(--st-muted)}
/* stepper, counter, range */
.fk-stepper-field{gap:7px}
.fk-stepper{display:inline-flex;align-items:center;border-radius:calc(var(--st-radius) * .8px);border:1px solid var(--fk-line);background:var(--st-bg);overflow:hidden;align-self:flex-start}
.fk-stepper button{width:48px;height:48px;border:0;background:transparent;color:var(--st-text);font-size:22px;cursor:pointer;transition:background .15s}
.fk-stepper button:hover{background:var(--fk-soft)}
.fk-stepper input{width:54px;text-align:center;border:0;border-inline:1px solid var(--fk-line);border-radius:0;padding:12px 0;background:transparent;-moz-appearance:textfield;appearance:textfield}
.fk-stepper input::-webkit-outer-spin-button,.fk-stepper input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.fk-count{position:relative;display:block}.fk-count textarea{padding-bottom:30px}
.fk-counter{position:absolute;right:12px;bottom:9px;font-size:12.5px;font-weight:500;color:var(--st-muted);font-variant-numeric:tabular-nums}
.fk-range{display:flex;align-items:center;gap:14px}.fk-range input{flex:1;accent-color:var(--st-brand);height:28px}.fk-range output{min-width:84px;text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
/* file drop area */
.fk-drop{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:26px 18px;text-align:center;border-radius:calc(var(--st-radius) * .9px);border:2px dashed color-mix(in srgb,var(--st-text) 24%,transparent);background:var(--st-bg);cursor:pointer;transition:border-color .2s,background .2s}
.fk-drop:hover,.fk-drop.is-over{border-color:var(--st-brand);background:var(--fk-soft)}
.fk-drop input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}
.fk-drop:has(input:focus-visible){box-shadow:var(--fk-ring);border-color:var(--st-brand)}
.fk-drop-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--fk-soft);color:var(--st-brand);margin-bottom:6px}
.fk-drop-title{font-size:15.5px}.fk-drop-hint{color:var(--st-muted);font-size:13.5px}
.fk-drop-name{margin-top:6px;font-size:14px;font-weight:700;color:var(--st-brand);word-break:break-all}
/* progress (multi-step) */
.fk-progress{list-style:none;display:flex;gap:8px;margin:0 0 4px;padding:0}
.fk-progress li{flex:1;display:flex;flex-direction:column;gap:8px;font-size:13.5px;font-weight:600;color:var(--st-muted)}
.fk-progress li i{display:block;height:5px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 12%,transparent);transition:background .3s}
.fk-progress li.is-done i,.fk-progress li.is-active i{background:var(--st-brand)}
.fk-progress li.is-active{color:var(--st-text)}
.fk-js .fk-panel:not(.is-active){display:none}
.fk-panel{display:flex;flex-direction:column;gap:16px;border:0;padding:0;margin:0;min-width:0}
.fk-nav{display:flex;gap:12px;align-items:center}.fk-nav .st-form-btn{align-self:auto}
.fk-back{background:transparent;border:1px solid var(--fk-line);color:var(--st-text);padding:13px 20px;border-radius:99px;font:600 15px var(--st-font-body);cursor:pointer}
.fk-back:hover{border-color:var(--st-brand);color:var(--st-brand)}
.fk-summary{display:grid;gap:0;margin:0;padding:6px 18px;border-radius:calc(var(--st-radius) * .8px);background:var(--fk-soft)}
.fk-summary div{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid color-mix(in srgb,var(--st-text) 8%,transparent);font-size:14.5px}
.fk-summary div:last-child{border-bottom:0}.fk-summary dt{color:var(--st-muted)}.fk-summary dd{font-weight:600;text-align:right;word-break:break-word}
/* code boxes */
.fk-otp{display:flex;gap:10px;justify-content:center}
.fk-otp input{width:54px;height:64px;text-align:center;font:700 26px var(--st-font-heading);border-radius:calc(var(--st-radius) * .8px);border:1.5px solid var(--fk-line);background:var(--st-bg);color:var(--st-text);outline:none;transition:border-color .2s,box-shadow .2s;padding:0}
.fk-otp input:focus{border-color:var(--st-brand);box-shadow:var(--fk-ring)}
.fk-otp input:not(:placeholder-shown){border-color:var(--st-brand)}
/* segmented control */
.fk-seg{display:inline-flex;padding:4px;border-radius:99px;background:color-mix(in srgb,var(--st-text) 8%,transparent);align-self:flex-start}
.fk-seg label{position:relative;cursor:pointer}.fk-seg input{position:absolute;opacity:0;inset:0;margin:0;width:100%;height:100%;cursor:pointer}
.fk-seg span{display:block;padding:9px 20px;border-radius:99px;font-weight:700;font-size:14.5px;color:var(--st-muted);transition:background .2s,color .2s}
.fk-seg input:checked + span{background:var(--st-bg);color:var(--st-text);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.fk-seg input:focus-visible + span{box-shadow:var(--fk-ring)}
.fk-two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.fk-card{padding:clamp(24px,3.4cqi,40px);border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface);border:1px solid color-mix(in srgb,var(--st-text) 7%,transparent);box-shadow:0 30px 70px -40px color-mix(in srgb,var(--st-text) 45%,transparent)}
@container st (max-width:560px){.fk-two{grid-template-columns:1fr}.fk-scale{grid-template-columns:repeat(6,1fr)}.fk-otp input{width:44px;height:54px;font-size:22px}.fk-otp{gap:6px}.fk-nav{flex-wrap:wrap}.fk-progress li:not(.is-active) span{display:none}}`;

/** The section heading block: eyebrow, h2, lead (each hidden when empty) */
export const headHtml = ({ left = false, cls = '' } = {}) => `<header class="st-head${left ? ' st-head--left' : ''}${cls ? ' ' + cls : ''}">
      <p class="st-eyebrow" data-anim="item" data-show-if="eyebrow" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
      <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
    </header>`;
