import { api, handleApiError } from './config';
import { Candle } from '../../types/candle';
import { ApiCandles, PaginatedResponse } from '../../types/api/responses';
import { DateRangeParams } from '../../types/api/requests';
import { format } from 'date-fns';

export const getCandles = async (
  symbol: string,
  dateRange?: { from?: Date; to?: Date }
): Promise<Candle[]> => {
  try {
    const params: DateRangeParams = {};
    
    if (dateRange?.from) {
      params.from = format(dateRange.from, 'yyyy-MM-dd');
    }
    
    if (dateRange?.to) {
      params.to = format(dateRange.to, 'yyyy-MM-dd');
    }

    const { data } = await api.get<ApiCandles<PaginatedResponse<Candle>>>(
      `/candles/${symbol}`,
      { params }
    );
    
    return data.candles.data;
  } catch (error) {
    throw handleApiError(error);
  }
};