import { api } from './config';
import { Exchange } from '../../types/exchange';
import { ApiResponse, PaginatedResponse } from '../../types/api';
import { FilterOptions } from '../../types/filters';

interface ExchangeFilters {
  type?: string;
  country?: string;
  currency?: string;
  symbols?: string;
}

export const getExchanges = async (filters: ExchangeFilters) => {
  const { data } = await api.get<ApiResponse<{ pagination: PaginatedResponse<Exchange> }>>(
    '/exchanges',
    { params: filters }
  );
  return data.exchanges.data;
};

export const getExchangeDetails = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<Exchange>>(`/exchanges/${symbol}`);
  return data.exchange;
};

export const getFilterOptions = async (): Promise<FilterOptions> => {
  const { data } = await api.get<ApiResponse<{ filters: FilterOptions }>>('/exchanges/filters');
  return data.filters;
};