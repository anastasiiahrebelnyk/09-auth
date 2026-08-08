import { Note, NoteFormValues } from '@/types/note';
import { API } from './api';
import { User } from '@/types/user';

export interface NoteHTTPResponse {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  userName?: string;
  email: string;
  avatar?: string;
  password?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type UpdateMeRequest = {
  email: string;
  username: string;
};

// const API = axios.create({ baseURL: 'https://notehub-api.goit.study' });

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

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await API.post<Note>('/notes', values, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await API.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const register = async (data: RegisterRequest) => {
  const res = await API.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await API.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await API.post<User>('/auth/logout', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const checkSession = async () => {
  const { data } = await API.get<CheckSessionRequest>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.success;
};

export const getMe = async () => {
  const { data } = await API.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const updateMe = async (data: UpdateMeRequest) => {
  const res = await API.patch<User>('/users/me', data, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};
