import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className="header-navigatioan">
            <Link href="/">Home</Link>
          </li>
          <li className="header-navigatioan">
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
