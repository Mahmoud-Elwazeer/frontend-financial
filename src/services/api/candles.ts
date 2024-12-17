import { api } from './config';
import { Candle } from '../../types/candle';
import { ApiResponse, ApiError } from '../../types/api';
import { format } from 'date-fns';
import axios from 'axios';

interface DateRange {
  from?: Date;
  to?: Date;
}

export const getCandles = async (symbol: string, dateRange?: DateRange) => {
  try {
    const params: Record<string, string> = {};
    
    if (dateRange?.from) {
      params.from = format(dateRange.from, 'yyyy-MM-dd');
    }
    
    if (dateRange?.to) {
      params.to = format(dateRange.to, 'yyyy-MM-dd');
    }

    const { data } = await api.get<ApiResponse<{ totalItems: number; data: Candle[] }>>(
      `/candles/${symbol}`,
      { params }
    );
    
    return data.candles.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
    throw error;
  }
};