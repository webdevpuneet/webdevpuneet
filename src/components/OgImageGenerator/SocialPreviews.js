'use client';

import s from './styles.module.css';

/* Approximate link cards from each platform, so crops and text fit can be checked
   before publishing. Platforms change their layouts; these follow late-2026 designs. */
export default function SocialPreviews({ src, title, description, site, accent }) {
  const domain = (site || 'webdevpuneet.com').trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'webdevpuneet.com';
  const desc = (description || '').replace(/\*/g, '');
  if (!src) return <div className={s.mockEmpty}>Rendering previews…</div>;

  return (
    <div className={s.mocks}>
      <p className={s.mockIntro}>
        How your image appears when the link is shared. The title and description under each card come from your
        page&rsquo;s <code>og:title</code> and <code>og:description</code> tags; they&rsquo;re filled from your design here.
      </p>

      <figure className={s.mock}>
        <figcaption>X (Twitter)</figcaption>
        <div className={s.xCard}>
          <div className={s.xImg}>
            <img src={src} alt="" />
            <span className={s.xDomain}>{domain}</span>
          </div>
        </div>
        <div className={s.xFrom}>From {domain}</div>
      </figure>

      <figure className={s.mock}>
        <figcaption>Facebook</figcaption>
        <div className={s.fbCard}>
          <div className={s.cropWide}><img src={src} alt="" /></div>
          <div className={s.fbInfo}>
            <span className={s.fbDomain}>{domain.toUpperCase()}</span>
            <span className={s.fbTitle}>{title}</span>
            <span className={s.fbDesc}>{desc}</span>
          </div>
        </div>
      </figure>

      <figure className={s.mock}>
        <figcaption>LinkedIn</figcaption>
        <div className={s.liCard}>
          <div className={s.cropWide}><img src={src} alt="" /></div>
          <div className={s.liInfo}>
            <span className={s.liTitle}>{title}</span>
            <span className={s.liDomain}>{domain}</span>
          </div>
        </div>
      </figure>

      <figure className={s.mock}>
        <figcaption>Slack</figcaption>
        <div className={s.slackCard}>
          <span className={s.slackSite}>{domain}</span>
          <span className={s.slackTitle}>{title}</span>
          {desc && <span className={s.slackDesc}>{desc}</span>}
          <img className={s.slackImg} src={src} alt="" />
        </div>
      </figure>

      <figure className={s.mock}>
        <figcaption>Discord</figcaption>
        <div className={s.discordCard} style={{ borderLeftColor: accent }}>
          <span className={s.discordSite}>{domain}</span>
          <span className={s.discordTitle}>{title}</span>
          {desc && <span className={s.discordDesc}>{desc}</span>}
          <img className={s.discordImg} src={src} alt="" />
        </div>
      </figure>

      <figure className={s.mock}>
        <figcaption>WhatsApp (compact) &mdash; crops to a centre square</figcaption>
        <div className={s.waBubble}>
          <div className={s.waCard}>
            <div className={s.waThumb}><img src={src} alt="" /></div>
            <div className={s.waInfo}>
              <span className={s.waTitle}>{title}</span>
              <span className={s.waDesc}>{desc}</span>
              <span className={s.waDomain}>{domain}</span>
            </div>
          </div>
          <span className={s.waLink}>https://{domain}/…</span>
        </div>
      </figure>

      <figure className={s.mock}>
        <figcaption>iMessage</figcaption>
        <div className={s.imCard}>
          <img src={src} alt="" />
          <div className={s.imInfo}>
            <span className={s.imTitle}>{title}</span>
            <span className={s.imDomain}>{domain}</span>
          </div>
        </div>
      </figure>
    </div>
  );
}
