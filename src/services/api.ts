import axios from 'axios';
import { Exchange } from '../types/exchange';
import { Candle } from '../types/candle';
import { FilterOptions } from '../types/filters';
import { CompanyMetadata } from '../types/metadata';
import { ApiResponse, PaginatedResponse } from '../types/api';

const api = axios.create({  
  baseURL: 'http://51.20.89.154/api/v1'
});

export const getExchanges = async (filters: {
  type?: string;
  country?: string;
  currency?: string;
}) => {
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

export const getCandles = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<{ totalItems: number; data: Candle[] }>>(
    `/candles/${symbol}`
  );
  return data.candles.data;
};

export const getFilterOptions = async (): Promise<FilterOptions> => {
  const { data } = await api.get('/exchanges/filters');
  return data.filters;
};

export const getMetadata = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<{ data: CompanyMetadata[] }>>(
    `/metadata/${symbol}`
  );
  return data.metadata;
};
