import { api } from './config';
import { Favorite } from '../../types/favorite';
import { ApiResponse, ApiError } from '../../types/api';
import { Exchange } from '../../types/exchange';
import axios from 'axios';


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
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
    throw error;
  }
};

export const removeFavorite = async (symbol: string): Promise<boolean> => {
  try {
    await api.delete(`/favorites/${symbol}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiError;
      throw new Error(apiError.message);
    }
    throw error;
  }
};