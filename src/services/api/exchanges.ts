import { api } from './config';
import { Exchange } from '../../types/exchange';
import { ApiResponse, ApiError } from '../../types/api';
import { FilterOptions } from '../../types/filters';
import axios from 'axios';

interface ExchangeFilters {
  type?: string;
  country?: string;
  currency?: string;
  symbols?: string;
}

export const getExchanges = async (filters: ExchangeFilters) => {
  try {
    const { data } = await api.get<ApiResponse<{ totalItems: number; data: Exchange[] }>>(
      '/exchanges',
      { params: filters }
    );
    return data.exchanges.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
  throw error;
  }
};

export const getExchangeDetails = async (symbol: string) => {
  try {
    const { data } = await api.get<ApiResponse<Exchange>>(`/exchanges/${symbol}`);
    return data.exchange;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
  throw error;
  }
};

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const { data } = await api.get<ApiResponse<{ filters: FilterOptions }>>('/exchanges/filters');
    return data.filters;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
  throw error;
  }
};