import { Note } from '@/types/note';
import { API } from './api';
import { NoteHTTPResponse } from './clientApi';
import { cookies } from 'next/headers';

import { User } from '@/types/user';

export type RegisterRequest = {
  userName: string;
  email: string;
  avatar: string;
  password?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  page: number,
  search: string | undefined,
  tag: string | undefined
): Promise<NoteHTTPResponse> => {
  const cookieStore = await cookies();

  const res = await API.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },

    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await API.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();

  const { data } = await API.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.success;
};

export const getMe = async () => {
  const cookieStore = await cookies();

  const { data } = await API.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
