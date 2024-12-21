import { api, handleApiError } from './config';
import { Favorite } from '../../types/favorite';
import { Exchange } from '../../types/exchange';
import { ApiFavorites, ApiFavorite, PaginatedResponse } from '../../types/api/responses';

export interface FavoriteWithExchange extends Favorite {
  exchange: Exchange;
}

export const getFavorites = async (): Promise<FavoriteWithExchange[]> => {
  try {
    const { data } = await api.get<ApiFavorites<PaginatedResponse<FavoriteWithExchange>>>('/favorites');
    return data.favorites.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addFavorite = async (symbol: string): Promise<FavoriteWithExchange> => {
  try {
    const { data } = await api.post<ApiFavorite<FavoriteWithExchange>>('/favorites', { symbol });
    return data.favorite;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeFavorite = async (symbol: string): Promise<void> => {
  try {
    await api.delete(`/favorites/${symbol}`);
  } catch (error) {
    throw handleApiError(error);
  }
};