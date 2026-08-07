import axios, { AxiosError } from 'axios';

// const API_KEY = process.env.NEXT_PUBLIC_API_URL;
// const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export type ApiError = AxiosError<{ error: string }>;

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});
