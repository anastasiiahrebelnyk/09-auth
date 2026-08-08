import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

// interface ProfileProps {
//   params: Promise<{ id: string }>;
// }

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();
  return {
    title: user.username,
    description: `${user.username}'s notes`,
    openGraph: {
      title: user.username,
      description: `${user.username}'s notes`,
      url: `https://notehub.com/profile`,
      images: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
    },
  };
}

export default async function Profile() {
  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
