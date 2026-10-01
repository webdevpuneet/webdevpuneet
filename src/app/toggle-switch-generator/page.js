import ToggleSwitchGeneratorTool from '@/components/ToggleSwitchGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Toggle Switch Generator — Accessible & Free | webdevpuneet.com',
  description: 'Free CSS toggle switch generator with live state preview — export HTML+CSS, React, Vue, Svelte, or Tailwind with ARIA and WCAG contrast built in.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/toggle-switch-generator/' },
  icons: { icon: '/icons/toggle-switch-generator.svg', shortcut: '/icons/toggle-switch-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/toggle-switch-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Toggle Switch Generator — Accessible Switch UI with Code Export',
    description: 'Free — Design accessible toggle switches with live state previews (off, on, focused, disabled). Export clean HTML+CSS, React, Vue 3, or Tailwind code with proper ARIA attributes.',
    images: [{ url: 'https://webdevpuneet.com/images/toggle-switch-generator.png', width: 1200, height: 800, alt: 'CSS Toggle Switch Generator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Toggle Switch Generator — Accessible Switch UI with Code Export',
    description: 'Design accessible toggle switches with live state previews. Export HTML+CSS, React, Vue, or Tailwind — with role="switch", aria-checked, and focus-visible built in.',
    images: ['https://webdevpuneet.com/images/toggle-switch-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I make an accessible toggle switch with HTML and CSS without JavaScript?',
      acceptedAnswer: { '@type': 'Answer', text: 'The most reliable pattern is a visually hidden checkbox (<input type="checkbox">) styled with CSS, paired with role="switch" and aria-label. The checkbox handles keyboard interaction natively — Space bar toggles it, Tab focuses it — so no JavaScript event listeners are needed for basic functionality. The generated code uses this approach: the real checkbox is opacity:0 width:0 height:0 so it is invisible but still in the tab order and operable by keyboard and screen readers.' },
    },
    {
      '@type': 'Question',
      name: 'Which ARIA attributes does an accessible toggle switch need?',
      acceptedAnswer: { '@type': 'Answer', text: 'A toggle switch needs role="switch" so screen readers announce it as a switch rather than a checkbox, aria-checked to reflect the current on/off state, and aria-label or an associated <label> element so the purpose is announced. The generated code includes all three. For React and Vue, aria-checked is bound to the component state so it updates dynamically with each toggle.' },
    },
    {
      '@type': 'Question',
      name: 'How do I make a CSS toggle switch work with keyboard navigation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Because the underlying element is an <input type="checkbox">, keyboard support is automatic: Tab moves focus to the toggle, Space bar toggles it on or off, and Enter also works in most browsers. No JavaScript is required. The generated CSS uses :focus-visible to show a clear focus ring only when navigating by keyboard, not on mouse clicks — following the WCAG 2.1 Focus Visible guideline (Success Criterion 2.4.7).' },
    },
    {
      '@type': 'Question',
      name: 'How do I build a toggle switch in Tailwind CSS using peer-checked?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Tailwind output uses the peer modifier correctly. The hidden checkbox gets the peer class. The track div and thumb div are placed after the checkbox in the same parent container — making them siblings — so peer-checked:bg-[color] on the track and peer-checked:translate-x-[n] on the thumb both respond to the checkbox state. This requires no JavaScript. The pattern works with Tailwind v3 and v4. Note: arbitrary values like translate-x-[20px] require that Tailwind scans your source files for these class names — avoid string interpolation when possible.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a React toggle switch component with useState?',
      acceptedAnswer: { '@type': 'Answer', text: 'The React output generates a controlled component that uses useState to track the checked state. The <input> has checked={checked} and onChange that calls setChecked and fires an optional onChange prop callback. aria-checked is bound to the same state so it stays in sync. To use it: import the Toggle component, render <Toggle label="Dark mode" onChange={(isOn) => setDarkMode(isOn)} />. For an uncontrolled version, replace checked/onChange with defaultChecked and drop the useState.' },
    },
    {
      '@type': 'Question',
      name: 'Why is cursor: not-allowed not working on my disabled toggle switch?',
      acceptedAnswer: { '@type': 'Answer', text: 'The cursor only applies to the element it is set on — not its parent. If you add cursor: not-allowed to the track or thumb but the outer <label> still has cursor: pointer, the label text area shows a pointer. The fix is .toggle-wrapper:has(.toggle-input:disabled) { cursor: not-allowed } which uses the CSS :has() relational selector to style the outer wrapper when the inner checkbox is disabled. :has() is supported in Chrome 105+, Safari 15.4+, Firefox 121+. For older browsers, toggle a disabled class on the wrapper in JavaScript instead.' },
    },
    {
      '@type': 'Question',
      name: 'How do I animate a CSS toggle switch smoothly without JavaScript?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS transitions run on the compositor thread, meaning they are not blocked by JavaScript execution. The toggle thumb slide uses transition on transform (GPU-accelerated), and the track color change uses transition on background-color. This gives smooth 60fps animations even under main-thread load. For feel: 150ms ease for a snappy switch, 300ms ease-in-out for a softer feel, or cubic-bezier(0.34,1.56,0.64,1) for a spring bounce overshoot. The Duration and Easing controls in the generator let you tune and preview these live.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add check and cross icons inside a CSS toggle switch track?',
      acceptedAnswer: { '@type': 'Answer', text: 'Enable the Track icons option in the generator — the exported CSS adds .toggle-track::before with content "✓" on the left side (opacity 0 when off, 1 when checked) and .toggle-track::after with content "✕" on the right side (opacity 1 when off, 0 when checked). Both use transition: opacity so they fade smoothly. No HTML changes are needed — it is pure CSS using the adjacent sibling combinator. The icon size scales automatically with the track height.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a Svelte toggle switch component?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Svelte export generates a single-file component with bind:checked for two-way binding, createEventDispatcher to fire a change event the parent can listen to with on:change, and scoped <style> so the CSS does not leak. Props are exported with export let: label, labelPos, checked, and disabled. Use it as: <Toggle bind:checked={darkMode} on:change={e => console.log(e.detail)} />. The component is fully accessible — role="switch", aria-checked, aria-label, :focus-visible ring, and disabled state are all included in the generated CSS.' },
    },
    {
      '@type': 'Question',
      name: 'What WCAG contrast ratio does a toggle switch need to pass?',
      acceptedAnswer: { '@type': 'Answer', text: 'Under WCAG 2.1 Success Criterion 1.4.11 Non-text Contrast, UI components need a minimum 3:1 contrast ratio against adjacent colors. For a toggle switch, this means the thumb color against the track-on background must be at least 3:1. This is lower than the 4.5:1 required for normal text. The generator shows a live contrast badge — green "AA ✓" when ratio ≥ 3:1, red "Fail ✗" when below. If you see Fail, try a white or dark thumb against a saturated track color, or use the color pickers to adjust until the badge turns green.' },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Toggle Switch Generator', item: 'https://webdevpuneet.com/toggle-switch-generator/' },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Toggle Switch Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Design accessible CSS toggle switches online with live preview of all states. Export HTML+CSS, React, Vue 3, and Tailwind CSS code with ARIA attributes included.',
  url: 'https://webdevpuneet.com/toggle-switch-generator/',
};

const seoData = {
  slug: 'toggle-switch-generator',
  title: 'CSS Toggle Switch Generator — Accessible Switch UI with Live Preview',
  sections: [
    {
      type: '2col',
      left: {
        type: 'text',
        label: 'About this tool',
        heading: 'Design Toggle Switches That Look Good and Work for Everyone',
        text: `Toggle switches are everywhere in modern UIs — dark mode controls, notification settings, feature flags, privacy preferences. But a toggle that looks good in Figma often ships broken: it can't be reached by keyboard, screen readers announce it as a generic "checkbox" with no context, there's no visible focus ring, and the disabled state is just a dimmed button with no cursor change. Users who navigate without a mouse or use assistive technology are left behind.\n\nThis generator closes that gap. Design your toggle visually, and the exported code is accessible from the start — no extra effort required. Every output includes **\`role="switch"\`** so screen readers announce "on/off switch" instead of "checkbox", **\`aria-checked\`** that updates dynamically with the toggle state, an **\`aria-label\`** for context, a **\`:focus-visible\`** outline that appears only on keyboard navigation (not on clicks), and a **\`:disabled\`** state that disables both interaction and pointer cursor on the full label.\n\n**Six state previews** update live as you customise: the interactive toggle you can click, default off, default on, focused (showing the keyboard ring), disabled off, and disabled on. This makes it easy to catch contrast issues in the focused or disabled state before you ship — the two states most often forgotten during design review.\n\n**Eight presets** cover the most common design patterns: modern blue, minimal black, green, purple, amber, outlined, rounded, and square. Each preset is a starting point — adjust the track colors, thumb, focus ring, shape, border, shadow, transition duration, and easing individually. The preview updates instantly with every change.\n\n**Five code outputs** are generated in parallel: HTML + CSS using a hidden checkbox approach that needs no JavaScript, a React controlled component with state, a Vue 3 Single-File Component using v-model, a Svelte SFC with bind:checked and createEventDispatcher, and a Tailwind CSS version using the peer modifier. All five include the full ARIA attributes and the correct CSS for all six interaction states.

**Track icons and thumb icons** are built into the CSS — no extra HTML required. Enable the ✓/✕ track icons option to add check and cross marks that fade in and out via CSS ::before/::after. Choose a thumb icon: Power ⏻ always visible inside the thumb, or Day/Night ☀/🌙 that swaps between sun and moon as the toggle changes state.

**WCAG contrast check** runs live in the preview header. The badge shows the Non-text Contrast ratio (WCAG 1.4.11) between your thumb and track-on color — green AA ✓ when it passes the 3:1 minimum for UI components, red Fail ✗ when it doesn't. The **preview background switcher** (◼ dark / ◻ light / custom hex) lets you test how the toggle looks against different page backgrounds before exporting.\n\nFor building complete form UIs, pair this tool with our [CSS Button Generator](/css-button-generator) for submit buttons, and use [Flexbox Builder](/flexbox-builder) or [CSS Grid Builder](/css-grid-builder) to lay out the settings panel around your toggles.`,
      },
      right: {
        type: 'features',
        heading: 'Features',
        items: [
          '**6 live state previews** — interactive, default off, default on, focused, disabled off, disabled on',
          '**8 presets** — Blue, Green, Purple, Amber, Minimal, Outline, Rounded, Square',
          '**Full color control** — track off/on, thumb, focus ring, optional border — each with hex input and color picker',
          '**3 track shapes** — Pill (fully rounded), Rounded (6px), Square (2px)',
          '**Track icons** — enable ✓/✕ check and cross marks inside the track with CSS ::before/::after, no extra HTML',
          '**Thumb icons** — choose None, Power ⏻, or Day/Night ☀/🌙 — sun and moon swap on toggle via CSS transitions',
          '**Preview background switcher** — test your toggle on dark, light, or any custom hex background before exporting',
          '**WCAG contrast badge** — live Non-text Contrast ratio (WCAG 1.4.11) between thumb and track-on color with AA pass/fail',
          '**Transition control** — duration slider (50–600ms) and 6 easing options including spring cubic-bezier',
          '**Label control** — text, position (left / right / none), and font size',
          '**HTML + CSS export** — hidden checkbox pattern, zero JavaScript needed',
          '**React export** — controlled component with useState, onChange prop, full ARIA',
          '**Vue 3 export** — SFC with v-model, defineProps, scoped styles',
          '**Svelte export** — bind:checked, createEventDispatcher, scoped styles in one SFC',
          '**Tailwind export** — peer modifier pattern, arbitrary values for exact pixel control',
          '**Accessible by default** — role="switch", aria-checked, aria-label, :focus-visible ring, :disabled state, :has() cursor fix',
          '**No install, no account** — runs entirely in the browser',
        ],
      },
    },
    {
      type: 'steps',
      heading: 'How to Use',
      items: [
        { title: 'Pick a preset', text: 'Click any of the 8 preset buttons to load a starting configuration — Blue, Green, Purple, Amber, Minimal, Outline, Rounded, or Square. The preview updates immediately across all 6 states.' },
        { title: 'Set the size', text: 'Choose Small (32×18px), Medium (44×24px), or Large (56×30px) from the Size control. The thumb size scales proportionally and the translate distance recalculates automatically.' },
        { title: 'Choose the track shape', text: 'Pill gives a fully rounded iOS-style toggle. Rounded uses 6px corners for a softer rectangular look. Square uses 2px corners for a strict UI or admin panel aesthetic.' },
        { title: 'Customise colors', text: 'Use the color pickers to set the track color for the off state, the track color for the on state, the thumb color, and the focus ring color. The preview shows all states simultaneously so you can check contrast in every configuration.' },
        { title: 'Adjust style details', text: 'Toggle the thumb shadow on or off. Add a track border using the Border slider (0–3px) and set its color — useful for outlined or transparent-track designs. Each change updates the preview instantly.' },
        { title: 'Add icons', text: 'Enable Track icons to show a ✓ checkmark on the left and ✕ cross on the right of the track — they fade in and out with the toggle. Pick a Thumb icon: Power ⏻ always visible, or Day/Night ☀/🌙 that swaps on toggle. All implemented via CSS ::before/::after — no extra HTML.' },
        { title: 'Check contrast and background', text: 'The WCAG badge next to the preview header shows the live contrast ratio between your thumb color and track-on color. 3:1 is the WCAG 1.4.11 AA minimum for UI components. Use the dark ◼, light ◻, or custom color buttons to test your toggle against different page backgrounds before exporting.' },
        { title: 'Tune the transition', text: 'Drag the Duration slider (50–600ms) to control animation speed. Select an easing from the dropdown — ease-out for natural deceleration, ease-in-out for a balanced feel, or the spring cubic-bezier for a bouncy overshoot effect.' },
        { title: 'Configure the label', text: 'Type your label text — e.g. "Enable notifications" or "Dark mode". Set the position to Left, Right, or None (for icon-only or visually unlabelled toggles where aria-label provides the accessible name). Adjust the font size slider.' },
        { title: 'Export the code', text: 'Click the HTML+CSS, React, Vue 3, or Tailwind tab to switch code outputs. All four are generated simultaneously. Click Copy to copy the current tab\'s code to your clipboard.' },
      ],
    },
    {
      type: 'cards',
      heading: 'Common Use Cases',
      columns: 3,
      items: [
        { icon: '🌙', title: 'Dark mode toggle switch', desc: 'Export the React component, pass your setter to the onChange prop, and the toggle wires directly to your theme context — no extra state needed. aria-checked updates automatically so screen readers announce "on" or "off" when the mode switches. Use the Minimal preset for a neutral look that works in both light and dark themes.' },
        { icon: '🔔', title: 'Settings page on/off switches', desc: 'Each toggle is a self-contained checkbox — drop multiple copies on the same page and each manages its own state independently with no shared logic. Export HTML+CSS for a server-rendered form where each toggle submits as a checkbox value, or React to manage each preference in its own useState hook.' },
        { icon: '🏳️', title: 'Feature flag toggle for admin panels', desc: 'Enable or disable features per user or globally without page reloads. Square shape with the Minimal preset matches the clean aesthetic of admin UIs. The disabled state with reduced opacity and not-allowed cursor clearly signals read-only flags.' },
        { icon: '♿', title: 'WCAG-accessible toggle switch for forms', desc: 'When a form collects consent or opt-in preferences, a toggle with role="switch" and an explicit aria-label is more semantically correct than a plain checkbox. The generated code meets WCAG 2.1 AA for keyboard operability and name-role-value.' },
        { icon: '📱', title: 'iOS-style toggle switch in CSS', desc: 'iOS and Android settings screens use pill-shaped toggles as their native control. The Large preset (56×30px) matches iOS dimensions. The pill shape and ease-out transition feel native. Export Tailwind for React Native Web or an Expo web project.' },
        { icon: '🎨', title: 'Custom toggle switch for a design system', desc: 'Export the HTML+CSS output and replace the hardcoded hex values with your CSS custom properties (--color-primary, --color-surface, etc.). The generated CSS is flat and class-based — ready to drop into any component library or design token system.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      heading: 'Why :focus-visible Instead of :focus?',
      text: `:focus shows an outline whenever an element receives focus — including on mouse clicks, which produces an unexpected and often unwanted ring around a toggle every time a user clicks it. :focus-visible is smarter: browsers apply it only when the focus was triggered by keyboard navigation or a non-pointing input device. This means keyboard users always see a clear focus ring (meeting WCAG 2.4.7), while mouse users don't see a ring on click — matching the expected visual behaviour of native operating system controls.\n\nAll generated code in this tool uses :focus-visible on the hidden checkbox input. The visible focus ring is drawn on the track element using the adjacent sibling combinator: .toggle-input:focus-visible + .toggle-track. This keeps the focus indicator visually on the toggle track while the actual keyboard focus remains on the underlying input, which is the correct accessible pattern.`,
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
    },
  ],
};

export default function ToggleSwitchGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <ToggleSwitchGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>


      </div>
    </>
  );
}
