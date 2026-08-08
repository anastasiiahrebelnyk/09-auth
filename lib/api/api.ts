import axios, { AxiosError } from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiError = AxiosError<{ error: string }>;

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});
