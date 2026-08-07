'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { ApiError } from '@/lib/api/api';

export default function EditProfile() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const user = useAuthStore();

  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const userName = formData.get('userName') as string;
    const email = formData.get('email') as string;

    setError('');
    setIsLoading(true);

    try {
      const user = await updateMe({ userName, email });

      setUser(user);
      router.push('/profile');
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... Something went wrong'
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>`Email:`</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
