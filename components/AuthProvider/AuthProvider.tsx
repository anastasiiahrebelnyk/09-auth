'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    async function fetchUser() {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } else {
        clearIsAuthenticated();
      }
    }
    fetchUser();
  }, [clearIsAuthenticated, setUser]);
  return <>{children}</>;
}

export default AuthProvider;
