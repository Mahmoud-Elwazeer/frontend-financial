import { api } from './config';
import { Candle } from '../../types/candle';
import { ApiResponse } from '../../types/api';

export const getCandles = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<{ totalItems: number; data: Candle[] }>>(
    `/candles/${symbol}`
  );
  return data.candles.data;
};