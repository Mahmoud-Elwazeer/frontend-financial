import axios from 'axios';
import { ApiError } from '../../types/api/responses';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export class ApiException extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiException';
  }
}

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const apiError = error.response.data as ApiError;
    throw new ApiException(apiError.message, error.response.status);
  }
  throw error;
};