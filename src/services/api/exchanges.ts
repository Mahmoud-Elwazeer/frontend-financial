import { api, handleApiError } from './config';
import { Exchange } from '../../types/exchange';
import { PaginatedResponse, ApiExchanges, ApiExchange, ApiFilters } from '../../types/api/responses';
import { ExchangeFilters } from '../../types/api/requests';
import { FilterOptions } from '../../types/filters';

export const getExchanges = async (filters: ExchangeFilters): Promise<Exchange[]> => {
  try {
    const { data } = await api.get<ApiExchanges<PaginatedResponse<Exchange>>>('/exchanges', {
      params: filters,
    });
    return data.exchanges.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getExchangeDetails = async (symbol: string): Promise<Exchange> => {
  try {
    const { data } = await api.get<ApiExchange<Exchange>>(`/exchanges/${symbol}`);
    return data.exchange;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getFilterOptions = async (): Promise<FilterOptions> => {
  try {
    const { data } = await api.get<ApiFilters<FilterOptions >>('/exchanges/filters');
    return data.filters;
  } catch (error) {
    throw handleApiError(error);
  }
};