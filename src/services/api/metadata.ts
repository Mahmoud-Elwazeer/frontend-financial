import { api, handleApiError } from './config';
import { CompanyMetadata } from '../../types/metadata';
import { ApiMetadata } from '../../types/api/responses';

export const getMetadata = async (symbol: string): Promise<CompanyMetadata> => {
  try {
    const { data } = await api.get<ApiMetadata<CompanyMetadata>>(`/metadata/${symbol}`);
    return data.metadata;
  } catch (error) {
    throw handleApiError(error);
  }
};