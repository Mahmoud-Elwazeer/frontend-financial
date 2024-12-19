import { api } from './config';
import { CompanyMetadata } from '../../types/metadata';
import { ApiResponse, ApiError } from '../../types/api';
import axios from 'axios';


export const getMetadata = async (symbol: string) => {
  try {
    const { data } = await api.get<ApiResponse<{ data: CompanyMetadata[] }>>(
      `/metadata/${symbol}`
    );
    return data.metadata;
  }
  catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
    throw error;
  }
};