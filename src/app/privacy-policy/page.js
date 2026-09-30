import styles from './styles.module.css';

export const metadata = {
  title: 'Privacy Policy — Cookies, AdSense & Your Rights | webdevpuneet.com',
  description: 'Privacy Policy for webdevpuneet.com — free browser-based developer tools. Explains client-side processing, cookies, Google AdSense and Analytics, and your GDPR/CCPA rights.',
  alternates: { canonical: 'https://webdevpuneet.com/privacy-policy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
  const year = new Date().getFullYear();
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: July 2, 2026</p>

        <section className={styles.section}>
          <h2>1. Introduction & Acceptance</h2>
          <p>webdevpuneet.com ("we", "our", "the site") operates a collection of free, browser-based tools for developers and freelancers at <strong>webdevpuneet.com</strong> (the "Service"). This Privacy Policy explains what information is collected when you use the Service, how it is used, and the choices and rights available to you. By using the Service, you agree to the practices described in this policy. If you do not agree, please discontinue use of the site.</p>
          <p>This policy is written to comply with the EU General Data Protection Regulation (<strong>GDPR</strong>), the UK GDPR, the California Consumer Privacy Act as amended by the CPRA (<strong>CCPA/CPRA</strong>), and Google's <a href="https://support.google.com/adsense/answer/48182" target="_blank" rel="noopener noreferrer">AdSense program policies</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>2. Data Collection & Processing</h2>
          <h3>Client-side tool processing</h3>
          <p>Every tool on webdevpuneet.com runs <strong>entirely inside your own browser</strong>. Any content you type, paste, or upload into a tool — code, JSON, CSS, images, documents, financial figures, passwords, or anything else — is processed locally on your device using JavaScript. This input is <strong>never transmitted to, or stored on, our servers</strong>, and we have no technical ability to see, log, or access it.</p>
          <ul>
            <li>No account or sign-up is required to use any tool</li>
            <li>No file or form content you enter into a tool is uploaded to our servers</li>
            <li>We do not sell, rent, or share your tool input with anyone, because we never receive it in the first place</li>
          </ul>
          <h3>Local storage & IndexedDB</h3>
          <p>Some tools save your work-in-progress or preferences directly on your device using your browser's <strong>localStorage</strong> or <strong>IndexedDB</strong> — for example, a productivity or bookmarking tool remembering your saved items between visits, or a settings toggle remembering your preferred theme. This data stays on your device, is never transmitted to us, and can be permanently erased at any time by clearing your browser's site data for webdevpuneet.com. Where a tool offers an optional cloud-sync feature (such as syncing to your own GitHub Gist), that connection is made directly from your browser to the third-party service using credentials you supply and control — we do not act as an intermediary and cannot see the synced content.</p>
          <h3>Log data</h3>
          <p>Like most websites, our hosting infrastructure automatically records limited technical information for every request — such as IP address, browser type, referring page, and timestamp — for security, abuse prevention, and basic server operation. This is standard web-server log data, is not linked to any tool input, and is not used to build advertising profiles by us directly.</p>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies We Use</h2>
          <p>Cookies are small text files placed on your device. We use a limited set of cookies, grouped below by purpose.</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Category</th><th>Purpose</th><th>Set by</th><th>Your control</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essential / functional</td>
                  <td>Remembers UI preferences such as theme (light/dark) and sidebar state; not used for tracking</td>
                  <td>webdevpuneet.com (localStorage, not a traditional cookie)</td>
                  <td>Clear site data in your browser at any time</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Anonymous, aggregated usage measurement (pages viewed, session length, general region)</td>
                  <td>Google Analytics</td>
                  <td>Opt out via the Google Analytics opt-out add-on below</td>
                </tr>
                <tr>
                  <td>Advertising</td>
                  <td>Ad delivery, frequency capping, and personalization based on browsing activity, including the DART cookie and similar identifiers</td>
                  <td>Google AdSense / Google ad partners</td>
                  <td>Opt out via Google Ads Settings or industry opt-out tools below</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>We do not use cookies to identify you personally, and we do not combine cookie data with any tool input, since we never receive that input on our servers.</p>
        </section>

        <section className={styles.section}>
          <h2>4. Google AdSense & Third-Party Advertising</h2>
          <p>webdevpuneet.com is supported by advertising served through <strong>Google AdSense</strong>. Google, as a third-party vendor, uses cookies — including the <strong>DART cookie</strong> and other unique identifiers — to serve ads based on your prior visits to this website and other websites across the internet. This helps show ads that may be more relevant to you and helps us keep every tool free to use.</p>
          <p>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to webdevpuneet.com and/or other sites on the internet. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> (US), <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a> (EU), or by adjusting your device or browser settings to block third-party cookies entirely.</p>
          <p>Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet, in accordance with <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's advertising policies</a>.</p>
        </section>

        <section className={styles.section}>
          <h2>5. Cookie Management & Opt-Out Procedures</h2>
          <ul>
            <li><strong>Browser controls:</strong> Every modern browser lets you block, delete, or limit cookies through its settings menu, including blocking third-party cookies entirely.</li>
            <li><strong>Google Ads Settings:</strong> Manage or disable personalized advertising at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>.</li>
            <li><strong>Google Analytics opt-out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a> to prevent your data from being used by Google Analytics on any site, including this one.</li>
            <li><strong>Industry opt-out tools:</strong> <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a> and <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer">youronlinechoices.eu</a> let you opt out of interest-based advertising from many providers at once.</li>
            <li><strong>Global Privacy Control (GPC):</strong> We honor GPC browser signals as a valid opt-out-of-sale/sharing request from California residents where legally required.</li>
          </ul>
          <p>Opting out of personalized advertising does not stop ads from appearing — it means ads will no longer be based on your browsing interests.</p>
        </section>

        <section className={styles.section}>
          <h2>6. Analytics</h2>
          <p>We use <strong>Google Analytics 4</strong> to collect anonymous, aggregated usage data — such as page views, session duration, and general geographic region — to understand which tools are most used and to improve the site. Google Analytics does not identify individual users to us. You can opt out at any time using the tools listed in Section 5.</p>
        </section>

        <section className={styles.section}>
          <h2>7. Your Privacy Rights (GDPR — EEA/UK Users)</h2>
          <p>If you are located in the European Economic Area or United Kingdom, data protection law gives you the following rights regarding any personal data processed about you (primarily via cookies and analytics, since we hold no account data):</p>
          <ul>
            <li><strong>Right to access</strong> — request confirmation of what data relating to you is processed</li>
            <li><strong>Right to rectification</strong> — request correction of inaccurate data</li>
            <li><strong>Right to erasure</strong> — request deletion of data (for cookie-based data, this is achieved by clearing cookies/site data or using the opt-out tools above)</li>
            <li><strong>Right to restrict or object to processing</strong> — including objecting to processing for interest-based advertising</li>
            <li><strong>Right to data portability</strong> — request your data in a portable format, where applicable</li>
            <li><strong>Right to withdraw consent</strong> at any time where processing is based on consent, without affecting prior lawful processing</li>
            <li><strong>Right to lodge a complaint</strong> with your local data protection authority</li>
          </ul>
          <p>Because tool input never leaves your browser and we operate no account system, most of these rights are exercised directly through your own browser (clearing local storage/cookies) or through the Google opt-out tools above for advertising and analytics data held by Google. For any other request, contact us using the details in Section 12.</p>
        </section>

        <section className={styles.section}>
          <h2>8. Your Privacy Rights (CCPA/CPRA — California Users)</h2>
          <p>If you are a California resident, the CCPA as amended by the CPRA gives you the right to:</p>
          <ul>
            <li><strong>Know</strong> what personal information is collected, used, disclosed, or sold</li>
            <li><strong>Delete</strong> personal information collected about you, subject to certain exceptions</li>
            <li><strong>Opt out</strong> of the "sale" or "sharing" of personal information for cross-context behavioral advertising</li>
            <li><strong>Non-discrimination</strong> for exercising any of these rights</li>
            <li><strong>Correct</strong> inaccurate personal information</li>
            <li><strong>Limit</strong> use of sensitive personal information (not applicable — we do not collect sensitive personal information)</li>
          </ul>
          <p>webdevpuneet.com does not sell personal information for money. However, the use of advertising cookies through Google AdSense may be considered "sharing" for cross-context behavioral advertising under the CPRA. You can opt out of this sharing at any time via Google Ads Settings, the industry opt-out tools listed in Section 5, or by enabling a Global Privacy Control signal in your browser, which we honor as a valid opt-out request.</p>
        </section>

        <section className={styles.section}>
          <h2>9. Third-Party Services</h2>
          <p>We use the following third-party services, each governed by its own privacy policy:</p>
          <ul>
            <li><strong>Google AdSense</strong> — display advertising; see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a></li>
            <li><strong>Google Analytics</strong> — anonymous traffic analytics</li>
            <li><strong>Google Fonts</strong> — font delivery (your IP address may be logged by Google when a font loads)</li>
            <li><strong>GitHub (optional, tool-specific)</strong> — some tools offer an optional sync feature to your own GitHub Gist using a token you generate and control; this connection is made directly from your browser to GitHub, and is entirely optional</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>10. Data Retention & Deletion</h2>
          <p>We do not retain any tool input on our servers because we never receive it. Data stored in your browser's localStorage or IndexedDB persists until you clear it yourself or clear your browser's site data. Data you optionally sync to your own GitHub Gist is retained under your GitHub account and subject to GitHub's own policies — you can delete it at any time from your GitHub account. Analytics and advertising cookie data is retained by Google according to Google's own retention schedules, described in Google's Privacy Policy.</p>
        </section>

        <section className={styles.section}>
          <h2>11. International Data Transfers</h2>
          <p>Because we hold no server-side account data, there is no cross-border transfer of user-submitted content by us. However, Google Analytics and Google AdSense may process cookie and log data on servers located outside your country, including in the United States, under Google's own data transfer safeguards (such as Standard Contractual Clauses where applicable).</p>
        </section>

        <section className={styles.section}>
          <h2>12. Children's Privacy</h2>
          <p>webdevpuneet.com is not directed at children under the age of 13 (or the relevant minimum age in your jurisdiction) and we do not knowingly collect personal information from children. If you believe a child has provided personal information through the Service, please contact us and we will take appropriate steps to address it.</p>
        </section>

        <section className={styles.section}>
          <h2>13. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Material changes will be reflected by an updated "Last updated" date at the top of this page. Continued use of the Service after changes are posted constitutes acceptance of the updated policy.</p>
        </section>

        <section className={styles.section}>
          <h2>14. Contact</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise any of the rights described above, please contact us via the <a href="/contact/">contact page</a>, or by email at <a href="mailto:puneet438@gmail.com">puneet438@gmail.com</a>.</p>
        </section>

        <p className={styles.footer}>© {year} webdevpuneet.com</p>
      </div>
    </div>
  );
}
