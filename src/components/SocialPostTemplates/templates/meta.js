/* Shared definitions for the social post templates. Plain data only (no React, no CSS
   imports) so scripts/postbuild.js can import the registry for the sitemap. */

// Post sizes for Instagram, Facebook, X, LinkedIn and Pinterest (2026 recommendations).
// --safe-top / --safe-bottom keep text clear of the Story header and reply bar.
// `shape` lets a new size reuse a template's layout tweaks: the LinkedIn image gets the
// .is-landscape rules and the Pinterest pin the .is-portrait ones (the root has both classes).
export const SIZES = [
  { id: 'portrait',  label: 'Portrait post',  short: '4:5',    w: 1080, h: 1350, note: 'Instagram feed (recommended), Facebook and LinkedIn feeds, X portrait' },
  { id: 'square',    label: 'Square post',    short: '1:1',    w: 1080, h: 1080, note: 'Instagram, Facebook, LinkedIn and X feeds' },
  { id: 'story',     label: 'Story / Reel',   short: '9:16',   w: 1080, h: 1920, note: 'Instagram and Facebook Stories, Reel covers', safeTop: 250, safeBottom: 340 },
  { id: 'landscape', label: 'Landscape post', short: '16:9',   w: 1600, h: 900,  note: 'X feed image, Facebook landscape' },
  { id: 'linkedin',  label: 'LinkedIn image', short: '1.91:1', w: 1200, h: 627,  shape: 'landscape', note: 'LinkedIn shared image and link posts, Facebook link images' },
  { id: 'pin',       label: 'Pinterest pin',  short: '2:3',    w: 1000, h: 1500, shape: 'portrait', note: 'Pinterest standard pin (the recommended 2:3 ratio)' },
];
export const sizeById = id => SIZES.find(z => z.id === id) || SIZES[0];

export const TEMPLATE_CATEGORIES = [
  { id: 'quotes',        label: 'Quotes & Tips',     blurb: 'Quote cards, tips, list posts, Q&As, facts, myth vs fact and statistic posts that people save and share.' },
  { id: 'how-to',        label: 'How-To & Education', blurb: 'Checklists, step-by-step guides and mistakes-to-avoid posts that people save and come back to.' },
  { id: 'engagement',    label: 'Engagement',        blurb: 'This-or-that votes and hot takes that get people commenting, sharing and arguing in the replies.' },
  { id: 'announcements', label: 'Announcements',     blurb: 'Launches, coming-soon teasers, milestones, hiring, meet-the-team, holiday hours, year-in-review and "we’re live" posts.' },
  { id: 'promo',         label: 'Promo & Sales',     blurb: 'Discount badges, Black Friday and Cyber Monday sales, advent calendar deals, product spotlights, giveaways, comparisons and real estate listings.' },
  { id: 'events',        label: 'Events',            blurb: 'Webinar, meetup and countdown posts with a clear date, plus event recaps.' },
  { id: 'social-proof',  label: 'Social Proof',      blurb: 'Customer testimonials, 5-star review posts and before/after results.' },
  { id: 'carousel',      label: 'Carousel Slides',   blurb: 'Cover, step and final slides for swipeable carousel posts.' },
  { id: 'stories',       label: 'Stories',           blurb: 'Story-first designs: polls, questions and link-in-bio prompts.' },
  { id: 'holidays',      label: 'Holidays & Seasonal', blurb: 'Christmas, Hanukkah, Diwali, Lunar New Year, Ramadan and Eid, Giving Tuesday, national days, Halloween, Thanksgiving and New Year posts.' },
];
export const categoryById = id => TEMPLATE_CATEGORIES.find(c => c.id === id);

/* Dummy pictures for empty photo slots: simple white shapes over the template's accent gradient, so an
   unfinished post still looks like a post. A slot picks one with data-ph (landscape is the default).
   Self-contained data URIs (no external files), gone the moment a photo is added. */
const svgUrl = body => `url("data:image/svg+xml,${encodeURIComponent(body)}")`;
const PLACEHOLDER_ART = {
  landscape: svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'><circle cx='292' cy='92' r='34' fill='white' fill-opacity='.78'/><ellipse cx='110' cy='70' rx='46' ry='13' fill='white' fill-opacity='.45'/><ellipse cx='140' cy='58' rx='30' ry='11' fill='white' fill-opacity='.45'/><ellipse cx='318' cy='150' rx='38' ry='10' fill='white' fill-opacity='.35'/><path d='M0 230 Q70 150 150 210 T300 190 T400 215 V300 H0Z' fill='white' fill-opacity='.3'/><path d='M0 262 Q90 205 190 252 T400 240 V300 H0Z' fill='white' fill-opacity='.5'/></svg>`),
  portrait: svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' preserveAspectRatio='xMidYMid slice'><circle cx='150' cy='150' r='140' fill='white' fill-opacity='.1'/><circle cx='150' cy='108' r='46' fill='white' fill-opacity='.82'/><path d='M52 300 Q52 192 150 192 Q248 192 248 300Z' fill='white' fill-opacity='.82'/></svg>`),
  product: svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'><rect x='46' y='44' width='308' height='212' rx='14' fill='white' fill-opacity='.94'/><rect x='46' y='44' width='308' height='30' rx='14' fill='black' fill-opacity='.07'/><circle cx='66' cy='59' r='5' fill='black' fill-opacity='.2'/><circle cx='84' cy='59' r='5' fill='black' fill-opacity='.2'/><circle cx='102' cy='59' r='5' fill='black' fill-opacity='.2'/><rect x='62' y='90' width='70' height='150' rx='8' fill='black' fill-opacity='.07'/><rect x='146' y='92' width='110' height='10' rx='5' fill='black' fill-opacity='.2'/><rect x='146' y='112' width='116' height='7' rx='3.5' fill='black' fill-opacity='.1'/><rect x='146' y='190' width='30' height='50' rx='5' fill='black' fill-opacity='.14'/><rect x='186' y='160' width='30' height='80' rx='5' fill='black' fill-opacity='.2'/><rect x='226' y='176' width='30' height='64' rx='5' fill='black' fill-opacity='.14'/><rect x='266' y='140' width='30' height='100' rx='5' fill='black' fill-opacity='.24'/><rect x='282' y='94' width='60' height='24' rx='12' fill='black' fill-opacity='.22'/></svg>`),
  cover: svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'><circle cx='330' cy='60' r='120' fill='white' fill-opacity='.14'/><circle cx='60' cy='300' r='110' fill='white' fill-opacity='.12'/><polyline points='40,140 100,110 150,126 210,70 270,86 340,36' fill='none' stroke='white' stroke-opacity='.9' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/><circle cx='340' cy='36' r='9' fill='white'/><rect x='40' y='176' width='170' height='16' rx='8' fill='white' fill-opacity='.85'/><rect x='40' y='204' width='240' height='10' rx='5' fill='white' fill-opacity='.5'/><rect x='40' y='222' width='200' height='10' rx='5' fill='white' fill-opacity='.5'/></svg>`),
};
const PLACEHOLDER_GRADIENT = 'radial-gradient(circle at 28% 24%,color-mix(in srgb,var(--accent) 55%,#fff) 0%,var(--accent) 42%,color-mix(in srgb,var(--accent) 45%,#000) 100%)';

/* Base CSS shared by every template. Sizes use --u (1% of the shorter side), so one
   design scales across every post size. Templates must only use self-contained
   CSS (no external URLs) so the PNG export can embed everything. */
export const BASE_CSS = `
.spt{--pad:calc(var(--u)*8);--pt:calc(var(--pad) + var(--safe-top,0px));--pb:calc(var(--pad) + var(--safe-bottom,0px));position:relative;overflow:hidden;box-sizing:border-box;font-family:var(--font-body);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;line-height:1.3}
.spt *,.spt *::before,.spt *::after{box-sizing:border-box;margin:0;padding:0}
.spt [data-edit]{white-space:pre-line;overflow-wrap:anywhere;outline:none}
.spt [data-fit]{overflow-wrap:normal}
.spt [data-edit]:empty{display:none}
.spt .hl{color:var(--accent)}
.spt [data-image]{background-size:cover;background-position:center;background-repeat:no-repeat}
.spt [data-image][data-image-fit="contain"]{background-size:contain}
.spt [data-image]:not(.has-img){background-image:${PLACEHOLDER_ART.landscape},${PLACEHOLDER_GRADIENT}}
.spt [data-image][data-ph="portrait"]:not(.has-img){background-image:${PLACEHOLDER_ART.portrait},${PLACEHOLDER_GRADIENT}}
.spt [data-image][data-ph="product"]:not(.has-img){background-image:${PLACEHOLDER_ART.product},${PLACEHOLDER_GRADIENT}}
.spt [data-image][data-ph="cover"]:not(.has-img){background-image:${PLACEHOLDER_ART.cover},${PLACEHOLDER_GRADIENT}}
.spt [data-image][data-optional]:not(.has-img),.spt [data-image][data-image-fit="contain"]:not(.has-img){display:none}
.spt [data-fit-box]{min-height:0;overflow:hidden}
/* Optional logo next to the handle (hidden until a logo is added) */
.spt .spt-brand{position:relative;display:inline-flex;align-items:center;gap:calc(var(--u)*1.4);max-width:100%;vertical-align:middle}
.spt .spt-logo{flex:none;width:calc(var(--u)*11);height:calc(var(--u)*5.5)}
/* Logo on templates without a handle: in a corner, or in the flow under the text */
.spt .spt-logo-tr,.spt .spt-logo-tl{position:absolute;z-index:3;top:var(--pt);width:calc(var(--u)*15);height:calc(var(--u)*7)}
.spt .spt-logo-tr{right:var(--pad);background-position:right center}
.spt .spt-logo-tl{left:var(--pad);background-position:left center}
.spt .spt-logo-flow{position:relative;flex:none;width:calc(var(--u)*16);height:calc(var(--u)*6.5)}
.spt.v-top [data-fit-box]{justify-content:flex-start!important}
.spt.v-middle [data-fit-box]{justify-content:center!important}
.spt.v-bottom [data-fit-box]{justify-content:flex-end!important}
`;

/* Escapes text, turns *words* into accent highlights, and allows a little inline HTML:
   <b> <strong> <i> <em> <u> <br>. Only those tags are turned back on and unclosed ones
   are closed, so typed HTML can't break the design. */
function balanceInline(html) {
  const stack = [];
  const out = html.replace(/<(\/?)(b|strong|i|em|u)>/g, (m, slash, tag) => {
    if (!slash) { stack.push(tag); return m; }
    const at = stack.lastIndexOf(tag);
    if (at === -1) return '';
    return stack.splice(at).reverse().map(x => `</${x}>`).join('');
  });
  return out + stack.reverse().map(x => `</${x}>`).join('');
}
export function richText(text) {
  const esc = String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const tags = esc
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
    .replace(/&lt;(\/?)(b|strong|i|em|u)&gt;/gi, (m, slash, tag) => `<${slash}${tag.toLowerCase()}>`);
  return balanceInline(tags).replace(/\*([^*\n]+)\*/g, '<span class="hl">$1</span>');
}
