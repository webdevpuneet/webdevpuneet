'use client';

/* Platform mock-ups: shows the live, still-editable post inside an Instagram feed post,
   an Instagram Story, an X post or a LinkedIn post, with the brand kit's name, handle and
   logo and the caption typed in the panel. `renderPost(maxW, maxH)` draws the Preview. */

import m from './mockup.module.css';

export const MOCKUPS = [
  { id: 'design', label: 'Design' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'story', label: 'Story' },
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LinkedIn' },
];

const I = {
  heart: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M12 20s-7-4.4-9.2-9A5.1 5.1 0 0 1 12 6.1 5.1 5.1 0 0 1 21.2 11C19 15.6 12 20 12 20z"/></svg>,
  comment: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6A8.5 8.5 0 1 1 20.5 11.5z"/></svg>,
  send: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M21.5 3 10 14"/><path d="M21.5 3 14.5 21l-4.5-7-7-4.5z"/></svg>,
  save: <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"/></svg>,
  repost: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>,
  views: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20v-4"/></svg>,
  like: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M7 11v9H4v-9zM7 11l4-7c1.5 0 2.5 1 2.2 2.6L12.6 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/></svg>,
  more: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>,
};

function Avatar({ profile, size = 32, ring = false }) {
  return (
    <span className={`${m.avatar} ${ring ? m.avatarRing : ''}`} style={{ width: size, height: size }}>
      {profile.logo
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={profile.logo} alt="" />
        : <span style={{ fontSize: size * 0.42 }}>{profile.initial}</span>}
    </span>
  );
}

const Caption = ({ text, lines = 2 }) => (text
  ? <p className={m.caption} style={{ WebkitLineClamp: lines }}>{text}</p>
  : <p className={`${m.caption} ${m.captionEmpty}`}>Your caption shows here. Write it under “Post caption” in the panel.</p>);

export default function Mockup({ mode, box, size, profile, caption, renderPost }) {
  const ratio = size.h / size.w;
  const fit = (maxW, chromeH) => Math.max(120, Math.min(maxW, (box.h - chromeH) / ratio));

  if (mode === 'instagram') {
    const w = fit(Math.min(box.w, 470), 170);
    return (
      <div className={`${m.card} ${m.ig}`} style={{ width: w }}>
        <div className={m.igHead}>
          <Avatar profile={profile} ring />
          <b>{profile.handle}</b>
          <span className={m.muted}>· Sponsored</span>
          <span className={m.spacer} />{I.more}
        </div>
        {renderPost(w, w * ratio)}
        <div className={m.igActions}>{I.heart}{I.comment}{I.send}<span className={m.spacer} />{I.save}</div>
        <div className={m.igMeta}>
          <b>1,248 likes</b>
          {caption
            ? <p className={m.caption} style={{ WebkitLineClamp: 2 }}><b>{profile.handle}</b> {caption}</p>
            : <p className={`${m.caption} ${m.captionEmpty}`}><b>{profile.handle}</b> Your caption shows here. Write it under “Post caption”.</p>}
          <span className={m.muted}>2 hours ago</span>
        </div>
      </div>
    );
  }

  if (mode === 'story') {
    const h = Math.max(240, box.h - 10);
    const w = Math.min(box.w, h * 9 / 16);
    const fh = w * 16 / 9;
    const isStory = size.id === 'story';
    // A Story-size post fills the phone; other sizes sit centred like a shared post
    const pw = isStory ? w : w * 0.86;
    return (
      <div className={m.phone} style={{ width: w, height: fh }}>
        <div className={m.storyPost}>{renderPost(pw, isStory ? fh : fh * 0.7)}</div>
        <div className={m.storyTop}>
          <div className={m.storyBars}><i className={m.barDone} /><i className={m.barNow} /><i /></div>
          <div className={m.storyUser}><Avatar profile={profile} size={26} /><b>{profile.handle}</b><span>4h</span><span className={m.spacer} />✕</div>
        </div>
        <div className={m.storyBottom}><span className={m.storyReply}>Send message</span>{I.heart}{I.send}</div>
      </div>
    );
  }

  if (mode === 'x') {
    const cw = Math.min(box.w, 560);
    const iw = fit(cw - 74, 190);
    return (
      <div className={`${m.card} ${m.x}`} style={{ width: iw + 74 }}>
        <Avatar profile={profile} size={40} />
        <div className={m.xBody}>
          <div className={m.xHead}><b>{profile.name}</b><span className={m.muted}>@{profile.handle.replace(/^@/, '')} · 2h</span><span className={m.spacer} />{I.more}</div>
          <Caption text={caption} lines={3} />
          <div className={m.xMedia}>{renderPost(iw, iw * ratio)}</div>
          <div className={m.xActions}><span>{I.comment}24</span><span>{I.repost}86</span><span>{I.heart}1.2K</span><span>{I.views}48K</span></div>
        </div>
      </div>
    );
  }

  if (mode === 'linkedin') {
    const w = fit(Math.min(box.w, 555), 220);
    return (
      <div className={`${m.card} ${m.li}`} style={{ width: w }}>
        <div className={m.liHead}>
          <Avatar profile={profile} size={44} />
          <div><b>{profile.name}</b><span className={m.muted}>12,480 followers</span><span className={m.muted}>1d · 🌐</span></div>
          <span className={m.spacer} />{I.more}
        </div>
        <div className={m.liText}><Caption text={caption} lines={3} /></div>
        {renderPost(w, w * ratio)}
        <div className={m.liStats}><span>👍❤️👏 642</span><span>38 comments · 21 reposts</span></div>
        <div className={m.liActions}><span>{I.like}Like</span><span>{I.comment}Comment</span><span>{I.repost}Repost</span><span>{I.send}Send</span></div>
      </div>
    );
  }

  return renderPost(box.w, box.h);
}
