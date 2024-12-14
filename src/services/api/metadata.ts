import { api } from './config';
import { CompanyMetadata } from '../../types/metadata';
import { ApiResponse } from '../../types/api';

export const getMetadata = async (symbol: string) => {
  const { data } = await api.get<ApiResponse<{ data: CompanyMetadata[] }>>(
    `/metadata/${symbol}`
  );
  return data.metadata;
};