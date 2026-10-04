import st from './styles.module.css';

// Playground name at the top of the lesson sidebar (beside its collapse button).
// Replaces the old full-width header row over the editor, so the ad and the lesson
// sit at the top of the right-hand column. `children` carries any controls the old
// header held (Share, speed, DB status…); `standalone` adds its own padded row for
// sidebars that have no top bar.
export default function PlaygroundSidebarTitle({ slug, name, as: Tag = 'div', standalone = false, children }) {
  return (
    <div className={`${st.wrap} ${standalone ? st.standalone : ''}`}>
      <div className={st.row}>
        <img src={`/icons/${slug}.svg`} width={22} height={22} alt="" />
        <Tag className={st.name}>{name}</Tag>
      </div>
      {children && <div className={st.extras}>{children}</div>}
    </div>
  );
}
