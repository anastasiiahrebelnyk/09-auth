import { Note } from '@/types/note';
import { API } from './api';
import { NoteHTTPResponse } from './clientApi';

import { User } from '@/types/user';

export type RegisterRequest = {
  userName: string;
  email: string;
  avatar: string;
  // password: string;
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
  const res = await API.get<NoteHTTPResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    // headers: {
    //   Authorization: `Bearer ${API_KEY}`,
    // },
  });
  return res.data;
};

export const fetchNoteById = async (id: Note['id']): Promise<Note> => {
  const res = await API.get<Note>(`/notes/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${API_KEY}`,
    // },
  });
  return res.data;
};

export const checkSession = async () => {
  const { data } = await API.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await API.get<User>('/auth/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
