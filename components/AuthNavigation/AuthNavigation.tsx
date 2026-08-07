import { useRouter } from 'next/router';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
  //  const queryClient = new QueryClient();
  //  const response = await queryClient.prefetchQuery({
  //    queryKey: ['notes', tag],
  //    queryFn: () => fetchNotes(1, undefined, tag),
  //  });

  const router = useRouter();

  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated !== true) {
    return (
      <>
        <li className={css.navigationItem}>
          <a href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </a>
        </li>

        <li className={css.navigationItem}>
          <a href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </a>
        </li>
      </>
    );
  }
  return (
    <>
      <li className={css.navigationItem}>
        <a href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </a>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );
}
