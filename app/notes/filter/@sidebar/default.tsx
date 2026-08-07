import css from './SidebarNotes.module.css';

// interface SidebarNotesProps {}

export default async function SidebarNotes() {
  // const categories = await getCategories();
  const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <ul className={css.menuList}>
      {/* список тегів */}

      <li className={css.menuItem}>
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </a>
      </li>
      {tags.map((tag: string) => (
        <li key={tag} className={css.menuItem}>
          <a href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
