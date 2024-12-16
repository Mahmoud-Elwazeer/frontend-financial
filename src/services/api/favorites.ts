import { api } from './config';
import { Favorite } from '../../types/favorite';
import { ApiResponse } from '../../types/api';
import { Exchange } from '../../types/exchange';

export interface FavoriteWithExchange extends Favorite {
  exchange: Exchange;
}

export const getFavorites = async (): Promise<FavoriteWithExchange[]> => {
  try {
    const { data } = await api.get<ApiResponse<{ favorites: FavoriteWithExchange[] }>>('/favorites');
    return data.favorites.data;
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addFavorite = async (symbol: string): Promise<FavoriteWithExchange | null> => {
  try {
    const { data } = await api.post<ApiResponse<{ favorite: FavoriteWithExchange }>>('/favorites', { symbol });
    return data.favorite;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return null;
  }
};

export const removeFavorite = async (symbol: string): Promise<boolean> => {
  try {
    await api.delete(`/favorites/${symbol}`);
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};