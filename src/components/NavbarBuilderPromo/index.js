import s from './styles.module.css';

// Call-out to the Navbar Builder, shown on the Navigation category page and on every
// navbar-related snippet page. `heading` lets each page phrase it for its own context.
export default function NavbarBuilderPromo({ heading = 'Need a complete navbar? Build one visually' }) {
  return (
    <aside className={s.promo} aria-label="Navbar Builder">
      <div className={s.icon} aria-hidden="true">☰</div>
      <div className={s.body}>
        <p className={s.label}>Free tool</p>
        <h2 className={s.heading}>{heading}</h2>
        <p className={s.text}>
          The <a href="/navbar-builder/">Responsive Navbar Builder</a> designs a whole navigation bar for you — logo,
          links, dropdown menus, a mobile hamburger menu and scroll effects — with a live preview, then exports clean
          code or opens it in My Code with <strong>Fork &amp; Edit</strong>.
        </p>
        <ul className={s.chips}>
          <li>Dropdown menus</li>
          <li>Hamburger, drawer &amp; full-screen menus</li>
          <li>Sticky, shrink &amp; hide on scroll</li>
          <li>6 presets</li>
          <li>HTML · React · Tailwind · Vue · Angular</li>
        </ul>
        <a className={s.cta} href="/navbar-builder/">Open the Navbar Builder →</a>
      </div>
    </aside>
  );
}
