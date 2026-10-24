/* The Privacy page every multi-page website template gets (site.js adds it after the template's
   own pages). It is sample wording on the Legal & Long-Form Text Page section: the visitor
   replaces it with a policy that matches what their business really does. The title and
   description are fitted to 50–60 and 150–160 characters for any brand name. */

const TITLES = b => [
  `${b} Privacy Policy: How We Handle Your Data`,
  `${b} Privacy Policy and Your Data Rights`,
  `${b} Privacy Policy: Your Data, Your Choices`,
  `Privacy Policy | ${b}: Your Data and Your Rights`,
  `${b} Privacy Policy: What We Collect and Why`,
  `${b} Privacy Policy: Data, Cookies and Your Rights`,
  `Privacy Policy and Cookies | ${b} Website`,
  `${b} Privacy Policy, Cookies and Data Rights`,
];
const DESCRIPTIONS = b => [
  `How ${b} collects, uses and protects your personal information, who we share it with and the choices you have. Written in plain language.`,
  `The ${b} privacy policy explains what information we collect, why we collect it, how long we keep it and how you can ask us to change or delete it.`,
  `Read how ${b} handles your personal information: what we collect, how we use cookies, who we share data with and how to exercise your rights.`,
  `${b} privacy policy in plain language: the information we collect, how we use it, who we share it with and how to contact us about your data.`,
  `This is how ${b} collects, uses and protects personal information on this website, including cookies, sharing, your rights and how to reach us.`,
  `The ${b} privacy policy explains what information we collect, why we collect it, how long we keep it, who we share it with and how to change or delete it.`,
  `How ${b} collects, uses and protects your personal information on this website, including cookies, sharing, your rights and how to contact us about privacy.`,
  `How ${b} collects, uses and protects your information on this website: what we collect, how we use cookies, who we share it with and your rights.`,
];
const fit = (list, min, max) => list.find(x => x.length >= min && x.length <= max)
  || (() => { const x = list.reduce((a, c) => (Math.abs(c.length - (min + max) / 2) < Math.abs(a.length - (min + max) / 2) ? c : a)); return x.length > max ? `${x.slice(0, max - 1).replace(/[\s,;:.-]+\S*$/, '')}.` : x; })();

export function privacyMeta(brand) {
  const b = String(brand || 'This site').replace(/\s+/g, ' ').trim();
  return { title: fit(TITLES(b), 50, 60), description: fit(DESCRIPTIONS(b), 150, 160) };
}

/** Sections of the Privacy page (in the starterSections format) */
export function privacyPageSections(brand) {
  const b = String(brand || 'We').trim();
  return [['privacy-policy', {
    fields: {
      eyebrow: 'Legal',
      heading: 'Privacy *policy*',
      updated: 'Last updated 24 October 2026',
      lead: `This policy explains what information ${b} collects when you use this website, how we use it and the choices you have. It is sample wording: replace it with a policy that matches what your business really does.`,
      contactHeading: 'Questions about your data?',
      contactText: `Write to us at privacy@webdevpuneet.com and we will reply within five working days.`,
    },
    lists: {
      sections: [
        { title: 'Information we collect', text: 'We collect the information you give us directly, such as your name, email address and message when you fill in a form or contact us.\n\nWe also collect basic technical information automatically when you visit the site.', points: 'Details you send us through forms\nMessages, bookings and enquiries\nDevice, browser and page-view information' },
        { title: 'How we use your information', text: 'We use your information to reply to you, to provide the services you ask for and to improve this website. We do not sell your personal data.', points: 'To answer enquiries and confirm bookings\nTo send messages you have asked for\nTo understand which pages are useful' },
        { title: 'Cookies and analytics', text: 'We use a small number of cookies to make the site work and to measure how it is used. You can block or delete cookies in your browser settings at any time.', points: '' },
        { title: 'Who we share it with', text: 'We share information only with the service providers who help us run the website, such as hosting, email and form services, and only as far as they need to do their job. We may also share it when the law requires.', points: '' },
        { title: 'Your choices and rights', text: 'You can ask us to see, correct or delete the personal data we hold about you, and to stop using it for certain purposes. Contact us and we will help.', points: 'Ask for a copy of your data\nCorrect anything that is wrong\nAsk us to delete your information' },
        { title: 'Changes to this policy', text: 'If we change this policy in a way that matters, we will update the date at the top of this page.', points: '' },
      ],
    },
  }]];
}
